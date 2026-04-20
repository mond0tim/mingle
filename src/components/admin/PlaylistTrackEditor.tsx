"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GripVertical,
  Trash2,
  Plus,
  Music,
  Loader2,
  Search,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

interface PlaylistTrack extends Track {
  order: number;
}

export function PlaylistTrackEditor({ playlistId }: { playlistId: string }) {
  const [tracks, setTracks] = useState<PlaylistTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchPlaylistTracks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/playlists/${playlistId}/tracks`);
      const data = await res.json();
      setTracks(data.tracks);
    } catch (err) {
      console.error("Failed to fetch playlist tracks", err);
    } finally {
      setLoading(false);
    }
  }, [playlistId]);

  useEffect(() => {
    fetchPlaylistTracks();
  }, [fetchPlaylistTracks]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    
    const reordered = Array.from(tracks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setTracks(reordered);

    // Sync with server
    try {
      await fetch(`/api/admin/playlists/${playlistId}/tracks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackIds: reordered.map((t) => t.id) }),
      });
    } catch (err) {
      console.error("Failed to sync order", err);
    }
  };

  const removeTrack = async (trackId: number) => {
    setTracks((prev) => prev.filter((t) => t.id !== trackId));
    try {
      await fetch(`/api/admin/playlists/${playlistId}/tracks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId }),
      });
    } catch (err) {
      console.error("Failed to remove track", err);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/admin/tracks?search=${encodeURIComponent(query)}&limit=5`);
      const data = await res.json();
      // Filter out tracks already in playlist
      setSearchResults(data.tracks.filter((t: Track) => !tracks.some((pt) => pt.id === t.id)));
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsSearching(false);
    }
  };

  const addTrack = async (track: Track) => {
    // Optimistic update
    const newTrack = { ...track, order: tracks.length };
    setTracks((prev) => [...prev, newTrack]);
    setSearchResults((prev) => prev.filter((t) => t.id !== track.id));

    try {
      await fetch(`/api/admin/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId: track.id }),
      });
    } catch (err) {
      console.error("Failed to add track", err);
      // Revert if failed
      setTracks((prev) => prev.filter((t) => t.id !== track.id));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Загрузка состава...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Add */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Найти и добавить треки..."
            className="pl-10 bg-zinc-900/50 border-zinc-800"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-zinc-800 rounded-xl bg-zinc-900/30 overflow-hidden"
            >
              {searchResults.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-2 px-3 hover:bg-zinc-800/50 border-b border-zinc-800/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <img src={t.cover} className="h-8 w-8 rounded-md object-cover" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-200">{t.title}</span>
                      <span className="text-[10px] text-zinc-500">{t.artist}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary" onClick={() => addTrack(t)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Playlist Tracks List */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="playlist-tracks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2 min-h-[100px]"
            >
              {tracks.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-2xl opacity-40">
                  <Music className="h-8 w-8 mb-2" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Плейлист пуст</p>
                </div>
              ) : (
                tracks.map((track, index) => (
                  <Draggable key={track.id} draggableId={String(track.id)} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          "bg-zinc-900/40 border border-zinc-800 rounded-xl p-2 flex items-center justify-between group transition-all",
                          snapshot.isDragging && "bg-zinc-800 border-primary/50 shadow-2xl scale-[1.02] z-50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div {...provided.dragHandleProps} className="p-1 cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400">
                            <GripVertical className="h-4 w-4" />
                          </div>
                          <div className="h-10 w-10 flex-shrink-0 relative overflow-hidden rounded-lg border border-zinc-800">
                             <img src={track.cover} className="h-full w-full object-cover" />
                             <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-[10px] font-black text-white/50">
                               #{index + 1}
                             </div>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold truncate text-zinc-100">{track.title}</span>
                            <span className="text-[11px] text-zinc-500 truncate">{track.artist}</span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-950/30 hover:text-red-500"
                          onClick={() => removeTrack(track.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

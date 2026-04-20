"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/animate-ui/components/radix/dialog";
import {
  Pencil,
  Trash2,
  AlertTriangle,
  Loader2,
  Plus,
  Settings,
  Globe,
  Lock,
} from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { ColorStudioSheet } from "@/components/color-studio/ColorStudioSheet";
import { PlaylistTrackEditor } from "@/components/admin/PlaylistTrackEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";
import { type ColorBindings } from "@/lib/colorChannels";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Playlist {
  id: string;
  title: string;
  cover: string | null;
  type: string;
  category: string;
  isPublic: boolean;
  _count: { tracks: number };
  createdAt: string;
  colors?: { background?: string; button?: string; title?: string; bindings?: ColorBindings };
}

const CATEGORIES = ["OTHER", "SINGLE", "ALBUM", "VIBE", "PLAYLIST", "MIX"];

export default function AdminPlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlaylist, setEditingPlaylist] = useState<Partial<Playlist> | null>(null);
  const [deletingPlaylist, setDeletingPlaylist] = useState<Playlist | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const coverInputRef = React.useRef<HTMLInputElement>(null);

  const fetchPlaylists = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/playlists?limit=1000");
      const data = await res.json();
      setPlaylists(data.playlists);
    } catch (err) {
      console.error("Failed to fetch playlists", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handleCreate = () => {
    setEditingPlaylist({
      title: "Новый плейлист",
      category: "PLAYLIST",
      isPublic: false,
      type: "user",
      cover: ""
    });
    setIsEditOpen(true);
  };

  const handleEdit = (playlist: Playlist) => {
    setEditingPlaylist(playlist);
    setIsEditOpen(true);
  };

  const onSave = async () => {
    if (!editingPlaylist) return;
    try {
      const method = editingPlaylist.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/playlists", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPlaylist),
      });
      if (res.ok) {
        fetchPlaylists();
        setIsEditOpen(false);
      }
    } catch (err) {
      console.error("Save error", err);
    }
  };

  const onDelete = async () => {
    if (!deletingPlaylist) return;
    try {
      const res = await fetch("/api/admin/playlists", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deletingPlaylist.id }),
      });
      if (res.ok) {
        fetchPlaylists();
        setIsDeleteOpen(false);
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const onCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPlaylist?.id) return;

    setIsCoverUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("playlistId", editingPlaylist.id);

      const res = await fetch("/api/admin/playlists/cover", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setEditingPlaylist(prev => ({ 
        ...prev!, 
        cover: data.cover, 
        colors: data.colors 
      }));
      setPlaylists(prev => prev.map(p => p.id === editingPlaylist.id ? { ...p, cover: data.cover, colors: data.colors } : p));
    } catch (err) {
      console.error("Playlist cover upload error:", err);
    } finally {
      setIsCoverUploading(false);
    }
  };

  const columns = useMemo<ColumnDef<Playlist>[]>(() => [
    {
      accessorKey: "title",
      header: "Коллекция",
      cell: ({ row }) => {
        const playlist = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              alt={playlist.title}
              className="w-10 h-10 rounded-lg object-cover border border-zinc-800 flex-shrink-0 shadow-lg"
              src={playlist.cover || "/covers/no-cover.jpg"}
              onError={(e) => { (e.target as HTMLImageElement).src = "/covers/no-cover.jpg"; }}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold truncate max-w-[200px] text-zinc-100 text-sm">{playlist.title}</span>
              <span className="text-[10px] text-zinc-600 font-mono">ID: {playlist.id.slice(0, 8)}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Категория",
      cell: ({ row }) => (
        <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: "_count.tracks",
      header: "Треков",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-zinc-200">{row.original._count?.tracks || 0}</span>
          <span className="text-[10px] text-zinc-600 font-bold">шт.</span>
        </div>
      ),
    },
    {
      accessorKey: "isPublic",
      header: "Доступ",
      cell: ({ row }) => {
        const isPublic = row.original.isPublic;
        return (
          <div className="flex items-center gap-1.5">
            {isPublic
              ? <Globe className="h-3.5 w-3.5 text-zinc-400" />
              : <Lock className="h-3.5 w-3.5 text-zinc-700" />}
            <span className={cn("text-[10px] font-bold uppercase tracking-wider", isPublic ? "text-zinc-300" : "text-zinc-600")}>
              {isPublic ? "Публичный" : "Приватный"}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
            onClick={() => handleEdit(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-600 hover:text-red-500 hover:bg-red-950/30"
            onClick={() => {
              setDeletingPlaylist(row.original);
              setIsDeleteOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ], []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800/50">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-zinc-100 uppercase italic">Collections</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] opacity-70">Управление плейлистами и альбомами</p>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-4 px-5 rounded-2xl">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Всего</span>
            <span className="text-2xl font-black text-zinc-100 leading-none">{playlists.length}</span>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <Button
            size="sm"
            className="bg-zinc-100 text-zinc-900 font-black hover:bg-white h-9 px-6 uppercase tracking-tight italic"
            onClick={handleCreate}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Создать
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-zinc-800" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={playlists}
          searchKey="title"
          searchPlaceholder="Найти коллекцию..."
        />
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-[#0c0c0c] border-zinc-800 text-zinc-100 max-w-3xl rounded-3xl overflow-hidden p-0 gap-0">
          <DialogHeader className="p-8 pb-4">
            <DialogTitle className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-black uppercase italic tracking-tighter">
                  {editingPlaylist?.id ? "Edit Collection" : "New Collection"}
                </p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 opacity-70">Management Suite</p>
              </div>
              <div className="h-12 w-12 rounded-xl border border-zinc-800 flex items-center justify-center bg-zinc-900/50 text-zinc-600 flex-shrink-0">
                <Settings className="h-6 w-6" />
              </div>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="info" className="w-full">
             <TabsList className="mx-8 bg-zinc-900/50 border border-zinc-800 p-1 mb-6 rounded-xl h-10">
               <TabsTrigger value="info" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100 rounded-lg px-6 font-bold uppercase tracking-widest text-[10px]">Информация</TabsTrigger>
               <TabsTrigger value="tracks" disabled={!editingPlaylist?.id} className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100 rounded-lg px-6 font-bold uppercase tracking-widest text-[10px]">Состав Треков</TabsTrigger>
             </TabsList>

             <TabsContent value="info" className="p-8 pt-0 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-8">
                  <div className="flex gap-8 items-start">
                    <div 
                      className="relative group flex-shrink-0 cursor-pointer"
                      onClick={() => coverInputRef.current?.click()}
                    >
                      <img
                        alt="Cover"
                        className="w-32 h-32 rounded-2xl object-cover border border-zinc-800 shadow-2xl transition-all duration-500"
                        src={editingPlaylist?.cover || "/covers/no-cover.jpg"}
                        onError={(e) => { (e.target as HTMLImageElement).src = "/covers/no-cover.jpg"; }}
                      />
                      <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                        {isCoverUploading ? (
                          <Loader2 className="h-8 w-8 text-white animate-spin" />
                        ) : (
                          <Pencil className="h-6 w-6 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 space-y-5">
                      <div>
                        <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 block">Название</Label>
                        <Input
                          className="bg-zinc-950 border-zinc-800 focus-visible:border-primary/50 text-zinc-100 h-11 text-lg font-bold"
                          value={editingPlaylist?.title || ""}
                          onChange={(e) => setEditingPlaylist(prev => ({ ...prev!, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 block">Обложка (URL)</Label>
                        <Input
                          className="bg-zinc-950 border-zinc-800 focus-visible:border-primary/50 text-zinc-100 font-mono text-xs h-10"
                          value={editingPlaylist?.cover || ""}
                          onChange={(e) => setEditingPlaylist(prev => ({ ...prev!, cover: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        Фон
                        {editingPlaylist?.colors?.background && (
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: editingPlaylist.colors.background }} />
                        )}
                      </Label>
                      <Input
                        className="bg-zinc-950 border-zinc-800 text-zinc-100 font-mono text-[10px] uppercase h-9"
                        placeholder="#000000"
                        value={editingPlaylist?.colors?.background || ""}
                        onChange={(e) => setEditingPlaylist(prev => ({ ...prev!, colors: { ...prev?.colors, background: e.target.value } }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        Кнопка
                        {editingPlaylist?.colors?.button && (
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: editingPlaylist.colors.button }} />
                        )}
                      </Label>
                      <Input
                        className="bg-zinc-950 border-zinc-800 text-zinc-100 font-mono text-[10px] uppercase h-9"
                        placeholder="#C7D3FF"
                        value={editingPlaylist?.colors?.button || ""}
                        onChange={(e) => setEditingPlaylist(prev => ({ ...prev!, colors: { ...prev?.colors, button: e.target.value } }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        Иконки
                        {editingPlaylist?.colors?.title && (
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: editingPlaylist.colors.title }} />
                        )}
                      </Label>
                      <Input
                        className="bg-zinc-950 border-zinc-800 text-zinc-100 font-mono text-[10px] uppercase h-9"
                        placeholder="#FFFFFF"
                        value={editingPlaylist?.colors?.title || ""}
                        onChange={(e) => setEditingPlaylist(prev => ({ ...prev!, colors: { ...prev?.colors, title: e.target.value } }))}
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
                    <p className="mb-3 text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">Color Studio Engine</p>
                    <ColorStudioSheet
                      entityType="playlist"
                      entityId={editingPlaylist?.id}
                      coverUrl={editingPlaylist?.cover}
                      initialColors={editingPlaylist?.colors}
                      onSaved={(colors) => setEditingPlaylist((prev) => ({ ...prev!, colors }))}
                      triggerLabel="Интеллектуальный подбор палитры"
                    />
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Тип коллекции</p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((c) => (
                        <button
                          key={c}
                          onClick={() => setEditingPlaylist(prev => ({ ...prev!, category: c }))}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300",
                            editingPlaylist?.category === c
                              ? "bg-zinc-100 text-zinc-900 border-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                              : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between p-5 bg-zinc-950 border border-zinc-800 rounded-2xl cursor-pointer hover:bg-zinc-900/50 transition-all group"
                    onClick={() => setEditingPlaylist(prev => ({ ...prev!, isPublic: !prev?.isPublic }))}
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-primary transition-colors">Visibility Settings</p>
                      <p className="text-sm font-bold text-zinc-300">Публичный доступ для всех пользователей</p>
                    </div>
                    <div className={cn(
                      "w-12 h-6 rounded-full border transition-all relative",
                      editingPlaylist?.isPublic
                        ? "bg-zinc-100 border-zinc-100"
                        : "bg-zinc-900 border-zinc-800"
                    )}>
                      <div className={cn(
                        "absolute top-1 h-4 w-4 rounded-full transition-all duration-300",
                        editingPlaylist?.isPublic
                          ? "left-7 bg-zinc-950"
                          : "left-1 bg-zinc-700"
                      )} />
                    </div>
                  </div>
                </div>
             </TabsContent>

             <TabsContent value="tracks" className="p-8 pt-0 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <PlaylistTrackEditor playlistId={editingPlaylist?.id!} />
             </TabsContent>
          </Tabs>

          <DialogFooter className="p-8 border-t border-zinc-800/50 bg-zinc-900/30 gap-3">
            <Button variant="ghost" className="text-zinc-500 hover:text-zinc-300 font-bold uppercase tracking-widest text-xs" onClick={() => setIsEditOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-zinc-100 text-zinc-900 font-black hover:bg-white px-10 uppercase tracking-tighter italic h-12 rounded-xl text-lg shadow-2xl" onClick={onSave}>
              {editingPlaylist?.id ? "UPDATE" : "CREATE"}
            </Button>
          </DialogFooter>
        </DialogContent>
        {/* Hidden Input for Cover */}
        <input 
          type="file"
          ref={coverInputRef}
          className="hidden"
          accept="image/*"
          onChange={onCoverUpload}
        />
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-[#0c0c0c] border-zinc-800 text-zinc-100 max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-950/20 border border-red-900/30 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-xl font-bold uppercase italic">Warning</span>
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-sm leading-relaxed pt-1">
              Удаление коллекции{" "}
              <span className="text-zinc-100 font-semibold">«{deletingPlaylist?.title}»</span>{" "}
              приведёт к потере всех связей с треками в этом плейлисте.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 flex-1" onClick={() => setIsDeleteOpen(false)}>
              Закрыть
            </Button>
            <Button className="bg-red-600 text-white font-semibold hover:bg-red-500 flex-1" onClick={onDelete}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

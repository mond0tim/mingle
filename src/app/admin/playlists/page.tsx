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
import { ColumnDef } from "@tanstack/react-table";
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
}

const CATEGORIES = ["OTHER", "SINGLE", "ALBUM", "VIBE", "PLAYLIST", "MIX"];

export default function AdminPlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlaylist, setEditingPlaylist] = useState<Partial<Playlist> | null>(null);
  const [deletingPlaylist, setDeletingPlaylist] = useState<Playlist | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

  const handleEdit = (playlist: Playlist) => {
    setEditingPlaylist(playlist);
    setIsEditOpen(true);
  };

  const onSave = async () => {
    if (!editingPlaylist) return;
    try {
      const res = await fetch("/api/admin/playlists", {
        method: "PUT",
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
              className="w-10 h-10 rounded-lg object-cover border border-zinc-800 flex-shrink-0"
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
          <span className="text-sm font-bold text-zinc-200">{row.original._count.tracks}</span>
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/50">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2 text-zinc-100 uppercase italic">Collections</h1>
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-[0.2em]">Управление плейлистами и альбомами</p>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-4 px-5 rounded-xl">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Всего</span>
            <span className="text-2xl font-black text-zinc-100 leading-none">{playlists.length}</span>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <Button
            size="sm"
            className="bg-zinc-100 text-zinc-900 font-semibold hover:bg-white h-9"
            onClick={() => {}}
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-[#0c0c0c] border-zinc-800 text-zinc-100 max-w-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold uppercase italic tracking-tight">Плейлист</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Metadata Config</p>
              </div>
              <div className="h-10 w-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-700 flex-shrink-0">
                <Settings className="h-4 w-4" />
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div className="flex gap-6 items-start">
              <div className="relative group flex-shrink-0">
                <img
                  alt="Cover"
                  className="w-28 h-28 rounded-2xl object-cover border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-500"
                  src={editingPlaylist?.cover || "/covers/no-cover.jpg"}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/covers/no-cover.jpg"; }}
                />
                <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <Pencil className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Название</Label>
                  <Input
                    className="mt-1.5 bg-zinc-900/50 border-zinc-800 focus-visible:border-zinc-600 text-zinc-100"
                    value={editingPlaylist?.title || ""}
                    onChange={(e) => setEditingPlaylist(prev => ({ ...prev!, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Обложка (URL)</Label>
                  <Input
                    className="mt-1.5 bg-zinc-900/50 border-zinc-800 focus-visible:border-zinc-600 text-zinc-100 font-mono text-xs"
                    value={editingPlaylist?.cover || ""}
                    onChange={(e) => setEditingPlaylist(prev => ({ ...prev!, cover: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Тип коллекции</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setEditingPlaylist(prev => ({ ...prev!, category: c }))}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all duration-200",
                      editingPlaylist?.category === c
                        ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                        : "bg-zinc-900 text-zinc-600 border-zinc-800 hover:border-zinc-600 hover:text-zinc-400"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="flex items-center justify-between p-4 bg-zinc-900/40 rounded-xl border border-zinc-800 cursor-pointer hover:bg-zinc-900/60 transition-colors"
              onClick={() => setEditingPlaylist(prev => ({ ...prev!, isPublic: !prev?.isPublic }))}
            >
              <div className="space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Приватность</p>
                <p className="text-sm font-medium text-zinc-300">Публичный доступ</p>
              </div>
              {/* Native toggle */}
              <div className={cn(
                "w-10 h-5 rounded-full border transition-all relative",
                editingPlaylist?.isPublic
                  ? "bg-zinc-100 border-zinc-100"
                  : "bg-zinc-800 border-zinc-700"
              )}>
                <div className={cn(
                  "absolute top-0.5 h-4 w-4 rounded-full transition-all",
                  editingPlaylist?.isPublic
                    ? "left-5 bg-zinc-900"
                    : "left-0.5 bg-zinc-500"
                )} />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900" onClick={() => setIsEditOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-zinc-100 text-zinc-900 font-semibold hover:bg-white" onClick={onSave}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
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

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
  Music,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { ColorStudioSheet } from "@/components/color-studio/ColorStudioSheet";
import { MultiStepUploadSheet } from "@/components/admin/MultiStepUploadSheet";
import { Upload } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { type ColorBindings } from "@/lib/colorChannels";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
  type: string;
  createdAt: string;
  colors?: { dominant?: string; accent?: string; bindings?: ColorBindings };
}

export default function AdminTracksPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTrack, setEditingTrack] = useState<Partial<Track> | null>(null);
  const [deletingTrack, setDeletingTrack] = useState<Track | null>(null);
  const [deleteFiles, setDeleteFiles] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const coverInputRef = React.useRef<HTMLInputElement>(null);

  const fetchTracks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tracks?limit=1000");
      const data = await res.json();
      setTracks(data.tracks);
    } catch (err) {
      console.error("Failed to fetch tracks", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  const handleEdit = (track: Track) => {
    setEditingTrack(track);
    setIsEditOpen(true);
  };

  const onSave = async () => {
    if (!editingTrack) return;
    try {
      const res = await fetch("/api/admin/tracks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTrack),
      });
      if (res.ok) {
        fetchTracks();
        setIsEditOpen(false);
      }
    } catch (err) {
      console.error("Save error", err);
    }
  };

  const onDelete = async () => {
    if (!deletingTrack) return;
    try {
      const res = await fetch("/api/admin/tracks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deletingTrack.id, deleteFile: deleteFiles }),
      });
      if (res.ok) {
        fetchTracks();
        setIsDeleteOpen(false);
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const onCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingTrack?.id) return;

    setIsCoverUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("trackId", editingTrack.id.toString());

      const res = await fetch("/api/admin/tracks/cover", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setEditingTrack(prev => ({ 
        ...prev!, 
        cover: data.cover, 
        colors: data.colors 
      }));
      // Также обновим в основном списке, чтобы изменения были видны сразу
      setTracks(prev => prev.map(t => t.id === editingTrack.id ? { ...t, cover: data.cover, colors: data.colors } : t));
    } catch (err) {
      console.error("Cover upload error:", err);
    } finally {
      setIsCoverUploading(false);
    }
  };

  const columns = useMemo<ColumnDef<Track>[]>(() => [
    {
      accessorKey: "title",
      header: "Трек",
      cell: ({ row }) => {
        const track = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="relative group flex-shrink-0">
              <img
                alt={track.title}
                className="w-10 h-10 rounded-lg object-cover border border-zinc-800 transition-transform group-hover:scale-105 duration-300"
                src={track.cover}
                onError={(e) => { (e.target as HTMLImageElement).src = "/covers/no-cover.jpg"; }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <ExternalLink className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold truncate max-w-[200px] text-zinc-100 text-sm">{track.title}</span>
              <span className="text-[11px] text-zinc-500 truncate">{track.artist}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Формат",
      cell: ({ row }) => (
        <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 px-2 py-0.5 border border-zinc-800 rounded-md bg-zinc-900/50">
          {row.original.type || "Audio"}
        </span>
      ),
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
              setDeletingTrack(row.original);
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
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-zinc-100 uppercase italic">Музыкальная База</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] opacity-70">Централизованное управление медиа-контентом</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-2xl font-black text-zinc-100 leading-none">{tracks.length}</span>
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">активных треков</span>
          </div>
          <div className="h-10 w-px bg-zinc-800 mx-2 hidden sm:block" />
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-black px-6 rounded-full uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-primary/10"
            onClick={() => setIsUploadOpen(true)}
          >
            <Upload className="h-4 w-4" />
            Загрузить медиа
          </Button>
          <MultiStepUploadSheet 
            open={isUploadOpen} 
            onOpenChange={setIsUploadOpen} 
            onComplete={fetchTracks} 
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 className="h-10 w-10 text-zinc-700" />
          </motion.div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={tracks}
          searchKey="title"
          searchPlaceholder="Поиск по названию или исполнителю..."
        />
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-[#0c0c0c] border-zinc-800 text-zinc-100 max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold uppercase tracking-tight">
              Редактор трека
            </DialogTitle>
            <DialogDescription className="text-zinc-500 text-xs font-mono">
              ID: {editingTrack?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="flex gap-5 items-start">
              <div 
                className="relative group flex-shrink-0 cursor-pointer"
                onClick={() => coverInputRef.current?.click()}
              >
                <img
                  alt="Cover"
                  className="w-20 h-20 rounded-xl object-cover border border-zinc-800"
                  src={editingTrack?.cover}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/covers/no-cover.jpg"; }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                  {isCoverUploading ? (
                    <Loader2 className="h-4 w-4 text-zinc-100 animate-spin" />
                  ) : (
                    <Pencil className="h-4 w-4 text-zinc-100" />
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Название</Label>
                  <Input
                    className="mt-1.5 bg-zinc-900/50 border-zinc-800 focus-visible:border-zinc-600 text-zinc-100"
                    value={editingTrack?.title || ""}
                    onChange={(e) => setEditingTrack(prev => ({ ...prev!, title: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Исполнитель</Label>
              <Input
                className="mt-1.5 bg-zinc-900/50 border-zinc-800 focus-visible:border-zinc-600 text-zinc-100"
                value={editingTrack?.artist || ""}
                onChange={(e) => setEditingTrack(prev => ({ ...prev!, artist: e.target.value }))}
              />
            </div>

            <div>
              <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Обложка (URL)</Label>
              <Input
                className="mt-1.5 bg-zinc-900/50 border-zinc-800 focus-visible:border-zinc-600 text-zinc-100 font-mono text-xs"
                value={editingTrack?.cover || ""}
                onChange={(e) => setEditingTrack(prev => ({ ...prev!, cover: e.target.value }))}
              />
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  Доминирующий цвет
                  {editingTrack?.colors?.dominant && (
                    <span className="w-3 h-3 rounded-full border border-zinc-800 inline-block" style={{ backgroundColor: editingTrack.colors.dominant }} />
                  )}
                </Label>
                <Input
                  className="mt-1.5 bg-zinc-900/50 border-zinc-800 focus-visible:border-zinc-600 text-zinc-100 font-mono text-xs"
                  placeholder="#0c0312"
                  value={editingTrack?.colors?.dominant || ""}
                  onChange={(e) => setEditingTrack(prev => ({ ...prev!, colors: { ...prev?.colors, dominant: e.target.value } }))}
                />
              </div>
              <div className="flex-1">
                <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  Акцентный цвет
                  {editingTrack?.colors?.accent && (
                    <span className="w-3 h-3 rounded-full border border-zinc-800 inline-block" style={{ backgroundColor: editingTrack.colors.accent }} />
                  )}
                </Label>
                <Input
                  className="mt-1.5 bg-zinc-900/50 border-zinc-800 focus-visible:border-zinc-600 text-zinc-100 font-mono text-xs"
                  placeholder="#f5f5f5"
                  value={editingTrack?.colors?.accent || ""}
                  onChange={(e) => setEditingTrack(prev => ({ ...prev!, colors: { ...prev?.colors, accent: e.target.value } }))}
                />
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-3">
              <p className="mb-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Color Studio</p>
              <ColorStudioSheet
                entityType="track"
                entityId={editingTrack?.id?.toString()}
                coverUrl={editingTrack?.cover}
                initialColors={editingTrack?.colors}
                onSaved={(colors) => setEditingTrack((prev) => ({ ...prev!, colors }))}
                triggerLabel="Открыть Color Studio"
              />
            </div>

            <div className="p-3 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
              <p className="text-[9px] text-zinc-600 mb-1 uppercase font-bold tracking-widest">Путь к файлу</p>
              <p className="text-xs font-mono text-zinc-400 truncate">{editingTrack?.src}</p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900" onClick={() => setIsEditOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-zinc-100 text-zinc-900 font-semibold hover:bg-white" onClick={onSave}>
              Применить
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
        <DialogContent className="bg-[#0c0c0c] border-red-900/30 text-zinc-100 max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="h-5 w-5" />
              Удаление трека
            </DialogTitle>
            <DialogDescription className="text-zinc-400 leading-relaxed">
              Вы собираетесь удалить <span className="text-white font-semibold">«{deletingTrack?.title}»</span>.
              Это действие невозможно отменить.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 rounded-xl bg-red-950/10 border border-red-900/20">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={deleteFiles}
                onChange={(e) => setDeleteFiles(e.target.checked)}
                className="w-4 h-4 accent-red-500"
              />
              <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-300 transition-colors">
                Удалить физический файл с диска
              </span>
            </label>
            {deleteFiles && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 text-[10px] text-red-500/80 font-medium leading-relaxed italic pl-7"
              >
                Файл по пути {deletingTrack?.src} будет безвозвратно удалён с сервера.
              </motion.p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900" onClick={() => setIsDeleteOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-red-600 text-white font-semibold hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]" onClick={onDelete}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

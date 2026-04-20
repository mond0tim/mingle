"use client";

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/animate-ui/components/radix/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X, FileMusic, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface UploadFile {
  file: File;
  id: string;
  status: "idle" | "uploading" | "success" | "error";
  progress: number;
  error?: string;
  result?: any;
}

export function BatchUploadDialog({ onComplete }: { onComplete: () => void }) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        file: f,
        id: Math.random().toString(36).slice(2),
        status: "idle" as const,
        progress: 0,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const startUpload = async () => {
    setIsUploading(true);
    
    for (const f of files) {
      if (f.status === "success") continue;

      setFiles((prev) =>
        prev.map((item) => (item.id === f.id ? { ...item, status: "uploading" } : item))
      );

      try {
        const formData = new FormData();
        formData.append("file", f.file);

        const res = await fetch("/api/admin/tracks/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        setFiles((prev) =>
          prev.map((item) =>
            item.id === f.id ? { ...item, status: "success", progress: 100, result: data.track } : item
          )
        );
      } catch (err: any) {
        setFiles((prev) =>
          prev.map((item) =>
            item.id === f.id ? { ...item, status: "error", error: err.message } : item
          )
        );
      }
    }

    setIsUploading(false);
    onComplete();
  };

  const clear = () => {
    setFiles([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => {
      if (!isUploading) {
        setIsOpen(val);
        if (!val) clear();
      }
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold gap-2">
          <Upload className="h-4 w-4" />
          Загрузить файлы
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-zinc-950 border-zinc-800 text-zinc-100 rounded-3xl overflow-hidden shadow-2xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic">
            Пакетная загрузка
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Выберите до 100 треков для одновременной загрузки и обработки метаданных.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Dropzone area (simplified) */}
          <div className="relative group">
            <input
              type="file"
              multiple
              accept="audio/*"
              onChange={onFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              disabled={isUploading}
            />
            <div className="h-32 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
              <Upload className="h-8 w-8 text-zinc-600 group-hover:text-primary group-hover:scale-110 transition-all" />
              <p className="text-sm font-bold text-zinc-500 group-hover:text-zinc-300">
                Кликните или перетащите аудиофайлы
              </p>
            </div>
          </div>

          {/* File list */}
          <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar space-y-2">
            <AnimatePresence>
              {files.map((f) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 flex items-center gap-3 group relative"
                >
                  <div className="h-10 w-10 flex-shrink-0 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <FileMusic className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate pr-8">{f.file.name}</p>
                    <div className="mt-1.5 h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        className={cn(
                          "h-full rounded-full",
                          f.status === "error" ? "bg-red-500" : "bg-primary"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${f.progress || (f.status === "success" ? 100 : 0)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {f.status === "uploading" && <Loader2 className="h-5 w-5 text-primary animate-spin" />}
                    {f.status === "success" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {f.status === "error" && (
                      <div className="group/err relative">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <div className="absolute bottom-full right-0 mb-2 w-48 bg-red-950 text-red-200 text-[10px] p-2 rounded-lg opacity-0 group-hover/err:opacity-100 transition-opacity border border-red-900 shadow-xl pointer-events-none">
                          {f.error}
                        </div>
                      </div>
                    )}
                    {f.status === "idle" && (
                      <button
                        onClick={() => removeFile(f.id)}
                        className="p-1 hover:bg-zinc-800 rounded-md transition-colors"
                      >
                        <X className="h-4 w-4 text-zinc-500" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {files.length > 0 && (
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                Выбрано: <span className="text-zinc-100">{files.length}</span>
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={clear}
                  disabled={isUploading}
                  className="text-zinc-500 hover:text-zinc-100"
                >
                  Очистить
                </Button>
                <Button
                  onClick={startUpload}
                  disabled={isUploading || files.every(f => f.status === "success")}
                  className="bg-zinc-100 text-zinc-900 font-black hover:bg-white px-8"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    "Начать загрузку"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/animate-ui/components/radix/sheet";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/animate-ui/components/animate/tabs";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  FileMusic, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Image as ImageIcon,
  Palette,
  ChevronRight,
  Plus,
  Save,
  Check,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ColorStudio } from "@/components/color-studio/ColorStudio";

interface UploadFile {
  file: File;
  id: string;
  status: "idle" | "uploading" | "success" | "error";
  progress: number;
  error?: string;
  metadata?: {
    title: string;
    artist: string;
    cover?: string;
    colors?: any;
    id?: number;
  };
}

type Step = "upload" | "metadata" | "colors" | "complete";

export function MultiStepUploadSheet({ 
  open, 
  onOpenChange, 
  onComplete 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [isProcessing, setIsProcessing] = useState(false);
  const coverInputRef = React.useRef<HTMLInputElement>(null);
  const [activeCoverFileId, setActiveCoverFileId] = useState<string | null>(null);
  const [selectedColorFileId, setSelectedColorFileId] = useState<string | null>(null);

  const steps: { value: Step; label: string; icon: any }[] = [
    { value: "upload", label: "Загрузка", icon: Upload },
    { value: "metadata", label: "Метаданные", icon: FileMusic },
    { value: "colors", label: "Цвета", icon: Palette },
    { value: "complete", label: "Завершение", icon: CheckCircle2 },
  ];

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

  const startUpload = async () => {
    setIsProcessing(true);
    
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
            item.id === f.id ? { 
              ...item, 
              status: "success", 
              progress: 100, 
              metadata: data.track 
            } : item
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

    setIsProcessing(false);
    if (files.some(f => f.status === "success")) {
      setCurrentStep("metadata");
    }
  };

  const updateMetadata = (id: string, updates: Partial<NonNullable<UploadFile["metadata"]>>) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, metadata: { ...f.metadata!, ...updates } } : f
    ));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeCoverFileId) return;

    const targetFile = files.find(f => f.id === activeCoverFileId);
    if (!targetFile || !targetFile.metadata?.id) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("trackId", targetFile.metadata.id.toString());

      const res = await fetch("/api/admin/tracks/cover", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      updateMetadata(activeCoverFileId, { 
        cover: data.cover,
        colors: data.colors
      });
    } catch (err: any) {
      console.error("Cover upload error:", err);
    } finally {
      setIsProcessing(false);
      setActiveCoverFileId(null);
    }
  };

  const saveAll = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsProcessing(false);
    setCurrentStep("complete");
    onComplete();
  };

  // Set first successful file as selected when entering colors stage
  useEffect(() => {
    if (currentStep === "colors" && !selectedColorFileId) {
      const first = files.find(f => f.status === "success");
      if (first) setSelectedColorFileId(first.id);
    }
  }, [currentStep, files, selectedColorFileId]);

  const selectedFile = files.find(f => f.id === selectedColorFileId);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[90vw] md:w-[85vw] lg:w-[1000px] xl:w-[1240px] border-l border-zinc-800 bg-zinc-950 p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-8 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-3xl font-black uppercase tracking-tighter italic text-white">Пакетная установка</SheetTitle>
                <SheetDescription className="text-zinc-500 mt-1">Многоэтапный процесс загрузки и обработки медиафайлов.</SheetDescription>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Admin Pipeline v2</span>
              </div>
            </div>

            <div className="mt-8">
              <Tabs value={currentStep} onValueChange={(v) => setCurrentStep(v as Step)} className="w-full">
                <TabsList className="bg-zinc-900/50 border-zinc-800 p-1 w-full flex justify-between h-auto">
                  {steps.map((s) => (
                    <TabsTrigger 
                      key={s.value} 
                      value={s.value} 
                      disabled={
                        (s.value === "metadata" && !files.some(f => f.status === "success")) ||
                        (s.value === "colors" && !files.some(f => f.status === "success")) ||
                        (s.value === "complete" && currentStep !== "complete")
                      }
                      className="flex-1 py-3 gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-primary transition-all"
                    >
                      <s.icon className="size-4" />
                      <span className="hidden sm:inline">{s.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {currentStep === "upload" && (
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 space-y-8 overflow-y-auto h-full"
                >
                  <div className="relative group">
                    <input
                      type="file"
                      multiple
                      accept="audio/*"
                      onChange={onFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={isProcessing}
                    />
                    <div className="h-64 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center gap-4 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500 bg-zinc-900/30">
                      <div className="p-6 rounded-full bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform duration-500">
                        <Upload className="size-12 text-zinc-600 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-zinc-300">Перетащите сюда аудиофайлы</p>
                        <p className="text-sm text-zinc-500">Поддерживаются .mp3, .wav, .flac (до 100 файлов)</p>
                      </div>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-3 pb-8">
                      <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Выбранные файлы ({files.length})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {files.map((f) => (
                          <div key={f.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 group">
                            <div className="size-12 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700/50">
                              <FileMusic className="size-6 text-zinc-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold truncate text-zinc-100">{f.file.name}</p>
                              <div className="mt-2 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div 
                                  className={cn("h-full", f.status === "error" ? "bg-red-500" : "bg-primary")}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${f.progress}%` }}
                                />
                              </div>
                            </div>
                            {f.status === "success" && <CheckCircle2 className="size-5 text-green-500" />}
                            {f.status === "error" && <AlertCircle className="size-5 text-red-500" />}
                            {f.status === "uploading" && <Loader2 className="size-5 text-primary animate-spin" />}
                            {f.status === "idle" && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="size-8 rounded-full hover:bg-zinc-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFiles(prev => prev.filter(item => item.id !== f.id));
                                }}
                              >
                                <Trash2 className="size-4 text-zinc-500" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {currentStep === "metadata" && (
                <motion.div 
                  key="metadata"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 space-y-6 overflow-y-auto h-full"
                >
                  <div className="grid grid-cols-1 gap-6 pb-24">
                    {files.filter(f => f.status === "success").map((f) => (
                      <div key={f.id} className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row gap-8 items-start">
                        <div 
                          className="relative group size-48 flex-shrink-0"
                          onClick={() => {
                            setActiveCoverFileId(f.id);
                            coverInputRef.current?.click();
                          }}
                        >
                          <img 
                            src={f.metadata?.cover || "/placeholder.png"} 
                            alt={f.metadata?.title} 
                            className="size-full object-cover rounded-2xl border border-zinc-800 shadow-2xl"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center cursor-pointer">
                            <div className="text-center">
                              {isProcessing && activeCoverFileId === f.id ? (
                                <Loader2 className="size-8 text-white mx-auto mb-2 animate-spin" />
                              ) : (
                                <ImageIcon className="size-8 text-white mx-auto mb-2" />
                              )}
                              <span className="text-xs font-bold text-white uppercase tracking-wider">
                                {isProcessing && activeCoverFileId === f.id ? "Загрузка..." : "Изменить"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 space-y-6 w-full">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Название трека</Label>
                              <Input 
                                value={f.metadata?.title} 
                                onChange={(e) => updateMetadata(f.id, { title: e.target.value })}
                                className="bg-zinc-900/50 border-zinc-800 rounded-xl focus:ring-primary h-12"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Исполнитель</Label>
                              <Input 
                                value={f.metadata?.artist} 
                                onChange={(e) => updateMetadata(f.id, { artist: e.target.value })}
                                className="bg-zinc-900/50 border-zinc-800 rounded-xl focus:ring-primary h-12"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="size-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                                    <ImageIcon className="size-4 text-zinc-400" />
                                  </div>
                                  <span className="text-sm font-medium">Обложка найдена</span>
                                </div>
                                <Check className="size-4 text-green-500" />
                             </div>
                             <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="size-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                                    <Palette className="size-4 text-zinc-400" />
                                  </div>
                                  <span className="text-sm font-medium">Цвета извлечены</span>
                                </div>
                                <Check className="size-4 text-green-500" />
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === "colors" && (
                <motion.div 
                  key="colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex overflow-hidden"
                >
                  <div className="w-80 border-r border-zinc-800 bg-zinc-900/10 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                     <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">Выбор трека</h3>
                     {files.filter(f => f.status === "success").map((f) => (
                       <button
                         key={f.id}
                         onClick={() => setSelectedColorFileId(f.id)}
                         className={cn(
                           "w-full p-3 rounded-2xl border transition-all flex items-center gap-3 text-left hover:scale-[1.02] active:scale-[0.98]",
                           selectedColorFileId === f.id 
                             ? "bg-zinc-800 border-zinc-700 shadow-xl" 
                             : "bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700"
                         )}
                       >
                          <img src={f.metadata?.cover || "/placeholder.png"} className="size-10 rounded-lg object-cover shadow-lg" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold truncate text-zinc-100">{f.metadata?.title}</p>
                            <p className="text-[9px] text-zinc-500 uppercase font-black tracking-tight">{f.metadata?.artist}</p>
                          </div>
                          {selectedColorFileId === f.id && <div className="size-1.5 rounded-full bg-primary animate-pulse" />}
                       </button>
                     ))}
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {selectedFile ? (
                      <div className="max-w-4xl mx-auto space-y-8 pb-12">
                         <div className="flex items-center gap-6 pb-8 border-b border-zinc-800/50">
                            <img src={selectedFile.metadata?.cover || "/placeholder.png"} className="size-32 rounded-3xl object-cover shadow-2xl border border-zinc-800" />
                            <div>
                               <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-0.5 bg-zinc-800 rounded-md text-[9px] font-black uppercase tracking-widest text-zinc-400">Track Config</span>
                               </div>
                               <h2 className="text-3xl font-black uppercase tracking-tighter italic text-zinc-100">{selectedFile.metadata?.title}</h2>
                               <p className="text-[11px] text-zinc-500 uppercase font-black tracking-widest mt-1 opacity-70">{selectedFile.metadata?.artist}</p>
                            </div>
                         </div>

                         <ColorStudio
                            colors={selectedFile.metadata?.colors || {}}
                            onChange={(newColors) => updateMetadata(selectedFile.id, { colors: newColors })}
                            coverUrl={selectedFile.metadata?.cover}
                            showReextract={false} 
                         />
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-4">
                         <Palette className="size-16 opacity-10" />
                         <p className="text-sm font-medium">Выберите трек слева для настройки цветов</p>
                      </div>
                    )}
                  </div>
                </motion.div>
               )}

              {currentStep === "complete" && (
                 <motion.div 
                  key="complete"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-6"
                >
                  <div className="size-24 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                    <CheckCircle2 className="size-12 text-green-500 animate-in zoom-in duration-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Готово!</h2>
                    <p className="text-zinc-500 mt-2">Все файлы успешно обработаны и добавлены в медиатеку.</p>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 w-full max-w-md">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Загружено треков:</span>
                        <span className="font-bold text-zinc-100">{files.filter(f => f.status === "success").length}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Добавлено в "Все треки":</span>
                        <span className="font-bold text-green-400">Да</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Обложки нормализованы:</span>
                        <span className="font-bold text-green-400">Да</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => onOpenChange(false)} className="w-full max-w-sm rounded-full py-6 font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 border-none transition-all">Закрыть</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {currentStep !== "complete" && (
            <div className="p-8 border-t border-border/50 bg-zinc-950 flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setFiles([])} 
                disabled={isProcessing}
                className="text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900"
              >
                Очистить список
              </Button>
              <div className="flex gap-4">
                {currentStep === "upload" && files.length > 0 && (
                  <Button 
                    onClick={startUpload} 
                    disabled={isProcessing || files.length === 0}
                    className="rounded-full px-8 py-6 font-black uppercase tracking-widest gap-2 bg-primary hover:bg-primary/90 text-white"
                  >
                    {isProcessing ? <Loader2 className="size-4 animate-spin" /> : <ChevronRight className="size-4" />}
                    {isProcessing ? "Загрузка..." : "Начать обработку"}
                  </Button>
                )}
                {currentStep === "metadata" && (
                   <Button 
                    onClick={() => setCurrentStep("colors")} 
                    className="rounded-full px-8 py-6 font-black uppercase tracking-widest gap-2 bg-primary hover:bg-primary/90 text-white"
                  >
                    Продолжить (Цвета) <ChevronRight className="size-4" />
                  </Button>
                )}
                {currentStep === "colors" && (
                   <Button 
                    onClick={saveAll} 
                    disabled={isProcessing}
                    className="rounded-full px-8 py-6 font-black uppercase tracking-widest gap-2 bg-zinc-100 text-zinc-900 hover:bg-white"
                  >
                    {isProcessing ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                    Сохранить все
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        
        <input 
          type="file" 
          ref={coverInputRef} 
          className="hidden" 
          accept="image/jpeg,image/png,image/webp" 
          onChange={handleCoverUpload}
        />
      </SheetContent>
    </Sheet>
  );
}

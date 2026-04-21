import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex w-full h-[60vh] items-center justify-center p-5">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium animate-pulse">Загрузка плейлистов...</p>
      </div>
    </div>
  );
}

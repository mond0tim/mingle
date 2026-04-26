import { Skeleton } from "@/components/ui/skeleton";
import styles from "@/features/playlists/ui/PlaylistPage.module.css";
import carouselStyles from "@/components/PlaylistsCarousel/PlaylistsCarousel.module.css";

export const PlaylistSkeleton = () => {
  return (
    <div className="p-5 pt-0 pr-4 animate-in fade-in duration-500">
      {/* Back button skeleton */}
      <Skeleton className="w-12 h-12 rounded-2xl mb-5 mt-5" />
      
      {/* Header Block Skeleton */}
      <div className={`${styles.playlist} bg-white/5 backdrop-blur-xl rounded-3xl mb-8 border border-white/10 p-8 flex flex-col md:flex-row items-center gap-8`}>
        <Skeleton className="w-[200px] h-[200px] rounded-3xl shrink-0" />
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-10 w-3/4 rounded-lg" />
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <div className="flex items-center gap-4 mt-2">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Track List Block Skeleton */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
        <div className="flex flex-col gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-2">
              <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-5 w-1/3 rounded-md" />
                <Skeleton className="h-4 w-1/4 rounded-md opacity-50" />
              </div>
              <Skeleton className="w-8 h-8 rounded-full ml-auto shrink-0" />
              <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AllPlaylistsSkeleton = () => {
  return (
    <div className="m-2 mb-6 p-4 md:p-6 bg-black/40 rounded-3xl backdrop-blur-xl border border-white/5 animate-in fade-in duration-500">
      <Skeleton className="h-10 w-64 mb-8 rounded-xl" />
      
      {[...Array(3)].map((_, i) => (
        <div key={i} className="mb-12">
          <Skeleton className="h-8 w-48 mb-6 rounded-lg" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(5)].map((_, j) => (
              <div key={j} className="flex flex-col gap-3 min-w-[200px]">
                <Skeleton className="w-[200px] h-[200px] rounded-2xl" />
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md opacity-50" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

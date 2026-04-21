'use client';
import { usePlayerStore as usePlayer } from '@/features/player/store/playerStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Playlist } from '@/types/index';
import styles from './PlaylistsCarousel.module.css';
import cn from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { ColorThiefOutput, getColorFromURL, getContrastingColor } from '@/lib/colorHelper';
import { PlayButton } from '@/features/player/ui/PlaybackButtons/PlaybackButtons';
import { LikePlaylistButton } from '../LikePlaylistButton/LikePlaylistButton';
import Image from 'next/image';
import { BProgress } from '@bprogress/core';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {



  const { playPlaylist, togglePlay, playlistIsPlaying } =
    usePlayer();
  const playing = usePlayer(state => state.playing);
  const isThisPlaying = playlistIsPlaying?.id === playlist.id && playing;
  const [colors, setColors] = useState<ColorThiefOutput | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchColors = async () => {
      // Если есть кастомные цвета в плейлисте - используем их
      if (playlist.colors) {
        const buttonColor = playlist.colors.button || '#C7D3FF';
        const contrastingColor = getContrastingColor(buttonColor);

        setColors({
          background: buttonColor,
          title: playlist.colors.title || '#C7D3FF',
          button: buttonColor,
          buttonColor: playlist.colors.icon || contrastingColor,
        });
      }
      // Если цветов нет - генерируем из обложки
      else if (playlist.cover) {
        const colorThiefResult = await getColorFromURL(playlist.cover);
        if (colorThiefResult) {
          const contrastingColor = getContrastingColor(
            colorThiefResult.background
          );
          colorThiefResult.buttonColor = contrastingColor;
          setColors(colorThiefResult);

          fetch(`/api/colors/extract`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: playlist.cover, id: playlist.id, type: 'playlist' }),
          })
          .then(res => res.json())
          .then(data => {
             if (data && data.colors) {
               setColors({
                 background: data.colors.background || colorThiefResult.background,
                 title: data.colors.title || colorThiefResult.title,
                 button: data.colors.button || colorThiefResult.button,
                 buttonColor: data.colors.icon || contrastingColor,
               });
             }
          })
          .catch((err) => console.error('Failed to trigger playlist color extraction', err));
        }
      }
    };
    fetchColors();
  }, [playlist.cover, playlist.colors]); // Добавляем цвета плейлиста в зависимости

  const handlePlayClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Если уже играет тот же плейлист — просто переключаем паузу/плей
    if (playlistIsPlaying?.id === playlist.id) {
      togglePlay();
      return;
    }

    // Для vibe-плейлистов: загрузить свежие данные перед запуском
    if (playlist.category === 'vibe' || String(playlist.id).startsWith('vibe_')) {
      try {
        const res = await fetch('/api/vibe');
        const freshVibes = await res.json();
        const freshPlaylist = freshVibes.find((p: any) => String(p.id) === String(playlist.id));
        if (freshPlaylist) {
          await playPlaylist(freshPlaylist, undefined, true);
          return;
        }
      } catch {}
    }

    // Запускаем плейлист с autoplay=true (первый трек)
    await playPlaylist(playlist, undefined, true);
  };


  return (
    <Link href={`/playlists/${playlist.id}`} style={{ cursor: 'pointer', display: 'block' }}>
      <div
        className={styles.card_blur}
        style={{
          '--card-button-background': playlist.colors?.button || colors?.button || '#000000',
          '--card-button-background-hover': `${playlist.colors?.button || colors?.button || '#000000'}AA`,
          '--card-title-color': playlist.colors?.title || colors?.title || '#000000',
          '--card-button-color': playlist.colors?.icon || colors?.buttonColor || '#FFFFFF',
        } as React.CSSProperties}
      >
        <Image
          src={playlist.cover || "/placeholder.png"}
          alt={playlist.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          style={{ objectFit: 'cover', zIndex: -1, borderRadius: 'inherit' }}
        />
        <div className={styles.card_text}>
          <h3 className={styles.blur_card_title}>
            <span>{playlist.title}</span>
            <div className={styles.marquee} aria-hidden='true'>
              <div className={styles.marquee__inner}>
                <span>{playlist.title}</span>
                <span>{playlist.title}</span>
                <span>{playlist.title}</span>
                <span>{playlist.title}</span>
              </div>
            </div>
          </h3>

          <PlayButton
            isPlaying={playlistIsPlaying?.id === playlist.id && isThisPlaying}
            onClick={handlePlayClick}
            variant="solo"
            className={cn(styles.button, styles.card_button)}
            style={{
              '--play-button-color': playlist.colors?.icon || colors?.buttonColor || '#FFFFFF',
              '--dominant-color': playlist.colors?.icon || colors?.buttonColor || '#FFFFFF', // To force standard color mixing if needed
              '--play-button-background': playlist.colors?.button || colors?.button || '#000000',
            } as React.CSSProperties}
          />
        </div>
      </div>
    </Link>
  );
};

interface PlaylistsCarouselProps {
  playlists: Playlist[];
}

export const PlaylistsCarousel: React.FC<PlaylistsCarouselProps> = ({
  playlists,
}) => {
  return (
    <div className='w-full relative md:px-14'>
      <Carousel className='w-full'>
        <CarouselContent className='pr-16 md:pr-0 pl-4 md:pl-0'>
          {playlists.map((playlist) => (
            <CarouselItem key={playlist.id} className='md:basis-1/2 lg:basis-1/4'>
              <div className='p-1'>
                <PlaylistCard playlist={playlist} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden md:inline-flex' />
        <CarouselNext className='hidden md:inline-flex' />
      </Carousel>

    </div>
  );
};
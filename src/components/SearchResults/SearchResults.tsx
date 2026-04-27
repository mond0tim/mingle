'use client';
import React from 'react';
import { Track, Playlist } from '@/types';
import styles from './SearchResults.module.css';
import { usePlayerStore as usePlayer } from '@/features/player/store/playerStore';
import { motion, AnimatePresence } from 'framer-motion';
import TrackItem from '@/components/TrackItem/TrackItem';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';

interface SearchResultsProps {
  results: (Track | Playlist)[];
  sortType: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, sortType }) => {
  const { playTrack, playing, currentTrack } = usePlayer();

  const isPlaylist = (item: Track | Playlist): item is Playlist => item.type === 'playlist';
  const isTrack = (item: Track | Playlist): item is Track => item.type === 'track';

  const tracks = results.filter(isTrack);
  const playlists = results.filter(isPlaylist);

  return (
    <div className="w-full relative z-10">
      {/* Tracks Section */}
      {(sortType === 'all' || sortType === 'tracks') && tracks.length > 0 && (
        <div className="mb-12">
          {sortType === 'all' && (
            <h3 className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-4 ml-4">
              Лучшие совпадения
            </h3>
          )}
          <div className={styles.tracksGrid}>
            {tracks.map((track) => (
              <TrackItem
                key={track.id}
                track={track}
                onTrackSelect={playTrack}
                isPlaying={currentTrack?.id === track.id && playing}
                containerClassName="hover:bg-white/5 rounded-2xl transition-all duration-300"
              />
            ))}
          </div>
        </div>
      )}

      {/* Playlists Section */}
      {(sortType === 'all' || sortType === 'playlists') && playlists.length > 0 && (
        <div className="w-full">
          {sortType === 'all' && (
            <h3 className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-6 ml-4">
              Коллекции
            </h3>
          )}
          <div className="w-full min-h-[300px]">
             <PlaylistsCarousel playlists={playlists} />
          </div>
        </div>
      )}

      {results.length === 0 && (
        <div className="py-20 text-center opacity-20 italic">
          Ничего не найдено
        </div>
      )}
    </div>
  );
};

export default SearchResults;
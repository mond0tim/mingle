'use client';

import { useState, useMemo, useDeferredValue } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import SearchResults from '@/components/SearchResults/SearchResults';
import SearchForm from '@/components/SearchForm/SearchForm';
import FloatingBar from '@/components/FloatingBar/FloatingBar';
import { Track, Playlist } from '@/types';
import styles from './SearchPage.module.css';
import cn from 'classnames';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type SortType = 'all' | 'tracks' | 'playlists';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [sortType, setSortType] = useState<SortType>('all');

  // Fetching data
  const { data: rawTracks = [], isLoading: tracksLoading } = useSWR<Track[]>('/api/songs', fetcher);
  const { data: rawPlaylists = [], isLoading: playlistsLoading } = useSWR<Playlist[]>('/api/playlists', fetcher);
  const { data: rawVibePlaylists = [] } = useSWR<Playlist[]>('/api/vibe', fetcher);

  // Ensure items have type property for filtering
  const tracks = useMemo(() => rawTracks.map(t => ({ ...t, type: 'track' })), [rawTracks]);
  const playlistsData = useMemo(() => rawPlaylists.map(p => ({ ...p, type: 'playlist' })), [rawPlaylists]);
  const vibePlaylists = useMemo(() => rawVibePlaylists.map(p => ({ ...p, type: 'playlist' })), [rawVibePlaylists]);

  const allPlaylists = useMemo(() => [...playlistsData, ...vibePlaylists], [playlistsData, vibePlaylists]);

  const filteredTracks = useMemo(() => {
    if (!deferredQuery.trim()) return tracks.slice(0, 10);
    const lowerQuery = deferredQuery.toLowerCase();
    return tracks.filter(t => 
      t.title.toLowerCase().includes(lowerQuery) || 
      t.artist.toLowerCase().includes(lowerQuery)
    );
  }, [deferredQuery, tracks]);

  const filteredPlaylists = useMemo(() => {
    if (!deferredQuery.trim()) return allPlaylists.slice(0, 12);
    const lowerQuery = deferredQuery.toLowerCase();
    return allPlaylists.filter(p => 
      p.title.toLowerCase().includes(lowerQuery)
    );
  }, [deferredQuery, allPlaylists]);

  const buttons = [
    { id: "all", label: "Все" },
    { id: "tracks", label: "Треки" },
    { id: "playlists", label: "Плейлисты" },
  ];

  return (
    <div className={cn("min-h-screen md:ps-64 md:pe-8", styles.searchContainer)}>
      <header className={styles.searchHeader}>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col items-center gap-6"
        >
          <SearchForm 
            initialValue={query}
            onQueryChange={setQuery}
            placeholder="Поиск..."
          />

          <FloatingBar 
            activeButton={sortType} 
            setActiveButton={(id) => setSortType(id as SortType)} 
            buttons={buttons}
          />
        </motion.div>
      </header>

      <main className={cn(styles.resultsSection, "mt-8")}>
        <div className="noise-overlay" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={sortType + deferredQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {!deferredQuery.trim() ? 'Коллекции' : 'Результаты'}
              </h2>
              <div className={styles.sectionSubtitle}>
                {sortType === 'all' 
                  ? `${filteredTracks.length + filteredPlaylists.length} элементов найдено`
                  : sortType === 'tracks' ? `${filteredTracks.length} треков найдено` : `${filteredPlaylists.length} элементов найдено`
                }
              </div>
            </div>
            
            {(tracksLoading || playlistsLoading) && !filteredTracks.length && !filteredPlaylists.length ? (
              <div className="flex justify-center py-20">
                <div className="h-10 w-10 border-4 border-white/10 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              <SearchResults 
                results={sortType === 'all' ? [...filteredTracks, ...filteredPlaylists] : sortType === 'tracks' ? filteredTracks : filteredPlaylists} 
                sortType={sortType} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
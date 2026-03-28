'use client';
import { useState, useRef, useEffect } from 'react';
import SearchResults from '@/components/SearchResults/SearchResults';
import { Track, Playlist } from '@/types';
import styles from './SearchPage.module.css';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import SearchForm from '@/components/SearchForm/SearchForm';

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

const filterTracks = (tracks: Track[], query: string): Track[] => {
  const lowerCaseQuery = query.toLowerCase();
  return tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(lowerCaseQuery) ||
      track.artist.toLowerCase().includes(lowerCaseQuery),
  );
};

const filterPlaylists = (playlists: Playlist[], query: string): Playlist[] => {
  const lowerCaseQuery = query.toLowerCase();
  return playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(lowerCaseQuery),
  );
};

type SortType = 'all' | 'tracks' | 'playlists';

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const query = searchParams.q || '';
  const [sortType, setSortType] = useState<SortType>('all');
  const [filteredResults, setFilteredResults] = useState<(Track | Playlist)[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });
  

  useEffect(() => {
    const container = containerRef.current;

    if (sortType && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;

        const clipLeft = offsetLeft;
        const clipRight = offsetLeft + offsetWidth;
        container.style.clipPath = `inset(0 ${Number(
          (100 - (clipRight / container.offsetWidth) * 100).toFixed(),
        )}% 0 ${Number(((clipLeft / container.offsetWidth) * 100).toFixed())}% round 17px)`;
      }
    }
  }, [sortType, activeTabElementRef, containerRef]);

  // Загрузка данных с API
  useEffect(() => {
    // Получаем треки
    fetch('/api/songs')
      .then(res => res.json())
      .then(data => setTracks(data))
      .catch(() => setTracks([]));

    // Получаем плейлисты из двух источников и объединяем
    Promise.all([
      fetch('/api/playlists').then(res => res.json()).catch(() => []),
      fetch('/api/vibe').then(res => res.json()).catch(() => []),
    ]).then(([playlists1, playlists2]) => {
      setPlaylists([...playlists1, ...playlists2]);
    });
  }, []);

  useEffect(() => {
    // Используем загруженные данные
    const filteredTracks = filterTracks(tracks, query);
    const filteredPlaylists = filterPlaylists(playlists, query);

    let results: (Track | Playlist)[] = [];
    if (sortType === 'all') {
      results = [...filteredTracks, ...filteredPlaylists];
    } else if (sortType === 'tracks') {
      results = filteredTracks;
    } else if (sortType === 'playlists') {
      results = filteredPlaylists;
    }

    setFilteredResults(results);
  }, [query, sortType, tracks, playlists]);

  const TABS = [
    {
      name: 'all',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-library-big-icon lucide-library-big"><rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/></svg>
      ),
    },
    {
      name: 'tracks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-disc3-icon lucide-disc-3"><circle cx="12" cy="12" r="10"/><path d="M6 12c0-1.7.7-3.2 1.8-4.2"/><circle cx="12" cy="12" r="2"/><path d="M18 12c0 1.7-.7 3.2-1.8 4.2"/></svg>
      ),
    },
    {
      name: 'playlists',
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-list-music-icon lucide-list-music"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/></svg>
      ),
    },
  ];

  return (
    <div className='md:ps-52 md:pr-4'>
      
        <div className='block sm:hidden mb-6 mx-auto'>
          <SearchForm/>
        </div>
      
      {!isMobile && query && (
        <h1 className='text-center p-2 font-bold'>Search Results for: {query}</h1>
      )}
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {TABS.map((tab) => (
              <li key={tab.name}>
                <button
                  ref={sortType === tab.name ? activeTabElementRef : null}
                  data-tab={tab.name}
                  onClick={() => {
                    setSortType(tab.name as SortType);
                  }}
                  className={styles.button}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>

          <div
            aria-hidden
            className={styles.clip_path_container}
            ref={containerRef}
          >
            <ul className={cn(styles.list, styles.list_overlay)}>
              {TABS.map((tab) => (
                <li key={tab.name}>
                  <button
                    data-tab={tab.name}
                    onClick={() => {
                      setSortType(tab.name as SortType);
                    }}
                    className={cn(styles.button_overlay, styles.button)}
                    tabIndex={-1}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      

      <SearchResults key={`${query}-${sortType}`} results={filteredResults} />
    </div>
  );
};

export default SearchPage;
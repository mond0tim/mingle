/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars 
/* eslint-disable */
import React, { useContext } from 'react';
import { Playlist } from '@/types';
import TrackList from '../TrackList/TrackList';
import Link from 'next/link';
import { LikePlaylistButton } from '../LikePlaylistButton/LikePlaylistButton';
import styles from '../Player/Player.module.css';

interface PlaylistProps {
  playlist: Playlist;
  onTrackSelect: (track: any) => void;
  currentTrack: any
}

const PlaylistComponent: React.FC<PlaylistProps> = ({ playlist, onTrackSelect, currentTrack }) => {
  return (
    <div>
      <Link href={`/playlist/${playlist.id}`}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">{playlist.title}</h2>
          <LikePlaylistButton playlistId={playlist.id} size={24} />
        </div>
      </Link>
      <img src={playlist.cover || '/placeholder.png'} alt={playlist.title} width={200} height={200} className="rounded-xl my-4" />
      <TrackList tracks={playlist.tracks} onTrackSelect={onTrackSelect} currentTrack={currentTrack} />
      <button
        className={styles.playerButton}
        onClick={() => onTrackSelect(playlist.tracks[0])}
      >
        <span className="material-symbols-outlined">play_circle</span>
      </button>
    </div>
  );
};

export default PlaylistComponent;
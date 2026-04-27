import React from 'react';
import styles from './PlayerSkeleton.module.css';

const PlayerSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.trackInfo}>
        <div className={`${styles.art} ${styles.shimmer}`} />
        <div className={styles.texts}>
          <div className={`${styles.title} ${styles.shimmer}`} />
          <div className={`${styles.artist} ${styles.shimmer}`} />
        </div>
      </div>
      
      <div className={styles.controls}>
        <div className={`${styles.btn} ${styles.shimmer}`} />
        <div className={`${styles.playBtn} ${styles.shimmer}`} />
        <div className={`${styles.btn} ${styles.shimmer}`} />
      </div>

      <div className={styles.controls} style={{ marginLeft: '16px', opacity: 0.5 }}>
        <div className={`${styles.btn} ${styles.shimmer}`} />
      </div>
    </div>
  );
};

export default PlayerSkeleton;

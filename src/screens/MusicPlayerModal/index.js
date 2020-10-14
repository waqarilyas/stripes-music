import React from 'react';
import Player from '../../components/Player';
import styles from './styles';

const MusicPlayerModal = () => {
  return <Player style={styles.player} screen="miniplayer" />;
};

export default MusicPlayerModal;

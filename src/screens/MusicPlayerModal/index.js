import React from 'react';
import Player from '../../components/Player';
import styles from './styles';

const MusicPlayerModal = ({ screen }) => {
  return <Player style={styles.player} screen={screen} />;
};

export default MusicPlayerModal;

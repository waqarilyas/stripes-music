import React from 'react';
import { Image } from 'react-native-elements';

import styles from './style';

const PopularVideos = ({ poster }) => {
  return (
    <Image source={poster ? { uri: poster } : null} style={styles.container} />
  );
};

export default PopularVideos;

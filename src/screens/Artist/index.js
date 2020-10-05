import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import ArtistsTabs from '../../navigation/Tabs/ArtistsTabs';
import Block from '../../components/Block';
import styles from './styles';

const Artist = () => {
  return (
    <Block>
      <View style={styles.container}>
        <Avatar
          size={RFValue(120)}
          rounded
          source={require('../../../Assets/Images/songCover5.jpg')}
        />
        <View style={styles.containerRight}>
          <Text style={styles.title}>Bithika Abhedanando</Text>
          <Text style={styles.subtitle}>999,999 Listeners</Text>
        </View>

        <Text style={styles.followButtontext}>Follow</Text>
      </View>
      <ArtistsTabs />
    </Block>
  );
};

export default Artist;

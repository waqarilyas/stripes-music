import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Accessory, Slider } from 'react-native-elements';

import {
  greyPrev,
  whitePrev,
  greyNext,
  whiteNext,
  whitePlayIcon,
} from '../../../Assets/Icons';
import styles from './styles';

const MusicPlayerModal = ({ children, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  console.log('Navigation: ', navigation);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MusicPlayerFullscreen')}>
          <Avatar
            rounded
            size="large"
            activeOpacity={0.7}
            source={require('../../../Assets/Images/songCover3.jpg')}></Avatar>
        </TouchableOpacity>
      </View>

      <View style={styles.cardBottom}>
        <View
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'center',
          }}>
          <Slider
            value={100}
            // trackStyle={{ height: 10, backgroundColor: 'transparent' }}
            trackStyle={{ height: 10, backgroundColor: '#FB168C' }}
            thumbStyle={{
              height: 10,
              width: 10,
              backgroundColor: 'red',
            }}
            // maximumValue={200}
            // minimumValue={0}
            // step={100}
          />
        </View>
        <View style={styles.cardRight}>
          <View style={styles.cardTextView}>
            <Text style={styles.title}>A Fantasy Trip</Text>
            <Text style={styles.subTitle}>Kandi Landi</Text>
          </View>
          <View style={styles.iconsView}>
            <Image source={greyPrev} style={styles.icon} />
            <Image source={whitePlayIcon} style={styles.icon} />
            <Image source={whiteNext} style={styles.icon} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MusicPlayerModal;

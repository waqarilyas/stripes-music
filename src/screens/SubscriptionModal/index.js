import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import { tick2 } from '../../../Assets/Icons';

const SubscriptionModal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Subscription</Text>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#1AD275', '#15BD8C', '#10A4A8']}
        style={styles.standardContainer}>
        <TouchableOpacity>
          <View>
            <Text style={styles.title}>Standard - $6.99</Text>
            <View style={styles.item}>
              <Image source={tick2} style={styles.tick} />
              <Text style={styles.text}>Create Playlists</Text>
            </View>
            <View style={styles.item}>
              <Image source={tick2} style={styles.tick} />
              <Text style={styles.text}>Listen full songs</Text>
            </View>
            <View style={styles.item}>
              <Image source={tick2} style={styles.tick} />
              <Text style={styles.text}>Chat with artists</Text>
            </View>
            <View style={styles.item}>
              <Image source={tick2} style={styles.tick} />
              <Text style={styles.text}>
                Create a queue for your favourite songs
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <TouchableOpacity style={styles.freeContainer}>
        <Text style={styles.title}>Free - $0.00</Text>
        <View style={styles.item}>
          <Image source={tick2} style={styles.tick} />
          <Text style={styles.text}>Create Playlists</Text>
        </View>
        <View style={styles.item}>
          <Image source={tick2} style={styles.tick} />
          <Text style={styles.text}>Listen to any song for 30 seconds</Text>
        </View>
        <View style={styles.item}>
          <Image source={tick2} style={styles.tick} />
          <Text style={styles.text}>
            Create a queue for your favourite songs
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionModal;

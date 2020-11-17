import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { tick2 } from '../../../Assets/Icons';
import { displaySubscriptionScreen } from '../../Redux/Reducers/helperSlice';
import styles from './styles';

const SubscriptionModalComponent = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      {/* <View> */}
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
      <TouchableOpacity
        style={styles.freeContainer}
        onPress={() => dispatch(displaySubscriptionScreen(false))}>
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
      {/* </View> */}
    </SafeAreaView>
  );
};

export default SubscriptionModalComponent;

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

import { noInternetIcon } from '../../../Assets/Icons';
import styles from './styles';

const NoInternet = ({ navigation }) => {
  const [loader, setLoader] = useState(false);

  const isConnected = async () => {
    setLoader(true);
    const response = await NetInfo.fetch();
    response.isConnected ? navigation.goBack() : setLoader(false);
  };

  console.log(loader);
  return (
    <View style={styles.container}>
      <Image source={noInternetIcon} style={styles.noInternetIcon} />
      <Text style={styles.title}>There's no network connection</Text>
      <Text style={styles.text}>
        Make sure you're connected to a Wi-Fi or mobile network and try again.
      </Text>
      <TouchableOpacity
        onPress={() => isConnected()}
        style={styles.retryButton}>
        {loader ? (
          <ActivityIndicator color="green" />
        ) : (
          <Text style={styles.retryButtonText}>Retry</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NoInternet;

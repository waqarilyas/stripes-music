import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView, Text, Platform,
  TouchableOpacity, View, ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { tick2 } from '../../../Assets/Icons';
import styles from './styles';
import RNIap from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../Redux/Reducers/firebaseSlice';
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/app'
const itemSubs = Platform.select({
  ios: ['1Month'],
  android: [],
});


const SubscriptionModal = ({ navigation, toggleModal }) => {
  let [state, setState] = useState({
    productIDs: [],
    loading: false
  })

  const dist = useDispatch();
  const getSubscriptionsHelper = async () => {

    await RNIap.clearProductsIOS();
    await RNIap.clearTransactionIOS();

    const subscriptions = await RNIap.getSubscriptions(itemSubs);
    console.log('--------GET SUBSCRIPTION--------', subscriptions)
    debugger
    setState(prev => ({ ...prev, productIDs: subscriptions }))
  }
  useEffect(() => {
    RNIap.initConnection();


    getSubscriptionsHelper();

  }, [])
  const subscribe = async () => {
    setState(prev => ({ ...prev, loading: true }))
    RNIap.requestSubscription(state.productIDs[0]?.productId, false)
      .then((res) => {
        console.log('---------SUBSCRIPTION RESPONSE----------', res);
        firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({ isPaidUser: true, ...res },
            { merge: true },
          ).then((firebaseRes) => {
            setState(prev => ({ ...prev, loading: false }))
            console.log('---------SUBSCRIPTION RESPONSE--------', firebaseRes)
            debugger
            dist(getUser())
          }).catch(e => setState(prev => ({ ...prev, loading: false })))
      })
      .catch((err) => {
        setState(prev => ({ ...prev, loading: false }))
        console.log('------SUBSCRIPTION ERROR----', err);
        debugger
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View> */}
      <Text style={styles.header}>Choose a Subscription</Text>
   
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#1AD275', '#15BD8C', '#10A4A8']}
        style={styles.standardContainer}>
        <TouchableOpacity onPress={() => {
          subscribe()
        }}>
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
        onPress={() => toggleModal()}>
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

      {state.loading &&
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center',zIndex:100, alignItems: 'center' }}>
          <ActivityIndicator color="white" size="large" />
        </View>
      }
    </SafeAreaView>
  );
};

export default SubscriptionModal;

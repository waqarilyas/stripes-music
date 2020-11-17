import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInputComponent,
  Text,
  Modal,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Overlay } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import SubscriptionModalComponent from '../SubscriptionModalComponent';
import { displaySubscriptionScreen } from '../../Redux/Reducers/helperSlice';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SubscriptionModalScreen = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const toggleModal = () => {
    setVisible(!visible);
  };

  useEffect(() => {}, []);

  return (
    <Overlay
      isVisible={true}
      overlayStyle={styles.Overlay}
      animationType="slide"
      backdropStyle={{ backgroundColor: 'transparent' }}>
      <SubscriptionModalComponent />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  customStyles: {},

  container: {
    backgroundColor: 'red',
    borderRadius: hp('3'),
  },
  Overlay: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: hp('3'),
    backgroundColor: 'rgba(255,255,255,0.1)',
    // flex: 1,
  },
});

export default SubscriptionModalScreen;

import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch } from 'react-redux';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestSubscription,
} from 'react-native-iap';

import SubscriptionModal from '../../screens/SubscriptionModal';
import { displaySubscriptionScreen } from '../../Redux/Reducers/helperSlice';
import { RFValue } from 'react-native-responsive-fontsize';

const SubscriptionModalScreen = () => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();

  useEffect(() => {
    refRBSheet.current.open();
  }, []);

  return (
    <View style={styles.container}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        keyboardAvoidingViewEnabled={true}
        onClose={() => dispatch(displaySubscriptionScreen(false))}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: 'gray',
            width: '30%',
          },
          container: {
            flex: 2,
            borderTopLeftRadius: RFValue('24'),
            borderTopRightRadius: RFValue('24'),
          },
        }}>
        <SubscriptionModal />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  customStyles: {},
});

export default SubscriptionModalScreen;

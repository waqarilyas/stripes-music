import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { downpicker, picker } from '../../../Assets/Icons';
import Entity from '../../components/Entity';
import { setIsChatNotPaid } from '../../Redux/Reducers/helperSlice';

const Subscription = ({ route }) => {
  let { user } = useSelector((state) => state.root.firebase);
  const dist = useDispatch();

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(true);
  const [visible3, setVisible3] = useState(true);

  const onDowngradeClicked = () => {
    setVisible3(!visible3);
    setVisible1(!visible1);
    setVisible2(!visible2);
  };

  const onUpgradeClicked = () => {
    if (user?.isPaidUser) {
      setVisible3(!visible3);
      setVisible1(!visible1);
      setVisible2(!visible2);
    } else {
      dist(setIsChatNotPaid(true));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ height: hp('2%') }} />
      <View style={{ alignItems: 'center' }}>
        <View style={styles.container1}>
          <View style={{ flex: 5 }}>
            <Text style={styles.container1Text}>Current Plan</Text>
            <Text style={styles.container1Text2}>
              {!visible3 ? 'Standard' : 'Free'}
            </Text>
          </View>
          {!visible3 ? (
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.touchView3}
                onPress={onDowngradeClicked}>
                <Text style={styles.textStyle}>DOWNGRADE</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={styles.seperator} />
        {!visible1 ? (
          <>
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  setVisible1(true);
                }}>
                <View style={styles.touchView}>
                  <Text style={styles.subcontainerText}> Free - $0.00</Text>
                  <Image source={picker} style={styles.imageStyle} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.seperator} />
          </>
        ) : null}
        <View style={{ alignItems: 'center' }}>
          {visible1 ? (
            <>
              <View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setVisible1(false);
                  }}>
                  <View style={styles.touchView}>
                    <Text style={styles.subcontainerText}> Free - $0.00</Text>
                    <Image source={downpicker} style={styles.imageStyle} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{ width: wp('90%') }}>
                <Entity text="Create playlist of 5 songs" />
                <Entity text="Listen to any song for 30 seconds" />
                <Entity text="Create a queue of 5 of your favorite songs" />
              </View>
            </>
          ) : null}
          {!visible2 ? (
            <>
              <View style={styles.seperator} />
              <View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setVisible2(true);
                  }}>
                  <View style={styles.touchView}>
                    <Text style={styles.subcontainerText}>
                      {' '}
                      Standard - $6.99
                    </Text>
                    <Image source={picker} style={styles.imageStyle} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.seperator} />
            </>
          ) : null}
        </View>
        {visible2 ? (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.seperator} />
            <View style={{ width: wp('90%') }}>
              <View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setVisible2(false);
                  }}>
                  <View style={styles.touchView}>
                    <Text style={styles.subcontainerText}>
                      {' '}
                      Standard - $6.99
                    </Text>
                    <Image source={downpicker} style={styles.imageStyle} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <Entity text="Create playlist of unlimited songs" />
              <Entity text="Listen to any song for full length" />
              <Entity text="Create a queue of your favorite songs" />
              <Entity text="Chat with any artist" />
              {visible3 ? (
                <TouchableOpacity
                  style={styles.touchView2}
                  onPress={onUpgradeClicked}>
                  <Text style={styles.textStyle}>UPGRADE NOW</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#120810',
    alignItems: 'center',
    height: hp('100%'),
  },
  container1: {
    flexDirection: 'row',
    width: wp('90%'),
    marginLeft: wp('2%'),
  },
  container1Text: {
    color: '#8B868A',
    fontSize: 15,
  },
  container1Text2: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#c4c4c4',
  },
  subcontainerText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#c4c4c4',
    marginBottom: hp('1%'),
  },
  touchView3: {
    height: hp('5%'),
    backgroundColor: '#F5138E',
    width: wp('30%'),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchView: {
    width: wp('90%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1%'),
  },
  seperator: {
    height: 1,
    backgroundColor: '#8B868A',
    width: wp('100%'),
    marginVertical: hp('2%'),
    opacity: 0.2,
  },
  imageStyle: {
    marginTop: hp('1%'),
    marginRight: wp('2.5%'),
  },
  touchView2: {
    marginTop: hp('1%'),
    height: hp('6%'),
    backgroundColor: '#F5138E',
    width: wp('35%'),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('1%'),
  },
  textStyle: {
    color: 'white',
    fontSize: 14,
  },
  button: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Subscription;

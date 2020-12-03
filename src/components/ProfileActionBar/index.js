import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { optionsIcon, plusIcon, signout } from '../../../Assets/Icons';
import EditProfileOverlayCard from '../../components/EditProfileOverlayCard';

const ProfileActionBar = ({ navigation }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleSignOut = () => {
    auth().signOut().then((res) => {
      console.log('----------SINGING OUT--------->', res)
    }).catch(err => {
      console.log('----------SINGING OUT CATCH--------->', res)
    });
  };

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={toggleOverlay}
        animationType="fade"
        backdropStyle={styles.backdrop}
        overlayStyle={styles.overlayContainer}>
        <View style={styles.innerContainer}>
          <EditProfileOverlayCard
            name="Edit Profile"
            onPress={() => {
              setOverlayVisible(false);
              navigation.navigate('EditProfile');
            }}
          />
          <EditProfileOverlayCard
            name="Edit Subscriptions"
            onPress={() => {
              setOverlayVisible(false);
              navigation.navigate('Subscriptions');
            }}
          />
          <EditProfileOverlayCard
            name="Tell A Friend"
            onPress={() => {
              setOverlayVisible(false);
              navigation.navigate('TellAFriend');
            }}
          />
          <EditProfileOverlayCard
            name="Change Password"
            onPress={() => {
              setOverlayVisible(false);
              navigation.navigate('ChangePassword');
            }}
          />
          <TouchableOpacity
            onPress={() => {
              toggleOverlay();
              handleSignOut();
            }}
            style={styles.signOutContainer}>
            <Image source={signout} style={styles.signoutIcon} />
            <Text style={styles.signOut}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => navigation.navigate('CreateNewPlaylist')}>
          <Image source={plusIcon} style={styles.icon} />
          <Text style={styles.title}>Create New Playlist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => setOverlayVisible(true)}>
          <Image source={optionsIcon} style={styles.icon} />
          <Text style={styles.title}>Options</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: hp('5'),
    marginHorizontal: hp('2'),
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    height: hp('3.5'),
    width: hp('3.5'),
    alignSelf: 'center',
    marginBottom: hp('2'),
    tintColor: 'white',
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: hp('1.3'),
  },
  overlayContainer: {
    backgroundColor: 'black',
    width: '80%',
    height: '60%',
    borderRadius: 10,
    padding: 0,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: hp('2.5'),
    justifyContent: 'center',
  },
  signoutIcon: {
    resizeMode: 'contain',
    height: hp('4'),
    width: hp('4'),
    tintColor: 'white',
    marginTop: hp('2'),
  },
  backdrop: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  signOut: {
    color: 'white',
  },
  signOutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileActionBar;

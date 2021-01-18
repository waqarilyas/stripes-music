import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { backIcon, searchIcon } from '../../../Assets/Icons';
import { setIsChatNotPaid } from '../../Redux/Reducers/helperSlice';
import Community from '../../screens/Community';
import MessageDetail from '../../screens/MessageDetail';
import NewMessage from '../../screens/NewMessage';
const Stack = createStackNavigator();

const CommunityStack = () => {
  let user = useSelector(state => state.root.firebase.user);
  const dist = useDispatch();
  const search = (navigation) => {
    return (
      <View style={styles.container}>
        {user?.isPaidUser ?
          <Avatar
            rounded
            containerStyle={styles.avatar}
            source={user.profilePicture ? { uri: user.profilePicture } : placeholder}
            onPress={() => navigation.navigate('Profile')}
          />
          :
          user?.isAnonymous ?
            <TouchableOpacity onPress={() => {
              navigation.navigate("AuthStack");
            }}>
              <View style={{ borderRadius: 50, height: RFPercentage(4), paddingHorizontal: RFPercentage(1), marginHorizontal: RFPercentage(2), justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5138E' }}>
                <Text style={{ fontSize: RFPercentage(2), color: 'white' }}>Login</Text>
              </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => {
              dist(setIsChatNotPaid(true))
            }}>
              <View style={{ borderRadius: 50, height: RFPercentage(4), width: RFPercentage(4), marginHorizontal: RFPercentage(2), justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5138E' }}>
                <Text style={{ fontSize: RFPercentage(2), color: 'white' }}>.99</Text>
              </View>
            </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Image source={searchIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  };
  const newMessage = (navigation) => (
    <Button
      type="solid"
      title="New Message"
      buttonStyle={styles.buttonContainer}
      titleStyle={styles.titleStyle}
      onPress={() => {
        if (user.isPaidUser)
          navigation.navigate('NewMessage')
        else
          dist(setIsChatNotPaid(true))
      }}
    />
  );

  const back = (navigation) => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={backIcon} style={styles.back} />
      </TouchableOpacity>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Community"
        component={Community}
        options={({ navigation }) => ({
          title: 'Chat',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => search(navigation),
          headerLeft: () => newMessage(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="NewMessage"
        component={NewMessage}
        options={({ navigation }) => ({
          title: 'Artists',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: () => search(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetail}
        options={({ navigation }) => ({
          title: 'Artists',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: () => search(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  text: {
    color: 'white',
  },
  headerStyle: {
    backgroundColor: 'black',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  icon: {
    resizeMode: 'contain',
    marginRight: 18,
  },
  back: {
    resizeMode: 'contain',
    marginLeft: 18,
  },
  buttonContainer: {
    backgroundColor: '#F5138E',
    paddingHorizontal: hp('2'),
    paddingVertical: hp('1'),
    borderRadius: hp('1'),
    marginStart: hp('2'),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: hp('1.5'),
  },
});

export default CommunityStack;

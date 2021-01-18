import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { backIcon, searchIcon } from '../../../Assets/Icons';
import { setIsChatNotPaid } from '../../Redux/Reducers/helperSlice';
import News from '../../screens/News';
import NewsDetails from '../../screens/NewsDetails';
const Stack = createStackNavigator();

const NewsStack = ({ navigation }) => {
  const dist = useDispatch();
  let user = useSelector(state => state.root.firebase.user);
  const search = (navigation, user) => (
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
        name="News"
        component={News}
        options={({ navigation }) => ({
          title: 'News',
          headerTitleAlign: 'left',
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => search(navigation, user),
          headerLeft: '',
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetails}
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: () => search(navigation, user),
          headerStyle: styles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    marginRight: 18,
  },
  back: {
    resizeMode: 'contain',
    marginLeft: 18,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    resizeMode: 'contain',
    marginRight: 8,
  },
  headerStyle: {
    backgroundColor: 'black',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default NewsStack;

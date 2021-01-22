import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { backIcon } from '../../../Assets/Icons';
import HeaderRightButton from '../../components/HeaderRightButton';
import News from '../../screens/News';
import NewsDetails from '../../screens/NewsDetails';

const Stack = createStackNavigator();

const NewsStack = ({ navigation }) => {
  const search = () => <HeaderRightButton navigation={navigation} />;
  const back = (navigation) => {
    return (
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}>
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
          headerRight: () => search(navigation),
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
          headerRight: () => search(navigation),
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
  backButtonContainer: {
    paddingRight: 15,
    paddingVertical: 10,
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

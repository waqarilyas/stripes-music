import randomize from 'randomatic';
import React, { useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { searchIcon } from '../../../Assets/Icons';
import ChatCard from '../../components/ChatCard';
import ChatScreenHeader from '../../components/ChatScreenHeader';
import reducer from '../../hooks/useReducer';
import { getCollection } from '../../utils/Firebase';
import styles from './styles';

const initialState = {
  users: [],
};

const Community = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };
  useEffect(() => {
    getCollection('users', 100, (collection) =>
      dispatch({ users: collection }),
    );
  }, []);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={searchVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.topSearchContainer}>
          <View style={styles.searchWithClose}>
            <View style={styles.searchContainer}>
              <Image source={searchIcon} style={styles.searchIcon} />
              <TextInput
                placeholder="Search..."
                style={styles.textInput}
                textStyle={{ color: 'white' }}
                placeholderTextColor="#918E96"
              />
            </View>
            <Text style={styles.closeButton} onPress={() => toggleSearch()}>
              Close
            </Text>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <ChatScreenHeader
          navigation={navigation}
          navigateTo="NewMessage"
          toggleSearch={toggleSearch}
        />
        <Text style={styles.title}>Messages</Text>

        {state.users.length ? (
          <FlatList
            data={state.users}
            keyExtractor={() => randomize(10)}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            renderItem={({ item: { fullName, profilePicture } }) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('MessageDetail')}>
                  <ChatCard name={fullName} avatar={profilePicture} />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <ActivityIndicator color="white" />
        )}
      </View>
    </>
  );
};

export default Community;

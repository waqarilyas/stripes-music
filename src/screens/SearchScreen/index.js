import randomize from 'randomatic';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import dayjs from 'dayjs';
import moment from 'moment';
import TrackPlayer from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import SearchResultsScreen from '../SearchResultsSceen';
import { getSearchData } from '../../utils/Helpers';
import Spinner from 'react-native-loading-spinner-overlay';

const relativeTime = require('dayjs/plugin/relativeTime');
const updateLocale = require('dayjs/plugin/updateLocale');

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'seconds ago',
    m: 'minute ago',
    mm: '%d mins ago',
    h: 'an hour ago',
    hh: '%d hours ago',
    d: 'day ago',
    dd: '%d days ago',
    M: 'month ago',
    MM: '%d months ago',
    y: 'year ago',
    yy: '%d years ago',
  },
});

import { clockIcon, searchIcon, hourGlassIcon } from '../../../Assets/Icons';
import RecentSearchesCard from '../../components/RecentSearchesCard';
import SearchScreenButton from '../../components/SearchScreenButton';

import styles from './styles';
import { changeSong, fullScreenChange } from '../../Redux/Reducers/audioSlice';
import { addPlayCount } from '../../Redux/Reducers/firebaseSlice';
import { addToRecentlyPlayed } from '../../Redux/Reducers/playerSlice';

const SearchScreen = ({ navigation }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { songs } = useSelector((state) => state.root.firebase);

  const [selected, setSelected] = useState({
    all: true,
    songs: true,
    videos: true,
    albums: true,
    artists: true,
  });

  useEffect(() => {
    const uid = auth().currentUser?.uid;
    firestore()
      .collection('users')
      .doc(uid)
      .collection('recentSearches')
      .get()
      .then((documents) => {
        let data = [];
        documents.forEach((document) => {
          if (document.exists) {
            data.push(document.data());
          }
        });
        setSearchHistory(data);
      });
  }, []);

  const selectButton = (name, value) => {
    if (name == 'all' && value) {
      setSelected({
        all: true,
        songs: true,
        videos: true,

        albums: true,
        artists: true,
      });
    } else if (name == 'all' && !value) {
      setSelected({
        all: false,
        songs: false,
        videos: false,
        albums: false,
        artists: false,
      });
    } else {
      setSelected((prevState) => ({
        ...prevState,
        [name]: value,
        all: selected.all ? false : false,
      }));
    }
  };

  const addToFirestore = async (text) => {
    const uid = auth().currentUser?.uid;
    const path = firestore().collection('users').doc(uid);
    await path.collection('recentSearches').add({
      text,
      createdAt: +new Date(),
    });
  };

  const searchIt = async () => {
    if (query.length === 0) {
      return;
    }

    await getSearchData({
      search: query,
      page: 1,
      all: selected.all ? 1 : 0,
      songs: selected.songs ? 1 : 0,
      videos: selected.videos ? 1 : 0,

      albums: selected.albums ? 1 : 0,
      artists: selected.artists ? 1 : 0,
    })
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((err) => {
        Alert.alert(
          'Failure!',
          'Unable to search! Please check your network and try again',
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchWithClose}>
          <TouchableOpacity style={styles.searchContainer}>
            <Image source={searchIcon} style={styles.searchIcon} />
            <TextInput
              placeholder="Search..."
              clearButtonMode="while-editing"
              style={styles.textInput}
              textStyle={{ color: 'white', flex: 1, flexShrink: 1 }}
              placeholderTextColor={'#918E96'}
              onChangeText={(text) => setQuery(text)}
              onSubmitEditing={(text) => {
                addToFirestore(text.nativeEvent.text);
                searchIt();
              }}
            />
          </TouchableOpacity>
          <Text style={styles.closeButton} onPress={() => navigation.goBack()}>
            Close
          </Text>
        </View>

        {query.length === 0 && (
          <View style={styles.buttonContainer}>
            <View style={styles.buttonsView}>
              <TouchableOpacity
                onPress={() => selectButton('all', !selected.all)}
                style={styles.item}>
                <SearchScreenButton title="ALL" selected={selected.all} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectButton('songs', !selected.songs)}
                style={styles.item}>
                <SearchScreenButton title="Songs" selected={selected.songs} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => selectButton('videos', !selected.videos)}
                style={styles.item}>
                <SearchScreenButton title="Videos" selected={selected.videos} />
              </TouchableOpacity>

              {/* <TouchableOpacity
              onPress={() => selectButton('playlists', !selected.playlists)}
              style={styles.item}>
              <SearchScreenButton
                title="Playlists"
                selected={selected.playlists}
              />
            </TouchableOpacity> */}
            </View>
            <View style={styles.buttonsView}>
              <TouchableOpacity
                onPress={() => selectButton('albums', !selected.albums)}
                style={styles.item}>
                <SearchScreenButton title="Albums" selected={selected.albums} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectButton('artists', !selected.artists)}
                style={styles.item}>
                <SearchScreenButton
                  title="Artists"
                  selected={selected.artists}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {query.length === 0 && (
          <View style={styles.header}>
            <Image source={clockIcon} style={styles.headerIcon} />
            <Text style={styles.headerText}>Recent Searches</Text>
          </View>
        )}
        {searchResult && query.length > 0 && (
          <SearchResultsScreen result={searchResult} navigation={navigation} />
        )}
        {searchHistory.length > 0 && query.length === 0 && (
          <FlatList
            data={searchHistory}
            keyExtractor={() => randomize('Aa0!', 10)}
            ListEmptyComponent={() => {
              return (
                <View style={styles.recentSearchesContainer}>
                  <Image source={hourGlassIcon} style={styles.recentIcon} />
                  <Text style={styles.recentSearchesText}>
                    No recent searches yet!
                  </Text>
                </View>
              );
            }}
            renderItem={({ item }) => {
              const tm = moment(item.createdAt).format(
                'MMMM Do YYYY, h:mm:ss a',
              );
              const created = dayjs().from(dayjs(item.createdAt), true);

              return (
                <RecentSearchesCard
                  title={item.text}
                  createdAt={item.createdAt}
                />
              );
            }}
          />
        )}
      </SafeAreaView>
      <Spinner visible={loading} color={'white'} />
    </ScrollView>
  );
};

export default SearchScreen;

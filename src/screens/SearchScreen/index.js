import randomize from 'randomatic';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import dayjs from 'dayjs';
import moment from 'moment';
import TrackPlayer from 'react-native-track-player'
import { useDispatch, useSelector } from 'react-redux'
import SearchResultsScreen from '../SearchResultsSceen';

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
  const [query, setQuery] = useState('');
  const dispatch = useDispatch()
  const { songs } = useSelector((state) => state.root.firebase);

  const [selected, setSelected] = useState({
    all: false,
    songs: false,
    videos: false,
    playlists: false,
    albums: false,
    artists: false,
    genre: false,
  });

  useEffect(() => {
    if (selected.all) {
      setSelected({
        songs: true,
        video: true,
        playlists: true,
        albums: true,
        artists: true,
        genre: true,
      });
    }
  }, [selected]);

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

  const playSong = async (currentSong) => {
    console.log('---current-song---', currentSong)

    const song = {
      score: currentSong._meta.score,
      artist: currentSong.artist.raw,
      artwork: currentSong.artwork.raw,
      duration: currentSong.duration.raw,
      id: currentSong.id.raw,
      title: currentSong.title.raw
    }
    console.log('----current song----', song)


    const updatedPlaylist = songs.filter(
      (item) => item.id !== song.id,
    );

    try {
      dispatch(changeSong(song));
      await TrackPlayer.add([song, ...updatedPlaylist]);
      dispatch(fullScreenChange(true));
      // dispatch(setPlaylist(songs));
      dispatch(addPlayCount(song.id));
      dispatch(addToRecentlyPlayed(song));
    } catch (error) {
      console.log('---error----', error)
    }
  };

  const selectButton = (name, value) => {
    setSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addToFirestore = async (text) => {
    const uid = auth().currentUser?.uid;
    const path = firestore().collection('users').doc(uid);
    await path.collection('recentSearches').add({
      text,
      createdAt: +new Date(),
    });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchWithClose}>
          <TouchableOpacity
            style={styles.searchContainer}
          // onPress={() =>
          //   navigation.navigate('SearchResultsScreen', { selected: selected, query: {} })
          // }
          >
            <Image source={searchIcon} style={styles.searchIcon} />
            <TextInput
              placeholder="Search..."
              style={styles.textInput}
              textStyle={{ color: 'white', flex: 1, flexShrink: 1 }}
              placeholderTextColor={'#918E96'}
              onChangeText={(text) => setQuery(text)}
              onSubmitEditing={(text) => {
                addToFirestore(text.nativeEvent.text);
              }}
            />
          </TouchableOpacity>
          <Text style={styles.closeButton} onPress={() => navigation.goBack()}>
            Close
          </Text>
        </View>

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

            <TouchableOpacity
              onPress={() => selectButton('playlists', !selected.playlists)}
              style={styles.item}>
              <SearchScreenButton
                title="Playlists"
                selected={selected.playlists}
              />
            </TouchableOpacity>
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
              <SearchScreenButton title="Artists" selected={selected.artists} />
            </TouchableOpacity>
          </View>
        </View>

        <SearchResultsScreen query={query} selected={selected} playSong={playSong} />
        <View style={styles.header}>
          <Image source={clockIcon} style={styles.headerIcon} />
          <Text style={styles.headerText}>Recent Searches</Text>
        </View>
        {searchHistory.length > 0 ? (
          <FlatList
            data={searchHistory}
            keyExtractor={() => randomize('Aa0!', 10)}
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
        ) : (
            <View style={styles.recentSearchesContainer}>
              <Image source={hourGlassIcon} style={styles.recentIcon} />
              <Text style={styles.recentSearchesText}>
                No recent searches yet!
            </Text>
            </View>
          )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default SearchScreen;

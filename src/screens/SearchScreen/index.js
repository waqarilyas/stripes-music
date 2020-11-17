import randomize from 'randomatic';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import dayjs from 'dayjs';
import moment from 'moment';

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

const SearchScreen = ({ navigation }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [selected, setSelected] = useState({
    songs: false,
    videos: false,
    playlists: false,
    albums: false,
    artists: false,
    genre: false,
  });

  const selectButton = (name, value) => {
    setSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const uid = auth().currentUser.uid;
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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchWithClose}>
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() =>
              navigation.navigate('SearchResultsScreen', { selected: selected })
            }>
            <Image source={searchIcon} style={styles.searchIcon} />
            <TextInput
              placeholder="Search..."
              style={styles.textInput}
              textStyle={{ color: 'white' }}
              editable={false}
              placeholderTextColor="#918E96"
            />
          </TouchableOpacity>
          <Text style={styles.closeButton} onPress={() => navigation.goBack()}>
            Close
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonsView}>
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
            {/* <TouchableOpacity
              onPress={() => selectButton('genre', !selected.genre)}
              style={styles.item}>
              <SearchScreenButton title="Genre" selected={selected.genre} />
            </TouchableOpacity> */}
          </View>
        </View>
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
              console.log('---created---', tm);
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
      </View>
    </>
  );
};

export default SearchScreen;

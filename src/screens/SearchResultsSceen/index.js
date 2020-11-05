import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import randomize from 'randomatic';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TextInput, View } from 'react-native';
import { Divider } from 'react-native-elements';

import {
  artistIcon,
  musicIcon,
  playIcon,
  searchIcon,
  videoIcon,
} from '../../../Assets/Icons';
import AlbumsSearchCard from '../../components/AlbumsSearchCard';
import ArtistsHorizontalCard from '../../components/ArtistsHorizontalCard';
import Block from '../../components/Block';
import AlbumSeeAllComponent from '../../components/AlbumSeeAllComponent';
import NewVideosCard from '../../components/NewVideosCard';
import SectionHeader from '../../components/SectionHeader';
import SongCard from '../../components/SongCard';
import { getSearchData } from '../../utils/Firebase';
import styles from './styles';

const SearchResultsScreen = ({ route, navigation }) => {
  const { selected } = route.params;
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchSelecteds] = useState({
    songs: [],
    videos: [],
    playlists: [],
    albums: [],
    artists: [],
  });

  const getSection = () => {
    const arr = [];
    for (const [key, value] of Object.entries(selected)) {
      if (value) {
        arr.push(key);
      }
    }
    setSelectedCategory(arr);
  };

  const performAllSearches = () => {
    for (const [key, value] of Object.entries(selected)) {
      getSearchData(query, key, (data) => {
        setResults(key, data.results);
      });
    }
  };

  const performSearches = () => {
    for (let i = 0; i < selectedCategory.length; i++) {
      getSearchData(query, selectedCategory[i], (data) => {
        setResults(selectedCategory[i], data.results);
      });
    }
    selectedCategory.length === 0 && performAllSearches();
  };

  const setResults = (name, value) => {
    setSearchSelecteds((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getSection();
    performSearches();
  }, [query]);

  const addToFirestore = async (text) => {
    const uid = auth().currentUser.uid;
    const path = firestore().collection('users').doc(uid);
    await path.collection('recentSearches').add({
      text,
      createdAt: +new Date(),
    });
  };

  return (
    <Block>
      <View style={styles.searchWithClose}>
        <View
          style={styles.searchContainer}
          onPress={() => navigation.navigate('SearchResultsScreen')}>
          <Image source={searchIcon} style={styles.searchIcon} />
          <TextInput
            placeholder="Search..."
            style={styles.textInput}
            textStyle={{ color: 'white', flex: 1, flexShrink: 1 }}
            placeholderTextColor="#918E96"
            onChangeText={(text) => setQuery(text)}
            onSubmitEditing={(text) => {
              addToFirestore(text.nativeEvent.text);
            }}
          />
        </View>
      </View>

      {/* Songs Section */}
      {selected.songs || selectedCategory.length === 0 ? (
        <>
          <SectionHeader name="Songs" icon={musicIcon} isRequired={false} />
          <FlatList
            data={searchResults.songs}
            keyExtractor={() => randomize('!a0A')}
            horizontal
            renderItem={({ item }) => {
              return (
                <SongCard
                  title={item.title.raw}
                  artist={item.artist.raw}
                  arts={[item.artwork.raw]}
                  duration={item.duration.raw}
                />
              );
            }}
          />
        </>
      ) : null}
      {/* Songs Section End here */}

      {/* Video Section Starts here */}
      {selected.videos || selectedCategory.length === 0 ? (
        <>
          <SectionHeader name="Videos" icon={videoIcon} isRequired={false} />
          <FlatList
            style={{ marginTop: 12 }}
            data={searchResults.videos}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            keyExtractor={() => randomize('!a0A')}
            renderItem={({ item }) => {
              return (
                <NewVideosCard
                  title={item.title.raw}
                  artist={item.artist.raw}
                  viewCount={12}
                  poster={item.poster.raw}
                  duration={item.duration.raw}
                />
              );
            }}
          />
        </>
      ) : null}
      {/* video section ends here */}
      {/* Playlists section starts here */}

      {selected.playlists || selectedCategory.length === 0 ? (
        <>
          <SectionHeader name="Playlists" isRequired={false} icon={playIcon} />
          <FlatList
            data={searchResults.playlists}
            keyExtractor={() => randomize('Aa10!', 10)}
            horizontal
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            renderItem={({ item }) => {
              return (
                <AlbumSeeAllComponent
                  image={item.image.raw}
                  title={item.title.raw}
                  duration={item.duration.raw}
                  author={item.author.raw}
                />
              );
            }}
          />
        </>
      ) : null}
      {/* playlists section end here */}

      {/* Favorite Artists Section */}
      {selected.artists || selectedCategory.length === 0 ? (
        <>
          <SectionHeader
            name="Artists"
            isRequired={false}
            icon={artistIcon}
            // onPress={() => navigation.navigate('FavouriteArtistSeeAll')}
          />
          <FlatList
            data={searchResults.artists}
            keyExtractor={() => randomize('Aa10!', 10)}
            horizontal
            renderItem={({ item }) => {
              return (
                <ArtistsHorizontalCard
                  avatar={item.image.raw}
                  name={`${item.firstname.raw} ${item.lastname.raw}`}
                />
              );
            }}
          />
        </>
      ) : null}
      {/* Artists Section Ends here */}
      {selected.albums || selectedCategory.length === 0 ? (
        <>
          <SectionHeader name="Albums" isRequired={false} icon={playIcon} />
          <FlatList
            data={searchResults.albums}
            keyExtractor={() => randomize('Aa10!', 10)}
            horizontal
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            renderItem={({ item }) => {
              return (
                <AlbumsSearchCard
                  image={item.image.raw}
                  title={item.title.raw}
                  duration={item.duration.raw}
                  author={item.author.raw}
                  songCount={item.songcount.raw}
                />
              );
            }}
          />
        </>
      ) : null}
      {/* albums start here */}

      {/* albums end here */}
    </Block>
  );
};

export default SearchResultsScreen;

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
  backIcon,
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
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchResultsScreen = ({ query, selected, playSong }) => {

  const [selectedCategory, setSelectedCategory] = useState([]);

  const [searchResults, setSearchResults] = useState({
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
    setSearchResults((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (query.length > 0) {
      getSection();
      performSearches();
    }
  }, [query]);

  // const addToFirestore = async (text) => {
  //   const uid = auth().currentUser?.uid;
  //   const path = firestore().collection('users').doc(uid);
  //   await path.collection('recentSearches').add({
  //     text,
  //     createdAt: +new Date(),
  //   });
  // };

  console.log('---search results--', searchResults)

  return (
    <View style={{ backgroundColor: 'black' }}>
      {/* <View style={styles.searchWithClose}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}>
          <Image source={backIcon} style={styles.back} />
        </TouchableOpacity>
        <View
          style={styles.searchContainer}
          onPress={() => navigation.navigate('SearchResultsScreen')}
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
        </View>
      </View> */}

      {/* Songs Section */}
      {searchResults.songs.length > 0 && (
        <>
          <SectionHeader name="Songs" icon={musicIcon} isRequired={false} />
          <FlatList
            data={searchResults.songs}
            keyExtractor={() => randomize('!a0A')}
            horizontal
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {
                  playSong(item)
                }}>
                  <SongCard
                    title={item.title.raw}
                    artist={item.artist.raw}
                    arts={[item.artwork.raw]}
                    duration={item.duration.raw}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
      {/* Songs Section End here */}

      {/* Video Section Starts here */}
      {searchResults.videos.length > 0 && (
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
      )}
      {/* video section ends here */}
      {/* Playlists section starts here */}

      {searchResults.playlists.length > 0 && (
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
      )}
      {/* playlists section end here */}

      {/* Favorite Artists Section */}
      {searchResults.artists.length > 0 && (
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
      )}
      {/* Artists Section Ends here */}
      {searchResults.albums.length > 0 && (
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
      )}
      {/* albums start here */}

      {/* albums end here */}
    </View>
  );
};

export default SearchResultsScreen;

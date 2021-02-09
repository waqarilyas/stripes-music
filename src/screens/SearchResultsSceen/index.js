import randomize from 'randomatic';
import React from 'react';
import { FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import {
  artistIcon,
  emptySearch,
  musicIcon,
  playIcon,
  videoIcon,
} from '../../../Assets/Icons';
import AlbumsSearchCard from '../../components/AlbumsSearchCard';
import ArtistsHorizontalCard from '../../components/ArtistsHorizontalCard';
import NewVideosCard from '../../components/NewVideosCard';
import SectionHeader from '../../components/SectionHeader';
import SongCard from '../../components/SongCard';
import {
  addAlbumViewCount,
  addPlayCount,
  addToRecentlyPlayed,
  getAlbumSongs,
  getAnAlbum,
  getArtist,
  getArtistNews,
  getArtistPlaylists,
  getArtistPopularSongs,
} from '../../Redux/Reducers/firebaseSlice';
import VideoPlayerModal from '../../components/VideoPlayerModal';

import { getArtistId } from '../../Redux/Reducers/idsSlice';
import styles from './styles';
import {
  displayVideoModal,
  setVideoData,
} from '../../Redux/Reducers/helperSlice';
import { changeSong, fullScreenChange } from '../../Redux/Reducers/audioSlice';

const SearchResultsScreen = ({ result, navigation }) => {
  const dispatch = useDispatch();

  const handleArtist = (id) => {
    dispatch(getArtist(id));
    dispatch(getArtistId(id));
    dispatch(getArtistNews(id));
    dispatch(getArtistPopularSongs(id));
    dispatch(getArtistPlaylists(id));
    navigation.navigate('Artist');
  };

  const playVideo = (item) => {
    dispatch(displayVideoModal(true));
    dispatch(setVideoData(item));
  };

  const playSong = async (currentSong) => {
    try {
      dispatch(changeSong(currentSong));
      await TrackPlayer.add(currentSong);
      dispatch(fullScreenChange(true));

      dispatch(addPlayCount(currentSong.id));
      dispatch(addToRecentlyPlayed(currentSong));
    } catch (error) {
      console.log('---error----', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {result.songs.length === 0 &&
        result.videos.length === 0 &&
        result.artists.length === 0 &&
        result.albums.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={emptySearch} style={styles.emptySearchIcon} />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              No record found!
            </Text>
          </View>
        )}

      <VideoPlayerModal />
      {/* Songs Section */}
      {result?.songs?.length > 0 && (
        <>
          <SectionHeader name="Songs" icon={musicIcon} isRequired={false} />
          <FlatList
            data={result?.songs}
            keyExtractor={() => randomize('!a0A')}
            horizontal
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    playSong(item);
                  }}>
                  <SongCard
                    title={item.title}
                    artist={item.artist}
                    arts={item.artwork}
                    duration={item.duration}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
      {/* Songs Section End here */}

      {/* Video Section Starts here */}
      {result?.videos.length > 0 && (
        <>
          <SectionHeader name="Videos" icon={videoIcon} isRequired={false} />
          <FlatList
            style={{ marginTop: 12 }}
            data={result?.videos}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            keyExtractor={() => randomize('!a0A')}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    playVideo(item);
                  }}>
                  <NewVideosCard
                    title={item.title}
                    artist={item.artist}
                    viewCount={12}
                    poster={item.poster}
                    duration={item.duration}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}

      {/* playlists section end here */}

      {/* Favorite Artists Section */}
      {result?.artists.length > 0 && (
        <>
          <SectionHeader
            name="Artists"
            isRequired={false}
            icon={artistIcon}
            // onPress={() => navigation.navigate('FavouriteArtistSeeAll')}
          />
          <FlatList
            data={result?.artists}
            keyExtractor={() => randomize('Aa10!', 10)}
            horizontal
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => handleArtist(item.id)}>
                  <ArtistsHorizontalCard
                    avatar={item.imgUrl}
                    name={`${item.firstName} ${item.lastName}`}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
      {/* Artists Section Ends here */}
      {result?.albums?.length > 0 && (
        <>
          <SectionHeader name="Albums" isRequired={false} icon={playIcon} />
          <FlatList
            data={result?.albums}
            keyExtractor={() => randomize('Aa10!', 10)}
            horizontal
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(getAnAlbum(item.id));
                    dispatch(getAlbumSongs(item.id));
                    dispatch(addAlbumViewCount(item.id));
                    navigation.navigate('AlbumDetail');
                  }}>
                  <AlbumsSearchCard
                    image={item.imgUrl}
                    title={item.title}
                    duration={item.duration}
                    author={item.author}
                    songCount={item.songcount}
                  />
                </TouchableOpacity>
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

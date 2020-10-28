import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import randomize from 'randomatic';
import React, { useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CheckBox, Divider, Overlay } from 'react-native-elements';
import TrackPlayer from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import {
  artistIcon,
  iconsPlaylist,
  musicIcon,
  playIcon,
} from '../../../Assets/Icons';
import ArtistsImage from '../../components/ArtistsImage';
import BestPlaylistsCard from '../../components/BestPlaylistsCard';
import Block from '../../components/Block';
import HomeTopSlider from '../../components/HomeTopSlider';
import SectionHeader from '../../components/SectionHeader';
import SongCard from '../../components/SongCard';
import SongCardListView from '../../components/SongCardListView';
import reducer from '../../hooks/useReducer';
import ForYouTabs from '../../navigation/tabs/ForYouTabs';
import { changeSong, fullScreenChange } from '../../Redux/Reducers/audioSlice';
import {
  getCollection,
  getOrderedCollection,
  getQueriedCollection,
  uploadDataToStorage,
} from '../../utils/Firebase';
import styles from './styles';
// import { Add } from './utils';

const pattern = 'Aa0!';
const count = 10;

const initialState = {
  banner: [],
  songs: [],
  recentlyPlayed: [],
  artists: [],
  playlists: [],
  userPlaylists: [],
};

const Home = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const disp = useDispatch();
  const handleSignOut = () => {
    auth().signOut();
  };

  const setup = () => {
    TrackPlayer.setupPlayer({});
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  };

  const isConnected = async () => {
    const response = await NetInfo.fetch();
    console.log(response.isConnected);
    !response.isConnected && navigation.navigate('NoInternet');
  };

  isConnected();
  useEffect(() => {
    uploadDataToStorage('artists', 'artists');
    uploadDataToStorage('playlists', 'playlists');
    uploadDataToStorage('songs', 'songs');
    uploadDataToStorage('videos', 'videos');
    uploadDataToStorage('albums', 'albums');

    setup();
    // Get Albums
    getCollection('songs', 10, (collection) =>
      dispatch({ banner: collection }),
    );

    // Get Songs
    getOrderedCollection('songs', 'likesCount', 'desc', 6, (collection) =>
      dispatch({ songs: collection }),
    );

    // Get recently played songs
    const uid = auth().currentUser.uid;
    getQueriedCollection(
      'songs',
      'recentlyPlayedBy',
      'array-contains',
      uid,
      5,
      (documents) => {
        dispatch({ recentlyPlayed: documents });
      },
    );

    // Get Artists
    getCollection('artists', 5, (collection) =>
      dispatch({ artists: collection }),
    );

    // Get Playlists
    getOrderedCollection('playlists', 'viewCount', 'desc', 8, (collection) =>
      dispatch({ playlists: collection }),
    );

    // Get User Playlists
    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .get()
      .then((documents) => {
        let allUserPlaylists = [];
        documents.forEach((document) => {
          if (document.exists) {
            allUserPlaylists.push(document.data());
          }
        });
        dispatch({ userPlaylists: allUserPlaylists });
      });
  }, []);

  const onAddToPlaylist = (id, song) => {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .doc(id)
      .collection('songs')
      .doc(song.id)
      .set(song)
      .then(() => {
        console.log('added to playlist');
      });
  };

  console.log('-=--==-=-=-=-', state);
  return (
    <Block>
      {/* Album Slider Section */}

      {/* Overlay for song long press */}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
        ListEmptyComponent={() => <ActivityIndicator color="black" />}
        backdropStyle={{ backgroundColor: 'transparent' }}>
        <Text style={styles.overlayHeader}>Your playlists</Text>

        <FlatList
          data={state.userPlaylists}
          keyExtractor={() => randomize('Aa0!', 10)}
          renderItem={({ item }) => {
            return (
              <CheckBox
                center
                title={item.title}
                iconRight
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxInput}
                iconType="material"
                checkedIcon="clear"
                uncheckedIcon="add"
                checkedColor="red"
                checked={checked}
                onPress={() => {
                  setChecked(!checked);
                  onAddToPlaylist(item.id, selectedSong);
                }}
              />
            );
          }}
        />
      </Overlay>
      {/* overlay ends here */}

      {state.banner.length ? (
        <FlatList
          data={state.banner}
          horizontal
          keyExtractor={() => randomize(pattern, count)}
          renderItem={({
            item,
            item: {
              title,
              artist,
              arts,
              duration,
              id,
              description,
              url,
              artwork,
            },
          }) => {
            return (
              <TouchableOpacity
                onLongPress={() => {
                  setSelectedSong(item);
                  toggleOverlay();
                }}
                onPress={() => {
                  disp(
                    changeSong({
                      title,
                      artist,
                      artwork,
                      url,
                      duration,
                      id,
                    }),
                  );
                  disp(fullScreenChange(true));
                }}>
                <HomeTopSlider
                  arts={arts}
                  title={title}
                  description={description}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <ActivityIndicator style={styles.bannerLoading} />
      )}

      {/* Most Played Section */}
      <SectionHeader
        name="Most Played"
        icon={musicIcon}
        onPress={() => navigation.navigate('MostPlayedSeeAll')}
      />

      {state.songs.length ? (
        <FlatList
          data={state.songs}
          horizontal
          keyExtractor={() => randomize(pattern, count)}
          renderItem={({
            item,
            item: { title, artist, arts, url, duration, id, artwork },
          }) => {
            return (
              <TouchableOpacity
                onLongPress={() => {
                  setSelectedSong(item);
                  toggleOverlay();
                }}
                onPress={() => {
                  disp(
                    changeSong({
                      title,
                      artist,
                      artwork,
                      url,
                      duration,
                      id,
                    }),
                  );
                  disp(fullScreenChange(true));
                }}>
                <SongCard
                  title={title}
                  artist={artist}
                  arts={arts}
                  duration={duration}
                  item={item}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <ActivityIndicator style={styles.loading} />
      )}

      {/* Most Played Section Ends here */}

      {/* For You section */}
      <View style={styles.forYouContainer}>
        <SectionHeader name="For You" icon={musicIcon} isRequired={false} />
        <ForYouTabs />
      </View>
      {/* For You section ends here */}

      {/* Recent Played Section */}
      <ScrollView>
        {state.recentlyPlayed.length ? (
          <FlatList
            ListHeaderComponent={
              <SectionHeader
                name="Recent Played"
                icon={playIcon}
                onPress={() => navigation.navigate('RecentPlayedSeeAll')}
              />
            }
            data={state.recentlyPlayed}
            keyExtractor={() => randomize(pattern, count)}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            renderItem={({
              item: { title, artist, arts, duration, artwork, url, id },
            }) => {
              return (
                <TouchableOpacity
                  onLongPress={() => {
                    setSelectedSong(item);
                    toggleOverlay();
                  }}
                  onPress={() => {
                    disp(
                      changeSong({
                        title,
                        artist,
                        artwork,
                        url,
                        duration,
                        id,
                      }),
                    );
                    disp(fullScreenChange(true));
                  }}>
                  <SongCardListView
                    title={title}
                    artist={artist}
                    arts={arts}
                    duration={duration}
                  />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <ActivityIndicator style={styles.loading} />
        )}
      </ScrollView>

      {/* Recent Played Section Ends Here*/}

      {/* Favorite Artists Section */}
      <SectionHeader
        name="Favourite Artists"
        icon={artistIcon}
        onPress={() => navigation.navigate('FavouriteArtistSeeAll')}
      />
      {state.artists.length ? (
        <FlatList
          data={state.artists}
          keyExtractor={() => randomize(pattern, count)}
          horizontal
          renderItem={({
            item: { imgUrl, firstName, lastName, followerCount },
          }) => {
            return (
              <ArtistsImage
                imgUrl={imgUrl}
                firstName={firstName}
                lastName={lastName}
                followerCount={followerCount}
              />
            );
          }}
        />
      ) : (
        <ActivityIndicator />
      )}

      {/* Artists Section Ends here */}

      {/* The Best Playlists Section */}

      <SectionHeader
        name="Best Playlists"
        icon={iconsPlaylist}
        onPress={() => navigation.navigate('MusicScreenAllPlayLists')}
      />
      {state.playlists.length ? (
        <FlatList
          data={state.playlists}
          keyExtractor={() => randomize(pattern, count)}
          horizontal
          renderItem={({ item: { image, songs, title, viewCount } }) => {
            return (
              <BestPlaylistsCard
                imgUrl={image}
                songCount={songs.length}
                title={title}
                viewCount={viewCount}
              />
            );
          }}
        />
      ) : (
        <ActivityIndicator />
      )}

      {/* Artists Section Ends here */}
      {/* <Button text="Sign Out" onPress={handleSignOut} /> */}
    </Block>
  );
};

export default Home;

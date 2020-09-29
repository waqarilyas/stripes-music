import React, { useEffect, useReducer } from 'react';
import { View, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import randomize from 'randomatic';

import styles from './styles';
import TabsMainHeader from '../../components/TabsMainHeader';
import Block from '../../components/Block';
import HomeTopSlider from '../../components/HomeTopSlider';
import SectionHeader from '../../components/SectionHeader';
import SongCard from '../../components/SongCard';
import ForYouTabs from '../../navigation/tabs/ForYouTabs';
import SongCardListView from '../../components/SongCardListView';
import ArtistsImage from '../../components/ArtistsImage';
import BestPlaylistsCard from '../../components/BestPlaylistsCard';
import {
  musicIcon,
  iconsPlaylist,
  artistIcon,
  playIcon,
} from '../../../Assets/Icons';
import Button from '../../components/Button';
import reducer from '../../hooks/useReducer';
import {
  getCollection,
  getOrderedCollection,
  getQueriedCollection,
} from '../../utils/Firebase';
// import { Add } from './utils';

const pattern = 'Aa0!';
const count = 10;

const initialState = {
  banner: [],
  songs: [],
  recentlyPlayed: [],
  artists: [],
  playlists: [],
};

const Home = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSignOut = () => {
    auth().signOut();
  };

  useEffect(() => {
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
  }, []);

  return (
    <Block>
      <ScrollView>
        <>
          {/* Album Slider Section */}
          {state.banner.length ? (
            <FlatList
              data={state.banner}
              horizontal
              keyExtractor={() => randomize(pattern, count)}
              renderItem={({ item: { arts, title, description } }) => {
                return (
                  <HomeTopSlider
                    arts={arts}
                    title={title}
                    description={description}
                  />
                );
              }}
            />
          ) : (
            <ActivityIndicator style={styles.bannerLoading} />
          )}
        </>

        {/* Most Played Section */}
        <View>
          <SectionHeader name="Most Played" icon={musicIcon} />

          {state.songs.length ? (
            <FlatList
              data={state.songs}
              horizontal
              keyExtractor={() => randomize(pattern, count)}
              renderItem={({ item: { title, artist, arts } }) => {
                return <SongCard title={title} artist={artist} arts={arts} />;
              }}
            />
          ) : (
            <ActivityIndicator style={styles.loading} />
          )}

          {/* Most Played Section Ends here */}

          <View style={styles.forYouContainer}>
            <SectionHeader name="For You" icon={musicIcon} />
            <ForYouTabs />
          </View>

          {/* Recent Played Section */}
          <View>
            <SectionHeader name="Recent Played" icon={playIcon} />
            {state.recentlyPlayed.length ? (
              <FlatList
                data={state.recentlyPlayed}
                keyExtractor={() => randomize(pattern, count)}
                renderItem={({ item: { title, artist, arts } }) => {
                  return (
                    <SongCardListView
                      title={title}
                      artist={artist}
                      arts={arts}
                    />
                  );
                }}
              />
            ) : (
              <ActivityIndicator style={styles.loading} />
            )}
          </View>
          {/* Recent Played Section Ends Here*/}

          {/* Artists Section */}
          <View>
            <SectionHeader name="Favourite Artists" icon={artistIcon} />
            {state.artists.length ? (
              <FlatList
                data={state.artists}
                keyExtractor={() => randomize(pattern, count)}
                horizontal
                renderItem={({ item: { imgUrl, firstName, lastName } }) => {
                  return (
                    <ArtistsImage
                      imgUrl={imgUrl}
                      firstName={firstName}
                      lastName={lastName}
                    />
                  );
                }}
              />
            ) : (
              <ActivityIndicator />
            )}
          </View>
          {/* Artists Section Ends here */}

          {/* The Best Playlists Section */}
          <View>
            <SectionHeader name="The Best Playlists" icon={iconsPlaylist} />
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
          </View>
          {/* Artists Section Ends here */}
          <Button text="Sign Out" onPress={handleSignOut} />
        </View>
      </ScrollView>
    </Block>
  );
};

export default Home;

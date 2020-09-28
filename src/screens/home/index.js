import React, { useEffect, useReducer } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
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
import { getCollection, getOrderedCollection } from './utils';

const pattern = 'Aa0!';
const count = 10;

const initialState = {
  albums: [],
  songs: [],
};

const Home = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const data = ['1', '2', '3', '4', '5'];

  const handleSignOut = () => {
    auth().signOut();
  };

  useEffect(() => {
    getCollection('albums', (collection) => dispatch({ albums: collection }));
    getOrderedCollection('songs', 'likesCount', 'asc', (collection) =>
      dispatch({ songs: collection }),
    );
  }, []);

  return (
    <Block>
      <ScrollView>
        <View style={styles.topSection}>
          <TabsMainHeader navigation={navigation} name="Music" />

          {/* <Button text="Add" onPress={Add} /> */}

          {/* Album Slider Section */}
          <FlatList
            data={state.albums}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <HomeTopSlider key={randomize(pattern, count)} item={item} />
              );
            }}
          />
        </View>

        {/* Most Played Section */}
        <View>
          <SectionHeader name="Most Played" icon={musicIcon} />
          <FlatList
            data={state.songs}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item: { title, artist, arts } }) => {
              return (
                <SongCard
                  key={randomize(pattern, count)}
                  title={title}
                  artist={artist}
                  arts={arts}
                />
              );
            }}
          />

          {/* Most Played Section Ends here */}

          <View style={styles.forYouContainer}>
            <SectionHeader name="For You" icon={musicIcon} />
            <ForYouTabs />
          </View>

          {/* Recent Played Section */}
          <View>
            <SectionHeader name="Recent Played" icon={playIcon} />
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              renderItem={() => {
                return <SongCardListView key={randomize(pattern, count)} />;
              }}
            />
          </View>
          {/* Recent Played Section Ends Here*/}

          {/* Artists Section */}
          <View>
            <SectionHeader name="Favourite Artists" icon={artistIcon} />
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              horizontal
              renderItem={() => {
                return <ArtistsImage key={randomize(pattern, count)} />;
              }}
            />
          </View>
          {/* Artists Section Ends here */}

          {/* Artists Section */}
          <View>
            <SectionHeader name="The Best Playlists" icon={iconsPlaylist} />
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              horizontal
              renderItem={() => {
                return <BestPlaylistsCard key={randomize(pattern, count)} />;
              }}
            />
          </View>
          {/* Artists Section Ends here */}
          <Button text="Sign Out" onPress={handleSignOut} />
        </View>
      </ScrollView>
    </Block>
  );
};

export default Home;

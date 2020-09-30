import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
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
import NowPlayingTabs from '../../navigation/tabs/NowPlayingTabs';

import {
  musicIcon,
  iconsPlaylist,
  artistIcon,
  playIcon,
} from '../../../Assets/Icons';
import Button from '../../components/Button';

const pattern = 'Aa0!';
const count = 10;

const Home = ({ navigation }) => {
  const data = ['1', '2', '3', '4', '5'];

  const handleSignOut = () => {
    auth().signOut();
  };

  return (
    <Block>
      <ScrollView>
        <View style={styles.topSection}>
          <TabsMainHeader navigation={navigation} name="Music" />
          <Button text="Sign Out" onPress={handleSignOut} />
          <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item}
            renderItem={() => {
              return <HomeTopSlider key={randomize(pattern, count)} />;
            }}
          />
        </View>

        {/* Most Played Section */}
        <View>
          <SectionHeader
            name="Most Played"
            icon={musicIcon}
            navigateTo="MostPlayedSeeAll"
            navigation={navigation}
          />
          <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item}
            renderItem={() => {
              return <SongCard key={randomize(pattern, count)} />;
            }}
          />
          {/* Most Played Section Ends here */}
          <View style={styles.forYouContainer}>
            <SectionHeader
              name="For You"
              icon={musicIcon}
              navigateTo="ForYouSeeAll"
              navigation={navigation}
            />
            <ForYouTabs />
          </View>

          {/* Recent Played Section */}
          <View>
            <SectionHeader
              name="Recent Played"
              icon={playIcon}
              navigateTo="ForYouSeeAll"
              navigation={navigation}
            />
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
            <SectionHeader
              name="Favourite Artists"
              icon={artistIcon}
              navigateTo="ArtistsSeeAll"
              navigation={navigation}
            />
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
            <SectionHeader
              name="The Best Playlists"
              icon={iconsPlaylist}
              navigateTo="MusicScreenAllPlayLists"
              navigation={navigation}
            />
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
        </View>
      </ScrollView>
    </Block>
  );
};

export default Home;

import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';

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

const Home = ({ navigation }) => {
  const data = ['1', '2', '3', '4', '5'];

  return (
    <Block>
      <ScrollView>
        <View style={styles.topSection}>
          <TabsMainHeader navigation={navigation} name="Music" />
          <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item}
            renderItem={() => {
              return <HomeTopSlider />;
            }}
          />
        </View>

        {/* Most Played Section */}
        <View>
          <SectionHeader name="Most Played" icon={musicIcon} />
          <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item}
            renderItem={() => {
              return <SongCard />;
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
                return <SongCardListView />;
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
                return <ArtistsImage />;
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
                return <BestPlaylistsCard />;
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

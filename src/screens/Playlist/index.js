import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Avatar } from 'react-native-elements';

import styles from './styles';
import SectionHeader from '../../components/SectionHeader';
import Block from '../../components/Block';
import SongCard from '../../components/SongCard';
import ArtistsImage from '../../components/ArtistsImage';
import {
  musicIcon,
  playIcon,
  iconsPlaylist,
  locationIcon,
} from '../../../Assets/Icons';
import BestPlaylistsCard from '../../components/BestPlaylistsCard';
import SongCardListView from '../../components/SongCardListView';

{
  /* <TouchableOpacity onPress={() => navigation.navigate('Artist')}>
        <Text style={{ color: 'white' }}>Go to Artist Details</Text>
      </TouchableOpacity> */
}

const Playlist = ({ navigation }) => {
  const data = ['1', '2', '3', '4', '5', '6', '7'];

  const img =
    'https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/artists%2Fkanye-west.jpg?alt=media&token=786c40c8-e4f1-4377-87b7-8cdc54cc2db1';
  return (
    <Block>
      <View style={styles.pageTop}>
        <Avatar
          rounded
          size="large"
          source={require('../../../Assets/Images/songCover3.jpg')}
        />
        <View style={styles.pageTopNameView}>
          <Text style={styles.artistName}>Bithika Abhedananada</Text>
          <View style={styles.subtitleView}>
            <Image source={locationIcon} style={styles.locationIcon} />
            <Text style={styles.subtitle}>Italy</Text>
          </View>
        </View>
      </View>

      <View style={styles.followersView}>
        <View style={styles.followers}>
          <Text style={styles.followText}>68,679</Text>
          <Text style={styles.followSubtext}>Followers</Text>
        </View>
        <View style={styles.followers}>
          <Text style={styles.followText}>68,679</Text>
          <Text style={styles.followSubtext}>Following</Text>
        </View>
        {/* <View style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </View> */}
      </View>

      <SectionHeader name="My Playlists" icon={musicIcon} />

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        horizontal
        renderItem={() => {
          return (
            <BestPlaylistsCard
              imgUrl={img}
              songCount={1000}
              title="Title"
              viewCount={1000}
              playlistType="Public"
            />
          );
        }}
      />

      <SectionHeader name="Artist" icon={iconsPlaylist} />
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        horizontal
        renderItem={() => {
          return (
            <ArtistsImage imgUrl={img} firstName="Kanye" lastName="West" />
          );
        }}
      />

      <SectionHeader name="Recent Played" icon={playIcon} />
      <FlatList
        // ListHeaderComponent={
        //   <SectionHeader name="Recent Played" icon={playIcon} />
        // }
        data={data}
        keyExtractor={(item) => item}
        renderItem={() => {
          return (
            <SongCardListView
              title="Song Name"
              artist="Artist Name"
              arts="Arts"
            />
          );
        }}
      />
    </Block>
  );
};

export default Playlist;

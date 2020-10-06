import React, { useEffect, useReducer } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import SectionHeader from '../../components/SectionHeader';
import Block from '../../components/Block';
import ProfileArtist from '../../components/ProfileArtist';
import {
  musicIcon,
  playIcon,
  iconsPlaylist,
  locationIcon,
} from '../../../Assets/Icons';
import ProfilePlaylists from '../../components/ProfilePlaylists';
import SongCardListView from '../../components/SongCardListView';
import { getUserProfile, getUserSubCollections } from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import { thousandSeprator } from '../../utils/Helpers';
import randomize from 'randomatic';
// import { Add } from './utils';
// import Button from '../../components/Button';

const initialState = {
  user: {},
  playlists: [],
  artists: [],
  history: [],
};

const ProfileScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    getUserProfile(uid, (document) => dispatch({ user: document }));
    getUserSubCollections(uid, 'playlists', (documents) =>
      dispatch({ playlists: documents }),
    );
    getUserSubCollections(uid, 'artists', (documents) =>
      dispatch({ artists: documents }),
    );
    getUserSubCollections(uid, 'history', (document) =>
      dispatch({ history: document }),
    );
  }, []);

  const data = ['1', '2', '3', '4', '5', '6', '7'];

  return (
    <Block>
      <View style={styles.pageTop}>
        <Avatar
          rounded
          containerStyle={styles.profilePictureContainer}
          source={{ uri: state.user.profilePicture }}
          renderPlaceholderContent={<ActivityIndicator color="white" />}
        />
        <View style={styles.pageTopNameView}>
          <Text style={styles.artistName}>{state.user.fullName}</Text>
          <View style={styles.subtitleView}>
            <Image source={locationIcon} style={styles.locationIcon} />
            <Text style={styles.subtitle}>{state.user.location}</Text>
          </View>
          <Text style={styles.followText}>
            {thousandSeprator(state.user.followingCount)}
          </Text>
          <Text style={styles.followSubtext}>Following</Text>
        </View>
      </View>
      {/* <Button onPress={Add} text="Add History" /> */}

      <SectionHeader name="My Playlists" icon={musicIcon} />

      {state.playlists.length ? (
        <FlatList
          data={state.playlists}
          keyExtractor={() => randomize('Aa0!', 10)}
          horizontal
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({
            item: { image, title, songs, isPrivate, viewCount },
          }) => {
            return (
              <ProfilePlaylists
                imgUrl={image}
                songCount={songs.length}
                title={title}
                isPrivate={isPrivate}
                viewCount={viewCount}
              />
            );
          }}
        />
      ) : (
        <ActivityIndicator color="white" />
      )}

      <SectionHeader name="Favorite Artists" icon={iconsPlaylist} />
      {state.artists.length ? (
        <FlatList
          data={state.artists}
          keyExtractor={() => randomize('Aa!0', 10)}
          horizontal
          renderItem={({ item: { fullName, image } }) => {
            return <ProfileArtist name={fullName} image={image} />;
          }}
        />
      ) : (
        <ActivityIndicator color="white" />
      )}

      <SectionHeader name="Recent Played" icon={playIcon} />
      {state.history.length ? (
        <FlatList
          data={state.history}
          keyExtractor={() => randomize('Aa0!', 10)}
          renderItem={({ item: { title, artist, arts, duration } }) => {
            return (
              <SongCardListView
                title={title}
                artist={artist}
                arts={arts}
                duration={duration}
              />
            );
          }}
        />
      ) : (
        <ActivityIndicator color="white" />
      )}
    </Block>
  );
};

export default ProfileScreen;

import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Divider, Overlay } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import Dialog from '../../components/Dialog';
import SectionHeader from '../../components/SectionHeader';
import Block from '../../components/Block';
import ArtistsImage from '../../components/ArtistsImage';
import {
  musicIcon,
  playIcon,
  iconsPlaylist,
  locationIcon,
} from '../../../Assets/Icons';
import ProfilePlaylists from '../../components/ProfilePlaylists';
import SongCardListView from '../../components/SongCardListView';
import {
  getQueriedCollections,
  getUserProfile,
  getUserSubCollections,
} from '../../utils/Firebase';
import reducer from '../../hooks/useReducer';
import { thousandSeprator } from '../../utils/Helpers';
import randomize from 'randomatic';

const initialState = {
  user: {},
  playlists: [],
  artists: [],
  history: [],
};

const ProfileScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [settingVisible, setSettingVisible] = useState(false);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    getUserProfile(uid, (document) => dispatch({ user: document }));
    getUserSubCollections(uid, 'playlists', (documents) =>
      dispatch({ playlists: documents }),
    );
    getQueriedCollections(
      'artists',
      'followedBy',
      'array-contains',
      uid,
      (documents) => dispatch({ artists: documents }),
    );
    getUserSubCollections(uid, 'history', (document) =>
      dispatch({ history: document }),
    );
  }, []);

  return (
    <Block>
      {settingVisible ? <Dialog /> : null}
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
      <TouchableOpacity onPress={() => setSettingVisible(!settingVisible)}>
        <Text style={styles.editProfile}>Edit Your Profile</Text>
      </TouchableOpacity>

      <SectionHeader
        name="My Playlists"
        icon={musicIcon}
        onPress={() => navigation.navigate('ProfilePlaylists')}
      />
      {state.playlists.length > 0 ? (
        <FlatList
          data={state.playlists}
          keyExtractor={() => randomize('Aa0!', 10)}
          horizontal
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({
            item: { image, title, songs = 0, isPrivate, viewCount },
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

      <SectionHeader
        name="Favorite Artists"
        icon={iconsPlaylist}
        onPress={() => navigation.navigate('ProfileArtists')}
      />
      {state.artists.length ? (
        <FlatList
          data={state.artists}
          keyExtractor={() => randomize('Aa!0', 10)}
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
        <ActivityIndicator color="white" />
      )}

      <SectionHeader
        name="Recently Played"
        icon={playIcon}
        onPress={() => navigation.navigate('ProfileRecentlyPlayed')}
      />
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

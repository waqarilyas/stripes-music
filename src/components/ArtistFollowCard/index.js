import React, { useEffect, useReducer } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { getDocument } from '../../utils/Firebase';

import styles from './styles';
import reducer from '../../hooks/useReducer';

const initialState = {
  artist: {},
};

const ArtistFollowCard = ({ artistId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getDocument('artists', artistId, (document) =>
      dispatch({ artist: document }),
    );
  }, [artistId]);

  return (
    <View style={styles.container}>
      {state.artist ? (
        <>
          <Avatar rounded size="medium" source={{ uri: state.artist.imgUrl }} />
          <View style={styles.detail}>
            <Text style={styles.artist}>
              {state.artist.firstName} {state.artist.lastName}
            </Text>
            {state.artist.followedBy ? (
              <Text style={styles.followers}>
                {state.artist.followedBy.length} Followers
              </Text>
            ) : null}
          </View>
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={['#F5148E', '#c9227b']}
              style={styles.leftContainer}>
              <Text style={styles.follow}>Follow</Text>
            </LinearGradient>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default ArtistFollowCard;

import React from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import ArtistsGridCard from '../../components/ArtistsGridCard';
import {
  getArtist,
  getArtistNews,
  getArtistPlaylists,
  getArtistPopularSongs,
} from '../../Redux/Reducers/firebaseSlice';
import { getArtistId } from '../../Redux/Reducers/idsSlice';
import styles from './styles';

const width = Dimensions.get('window').width;

const ArtistsSeeAll = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allTopArtists } = useSelector((state) => state.root.firebase);

  const handleArtist = (id) => {
    dispatch(getArtist(id));
    dispatch(getArtistId(id));
    dispatch(getArtistNews(id));
    dispatch(getArtistPopularSongs(id));
    dispatch(getArtistPlaylists(id));
    navigation.navigate('Artist', { artistId: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Top Artists</Text>
        <Text style={styles.subtitle}>
          These are our top artists. Checkout their profile.
        </Text>
      </View>
      <FlatList
        data={allTopArtists}
        numColumns={3}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({
          item: { id, firstName, lastName, imgUrl, followerCount },
        }) => {
          return (
            <TouchableOpacity
              style={{ width: width / 3 }}
              onPress={() => handleArtist(id)}>
              <ArtistsGridCard
                name={`${firstName} ${lastName}`}
                avatar={imgUrl}
                followerCount={followerCount}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ArtistsSeeAll;

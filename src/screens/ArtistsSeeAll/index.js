import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getArtist } from '../../Redux/Reducers/firebaseSlice';

import { Divider } from 'react-native-elements';
import styles from './styles';
import ArtistsGridCard from '../../components/ArtistsGridCard';

const ArtistsSeeAll = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allTopArtists } = useSelector((state) => state.root.firebase);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Top Artists</Text>
        <Text style={styles.subtitle}>
          Artists which the highest followers. Checkout their profile.
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
              style={{ width: '33.3%' }}
              onPress={() => {
                dispatch(getArtist(id));
                navigation.navigate('Artist', { artistId: id });
              }}>
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

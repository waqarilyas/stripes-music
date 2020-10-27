import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import { getAlbumSongs, getAnAlbum } from '../../Redux/Reducers/firebaseSlice';
import ForYouPlaylistCard from '../../components/ForYouPlaylistCard';

const ForYouAlbumsSeeAll = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allAlbums } = useSelector((state) => state.root.firebase);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Albums For You</Text>
        <Text style={styles.subtitle}>
          A collection of albums recommended just for you. We hope you like it!
        </Text>
      </View>

      <FlatList
        data={allAlbums}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item: { id, imgUrl, title, duration, author } }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(getAnAlbum(id));
                dispatch(getAlbumSongs(id));
                navigation.navigate('AlbumDetail');
              }}>
              <ForYouPlaylistCard
                image={imgUrl}
                title={title}
                duration={duration}
                author={author}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ForYouAlbumsSeeAll;

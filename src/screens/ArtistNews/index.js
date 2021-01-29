import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import RelatedNewsCard from '../../components/RelatedNewsCard';
import styles from './styles';
import { Divider } from 'react-native-elements';
import EmptyArtistProfileCard from '../../components/EmptyArtistProfileCard';
import { noNewsIcon } from '../../../Assets/Icons';
import { getANews } from '../../Redux/Reducers/firebaseSlice';

const ArtistNews = ({ navigation }) => {
  const dispatch = useDispatch();
  const { artistNews } = useSelector((state) => state.root.firebase);

  const handleNav = async (id) => {
    console.log('id,', id);
    const newsPath = firestore().collection('news').doc(id);
    newsPath
      .update({
        viewCount: firestore.FieldValue.increment(1),
      })
      .catch((err) => {
        console.log('HANDLE VIEWCOUNT STATUS');
      });
    dispatch(getANews(id)).then(() => {
      navigation.navigate('NewsDetails');
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={artistNews}
        style={styles.list}
        contentContainerStyle={
          artistNews && artistNews.length > 0 ? null : { flex: 1 }
        }
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        ListEmptyComponent={
          <EmptyArtistProfileCard text="NO NEWS YET !" icon={noNewsIcon} />
        }
        renderItem={({ item: { id, title, imgUrl, description } }) => {
          return (
            <TouchableOpacity onPress={() => handleNav(id)}>
              <RelatedNewsCard
                title={title}
                image={imgUrl}
                description={description}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ArtistNews;

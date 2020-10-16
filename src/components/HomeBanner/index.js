import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import HomeTopSlider from '../HomeTopSlider';

const HomeBanner = ({ data }) => {
  const addViewCount = (id) => {
    const postReference = firestore().collection('songs').doc(id);

    return firestore().runTransaction(async (transaction) => {
      const postSnapshot = await transaction.get(postReference);

      if (!postReference) {
        throw 'Post does not exist';
      }

      await transaction.update(postReference, {
        playCount: postSnapshot.data().playCount + 1,
      });
    });
  };

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item: { id, artwork, title, description } }) => {
        return (
          <TouchableOpacity onPress={() => addViewCount(id)}>
            <HomeTopSlider
              artwork={artwork}
              title={title}
              description={description}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default HomeBanner;

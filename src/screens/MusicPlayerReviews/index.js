import React, { useState } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import SongCommentCard from '../../components/SongCommentCard';

const MusicPlayerReviews = () => {
  const [rating, setRating] = useState(1);

  const ratingCompleted = (rating) => {
    setRating(rating);
  };

  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <AirbnbRating
          // type="rocket"
          startingValue={1}
          // ratingColor="white"
          reviews={''}
          ratingBackgroundColor="#000000"
          onFinishRating={ratingCompleted}
          // containerStyle={{ backgroundColor: 'yellow' }}
        />
        <Text style={styles.rating}>{rating}/5</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={() => {
          return <SongCommentCard />;
        }}
      />
      {/* <LinearGradient
        colors={['grey', 'black ', 'grey']}
        style={styles.buttonText}> */}
      <Text style={styles.buttonText}>Write a Review</Text>
      {/* </LinearGradient> */}
    </View>
  );
};

export default MusicPlayerReviews;

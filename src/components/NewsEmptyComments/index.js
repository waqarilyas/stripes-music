import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewsEmptyComments = () => {
  return (
    <View>
      <Text style={styles.text}>No Comments Yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.3)',
  },
});

export default NewsEmptyComments;

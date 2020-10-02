import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import styles from './styles';
import Block from '../../components/Block';
import ForYouMusicCard from '../../components/ForYouMusicCard';

const ForYouSeeAll = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return (
    <Block>
      <View style={styles.topTextContainer}>
        <Text style={styles.titleText}>
          A collection of All music recommended just for you. We hope you like
          it!
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        // ItemSeparatorComponent={() => (
        //   <Divider style={{ backgroundColor: '#6D676C' }} />
        // )}
        renderItem={() => {
          return <ForYouMusicCard />;
        }}
      />

      {/* <ForYouMusicCard />
      <ForYouMusicCard />
      <ForYouMusicCard />
      <ForYouMusicCard />
      <ForYouMusicCard />
      <ForYouMusicCard /> */}
    </Block>
  );
};

export default ForYouSeeAll;

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

import styles from './styles';
import Block from '../../components/Block';
import ArtistFollowCard from '../../components/ArtistFollowCard';
import NewsIconsCard from '../../components/NewsIconsCard';
import NewsCommentCard from '../../components/NewsCommentCard';
import SectionHeader from '../../components/SectionHeader';
import { newsComment } from '../../../Assets/Icons';
import RelatedNewsCard from '../../components/RelatedNewsCard';

const NewsDetails = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  return (
    <Block>
      <View style={styles.container}>
        <Image
          source={require('../../../Assets/Images/songCover4.jpg')}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.titleView}>
          <Text style={styles.title}>GOLD HAPPINESS - NEW SINGLES</Text>
          <Text style={styles.date}>12 November, 2017</Text>
        </View>
        <Text style={styles.blog} adjustsFontSizeToFit>
          The Rwandan Civil War was a civil war in Rwanda fought between the
          Rwandan Armed Forces, representing the government of Rwanda, and the
          rebel Rwandan Patriotic Front (RPF) from 1 October 1990 to 18 July
          1994. The war arose from the long-running dispute between the Hutu and
          Tutsi groups within the Rwandan population. A 1959–1962 revolution had
          replaced the Tutsi monarchy with a Hutu-led republic, forcing more
          than 336,000 Tutsi to seek refuge in neighbouring countries. A group
          of these refugees in Uganda founded the RPF which, under the
          leadership of Fred Rwigyema and Paul Kagame, became a battle-ready
          army by the late 1980s. The war began on 1 October 1990 when the RPF
          invaded north-eastern Rwanda, advancing 60 km (37 mi) into the
          country. They suffered a major setback when Rwigyema was killed in
          action on the second day. The Rwandan Army, assisted by troops from
          France, gained the upper hand and the RPF were largely defeated by the
          end of October. Kagame, who had been in the United States during the
          invasion, returned to take command. He withdrew troops to the Virunga
          Mountains for several months before attacking again. The RPF began a
          guerrilla war, which continued until mid-1992 with neither side able
          to gain the upper hand. A series of protests forced Rwandan President
          Juvénal Habyarimana to begin peace negotiations with the RPF and
          domestic opposition parties. Despite disruption and killings by Hutu
          Power, a group of extremists opposed to any deal, and a fresh RPF
          offensive in early 1993, the negotiations were successfully concluded
          with the signing of the Arusha Accords in August 1993.
        </Text>
        <View style={styles.authorView}>
          <Text style={styles.postBy}>Post by </Text>
          <Text style={styles.authorName}>Mark Johnson</Text>
        </View>
        <ArtistFollowCard />
        <NewsIconsCard />

        <View style={styles.commentButton}>
          <Text style={styles.commentButtonText}>Leave a comment</Text>
        </View>
        <View style={styles.commentSection}>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={() => {
              return <NewsCommentCard />;
            }}
          />
        </View>

        <SectionHeader icon={newsComment} name="Related News" />

        {/* <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={() => {
            return <RelatedNewsCard />;
          }}
        /> */}

        <RelatedNewsCard />
        <RelatedNewsCard />
        <RelatedNewsCard />
        <RelatedNewsCard />
        <RelatedNewsCard />
        <RelatedNewsCard />
        <RelatedNewsCard />
      </View>
    </Block>
  );
};

export default NewsDetails;

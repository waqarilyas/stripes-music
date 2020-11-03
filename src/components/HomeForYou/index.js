import React from 'react';
import { View } from 'react-native';

import SectionHeader from '../SectionHeader';
import ForYouTabs from '../../navigation/tabs/ForYouTabs';
import { musicHeartIcon } from '../../../Assets/Icons';

const HomeForYou = () => {
  return (
    <>
      <View>
        <SectionHeader
          name="For You"
          icon={musicHeartIcon}
          isRequired={false}
        />
        <ForYouTabs />
      </View>
    </>
  );
};

export default HomeForYou;

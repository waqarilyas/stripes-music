import React from 'react';
import { View } from 'react-native';

import SectionHeader from '../SectionHeader';
import ForYouTabs from '../../navigation/tabs/ForYouTabs';
import { musicIcon } from '../../../Assets/Icons';

const HomeForYou = () => {
  return (
    <>
      <View>
        <SectionHeader name="For You" icon={musicIcon} isRequired={false} />
        <ForYouTabs />
      </View>
    </>
  );
};

export default HomeForYou;

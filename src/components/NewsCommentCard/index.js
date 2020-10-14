import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import dayjs from 'dayjs';

import styles from './styles';

const relativeTime = require('dayjs/plugin/relativeTime');
const updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'seconds ago',
    m: 'minute ago',
    mm: '%d mins ago',
    h: 'an hour ago',
    hh: '%d hours ago',
    d: 'day ago',
    dd: '%d days ago',
    M: 'month ago',
    MM: '%d months ago',
    y: 'year ago',
    yy: '%d years ago',
  },
});

const NewsCommentCard = ({ image, comment, username, createdAt }) => {
  return (
    <View style={styles.container}>
      <Avatar size="medium" rounded source={{ uri: image }} />
      <View style={styles.detail}>
        <View style={styles.extra}>
          <Text style={styles.author}>{username}</Text>
          <Text style={styles.time}>
            {dayjs().from(dayjs(createdAt), true)}
          </Text>
        </View>
        <Text style={styles.comment}>{comment}</Text>
      </View>
    </View>
  );
};

export default NewsCommentCard;

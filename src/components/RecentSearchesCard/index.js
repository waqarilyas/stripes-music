import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Divider } from 'react-native-elements';

import { cancelIcon } from '../../../Assets/Icons';

const RecentSearchesCard = ({ title, createdAt }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subtitle}>{createdAt.toString()}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image source={cancelIcon} style={styles.cancelIcon} />
        </View>
      </View>
      <Divider style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  cancelIcon: {
    resizeMode: 'contain',
    height: RFValue('14'),
    width: RFValue('14'),
    tintColor: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: RFValue('10'),
    alignItems: 'center',
    paddingVertical: RFValue('15'),
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue('12'),
  },
  subtitle: {
    color: 'grey',
  },
  iconContainer: {
    backgroundColor: '#40363C',
    padding: RFValue('5'),
    borderRadius: RFValue('50'),
    flex: 1,
  },
  containerLeft: { flex: 20 },
  divider: {
    opacity: 0.5,
    width: '90%',
    alignSelf: 'center',
  },
});

export default RecentSearchesCard;

import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, Switch } from 'react-native';
import { nextIcon } from '../../../Assets/Icons';
import styles from './styles';

const EditProfileOverlayCard = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{ color: 'white' }}>{name}</Text>

      <Image source={nextIcon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default EditProfileOverlayCard;

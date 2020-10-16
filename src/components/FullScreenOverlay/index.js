import React, { useState } from 'react';
import { Text, FlatList, View, StyleSheet, Image } from 'react-native';
import { CheckBox, Divider, Overlay } from 'react-native-elements';
import randomize from 'randomatic';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { plusIcon } from '../../../Assets/Icons';

const FullScreenOverlay = ({ visible, toggleOverlay }) => {
  const [checked, setChecked] = useState(false);

  const data = ['1'];
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}
      ListEmptyComponent={() => <ActivityIndicator color="black" />}
      backdropStyle={{ backgroundColor: 'transparent' }}>
      <Text style={styles.overlayHeader}>Add To Playlist</Text>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={() => randomize('Aa0!', 10)}
        renderItem={({ item }) => {
          return (
            <CheckBox
              center
              title="Playlist 1"
              iconRight
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxInput}
              iconType="material"
              checkedIcon="clear"
              uncheckedIcon="add"
              checkedColor="red"
              checked={checked}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          );
        }}
      />
      <View style={styles.overlayBottom}>
        <Text style={styles.createPlaylistTitle}>Create New Playlist</Text>
        <Image source={plusIcon} style={styles.createIcon} />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#212121',
    height: '50%',
    width: '80%',
    borderRadius: hp('2'),
    paddingHorizontal: hp('2'),
  },
  checkboxContainer: {
    backgroundColor: 'black',
  },
  checkboxInput: {
    fontSize: hp('2'),
    color: 'white',
    marginRight: hp('10'),
  },
  overlayHeader: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('3'),
    marginVertical: hp('2'),
  },
  createPlaylistTitle: {
    color: 'white',
    fontSize: hp('2'),
  },
  createIcon: {
    resizeMode: 'contain',
    height: hp('2'),
    width: hp('2'),
  },
  overlayBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: hp('2'),
  },
});

export default FullScreenOverlay;

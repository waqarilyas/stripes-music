import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
  },
  title: {
    color: 'white',
  },
  subtitle: {
    color: 'grey',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  deleteIcon: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
  },
  duration: {
    color: 'grey',
  },
  avatar: {
    borderRadius: RFValue(10),
    height: RFValue(50),
    width: RFValue(50),
  },
});

export default styles;

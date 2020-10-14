import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
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

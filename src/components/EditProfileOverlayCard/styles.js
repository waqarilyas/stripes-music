import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp('2'),
    width: '100%',
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  icon: {
    resizeMode: 'contain',
    height: hp('2.5'),
    width: hp('2.5'),
    tintColor: 'white',
  },
});

export default styles;

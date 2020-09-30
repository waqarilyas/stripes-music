import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  header: {
    width: hp('22'),
    height: hp('22'),
    marginVertical: hp('1'),
    marginHorizontal: hp('1'),
    borderRadius: hp('2'),
  },
  view: {
    height: '100%',
  },
  iconPlacement: {
    position: 'absolute',
    bottom: 18,
    right: 18,
  },
  icon: {
    width: hp('10'),
    height: hp('10'),
  },
  text: {
    position: 'absolute',
    top: 15,
    left: 15,
    color: 'white',
    fontSize: hp('3'),
    fontWeight: 'bold',
  },
});

export default styles;

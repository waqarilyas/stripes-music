import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#F5138E',
    alignSelf: 'center',
    height: hp('6'),
    width: hp('16'),
    borderRadius: hp('1'),
    marginVertical: hp('4'),
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: hp('2'),
    textAlign: 'center',
    color: 'white',
  },
});

export default styles;

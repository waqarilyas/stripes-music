import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '100%',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: hp('4'),
    fontSize: hp('2'),
  },
  icon: {
    height: hp('22'),
    width: hp('22'),
  },
  buttonContainer: {
    backgroundColor: '#F5138E',
    paddingHorizontal: hp('3'),
    paddingVertical: hp('2'),
    marginTop: hp('3'),
    borderRadius: hp('3'),
  },
  titleStyle: {
    fontWeight: 'bold',
  },
});

export default styles;

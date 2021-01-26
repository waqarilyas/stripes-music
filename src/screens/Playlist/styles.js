import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: hp('4'),
    marginBottom: hp('2'),
  },
  image: {
    width: hp('15'),
    height: hp('15'),
    borderRadius: 20,
  },
  titleText: {
    fontSize: 30,
    marginTop: hp('5'),
    color: '#fff',
    fontWeight: 'bold',
  },
  songsHeaderContainer: {
    marginTop: hp('5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  songsSubContainer: {
    flexDirection: 'row',
  },
  songsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingRight: 6,
  },
  playallButtonContainer: {
    backgroundColor: '#F5138E',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: hp('18'),
  },
  playallButtonText: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 12,
  },
  optionsButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3F55',
  },
});

export default styles;

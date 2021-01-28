import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  backButtonContainer: {
    paddingRight: 15,
    paddingVertical: 10,
  },
  back: {
    resizeMode: 'contain',
    marginLeft: 18,
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
  itemMainContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: hp('2'),
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  itemSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  songTitleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  artistNameText: {
    fontSize: 16,
    color: 'silver',
    paddingTop: 4,
  },
  favSongButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  songDurationText: {
    color: 'silver',
    paddingHorizontal: wp('3'),
  },
});

export default styles;

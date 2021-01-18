import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: hp('1.8'),
    fontWeight: 'bold',
  },
  message: {
    color: 'gray',
    fontSize: hp('1.7'),
    marginTop: hp('1'),
  },
  unreadMessage: {
    color: 'gray',
    fontSize: hp('1.7'),
    fontWeight: 'bold',
    marginTop: hp('1'),
  },
  delete: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: 'gray',
    width: hp('3'),
    height: hp('3'),
  },
  badgeContainer: {
    alignSelf: 'flex-end',
  },
  iconStyle: {
    borderWidth: 2,
    borderColor: 'white',
  },
  badge: {
    backgroundColor: '#41D47B',
    height: 25,
    width: 25,
    borderRadius: 20,
    borderColor: '#41D47B',
    elevation: 0,
  },
  badgeText: {
    color: 'black',
    fontSize: hp('1.2'),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default styles;

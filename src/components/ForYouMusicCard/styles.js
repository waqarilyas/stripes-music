import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 22,
    justifyContent: 'space-between',
    flex: 1,
  },
  detail: {
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  image: {
    width: hp('18'),
    height: hp('18'),
    borderRadius: hp('1'),
    marginRight: hp('4'),
  },
  title: {
    color: 'white',
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#6D676C',
    fontWeight: 'bold',
    fontSize: hp('2'),
    marginBottom: hp('2'),
  },
  viewButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('1'),
  },
  viewButtonText: {
    color: 'black',
    paddingHorizontal: hp('5'),
    fontWeight: 'bold',
    paddingVertical: hp('0.5'),
  },
  background: {
    backgroundColor: '#6D676C',
    position: 'absolute',
    bottom: 5,
    right: 5,
    paddingHorizontal: hp('2'),
    borderRadius: hp('1'),
  },
  duration: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;

import { StyleSheet } from 'react-native';
import { sub } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const subtitle = {
  color: 'gray',
  fontSize: hp('1.5'),
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 12,
  },
  detail: {
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginRight: 16,
    overflow: 'hidden',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  author: {
    ...subtitle,
    fontWeight: 'bold',
    marginTop: 4,
  },
  label: {
    ...subtitle,
    marginLeft: hp('1'),
  },
  viewButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 12,
  },
  viewButtonText: {
    color: 'black',
    paddingHorizontal: 22,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  duration: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  icon: {
    height: hp('2'),
    width: hp('2'),
    resizeMode: 'contain',
    tintColor: 'gray',
  },
  iconWithLabel: {
    flexDirection: 'row',
    marginTop: hp('1'),
  },
});

export default styles;

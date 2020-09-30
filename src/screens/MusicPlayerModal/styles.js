import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 54,
    width: '100%',
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginHorizontal: 20,
  },
  musicPlayer: {
    flex: 6,
  },
  cardBottom: {
    alignItems: 'center',
    justifyContent: 'space-between',

    flex: 1,
  },
  iconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  subTitle: {
    color: '#696568',
  },
  icon: {
    marginVertical: 5,
  },
  cardTextView: {
    flex: 1,
  },
  cardRight: {
    flexDirection: 'row',
  },
});

export default styles;

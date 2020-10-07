import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'black',
    flexDirection: 'row',
    marginTop: 24,
  },
  artist: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  followers: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 12,
  },
  detail: {
    marginLeft: 12,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },
  leftContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  follow: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default styles;

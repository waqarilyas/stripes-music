import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'black',
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subContainer: {
    flexDirection: 'row',
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
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
  },
  leftContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
 
  follow: {
    backgroundColor: '#F5138E',
  },
  unfollow: {
    backgroundColor: '#778899',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
});


export default styles;

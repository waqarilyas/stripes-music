import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  star: {
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: RFValue(25),
  },
  rating: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(30),
  },
  bottomButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: RFValue(18),
    backgroundColor: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(35),
    borderRadius: RFValue(15),
    position: 'absolute',
    bottom: RFValue(10),
    // top: Dimensions.get('window').height - RFValue(250),
  },
  commentSection: {},
});

export default styles;

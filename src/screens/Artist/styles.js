import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: RFValue(30),
  },
  title: {
    color: 'white',
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginVertical: RFValue(5),
  },
  subtitle: {
    color: 'grey',
  },
  followButtontext: {
    color: 'white',
    backgroundColor: '#372B2F',
    position: 'absolute',
    bottom: 5,
    right: 0,
    paddingHorizontal: RFValue(40),
    paddingVertical: RFValue(10),
    borderRadius: RFValue(10),
    fontWeight: 'bold',
  },
  containerRight: {
    flexShrink: 1,
    paddingHorizontal: RFValue(10),
  },
});

export default styles;

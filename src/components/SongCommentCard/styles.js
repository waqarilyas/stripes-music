import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#312D31',
    padding: RFValue(20),
    borderRadius: RFValue(15),
    justifyContent: 'space-between',
    marginVertical: RFValue(20),
  },
  headerContainer: {
    marginBottom: RFValue(15),
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(20),
  },
  date: { color: 'grey' },
  rating: {
    marginRight: RFValue(10),
  },
  author: {
    color: 'grey',
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    lineHeight: RFValue(20),
  },
});

export default styles;

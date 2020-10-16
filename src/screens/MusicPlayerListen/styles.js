import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: RFValue(22),
    marginVertical: RFValue(20),
  },
});

export default styles;

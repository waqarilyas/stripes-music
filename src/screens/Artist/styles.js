import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: RFValue(30),
    backgroundColor: 'black',
  },
  containerRight: {
    flexShrink: 1,
    paddingHorizontal: RFValue(10),
    width: '100%',
    flex: 1,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginVertical: RFValue(5),
  },
  subtitle: {
    color: 'grey',
    fontSize: RFValue(12),
  },
  buttonContainer: {
    backgroundColor: '#F5138E',
    padding: RFValue(12),
    marginTop: RFValue(18),
    borderRadius: RFValue(8),
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default styles;

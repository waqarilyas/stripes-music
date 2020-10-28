import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RFValue('10'),
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue('18'),
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginTop: RFValue('10'),
  },
  retryButton: {
    backgroundColor: 'white',
    paddingVertical: RFValue('10'),
    paddingHorizontal: RFValue('50'),
    marginTop: RFValue('60'),
    borderRadius: RFValue('10'),
  },
  noInternetIcon: {
    resizeMode: 'contain',
    height: RFValue('130'),
    width: RFValue('130'),
  },
  retryButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default styles;

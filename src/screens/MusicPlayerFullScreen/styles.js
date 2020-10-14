import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(20),
    alignItems: 'center',
    // marginTop: 50,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(22),
  },
  icon: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
    marginHorizontal: RFValue(10),
    tintColor: 'white',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    resizeMode: 'contain',
    height: RFValue(15),
    width: RFValue(15),
    marginHorizontal: RFValue(10),
  },
});

export default styles;

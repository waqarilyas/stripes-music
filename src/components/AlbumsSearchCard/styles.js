import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    alignItems: 'center',
  },
  detail: {
    alignItems: 'flex-start',
    flexShrink: 1,
    flexDirection: 'row',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginRight: 16,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  subtitle: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 4,
  },

  viewButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  duration: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  countIcon: {
    resizeMode: 'contain',
    width: RFValue(20),
    height: RFValue(20),
    borderRadius: 8,
    marginRight: 16,
  },
  songCountContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  containerLeft: {},
});

export default styles;

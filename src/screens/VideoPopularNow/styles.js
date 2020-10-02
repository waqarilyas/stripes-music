import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 22,
  },
  item: {
    color: 'grey',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 3,
    paddingHorizontal: 18,
    backgroundColor: '#1C1C1C',
    borderRadius: 5,
  },
});

export default styles;

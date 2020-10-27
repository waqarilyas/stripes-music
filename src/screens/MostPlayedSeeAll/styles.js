import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  divider: {
    marginHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  topView: {
    alignItems: 'center',
    flexShrink: 1,
    marginVertical: 12,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 28,
    fontSize: 14,
    lineHeight: 24,
    marginHorizontal: 20,
  },
});

export default styles;

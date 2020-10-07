import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  extra: {
    flexDirection: 'row',
    marginBottom: 2,
    justifyContent: 'space-between',
    width: '100%',
  },
  detail: {
    flexShrink: 1,
    marginLeft: 12,
  },
  comment: {
    lineHeight: 20,
  },
  time: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 12,
  },
  author: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;

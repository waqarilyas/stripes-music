import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 12,
  },
  detail: {
    alignItems: 'flex-start',
    flexShrink: 1,
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
  viewButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 12,
  },
  viewButtonText: {
    color: 'black',
    paddingHorizontal: 22,
    fontWeight: 'bold',
    paddingVertical: 8,
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
});

export default styles;

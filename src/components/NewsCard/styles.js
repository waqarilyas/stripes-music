import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inner: {
    display: 'flex',
    flexDirection: 'row',
  },
  textInner: {
    flexDirection: 'column',
    marginLeft: 18,
    flexShrink: 1,
  },
  image: {
    resizeMode: 'cover',
    height: 100,
    width: 130,
    overflow: 'hidden',
    borderRadius: 12,
  },
  title: {
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 23,
  },
  date: {
    color: 'gray',
    marginTop: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  description: {
    color: 'gray',
    lineHeight: 20,
    fontWeight: '500',
    fontSize: 14,
    marginVertical: 16,
  },
  container: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSectionNumber: {
    color: 'gray',
    justifyContent: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  readButton: {
    padding: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  readText: {
    color: 'white',
    paddingVertical: 8,
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 12,
  },
  icons: {
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 12,
  },
  icon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginRight: 6,
    tintColor: 'gray',
  },
});

export default styles;

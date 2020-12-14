import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  imageContainer: {
    position: 'relative',
    marginHorizontal: 18,
    marginTop: -10,
    height: 400,
  },
  imageOverlay: {
    position: 'absolute',
    width: '100%',
    height: 400,
    top: 0,
    zIndex: 1,
    borderRadius: 8,
    opacity: 0.3,
  },
  image: {
    height: 400,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  detailContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    width: 200,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    width: 250,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
});

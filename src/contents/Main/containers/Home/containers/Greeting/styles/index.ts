import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

const greetMarginVertical = 16;

export default StyleSheet.create({
  greetContainer: {
    position: 'absolute',
    top: 50,
    left: greetMarginVertical,
  },
  greetText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardContainer: {
    borderRadius: 10,
    width: viewportWidth - greetMarginVertical * 4,
    height: viewportHeight * 0.35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0,
    marginTop: 0,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: viewportHeight * 0.23,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 5,
    marginBottom: 5,
  },
  subTitle: {
    marginVertical: 5,
  },
  wrapperStyle: {
    borderWidth: 0,
  },
});

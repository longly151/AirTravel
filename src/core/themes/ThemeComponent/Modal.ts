import AppView from '@utils/appView';
import Color from '../Color';
/**
 * Modal
 */
const { roundedBorderRadius } = AppView;
const width = 300;
const height = 150;

export const darkModal = {
  backgroundColor: Color.darkPrimaryBackground,
  textColor: Color.darkPrimaryText,
  roundedBorderRadius,
  width,
  height
};
export const lightModal = {
  backgroundColor: Color.lightPrimaryBackground,
  textColor: Color.lightPrimaryText,
  roundedBorderRadius,
  width,
  height
};

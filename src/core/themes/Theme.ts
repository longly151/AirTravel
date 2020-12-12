import { ThemeEnum } from '@contents/Config/redux/slice';
import { darkMap, lightMap } from './ThemeComponent/Map';
import { darkText, lightText } from './ThemeComponent/Text';
import { darkButton, lightButton } from './ThemeComponent/Button';
import { darkHeader, lightHeader } from './ThemeComponent/Header';
import { darkInput, lightInput } from './ThemeComponent/Input';
import { darkCheckBox, lightCheckBox } from './ThemeComponent/ListCheckBox';
import { darkDropdown, lightDropdown } from './ThemeComponent/Dropdown';
import { darkModal, lightModal } from './ThemeComponent/Modal';
import {
  darkParallaxScrollView,
  lightParallaxScrollView,
} from './ThemeComponent/ParallaxScrollView';
import { darkCard, lightCard } from './ThemeComponent/Card';
import Color from './Color';
import { darkListItem, lightListItem } from './ThemeComponent/ListItem';
import { lightCalendar, darkCalendar } from './ThemeComponent/Calendar';

/**
 * Theme
 */
export const darkTheme = {
  key: ThemeEnum.DARK,
  colors: {
    primary: Color.darkPrimary,
    secondary: Color.darkSecondary,
    success: Color.darkSuccess,
    warning: Color.darkWarning,
    error: Color.darkError,

    /**
     * Component Color
     */
    primaryBackground: Color.darkPrimaryBackground,
    secondaryBackground: Color.darkSecondaryBackground,
    primaryText: Color.darkPrimaryText,
    secondaryText: Color.darkSecondaryText,
    loading: Color.darkPrimary,
  },

  /**
   * Component
   */
  Text: darkText,
  Button: darkButton,
  Header: darkHeader,
  Input: darkInput,
  CheckBox: darkCheckBox,
  Dropdown: darkDropdown,
  Modal: darkModal,
  ParallaxScrollView: darkParallaxScrollView,
  Map: darkMap,
  Card: darkCard,
  Calendar: darkCalendar,
  ListItem: darkListItem,
};

export const lightTheme = {
  key: ThemeEnum.LIGHT,
  colors: {
    primary: Color.lightPrimary,
    secondary: Color.lightSecondary,
    success: Color.lightSuccess,
    warning: Color.lightWarning,
    error: Color.lightError,

    /**
     * Component Color
     */
    primaryBackground: Color.lightPrimaryBackground,
    secondaryBackground: Color.lightSecondaryBackground,
    primaryText: Color.lightPrimaryText,
    secondaryText: Color.lightSecondaryText,
    loading: Color.lightPrimary,
  },

  /**
   * Component
   */
  Text: lightText,
  Button: lightButton,
  Header: lightHeader,
  Input: lightInput,
  CheckBox: lightCheckBox,
  Dropdown: lightDropdown,
  Modal: lightModal,
  ParallaxScrollView: lightParallaxScrollView,
  Map: lightMap,
  Card: lightCard,
  Calendar: lightCalendar,
  ListItem: lightListItem,
};

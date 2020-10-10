import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const standardWidth = 375;
const standardHeight = 812;

const getBottomNavigationBarHeight = () => {
  try {
    const DeviceInfo = require('react-native-device-info');
    return DeviceInfo.hasNotch() ? 85 : 70;
  } catch (error) {
    return 70;
  }
};

const getHeaderHeight = () => {
  try {
    const DeviceInfo = require('react-native-device-info');
    if (Platform.OS === 'ios') {
      return DeviceInfo.hasNotch() ? 85 : 70;
    }
    return 85;
  } catch (error) {
    return 70;
  }
};

class CAppView {
  private static _instance: CAppView;

  private constructor() {
    // ...
  }

  public static get Instance(): CAppView {
    if (!this._instance) {
      this._instance = new this();
    }
    return CAppView._instance;
  }

  shadow = (color: string) => (
    Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: color,
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 4,
      },
    })
  );

  bottomNavigationBarHeight = getBottomNavigationBarHeight();

  headerHeight = getHeaderHeight();

  headerPaddingHorizontal = 18;

  bodyPaddingHorizontal = 18;

  roundedBorderRadius = 20;

  screenWidth = width < height ? width : height;

  screenHeight = width < height ? height : width;

  ratioH = height / standardHeight;

  ratioW = width / standardWidth;
}

const AppView = CAppView.Instance;
export default AppView;

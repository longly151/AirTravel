import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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

  shadow = Platform.select({
    android: {
      elevation: 10,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
    },
  });

  bottomNavigationBarHeight = 50;

  headerHeight = 50;

  headerPaddingHorizontal = 20;

  bodyPaddingHorizontal = 20;

  roundedBorderRadius = 20;

  screenWidth = width;

  screenHeight = height;

  isHorizontal = this.screenWidth > this.screenHeight;

  safeAreaInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
}

const AppView = CAppView.Instance;
export default AppView;

import React from 'react';
import {
  ThemeProvider, withTheme,
} from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { compose } from 'recompose';
import { lightTheme, darkTheme } from '@themes/Theme';
import i18n from '@config/i18n';
import { languageSelector, themeSelector } from '@contents/Config/redux/selector';
import AppHelper, { Global } from '@utils/appHelper';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { TObjectRedux } from '@utils/redux';
import { ThemeEnum } from '@contents/Config/redux/slice';
import Selector from '@utils/selector';
import SocketIOClient from 'socket.io-client';
import Config from 'react-native-config';
import Log from '@core/log';
import DeviceInfo from 'react-native-device-info';
import { firebase } from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import { utils } from '@react-native-firebase/app';
import moment from 'moment';
import { LocaleConfig } from 'react-native-calendars';
import AppNavigator from './app.navigator';

interface Props {
  language: string;
  colors: any;
  themeName: any;
  loginSelectorData: TObjectRedux;
}

interface State {
  hasShownNoInternet: boolean
}

class AppContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { loginSelectorData, language } = this.props;
    this.state = {
      hasShownNoInternet: false
    };
    if (loginSelectorData.data) {
      Global.token = loginSelectorData.data.token;
    }

    /**
     * Language
     */
    AppHelper.initCalendarLanguage();
    moment.locale(language);
    LocaleConfig.defaultLocale = language;
  }

  async componentDidMount() {
    if (!await DeviceInfo.isEmulator()) {
      Log.log('OPEN_APP');
    }

    NetInfo.addEventListener((state) => {
      const { isConnected } = state;
      const { hasShownNoInternet } = this.state;
      AppHelper.isConnected = isConnected;
      if (!hasShownNoInternet && !isConnected) {
        AppHelper.showNoConnectionMessage();
        this.setState({ hasShownNoInternet: true });
      }
      if (isConnected) {
        this.setState({ hasShownNoInternet: false });
      }
    });

    /**
     * Firebase Notification
     */
    this.requestNotificationPermission();
    this.messageListener();

    /**
     * Socket
     */
    this.onSocket();

    /**
     * Hide Splash Screen
     */
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }

  onSocket = () => {
    /**
     * Socket
     */
    const { token } = Global;
    // if (!window.location) {
    //   // App is running in simulator
    //   window.navigator.userAgent = 'ReactNative';
    // }

    // This must be below your `window.navigator` hack above
    Global.socket = SocketIOClient(Config.SOCKET_URL, {
      transports: ['websocket'], // you need to explicitly tell it to use websockets
      query: { token }
    });
  };

  requestNotificationPermission = async () => {
    // Don't run when using Firebase Test Lab
    if (!utils().isRunningInTestLab) {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled === 1) {
        const fcmToken = await firebase.messaging().getToken();
        Global.fcmToken = fcmToken;
        // eslint-disable-next-line no-console
        console.log('fcmToken', fcmToken);
      } else {
        const authorizationStatus = await firebase.messaging().requestPermission();
        if (authorizationStatus) {
          const fcmToken = await firebase.messaging().getToken();
          Global.fcmToken = fcmToken;
          // eslint-disable-next-line no-console
          console.log('fcmToken', fcmToken);
        }
      }
    }
  };

  messageListener = async () => {
    // Foreground
    const unsubscribe = firebase.messaging().onMessage(async (remoteMessage) => {
      AppHelper.showNotificationMessage(remoteMessage);
    });
    // Background & Quit
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {});
    return unsubscribe;
  };

  render() {
    const {
      language, themeName,
    } = this.props;

    /**
     * Change language
     */
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    /**
     * Theme
     */
    const themeColor: any = themeName === ThemeEnum.LIGHT ? lightTheme : darkTheme;

    return (
      <ThemeProvider theme={themeColor}>
        <AppNavigator />
        <FlashMessage position="top" />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: languageSelector(state),
  themeName: themeSelector(state),
  loginSelectorData: Selector.getObject(loginSelector, state),
});

export default compose(
  withTheme,
  connect(mapStateToProps, null),
)(AppContainer as any);

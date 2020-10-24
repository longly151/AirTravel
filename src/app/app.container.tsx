import React from 'react';
import {
  ThemeProvider, withTheme,
} from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { compose } from 'recompose';
import { lightTheme, darkTheme } from '@themes/Theme';
import i18n from '@config/i18n';
import { languageSelector, themeSelector } from '@contents/Config/redux/selector';
import { Global } from '@utils/appHelper';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { TObjectRedux } from '@utils/redux';
import { ThemeEnum } from '@contents/Config/redux/slice';
import Selector from '@utils/selector';
import SocketIOClient from 'socket.io-client';
import Config from 'react-native-config';
import AppNavigator from './app.navigator';

interface Props {
  language: string;
  t: any;
  colors: any;
  themeRedux: any;
  loginSelectorData: TObjectRedux;
}

interface State {
  isInternetCheck: boolean;
  isConnected: boolean;
}

class AppContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isInternetCheck: false,
      isConnected: true,
    };
    const { loginSelectorData } = this.props;
    if (loginSelectorData.data) {
      Global.token = loginSelectorData.data.token;
    }
  }

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      const { isInternetCheck } = this.state;
      const { isConnected } = state;
      if (!isConnected) {
        this.setState({
          isConnected: false,
        });
      }
      if (isInternetCheck && isConnected) {
        this.setState({
          isConnected: true,
          isInternetCheck: false,
        });
      }
    });

    /**
     * Socket
     */
    this.onSocket();
  }

  checkInternet = () => {
    this.setState({
      isInternetCheck: true,
    });
  };

  showNotConnectedMessage = () => {
    showMessage({
      message: 'No internet',
      type: 'danger',
      onPress: () => this.checkInternet(),
    });
  };

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

  render() {
    const {
      language, themeRedux,
    } = this.props;

    const { isConnected } = this.state;

    /**
     * Change language
     */
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    /**
     * Theme
     */
    const themeColor: any = themeRedux === ThemeEnum.LIGHT ? lightTheme : darkTheme;

    /**
     * Check Internet
     */
    if (!isConnected) this.showNotConnectedMessage();

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
  themeRedux: themeSelector(state),
  loginSelectorData: Selector.getObject(loginSelector, state),
});

export default compose(
  withTheme,
  withTranslation(),
  connect(mapStateToProps, null),
)(AppContainer as any);

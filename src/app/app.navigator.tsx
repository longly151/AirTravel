import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-elements';
import { themeSelector, requireLoginSelector } from '@contents/Config/redux/selector';
import { INITIAL_STATE, ThemeEnum, resetRequireLogin } from '@contents/Config/redux/slice';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootStack from '@contents/index.navigator';
import { NavigationService } from '@utils/navigation';

import { lightTheme, darkTheme } from '@themes/Theme';

interface Props {
  theme: any;
  themeRedux: any;
  updateTheme: (theme: any) => any;
  requireLogin: boolean;
  reduxResetRequireLogin: () => any;
}

interface State {
  barStyle: any;
}

const Stack = createStackNavigator();

class AppNavigator extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { requireLogin, reduxResetRequireLogin } = this.props;
    if (requireLogin !== INITIAL_STATE.requireLogin) reduxResetRequireLogin();
  }

  render() {
    const { themeRedux, theme, updateTheme } = this.props;
    /**
     * Handle Switch Theme
     */
    if (themeRedux !== theme.key) {
      const newTheme = lightTheme.key === themeRedux ? lightTheme : darkTheme;
      updateTheme(newTheme);
    }

    const barStyle = themeRedux === ThemeEnum.DARK ? 'dark-content' : 'light-content';
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
    }
    StatusBar.setBarStyle(barStyle, true);

    return (
      <NavigationContainer theme={DarkTheme} ref={NavigationService.navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="rootStack"
            component={RootStack}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  themeRedux: themeSelector(state),
  requireLogin: requireLoginSelector(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxResetRequireLogin: () => dispatch(resetRequireLogin()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AppNavigator as any));

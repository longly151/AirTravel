import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from '@contents/Auth/containers/index.stack';
import { useSelector } from 'react-redux';
import Color from '@themes/Color';
import Selector from '@utils/selector';
import MainBottomTab from '@contents/Main/index.bottomtab';
import AppView from '@utils/appView';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ExampleStack from './Example/index.stack';
import { requireLoginSelector, themeSelector } from './Config/redux/selector';
import { loginSelector } from './Auth/containers/Login/redux/selector';
import { ThemeEnum } from './Config/redux/slice';
import ChatStack from './Example/containers/Common/Chat/index.stack';
import MoreStack from './Main/containers/More/index.stack';
import ServiceStack from './Service/index.stack';
import HomeStack from './Main/containers/Home/index.stack';
import FavoriteStack from './Main/containers/Favorite/index.stack';
import TripStack from './Main/containers/Trip/index.stack';
import NotificationStack from './Main/containers/Notification/index.stack';

const Stack = createStackNavigator();

export default function MainStack() {
  const themeSelectorData = useSelector((state) => themeSelector(state));
  const backgroundColor = themeSelectorData === ThemeEnum.LIGHT
    ? Color.lightPrimaryBackground
    : Color.darkPrimaryBackground;

  function NavigationCase() {
    const requireLogin = useSelector((state) => requireLoginSelector(state));
    const loginSelectorData = useSelector((state) => Selector.getObject(loginSelector, state));
    const isNotLoginWhenRequired = !!(requireLogin && !loginSelectorData.data.token);

    if (isNotLoginWhenRequired) return AuthStack();
    return (
      <>
        <Stack.Screen
          name="mainBottomTab"
          component={MainBottomTab}
        />
        {AuthStack()}
      </>
    );
  }

  /**
   * Handle Screen Metrics & SafeAreaInsets
   */
  function onDimensionChange({ window }: any) {
    AppView.screenWidth = window.width;
    AppView.screenHeight = window.height;
    AppView.isHorizontal = window.width > window.height;
  }
  useEffect(() => {
    Dimensions.addEventListener('change', onDimensionChange);
  });
  const insets = useSafeAreaInsets();
  AppView.safeAreaInsets = insets;

  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor },
        gestureEnabled: true,
      }}
    >
      {NavigationCase()}
      {ExampleStack()}
      {HomeStack()}
      {FavoriteStack()}
      {TripStack()}
      {NotificationStack()}
      {MoreStack()}
      {ChatStack()}
      {ServiceStack()}
    </Stack.Navigator>
  );
}

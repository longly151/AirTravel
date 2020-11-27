/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Icon, withTheme, withBadge } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { StyleSheet } from 'react-native';
import Selector from '@utils/selector';
import { ThemeEnum } from '@contents/Config/redux/slice';
import AppView from '@utils/appView';
import i18next from 'i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import homeStack from './containers/Home/routes';
import favoriteStack from './containers/Favorite/routes';
import tripStack from './containers/Trip/routes';
import notificationStack from './containers/Notification/routes';
import moreStack from './containers/More/routes';
import HomeScreen from './containers/Home/screens';
import MoreScreen from './containers/More/screens';
import FavoriteListScreen from './containers/Favorite/screens';
import TripListScreen from './containers/Trip/screens';
import NotificationListScreen from './containers/Notification/screens';
import ExampleListScreen from '../Example/screens/index';

const BottomTabs = createBottomTabNavigator();

function MainBottomTab(props: any) {
  const insets = useSafeAreaInsets();
  const { theme: { colors: { primaryBackground, secondaryBackground, primary }, key } } = props;
  const loginSelectorData = useSelector((state) => Selector.getObject(loginSelector, state));
  const isNotLogin = !loginSelectorData.data.token;

  const backgroundColor = key === ThemeEnum.LIGHT ? primaryBackground : secondaryBackground;
  const BadgedIcon = withBadge(1)(Icon);

  /**
   * Handle Screen Metrics & SafeAreaInsets
   */
  const height = AppView.bottomNavigationBarHeight + insets.bottom;
  const customStyle: any = {};
  if (!insets.bottom && !AppView.isHorizontal) customStyle.paddingBottom = 5;
  if (insets.bottom && !AppView.isHorizontal) {
    customStyle.paddingTop = 10;
  } else if (!insets.bottom && !AppView.isHorizontal) {
    customStyle.paddingTop = 5;
  }
  if (insets.bottom && AppView.isHorizontal) {
    customStyle.maxHeight = height - 15;
  } else if (!insets.bottom && AppView.isHorizontal) {
    customStyle.maxHeight = height - 10;
  }

  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: primary,
        inactiveTintColor: primary,
        style: StyleSheet.flatten([
          {
            height,
            borderTopLeftRadius: AppView.roundedBorderRadius,
            borderTopRightRadius: AppView.roundedBorderRadius,
            borderTopColor: 'transparent',
            justifyContent: 'center',
            backgroundColor,
          },
          customStyle,
          AppView.shadow
        ]),
        tabStyle: {
          borderRadius: 20,
        },
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTabs.Screen
        name={homeStack.index}
        component={HomeScreen}
        options={{
          tabBarLabel: i18next.t('bottom_tab:home'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="home"
              type="material-community"
              color={color}
              size={28}
            />
          ) : (
            <Icon name="home-outline" type="material-community" color={color} size={24} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={favoriteStack.index}
        component={FavoriteListScreen}
        options={{
          tabBarLabel: i18next.t('bottom_tab:favorite'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="heart"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon name="heart-outline" type="material-community" color={color} size={22} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={tripStack.index}
        component={TripListScreen}
        options={{
          tabBarLabel: i18next.t('bottom_tab:trip'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="airplane-takeoff"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon name="airplane-landing" type="material-community" color={color} size={22} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={notificationStack.index}
        // component={ExampleListScreen}
        component={NotificationListScreen}
        options={{
          tabBarLabel: i18next.t('bottom_tab:notification'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="bell"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon name="bell-outline" type="material-community" color={color} size={22} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={moreStack.index}
        component={MoreScreen}
        options={{
          tabBarLabel: i18next.t('bottom_tab:profile'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon name="account-circle" type="material-community" color={color} size={26} />
          ) : (
            <Icon name="account-circle-outline" type="material-community" color={color} size={22} />
          )),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default withTheme(MainBottomTab);

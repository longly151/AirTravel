/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Icon, withTheme, withBadge } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { compose } from 'recompose';
import { useSelector } from 'react-redux';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { StyleSheet } from 'react-native';
import Selector from '@utils/selector';
import { ThemeEnum } from '@contents/Config/redux/slice';
import AppView from '@utils/appView';
import Color from '@themes/Color';
import i18next from 'i18next';
import homeStack from './containers/Home/routes';
import favoriteStack from './containers/Favorite/routes';
import tripStack from './containers/Trip/routes';
import notificationStack from './containers/Notification/routes';
import moreStack from './containers/More/routes';
import HomeScreen from './containers/Home/screens';
import MoreScreen from './containers/More/screens';
import FavoriteListScreen from './containers/Favorite/screens';
import TripListScreen from './containers/Trip/screens';
import ExampleListScreen from '../Example/screens/index';

const BottomTabs = createBottomTabNavigator();

function MainBottomTab(props: any) {
  const { theme: { colors: { primaryBackground, secondaryBackground, primary }, key }, t } = props;
  const loginSelectorData = useSelector((state) => Selector.getObject(loginSelector, state));
  const isNotLogin = !loginSelectorData.data.token;
  const backgroundColor = key === ThemeEnum.LIGHT ? primaryBackground : secondaryBackground;
  const BadgedIcon = withBadge(1)(Icon);

  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: primary,
        inactiveTintColor: primary,
        style: StyleSheet.flatten([
          {
            height: AppView.bottomNavigationBarHeight,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 5,
            borderTopColor: 'transparent',
            padding: 10,
            backgroundColor,
          },
          key === ThemeEnum.LIGHT
            ? {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,
              elevation: 9,
            }
            : {
              borderWidth: 1,
              borderTopColor: Color.darkPrimary,
              borderLeftColor: Color.darkPrimary,
              borderRightColor: Color.darkPrimary,
            },
        ]),
        tabStyle: {
          backgroundColor,
          height: 55,
          paddingTop: 8,
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
        component={ExampleListScreen}
        options={{
          tabBarLabel: i18next.t('bottom_tab:notification'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <BadgedIcon
              name="bell"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <BadgedIcon name="bell-outline" type="material-community" color={color} size={22} />
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

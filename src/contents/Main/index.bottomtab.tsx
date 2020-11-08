/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Icon, withTheme } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTranslation } from 'react-i18next';
import { compose } from 'recompose';
import { useSelector } from 'react-redux';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import Selector from '@utils/selector';
import AppView from '@utils/appView';
import MoreScreen from './containers/More/screens/index';
import ExampleListScreen from '../Example/screens/index';
import moreStack from './containers/More/routes';
import homeStack from './containers/Home/routes';

const BottomTabs = createBottomTabNavigator();

function MainBottomTab(props: any) {
  const { theme: { colors: { secondaryBackground, primary } }, t } = props;
  const loginSelectorData = useSelector((state) => Selector.getObject(loginSelector, state));
  const isNotLogin = !loginSelectorData.data.token;

  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: primary,
        inactiveTintColor: primary,
        style: {
          height: AppView.bottomNavigationBarHeight,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopColor: 'transparent',
          backgroundColor: secondaryBackground,
        },
        tabStyle: {
          backgroundColor: secondaryBackground,
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
        component={ExampleListScreen}
        options={{
          tabBarLabel: t('bottom_tab:home'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="home"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon name="home-outline" type="material-community" color={color} size={22} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={moreStack.index}
        component={MoreScreen}
        options={{
          tabBarLabel: t('bottom_tab:more'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon name="bars" type="font-awesome" color={color} size={20} />
          ) : (
            <Icon name="bars" type="font-awesome" color={color} size={16} />
          )),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default compose(
  withTheme,
  withTranslation(),
)(MainBottomTab);

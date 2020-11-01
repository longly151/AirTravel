import * as React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import MainBottomTab from '@contents/Main/index.bottomtab';
import AuthStack from '@contents/Auth/containers/index.stack';
import { useSelector } from 'react-redux';
import Color from '@themes/Color';
import Selector from '@utils/selector';
import rootStack from './routes';
import ModalStack from './Modal/index.stack';
import ExampleStack from './Example/index.stack';
import { requireLoginSelector, themeSelector } from './Config/redux/selector';
import { loginSelector } from './Auth/containers/Login/redux/selector';
import { ThemeEnum } from './Config/redux/slice';
import commonStack from './Example/containers/Common/routes';
import ChatExampleStack from './Example/containers/Common/Chat/index.stack';

const Stack = createStackNavigator();

export default function RootStack() {
  const requireLogin = useSelector((state) => requireLoginSelector(state));
  const loginSelectorData = useSelector((state) => Selector.getObject(loginSelector, state));
  const themeSelectorData = useSelector((state) => themeSelector(state));
  const isNotLogin = !!(requireLogin && !loginSelectorData.data.token);
  const backgroundColor = themeSelectorData === ThemeEnum.LIGHT
    ? Color.lightPrimaryBackground
    : Color.darkPrimaryBackground;
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor },
        gestureEnabled: true,
      }}
    >
      {
        isNotLogin ? (
          <Stack.Screen
            name={rootStack.authStack}
            component={AuthStack}
          />
        ) : (
          <Stack.Screen
            name={rootStack.mainBottomTab}
            component={MainBottomTab}
          />
        )
      }
      {
        !requireLogin ? (
          <Stack.Screen
            name={rootStack.authStack}
            component={AuthStack}
          />
        ) : null
      }
      <Stack.Screen
        name={rootStack.exampleStack}
        component={ExampleStack}
      />
      <Stack.Screen
        name={rootStack.modalStack}
        component={ModalStack}
        options={{
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen name={commonStack.chat} component={ChatExampleStack} />
    </Stack.Navigator>
  );
}

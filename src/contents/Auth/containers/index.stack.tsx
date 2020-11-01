import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import authStack from './routes';
import LoginScreen from './Login';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name={authStack.loginScreen} component={LoginScreen} />
    </Stack.Navigator>
  );
}

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import authStack from './routes';
import LoginScreen from './Login';
import RegisterScreen from './Register';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <>
      <Stack.Screen name={authStack.loginScreen} component={LoginScreen} />
      <Stack.Screen
        name={authStack.registerScreen}
        component={RegisterScreen}
      />
    </>
  );
}

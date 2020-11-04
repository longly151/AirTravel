import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import meStack from './routes';
import MeScreen from './screens';

const Stack = createStackNavigator();

export default function MeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={meStack.index} component={MeScreen} />
    </Stack.Navigator>
  );
}

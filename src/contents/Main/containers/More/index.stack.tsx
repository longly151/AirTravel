import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import moreStack from './routes';
import MoreScreen from './screens';

const Stack = createStackNavigator();

export default function MoreStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={moreStack.index} component={MoreScreen} />
    </Stack.Navigator>
  );
}

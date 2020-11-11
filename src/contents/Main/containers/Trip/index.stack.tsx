import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TripListScreen from './screens';
import tripStack from './routes';

const Stack = createStackNavigator();

export default function TripStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={tripStack.index} component={TripListScreen} />
    </Stack.Navigator>
  );
}

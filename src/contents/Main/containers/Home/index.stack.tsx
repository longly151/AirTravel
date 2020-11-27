import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens';
import ListServicesScreen from '../../../Service/containers/List';
import homeStack from './routes';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <>
      <Stack.Screen name={homeStack.index} component={HomeScreen} />
      <Stack.Screen name={homeStack.service} component={ListServicesScreen} />
    </>
  );
}

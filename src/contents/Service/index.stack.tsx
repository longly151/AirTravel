import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import serviceStack from './routes';
// import ListServicesScreen from './containers/List/screens';
import DetailServiceStack from './containers/Detail/index.stack';

const Stack = createStackNavigator();

export default function ServiceStacks() {
  return (
    <>
      {/* <Stack.Screen name={serviceStack.list} component={ListServicesScreen} /> */}
      <Stack.Screen name={serviceStack.detail} component={DetailServiceStack} />
    </>
  );
}

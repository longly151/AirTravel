import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import serviceStack from './routes';
// import ListServicesScreen from './containers/List/screens';
import FilterServicesScreen from './containers/Filter/screens';
import SearchServicesScreen from './containers/Search/screens';
import DetailServiceStack from './containers/Detail/index.stack';

const Stack = createStackNavigator();

export default function ServiceStacks() {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      {/* <Stack.Screen name={serviceStack.list} component={ListServicesScreen} /> */}
      <Stack.Screen
        name={serviceStack.filter}
        component={FilterServicesScreen}
      />
      <Stack.Screen
        name={serviceStack.search}
        component={SearchServicesScreen}
      />
      <Stack.Screen name={serviceStack.detail} component={DetailServiceStack} />
    </Stack.Navigator>
  );
}

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import detailServiceStack from './routes';
import DetailServicesScreen from './screens';
import SelectDateService from './containers/SelectDate/screens';
import PayServiceScreen from './containers/Payment/screens';

const Stack = createStackNavigator();

export default function DetailServiceStacks() {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen
        name={detailServiceStack.index}
        component={DetailServicesScreen}
      />
      <Stack.Screen
        name={detailServiceStack.selectDate}
        component={SelectDateService}
      />
      <Stack.Screen
        name={detailServiceStack.pay}
        component={PayServiceScreen}
      />
    </Stack.Navigator>
  );
}

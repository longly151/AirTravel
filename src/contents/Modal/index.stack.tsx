import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import modal from './routes';
import DefaultModal from './DefaultModal';

const Stack = createStackNavigator();

export default function ModalStack() {
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name={modal.defaultModal} component={DefaultModal} />
    </Stack.Navigator>
  );
}

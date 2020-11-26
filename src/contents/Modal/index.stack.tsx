import * as React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import modalStack from './routes';
import DefaultModal from './DefaultModal';
import MapScreen from '../Main/containers/Home/Map';

const Stack = createStackNavigator();

export default function ModalStack() {
  return (
    <>
      <Stack.Screen
        name={modalStack.defaultModal}
        component={DefaultModal}
        options={{
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name={modalStack.mapModal}
        component={MapScreen}
        options={{
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </>
  );
}

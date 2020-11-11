import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExampleStack from '@contents/Example/index.stack';
// import NotificationListScreen from './screens';
import notificationStack from './routes';

const Stack = createStackNavigator();

export default function NotificationStack() {
  return (
    <>
      {/* <Stack.Screen name={notificationStack.index} component={NotificationListScreen} /> */}
      <Stack.Screen name={notificationStack.index} component={ExampleStack} />
    </>
  );
}

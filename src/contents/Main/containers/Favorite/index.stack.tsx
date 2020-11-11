import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteListScreen from './screens';
import favoriteStack from './routes';

const Stack = createStackNavigator();

export default function FavoriteStack() {
  return (
    <>
      <Stack.Screen name={favoriteStack.index} component={FavoriteListScreen} />
    </>
  );
}

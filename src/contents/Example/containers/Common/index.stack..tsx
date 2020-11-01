import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import commonStack from './routes';
import TextExample from './Text';
import HeaderExample from './Header';
import ButtonExample from './Button';
import AvatarExample from './Avatar';
import PickerExample from './Picker';
import InputExample from './Input';
import ListCheckBoxExample from './ListCheckBox';
import BottomModalSelectExample from './BottomModalSelect';
import FlatListExampleStack from './FlatList/index.stack';
import ImageExample from './Image';
import DropdownExample from './Dropdown';
import ModalExample from './Modal';
import DateTimePickerExample from './DateTimePicker';
import ImagePickerButtonExample from './ImagePickerButton';
import WebViewExample from './WebView';
import FileExample from './File';
import LoadingExample from './Loading';

const Stack = createStackNavigator();

export default function CommonExampleStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={commonStack.text} component={TextExample} />
      <Stack.Screen name={commonStack.header} component={HeaderExample} />
      <Stack.Screen name={commonStack.button} component={ButtonExample} />
      <Stack.Screen name={commonStack.avatar} component={AvatarExample} />
      <Stack.Screen name={commonStack.picker} component={PickerExample} />
      <Stack.Screen name={commonStack.imagePickerButton} component={ImagePickerButtonExample} />
      <Stack.Screen name={commonStack.dateTimePicker} component={DateTimePickerExample} />
      <Stack.Screen name={commonStack.input} component={InputExample} />
      <Stack.Screen name={commonStack.flatList} component={FlatListExampleStack} />
      <Stack.Screen name={commonStack.image} component={ImageExample} />
      <Stack.Screen name={commonStack.listCheckBox} component={ListCheckBoxExample} />
      <Stack.Screen name={commonStack.bottomModalSelect} component={BottomModalSelectExample} />
      <Stack.Screen name={commonStack.dropdown} component={DropdownExample} />
      <Stack.Screen name={commonStack.modal} component={ModalExample} />
      <Stack.Screen name={commonStack.webView} component={WebViewExample} />
      <Stack.Screen name={commonStack.file} component={FileExample} />
      <Stack.Screen name={commonStack.loading} component={LoadingExample} />
    </Stack.Navigator>
  );
}

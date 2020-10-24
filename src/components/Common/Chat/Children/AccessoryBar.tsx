import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import AppView from '@utils/appView';
import QuickView from '../../View/QuickView';

class AccessoryBar extends PureComponent {
  render() {
    return (
      <QuickView
        row
        alignItems="center"
        width={70}
        height={44}
      >
        <TouchableOpacity containerStyle={{ flex: 1 }}>
          <Icon type="material" name="camera" size={30} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity containerStyle={{ flex: 1 }}>
          <Icon type="material" name="my-location" size={30} color="grey" />
        </TouchableOpacity>
      </QuickView>
    );
  }
}

export default AccessoryBar;

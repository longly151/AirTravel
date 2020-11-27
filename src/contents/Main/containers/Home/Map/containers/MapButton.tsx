import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';
import modalStack from '@contents/Modal/routes';

class MapButton extends PureComponent {
  render() {
    return (
      <Icon
        name="map-search-outline"
        size={22}
        onPress={() => NavigationService.navigate(modalStack.mapModal)}
      />
    );
  }
}

export default MapButton;

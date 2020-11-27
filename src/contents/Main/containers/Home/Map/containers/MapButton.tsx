import React, { PureComponent } from 'react';
import { Button } from '@components';
import { NavigationService } from '@utils/navigation';
import modalStack from '@contents/Modal/routes';

class MapButton extends PureComponent {
  render() {
    return (
      <Button
        title="Go to map"
        onPress={() => NavigationService.navigate(modalStack.mapModal)}
      />
    );
  }
}

export default MapButton;

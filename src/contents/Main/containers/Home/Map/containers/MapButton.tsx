import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';
import modalStack from '@contents/Modal/routes';
import { withTheme } from 'react-native-elements';

interface Props {
  theme?: any;
}

class MapButton extends PureComponent<Props> {
  render() {
    const { theme } = this.props;
    return (
      <Icon
        name="map-search-outline"
        size={22}
        color={theme.colors.primaryText}
        onPress={() => NavigationService.navigate(modalStack.mapModal)}
      />
    );
  }
}

export default withTheme(MapButton as any);

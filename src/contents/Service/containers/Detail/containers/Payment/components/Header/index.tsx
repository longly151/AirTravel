import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView, Text } from '@components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';

interface Props {
  theme?: any;
}

class Header extends PureComponent<Props> {
  render() {
    return (
      <>
        <QuickView row alignItems="center" justifyContent="space-between">
          <Icon
            name="arrow-left"
            size={26}
            onPress={() => NavigationService.goBack()}
          />
          <Text bold fontSize={20}>
            Confirm and pay
          </Text>
          <Icon name="arrow-left" size={26} color="transparent" />
        </QuickView>
      </>
    );
  }
}

export default withTheme(
  (Header as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

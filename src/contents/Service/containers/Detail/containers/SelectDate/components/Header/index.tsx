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
          <Text bold>Clear</Text>
        </QuickView>

        <QuickView marginTop={20}>
          <Text fontSize={24} bold>
            Select dates
          </Text>
          <Text fontSize={20} marginTop={10}>
            Add your travel dates for exact pricing.
          </Text>
        </QuickView>
      </>
    );
  }
}

export default withTheme(
  (Header as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

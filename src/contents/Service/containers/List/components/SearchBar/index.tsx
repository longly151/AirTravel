import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { QuickView } from '@components';
import { NavigationService } from '@utils/navigation';
import serviceRoutes from '../../../../routes';

interface Props {
  theme?: any;
  serviceCategoryId?: Array<number>;
}

class SearchBar extends PureComponent<Props> {
  render() {
    const { serviceCategoryId } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.9}>
        <QuickView
          backgroundColor="#fff"
          row
          alignItems="center"
          justifyContent="space-between"
          padding={10}
          borderRadius={8}
          borderWidth={2}
          marginTop={60}
          marginHorizontal={18}
          onPress={() => {
            NavigationService.navigate(serviceRoutes.search);
          }}
        >
          <QuickView row alignItems="center">
            <Icon name="magnify" size={24} />
            {/* <Text marginLeft={10}>Ho Chi Minh</Text> */}
          </QuickView>
          <Icon
            name="filter-outline"
            size={22}
            onPress={() => {
              NavigationService.navigate(serviceRoutes.filter, {
                id: serviceCategoryId,
              });
            }}
          />
        </QuickView>
      </TouchableOpacity>
    );
  }
}

export default withTheme(
  (SearchBar as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

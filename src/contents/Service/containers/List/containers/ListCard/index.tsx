import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView, Text, Image } from '@components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';
import CardService from './components/CardService';
import homeStack from '../../../../../Main/containers/Home/routes';

interface Props {
  data: Array<any>;
  total: number;
  theme?: any;
}

class ListCard extends PureComponent<Props> {
  render() {
    const { data, total } = this.props;
    return (
      <QuickView
        backgroundColor="#fff"
        marginTop={300}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        paddingHorizontal={18}
      >
        <QuickView
          row
          alignItems="center"
          justifyContent="space-between"
          marginTop={22}
        >
          <Icon
            name="arrow-left"
            size={24}
            onPress={() => NavigationService.navigate(homeStack.index)}
          />
          <Text fontSize={18} bold>
            {`${total} services to enjoy`}
          </Text>
          <Icon name="arrow-left" size={24} color="#fff" />
        </QuickView>
        <QuickView column marginTop={50}>
          {data && total > 0 ? (
            data.map((e: any) => <CardService data={e} key={e.id} />)
          ) : (
            <Image
              source={{
                uri:
                  'https://cdn.dribbble.com/users/634336/screenshots/2246883/_____.png',
              }}
              height={300}
            />
          )}
        </QuickView>
      </QuickView>
    );
  }
}

export default withTheme(
  (ListCard as any) as React.ComponentType<Props & ThemeProps<any>>,
);

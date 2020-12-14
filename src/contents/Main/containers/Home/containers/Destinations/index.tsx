import React, { PureComponent } from 'react';
import { ThemeProps, withTheme } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { QuickView, Text, FlatList, Image } from '@components';
import { NavigationService } from '@utils/navigation';
import destinations from './data';
import homeStack from '../../routes';

// import destinationsStyle from './styles';

interface Props {
  theme?: any;
}

class Destinations extends PureComponent<Props> {
  renderItem = ({ item, index }: { item: any; index: any }) => (
    <QuickView marginHorizontal={18} width={index === 1 ? 375 : 300}>
      {item.map((e: any) => (
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate(homeStack.service);
          }}
          key={e.id}
        >
          <QuickView row marginBottom={12}>
            <Image
              source={{ uri: e.illustration }}
              width={80}
              height={80}
              borderRadius={12}
            />
            <QuickView marginLeft={12} justifyContent="center">
              <Text fontSize={18} bold>
                {e.title}
              </Text>
              <QuickView row alignItems="center">
                <Text bold>{`$${e.averagePrice}`}</Text>
                <Text fontSize={14}>/night avg</Text>
              </QuickView>
            </QuickView>
          </QuickView>
        </TouchableOpacity>
      ))}
    </QuickView>
  );

  render() {
    return (
      <QuickView marginTop={20} marginBottom={30}>
        <Text
          fontSize={24}
          bold
          marginBottom={30}
          marginLeft={18}
          t="home:destination"
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={destinations}
          renderItem={this.renderItem}
        />
      </QuickView>
    );
  }
}
export default withTheme(
  (Destinations as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

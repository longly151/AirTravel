import React from 'react';
import { StyleSheet } from 'react-native';
import AppHelper from '@utils/appHelper';
import { ThemeEnum } from '@contents/Config/redux/slice';
import AppView from '@utils/appView';
import {
  QuickView,
  Text,
  Header,
  Button,
  withPureList,
} from '@components';
import { Card } from 'react-native-elements';
import { FilterProps } from '@components/Hoc/withPureList';
import { NavigationService } from '@utils/navigation';
import productStack from '../../routes';

const renderItem = ({ item }: { item: any }, themeName: ThemeEnum) => {
  const theme = AppHelper.getThemeByName(themeName);
  const containerStyle = StyleSheet.flatten([
    {
      borderRadius: 10,
      margin: 0,
      borderWidth: 0,
    },
    theme.key === ThemeEnum.LIGHT && AppView.shadow,
  ]);
  const wrapperStyle = StyleSheet.flatten([
    { borderRadius: 10 },
    {
      backgroundColor:
        theme.key === ThemeEnum.LIGHT
          ? theme.colors.white
          : theme.colors.grey8,
    },
  ]);

  return (
    <QuickView
      backgroundColor={
        theme.key === ThemeEnum.LIGHT
          ? '#E6EDFF'
          : theme.colors.secondaryBackground
      }
      borderRadius={10}
      marginVertical={10}
      paddingHorizontal={theme.key === ThemeEnum.LIGHT ? 1 : 0}
      onPress={() => NavigationService.navigate(
        productStack.pureProductDetail,
        AppHelper.setItemIntoParams(item),
      )}
    >
      <Card
        image={{
          uri: item.thumbnail,
        }}
        imageProps={{ borderRadius: 10 }}
        containerStyle={containerStyle}
        wrapperStyle={wrapperStyle}
      >
        <Text
          marginLeft={10}
          numberOfLines={1}
          marginRight={35}
          bold
          fontSize={18}
          color={theme.colors.primary}
        >
          {item.viTitle}
        </Text>
        <Text
          marginLeft={10}
          marginTop={5}
          fontSize={12}
          color={theme.colors.secondary}
        >
          {item.destinations[0]?.address || '123 Le Duan'}
        </Text>
      </Card>
      <QuickView
        row
        paddingHorizontal={20}
        paddingBottom={10}
        paddingVertical={10}
      >
        <QuickView flex={5}>
          <Text color={theme.colors.secondary} fontSize={12}>
            Giá
          </Text>
          <Text color={theme.colors.primary} fontSize={18}>
            {`${item.price} đ`}
          </Text>
        </QuickView>
      </QuickView>
    </QuickView>
  );
};

function PureProductListScreen(props: FilterProps) {
  function handleFilter() {
    const { filter, applyFilter } = props;
    filter.mergeFilter('viTitle', '$contL', 'Sunny');
    applyFilter();
  }

  function clearFilter() {
    const { filter, applyFilter } = props;
    filter.clearFilter();
    applyFilter();
  }

  return (
    <>
      <Header backIcon title="FlatList" shadow switchTheme />
      <QuickView row center>
        <Button title="Filter" center titlePaddingHorizontal={20} paddingHorizontal={5} onPress={handleFilter} />
        <Button title="Clear Filter" center titlePaddingHorizontal={20} paddingHorizontal={5} onPress={clearFilter} />
      </QuickView>
    </>
  );
}

export default withPureList({
  url: '/services',
  fields: ['id', 'enTitle', 'viTitle', 'price', 'thumbnail'],
  renderItem,
})(PureProductListScreen);

import React from 'react';
import {
  QuickView,
  Header,
  Text,
  Button,
  withPureList,
} from '@components';
import { Card } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { NavigationService } from '@utils/navigation';
import AppHelper from '@utils/appHelper';
import { ThemeEnum } from '@contents/Config/redux/slice';
import AppView from '@utils/appView';
import withReduxList, { FilterProps } from '@components/Hoc/withReduxList';
import { productGetList, productSetFilter, CONSTANT } from '../redux/slice';
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
        productStack.productDetail,
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

function ProductListScreen(props: FilterProps) {
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

  // // [Optional] ExtraData || ReduxExtraData
  // console.log('props.moreDetail', props.moreDetail);

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

export default withReduxList({
  dispatchGetList: productGetList,
  dispatchFilter: productSetFilter,
  constant: {
    PARENT_NAME: CONSTANT.PARENT_NAME,
    NAME: CONSTANT.NAME,
    KEY: CONSTANT.PRODUCT_LIST,
    FILTER_KEY: CONSTANT.PRODUCT_FILTER,
  },
  fields: ['id', 'enTitle', 'viTitle', 'price', 'thumbnail'],
  renderItem,

  // // [Optional] extraData
  // extraData: [
  //   {
  //     key: 'moreDetail',
  //     url: '/services/1'
  //   }
  // ]

  // // [Optional] reduxExtraData
  // reduxExtraData: [
  //   {
  //     key: 'moreDetail',
  //     dispatch: productGetDetail,
  //     constant: {
  //       PARENT_NAME: CONSTANT.PARENT_NAME,
  //       NAME: CONSTANT.NAME,
  //       KEY: CONSTANT.PRODUCT_DETAIL,
  //     }
  //   }
  // ]

})(ProductListScreen);

// export default withPureList({
//   url: '/services',
//   fields: ['id', 'enTitle', 'viTitle', 'price', 'thumbnail'],
//   renderItem,
// })(ProductListScreen);

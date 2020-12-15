/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { QuickView, Text, Button, ListCheckBox, Body } from '@components';
import withReduxList from '@components/Hoc/withReduxList';
import { CONSTANT } from '@contents/Service/redux/constant';
import {
  serviceGetList,
  serviceSetFilter,
} from '@contents/Service/redux/slice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';
import { Input, withTheme } from 'react-native-elements';
import { Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import AppView from '@utils/appView';
import { compose } from 'recompose';
import withBottomSheet from '@components/Hoc/withBottomSheet';
import MapButton from '@contents/Main/containers/Home/Map/containers/MapButton';
import i18next from 'i18next';
import { LanguageEnum } from '@contents/Config/redux/slice';
import _ from 'lodash';
import CardService from './components/CardService';

const styles = StyleSheet.create({
  headerContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    zIndex: 99999,
  },
  inputContainer: {
    marginTop: -20,
    marginBottom: -50,
    marginRight: 0,
  },
  input: {
    fontSize: 18,
  },
});

const renderItem = ({ item }: { item: any }) => <CardService data={item} />;

function ListServiceScreen(props: any) {
  const totalServices = useSelector(
    (state: any) => state.service.listMetadata.total,
  );

  const categories = useSelector(
    (state: any) => state.serviceCategory.listData,
  );

  const serviceFilter = useSelector((state: any) => state.service.filter);

  const [selectedCategories, setSelectedCategories] = serviceFilter[
    'serviceCategories.id'
  ]
    ? useState([serviceFilter['serviceCategories.id']])
    : useState([]);

  const dataRow = categories.map((e: any) => ({
    id: e.id,
    name: e.enName,
  }));

  // const customBackdrop: any = null;

  // function handleFilter() {
  //   const { filter, applyFilter } = props;
  //   filter.mergeFilter('viTitle', '$contL', 'Sunny');
  //   applyFilter();
  // }
  function handleFilterByCategories() {
    const { filter, applyFilter } = props;
    filter.deleteFilterByKey('serviceCategories.id');
    (selectedCategories as Array<Number>).map((e: any) => {
      filter.mergeFilter('serviceCategories.id', '$eq', e, 'OR');
      return e;
    });
    applyFilter();
  }

  const handleOnChangeText = (value: any) => {
    const { filter, applyFilter } = props;
    if (i18next.t('key') === LanguageEnum.EN) {
      filter.deleteFilterByKey('enTitle');
      filter.mergeFilter('enTitle', '$contL', value);
    } else {
      filter.deleteFilterByKey('viTitle');
      filter.mergeFilter('viTitle', '$contL', value);
    }
    applyFilter();
  };

  const debouncedOnSearch = _.debounce(handleOnChangeText, 1000);

  const renderScrollBottomSheet = () => {
    const { open, setModalContent, theme, close } = props;
    if (setModalContent) {
      setModalContent(
        <>
          <BottomSheetScrollView
            focusHook={useFocusEffect} // For Changing (React Navigation) Screen Focusing
            contentContainerStyle={{
              backgroundColor: theme.colors.primaryBackground,
              paddingBottom: AppView.safeAreaInsets.bottom,
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}>
            <Text
              bold
              fontSize={22}
              marginBottom={10}
              t="list_service:filter_title"
            />
            <ListCheckBox
              data={dataRow}
              defaultValue={selectedCategories}
              onChange={(value: any) => {
                setSelectedCategories(value);
              }}
              checkBoxProps={{
                iconRight: true,
                textStyle: {
                  fontWeight: 'normal',
                  marginLeft: -9,
                  fontSize: 20,
                  width: '96%',
                },
              }}
            />
          </BottomSheetScrollView>
          <Button
            t="list_service:filter_button"
            borderRadius={8}
            fontSize={18}
            titlePaddingHorizontal={35}
            titlePaddingVertical={12}
            bold
            backgroundColor={theme.colors.primary}
            color={theme.colors.primaryBackground}
            marginTop={10}
            onPress={() => {
              close();
              handleFilterByCategories();
            }}
          />
        </>,
      );
    }
    if (open) open();
  };

  const { renderFlatList, theme, serviceListRefreshCount, data } = props;

  return (
    <Body>
      <TouchableOpacity activeOpacity={0.9}>
        <QuickView
          backgroundColor={theme.colors.primaryBackground}
          row
          alignItems="center"
          justifyContent="space-between"
          padding={10}
          borderRadius={8}
          borderWidth={2}
          style={{ borderColor: theme.colors.primaryText }}
          marginTop={20}>
          <QuickView row alignItems="center" width={300}>
            <Icon name="magnify" size={24} color={theme.colors.primaryText} />
            <Input
              onChangeText={debouncedOnSearch}
              inputContainerStyle={{
                ...styles.inputContainer,
                borderColor: theme.colors.primaryBackground,
              }}
              inputStyle={{ ...styles.input, color: theme.colors.primaryText }}
            />
          </QuickView>
          <QuickView
            style={{
              borderRightWidth: 2,
              borderColor: theme.colors.primaryText,
            }}
            marginLeft={-20}
            marginRight={5}
            paddingVertical={2}>
            <Icon
              name="filter-outline"
              size={22}
              onPress={renderScrollBottomSheet}
              color={theme.colors.primaryText}
            />
          </QuickView>
          <MapButton />
        </QuickView>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <QuickView
          row
          alignItems="center"
          justifyContent="center"
          marginTop={20}
          marginBottom={30}
          position="relative"
        >
          <Icon
            name="arrow-left"
            color={theme.colors.primaryText}
            size={24}
            onPress={() => NavigationService.goBack()}
            style={{ position: 'absolute', left: 0 }}
        />
          <QuickView row>
            <Text fontSize={18} bold>
              {totalServices}
            </Text>
            <Text
              fontSize={18}
              bold
              t="list_service:amount_title"
              style={{ marginLeft: 5 }}
          />
          </QuickView>
        </QuickView>
      </TouchableWithoutFeedback>
      {renderFlatList({ key: serviceListRefreshCount, extraData: data, keyExtractor: (item: any) => `${item.id}_${item.isFavourite}` })}
    </Body>
  );
}

export default compose(
  withBottomSheet(),
  withTheme,
  withReduxList({
    dispatchGetList: serviceGetList,
    dispatchFilter: serviceSetFilter,
    constant: {
      PARENT_NAME: CONSTANT.PARENT_NAME,
      NAME: CONSTANT.NAME,
      KEY: CONSTANT.LIST,
      FILTER_KEY: CONSTANT.FILTER,
    },
    fields: [
      'id',
      'enTitle',
      'viTitle',
      'currentPrice',
      'thumbnail',
      'unit',
      'destinations',
      'createdAt',
      'updatedAt',
    ],
    renderItem,

    mapStateToProps: (state: any) => ({
      serviceListRefreshCount: state.service.serviceListRefreshCount
    })
  }),
)(ListServiceScreen as any);

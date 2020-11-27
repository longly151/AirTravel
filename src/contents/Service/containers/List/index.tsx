/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  QuickView,
  Text,
  Button,
  ModalButton,
  ListCheckBox,
} from '@components';
import withReduxList, { FilterProps } from '@components/Hoc/withReduxList';
import { CONSTANT } from '@contents/Service/redux/constant';
import {
  serviceGetList,
  serviceSetFilter,
} from '@contents/Service/redux/slice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';
import { Input } from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
    borderColor: '#fff',

    marginTop: -20,
    marginBottom: -50,
    marginRight: 0,
  },
  input: {
    fontSize: 18,
  },
});

const renderItem = ({ item }: { item: any }) => <CardService data={item} />;

function ListServiceScreen(props: FilterProps) {
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

  let customBackdrop: any = null;

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
    filter.deleteFilterByKey('destination.city.name');
    filter.mergeFilter('destination.city.name', '$contL', value);
    applyFilter();
  };

  return (
    <QuickView style={styles.headerContainer}>
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
          marginHorizontal={18}>
          <QuickView row alignItems="center" width={300}>
            <Icon name="magnify" size={24} />
            <Input
              placeholder="Where are you going?"
              onChangeText={handleOnChangeText}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
            />
          </QuickView>

          <ModalButton
            invisible
            ref={(ref: any) => {
              customBackdrop = ref;
            }}
            buttonChildren={<Icon name="filter-outline" size={22} />}
            modalProps={{
              customBackdrop: (
                <QuickView
                  backgroundColor="black"
                  height="100%"
                  onPress={() => customBackdrop.close()}
                />
              ),
            }}>
            <QuickView
              backgroundColor="#fff"
              paddingVertical={20}
              paddingHorizontal={20}
              borderRadius={8}>
              <Text bold fontSize={22} marginBottom={10}>
                Service
              </Text>
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
              <Button
                title="Show all services"
                borderRadius={8}
                fontSize={18}
                titlePaddingHorizontal={35}
                titlePaddingVertical={12}
                bold
                marginTop={10}
                onPress={() => {
                  customBackdrop.close();
                  handleFilterByCategories();
                }}
              />
            </QuickView>
          </ModalButton>
        </QuickView>
      </TouchableOpacity>

      <QuickView
        row
        alignItems="center"
        justifyContent="center"
        marginTop={20}
        marginBottom={30}
        paddingHorizontal={18}
        position="relative">
        <Icon
          name="arrow-left"
          size={24}
          onPress={() => NavigationService.goBack()}
          style={{ position: 'absolute', left: 14 }}
        />
        <Text fontSize={18} bold>
          {totalServices} services to enjoy
        </Text>
      </QuickView>
    </QuickView>
  );
}

export default withReduxList({
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
  ],
  renderItem,
})(ListServiceScreen);

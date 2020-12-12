/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  QuickView,
  Text,
  Container,
  Header,
  Body,
  MapView,
  Button,
  Image,
  withPureList,
} from '@components';
import { View, TouchableOpacity } from 'react-native';
import { Icon, withTheme } from 'react-native-elements';
import { NavigationService } from '@utils/navigation';
import { TQuery, TArrayRedux, IBase } from '@utils/redux';
import Filter from '@utils/filter';
import {
  languageSelector,
  themeSelector,
} from '@contents/Config/redux/selector';
import { compose } from 'recompose';
import _ from 'lodash';
import i18next from 'i18next';
import Helper from '@utils/helper';
import { LanguageEnum } from '@contents/Config/redux/slice';
import AppHelper from '@utils/appHelper';
import { WithListProps } from '@utils/hocHelper';
import Color from '@themes/Color';
import productStack from '@contents/Example/containers/Common/FlatList/routes';
import detailServiceStack from '@contents/Service/containers/Detail/routes';
import AppView from '@utils/appView';
import serviceStack from '@contents/Service/routes';

interface Props extends WithListProps, IBase {}
interface State {
  displaySearchArea: boolean;
}

class MapScreen extends Component<Props, State> {
  mapRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      displaySearchArea: false,
    };
  }

  renderBottomItem = ({ item }: { item: any }) => {
    const title = i18next.t('key') === LanguageEnum.EN ? item.enTitle : item.viTitle;
    let address = '';
    if (!_.isEmpty(item.destinations)) {
      address = item.destinations[0].address;
    }
    const { thumbnail } = item;
    const { themeName } = this.props;
    const theme = AppHelper.getThemeByName(themeName);
    return (
      <View
        style={{
          backgroundColor: theme.colors.primaryBackground,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: thumbnail }}
          // style={{
          //   width: '100%',
          //   height: '60%',
          //   alignSelf: 'center',
          // }}
          width={250}
          height={150}
          resizeMode="cover"
        />
        <View
          style={{
            padding: 15,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              // marginTop: 5,
              fontWeight: 'bold',
            }}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            color={theme.colors.secondaryText}
            fontSize={12}
          >
            {address}
          </Text>
          <View
            style={{
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => NavigationService.navigate(
                serviceStack.detail,
                {
                  screen: detailServiceStack.index,
                  params: AppHelper.setItemIntoParams(item),
                }
              )}
                // AppView
              style={[{
                width: '100%',
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 3,
              }, {
                borderColor: Color.lightPrimary,
                borderWidth: 1,
              }]}
            >
              <Text
                style={[{
                  fontSize: 14,
                  fontWeight: 'bold',
                }, {
                  color: Color.lightPrimary,
                }]}
                t="map:view_detail"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  searchArea = () => {
    this.setState({ displaySearchArea: false });
    this.mapRef.refreshBottomFlatList();
  };

  renderSearchAreaButton = () => {
    const { displaySearchArea } = this.state;
    if (displaySearchArea) {
      return (
        <Button
          t="map:search_area"
          containerStyle={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: 80,
          }}
          icon={{ name: 'search-location', type: 'font-awesome-5' }}
          iconContainerStyle={{ marginRight: 15 }}
          shadow
          onPress={this.searchArea}
        />
      );
    }
    return null;
  };

  onRegionChangeComplete = async () => {
    const { filter } = this.props;
    this.setState({ displaySearchArea: true });
    const mapBoundaries = await this.mapRef.getMapBoundaries();
    filter.mergeFilter('destinations.longitude', '$between', [
      mapBoundaries.southWest.longitude,
      mapBoundaries.northEast.longitude,
    ]);
    filter.mergeFilter('destinations.latitude', '$between', [
      mapBoundaries.southWest.latitude,
      mapBoundaries.northEast.latitude,
    ]);
  };

  render() {
    const { loading, data, metadata, error, getList } = this.props;
    const { filter, themeName } = this.props;
    const list = {
      data,
      metadata,
      loading,
      error,
    };

    const bottomItemData = list.data;
    const bottomMarkerData = Helper.selectDeepFields(
      bottomItemData,
      'currentPrice',
    );

    bottomMarkerData.map((item: string, index: number) => {
      bottomMarkerData[index] = `${Helper.numberWithCommas(
        parseInt(item, 10),
      )} \u20AB`;
      return true;
    });
    if (!_.isEmpty(list.data)) {
      // Add Coordinate
      list.data.map((item: any, index: number) => {
        const coordinate = {
          longitude: item.destinations[0]?.longitude || 108,
          latitude: item.destinations[0]?.latitude || 16,
        };
        list.data[index].marker = {
          coordinate,
        };
        return true;
      });
    }

    return (
      <Container>
        <QuickView>
          <MapView
            ref={(ref: any) => {
              this.mapRef = ref;
            }}
            fullScreen
            // staticMap
            showDefaultMarker={false}
            // bottomItemData={bottomItemData}
            bottomItemList={list}
            bottomItemGetList={(query?: TQuery) => {
              getList({
                ...query,
                limit: 20,
                filter: filter.filterObject,
              });
            }}
            bottomMarkerData={bottomMarkerData}
            onTouchStart={() => this.setState({ displaySearchArea: false })}
            onRegionChangeComplete={this.onRegionChangeComplete}
            markerType="tag"
            // google
            animationEnable={false}
            markerActiveBackgroundColor="#74A7A8"
            renderBottomItem={this.renderBottomItem}
            backIcon
          />
          {this.renderSearchAreaButton()}
        </QuickView>
      </Container>
    );
  }
}

export default withPureList({
  url: '/services',
  fields: [
    'id',
    'enTitle',
    'viTitle',
    'thumbnail',
    'address',
    'destinations',
    'currentPrice',
  ],
})(MapScreen);

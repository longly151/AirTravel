/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, Image, Icon, withPureList
} from '@components';
import AppView from '@utils/appView';
import moment from 'moment';
import { NavigationService } from '@utils/navigation';
import { WithListProps } from '@utils/hocHelper';
import _ from 'lodash';
import { ThemeEnum } from '@contents/Config/redux/slice';
import Color from '@themes/Color';

const renderItem = ({ item, index }: {item: any, index: number}, themeName: ThemeEnum) => {
  const bgColor = themeName === ThemeEnum.DARK
    ? Color.darkSecondaryBackground
    : Color.lightPrimaryBackground;
  const primaryColor = themeName === ThemeEnum.DARK
    ? Color.darkPrimary
    : Color.lightPrimary;
  return (
    <QuickView
      marginBottom={20}
      marginTop={index === 0 ? 20 : 0}
      marginHorizontal={AppView.bodyPaddingHorizontal}
    >
      {item.enTitle ? (<Text fontSize="xLarge" bold marginBottom={20}>{_.capitalize(moment().format('dddd, DD/MM/YYYY'))}</Text>) : null}
      <QuickView borderRadius={10} backgroundColor={bgColor} shadow>
        <QuickView paddingHorizontal={15} paddingVertical={10}>
          <QuickView row justifyContent="space-between" alignItems="center">
            <QuickView>
              <QuickView row marginVertical={3}>
                <Icon name="calendar" type="font-awesome" color={primaryColor} size={18} />
                <Text bold marginLeft={5}>
                  {moment().format('DD/MM/YYYY')}
                </Text>
              </QuickView>
              <QuickView row marginVertical={3}>
                <Icon name="calendar-check" type="font-awesome-5" color={primaryColor} size={18} />
                <Text bold marginLeft={5}>
                  {moment().format('DD/MM/YYYY')}
                </Text>
              </QuickView>
            </QuickView>
            <QuickView onPress={() => {}} row alignItems="flex-end">
              <Text type="title" color={primaryColor} marginTop={10} bold marginRight={5}>Chi tiết</Text>
              <Icon name="right" type="antdesign" color={primaryColor} />
            </QuickView>
          </QuickView>
        </QuickView>
        <QuickView width="100%" style={{ borderBottomWidth: 1, borderColor: '#F6F6F6', paddingBottom: 10 }} />
        <QuickView paddingHorizontal={15} paddingVertical={10} paddingRight={20}>
          {/* <Text marginVertical={5} marginBottom={10}
          fontSize="medium">{item.orderTypeName}</Text> */}
          <QuickView row marginVertical={5} justifyContent="space-between">
            <Text t="trip:name" style={{ flex: 3.2 }} />
            <Text bold numberOfLines={2} style={{ flex: 6.8 }}>{item.enTitle}</Text>
          </QuickView>
          <QuickView row marginVertical={5} justifyContent="space-between">
            <Text t="trip:price" style={{ flex: 3.2 }} />
            <Text bold numberOfLines={2} style={{ flex: 6.8 }}>{item.enTitle}</Text>
          </QuickView>
          <QuickView row marginVertical={5} justifyContent="space-between">
            <Text t="trip:duration" style={{ flex: 3.2 }} />
            <Text bold numberOfLines={2} style={{ flex: 6.8 }}>{item.enTitle}</Text>
          </QuickView>
          <QuickView row marginVertical={5} justifyContent="space-between">
            <Text t="trip:total_price" style={{ flex: 3.2 }} />
            <Text bold numberOfLines={2} style={{ flex: 6.8 }}>
              {item.enTitle}
            </Text>
          </QuickView>
        </QuickView>
      </QuickView>
    </QuickView>
  );
};

class TripListScreen extends PureComponent<WithListProps> {
  renderEmpty = () => (
    <QuickView center marginTop={AppView.screenHeight / 5}>
      <Image source={require('@assets/images/empty-trip.png')} width={0.7 * AppView.screenWidth} />
      <Text marginTop={30} primary type="xTitle" bold center t="empty:empty_trip" />
    </QuickView>
  );

  render() {
    const { renderFlatList } = this.props;
    return (
      <Container>
        <Header t="header:trip" shadow />
        <Body fullWidth>
          {renderFlatList({ renderEmpty: this.renderEmpty })}
        </Body>
      </Container>
    );
  }
}

export default withPureList({
  url: '/services',
  fields: ['id', 'enTitle', 'viTitle', 'price', 'thumbnail'],
  renderItem,
})(TripListScreen);

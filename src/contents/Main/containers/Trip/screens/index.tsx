/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import {
  QuickView, Text,
  Container, Header, Body, Image, Icon, withReduxList, Button, ModalButton
} from '@components';
import AppView from '@utils/appView';
import moment from 'moment';
import { NavigationService } from '@utils/navigation';
import { WithListProps } from '@utils/hocHelper';
import _ from 'lodash';
import { LanguageEnum, ThemeEnum } from '@contents/Config/redux/slice';
import Color from '@themes/Color';
import AppHelper from '@utils/appHelper';
import detailServiceStack from '@contents/Service/containers/Detail/routes';
import Helper from '@utils/helper';
import i18next from 'i18next';
import { Global } from '@utils/api';
import serviceRoutes from '../../../../Service/routes';
import { billGetList, CONSTANT } from '../redux/slice';

interface Props extends WithListProps {
  navigation: any;
}

const renderBadge = (item: any) => {
  switch (item.status) {
    case 'PENDING':
      return (
        <Button
          t="trip:pending"
          outline
          secondary
          center
          titlePaddingHorizontal={15}
        />
      );
    case 'CUSTOMER_PAYING':
      return (
        <>
          <Button
            t="trip:customer_paying"
            outline
            warning
            center
            titlePaddingHorizontal={15}
            titleColor="#FFF"
          />
          <ModalButton
            modalProps={{
              title: i18next.t('trip:pay_info', { amount: Helper.numberWithCommas(item.totalPrice) }),
            }}
            iconRight
            icon={{ name: 'credit-card-check', type: 'material-community' }}
            primary
            center
            titlePaddingHorizontal={15}
            titleColor="#FFF"
            t="trip:pay_now"
          />
        </>
      );
    case 'CANCEL':
      return (
        <Button
          t="trip:cancel"
          outline
          error
          center
          titlePaddingHorizontal={15}
          titleColor="#FFF"
        />
      );
    default:
      return (
        <Button
          t="trip:success"
          outline
          success
          center
          titlePaddingHorizontal={15}
          titleColor="#FFF"
        />
      );
  }
};
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
      {item.time ? (<Text fontSize="xLarge" bold marginBottom={20}>{_.capitalize(moment(item.time).format('dddd, DD/MM/YYYY'))}</Text>) : null}
      <QuickView borderRadius={10} backgroundColor={bgColor} shadow>
        <QuickView paddingHorizontal={15} paddingVertical={10}>
          <QuickView row justifyContent="space-between" alignItems="center">
            <QuickView>
              <QuickView row marginVertical={3}>
                <Icon name="calendar" type="font-awesome" color={primaryColor} size={15} />
                <Text fontSize="medium" bold marginLeft={5}>
                  {moment(item.billServices[0].startDate).format('DD/MM/YYYY')}
                </Text>
              </QuickView>
              <QuickView row marginVertical={3}>
                <Icon name="calendar-check" type="font-awesome-5" color={primaryColor} size={15} />
                <Text fontSize="medium" bold marginLeft={5}>
                  {moment(item.billServices[0].endDate).format('DD/MM/YYYY')}
                </Text>
              </QuickView>
              <QuickView
                onPress={() => {
                  if (item.billServices[0]?.service) {
                    NavigationService.navigate(
                      serviceRoutes.detail,
                      {
                        screen: detailServiceStack.index,
                        params: AppHelper.setIdIntoParams(item.billServices[0].service),
                      }
                    );
                  }
                }}
                row
                alignItems="flex-end"
              >
                <Text color={primaryColor} marginTop={5} bold t="trip:detail" />
                <Icon name="right" type="antdesign" color={primaryColor} size={16} />
              </QuickView>
            </QuickView>
            <QuickView>
              {renderBadge(item)}
            </QuickView>
          </QuickView>
        </QuickView>
        <QuickView width="100%" style={{ borderBottomWidth: 1, borderColor: '#F6F6F6', paddingBottom: 10 }} />
        <QuickView paddingHorizontal={15} paddingVertical={10} paddingRight={20}>
          {/* <Text marginVertical={5} marginBottom={10}
          fontSize="medium">{item.orderTypeName}</Text> */}
          <QuickView row marginVertical={5} justifyContent="space-between">
            <Text t="trip:name" fontSize="medium" style={{ flex: 3.2 }} />
            <Text bold numberOfLines={2} fontSize="medium" style={{ flex: 6.8 }}>{item?.billServices[0].service ? ((i18next.t('key') === LanguageEnum.EN ? item.billServices[0].service.enTitle : item.billServices[0].service.viTitle)) : ''}</Text>
          </QuickView>
          <QuickView row marginVertical={5} justifyContent="space-between">
            <Text t="trip:price" fontSize="medium" style={{ flex: 3.2 }} />
            <Text bold numberOfLines={2} fontSize="medium" style={{ flex: 6.8 }}>{Helper.numberWithCommas(item.billServices[0].price)}</Text>
          </QuickView>
          <QuickView row marginVertical={5} justifyContent="space-between">
            <Text t="trip:duration" fontSize="medium" style={{ flex: 3.2 }} />
            <Text bold numberOfLines={2} fontSize="medium" style={{ flex: 6.8 }}>{moment(item.billServices[0].endDate).diff(moment(item.billServices[0].startDate), 'days')}</Text>
          </QuickView>
          <QuickView row marginVertical={5} justifyContent="space-between">
            <Text t="trip:total_price" fontSize="medium" style={{ flex: 3.2 }} />
            <Text bold numberOfLines={2} fontSize="medium" style={{ flex: 6.8 }}>
              {Helper.numberWithCommas(item.totalPrice)}
            </Text>
          </QuickView>
        </QuickView>
      </QuickView>
    </QuickView>
  );
};

class TripListScreen extends PureComponent<Props> {
  componentDidMount() {
    const { navigation, applyFilter } = this.props;
    const unsubscribe = navigation.addListener('focus', () => {
      applyFilter(true);
    });
  }

  renderEmpty = () => (
    <QuickView center marginTop={AppView.screenHeight / 5}>
      <Image source={require('@assets/images/empty-trip.png')} width={0.7 * AppView.screenWidth} />
      <Text marginTop={30} primary type="xTitle" bold center t="empty:empty_trip" />
    </QuickView>
  );

  render() {
    const { renderFlatList } = this.props;
    const item = AppHelper.getParams(this.props);

    return (
      <Container>
        <Header t="header:trip" shadow homeIcon={item?.goHome} />
        <Body fullWidth>
          {renderFlatList({ renderEmpty: this.renderEmpty, key: Global?.token?.toString() || 'empty' })}
        </Body>
      </Container>
    );
  }
}
export default withReduxList({
  dispatchGetList: billGetList,
  constant: {
    PARENT_NAME: CONSTANT.PARENT_NAME,
    NAME: CONSTANT.NAME,
    KEY: CONSTANT.BILL_LIST,
  },
  fields: ['id', 'totalPrice', 'status', 'createdAt', 'updatedAt'],
  renderItem,
})(TripListScreen);

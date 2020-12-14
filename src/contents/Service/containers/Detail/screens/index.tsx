/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import {
  Container,
  withPureDetail,
  QuickView,
  Button,
  Text,
  Loading,
  ModalButton,
} from '@components';
import { WithDetailProps } from '@utils/hocHelper';
import { IBase } from '@utils/redux';
import { NavigationService } from '@utils/navigation';
import AppHelper, { Global } from '@utils/appHelper';
import AppView from '@utils/appView';
import Helper from '@utils/helper';
import { ThemeEnum } from '@contents/Config/redux/slice';
import i18next from 'i18next';
import authStack from '@contents/Auth/containers/routes';
import Header from '../components/Header';
import Body from '../components/Body';
import detailServiceRoute from '../routes';

class ServiceDetailScreen extends PureComponent<WithDetailProps & IBase> {
  loginModal: any;

  render() {
    const { loading, data, error, themeName } = this.props;

    const theme = AppHelper.getThemeByName(themeName);
    const bgColor = theme.key === ThemeEnum.DARK
      ? theme.colors.secondaryBackground
      : theme.colors.primaryBackground;

    if (Object.keys(data).length <= 1) {
      return (
        <Container>
          <QuickView height="100%" center>
            <Loading />
          </QuickView>
        </Container>
      );
    }

    return (
      <Container>
        <ScrollView>
          <Header
            gallery={data?.gallery}
            loading={loading}
            isFavourite={data?.isFavourite}
            id={data?.id}
          />
          <Body data={data} loading={loading} error={error} />
        </ScrollView>
        <QuickView
          position="absolute"
          bottom={0}
          style={{
            ...AppView.shadow,
          }}
          width={AppView.screenWidth}
          height={100}
          backgroundColor={bgColor}
          row
          paddingHorizontal={18}
          alignItems="center"
          justifyContent="space-between"
        >
          <QuickView width="30%">
            {loading ? (
              <Loading />
            ) : (
              <Text bold fontSize={18}>
                {`${Helper.numberWithCommas(data.price)} `}
                &#8363;
              </Text>
            )}
          </QuickView>
          <ModalButton
            ref={(ref: any) => {
              this.loginModal = ref;
            }}
            title="Confirmation Modal Button"
            modalProps={{
              title: i18next.t('auth:require_login'),
              type: 'confirmation',
              onOkButtonPress: () => NavigationService.navigate(authStack.loginScreen),
            }}
            invisible
          />
          <Button
            t="service_detail:start_trip"
            borderRadius={8}
            fontSize={18}
            titlePaddingHorizontal={35}
            titlePaddingVertical={12}
            bold
            primary
            color="#fff"
            onPress={() => {
              if (!Global.token) {
                this.loginModal.open();
              } else {
                NavigationService.navigate(
                  detailServiceRoute.selectDate,
                  AppHelper.setItemIntoParams(data),
                );
              }
            }}
          />
        </QuickView>
      </Container>
    );
  }
}

export default withPureDetail({
  url: '/services/:id',
})(ServiceDetailScreen);

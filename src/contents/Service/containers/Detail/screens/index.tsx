/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Container, withPureDetail, QuickView, Button, Text } from '@components';
import { WithDetailProps } from '@utils/hocHelper';
import { IBase } from '@utils/redux';
import { NavigationService } from '@utils/navigation';
import AppHelper from '@utils/appHelper';
import AppView from '@utils/appView';
import Header from '../components/Header';
import Body from '../components/Body';
import detailServiceRoute from '../routes';

class ServiceDetailScreen extends PureComponent<WithDetailProps & IBase> {
  render() {
    const { loading, data, error } = this.props;
    return (
      <Container>
        <ScrollView>
          <Header gallery={data?.gallery} loading={loading} />
          <Body data={data} loading={loading} error={error} />
        </ScrollView>
        <QuickView
          position="absolute"
          bottom={0}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            zIndex: 10000,
          }}
          width={AppView.screenWidth}
          height={100}
          backgroundColor="#fff"
          row
          paddingHorizontal={18}
          alignItems="center"
          justifyContent="space-between"
        >
          <QuickView width="30%">
            <Text bold fontSize={18}>
              Add dates for prices
            </Text>
          </QuickView>
          <Button
            title="Check availabillity"
            borderRadius={8}
            fontSize={18}
            titlePaddingHorizontal={35}
            titlePaddingVertical={12}
            bold
            primary
            color="#fff"
            onPress={() => {
              NavigationService.navigate(
                detailServiceRoute.selectDate,
                AppHelper.setItemIntoParams(data)
              );
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

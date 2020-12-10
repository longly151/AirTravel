/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, Image,
} from '@components';
import AppView from '@utils/appView';
import i18next from 'i18next';

class TripListScreen extends PureComponent {
  render() {
    return (
      <Container>
        <Header title="Your Trip" />
        <Body>
          <QuickView center height="100%">
            <Image source={require('@assets/images/empty-trip.png')} width={0.7 * AppView.screenWidth} />
            <Text marginTop={30} primary type="xTitle" bold center t="empty:empty_trip" />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TripListScreen);

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, Image,
} from '@components';
import AppView from '@utils/appView';

class NotificationListScreen extends PureComponent {
  render() {
    return (
      <Container>
        <Header t="header:notification" shadow />
        <Body>
          <QuickView center height="100%">
            <Image source={require('@assets/images/empty-notification.png')} width={0.7 * AppView.screenWidth} />
            <Text marginTop={30} primary type="xTitle" bold center t="empty:empty_notification" />
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationListScreen);

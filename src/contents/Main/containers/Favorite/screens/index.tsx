import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, Image,
} from '@components';
import AppView from '@utils/appView';

class FavoriteListScreen extends PureComponent {
  render() {
    return (
      <Container>
        <Header t="header:favorite" shadow />
        <Body>
          <QuickView center height="100%">
            <Image source={require('@assets/images/empty-favorite.png')} width={0.7 * AppView.screenWidth} />
            <Text marginTop={30} primary type="xTitle" bold t="empty:empty_favorite" />
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteListScreen);

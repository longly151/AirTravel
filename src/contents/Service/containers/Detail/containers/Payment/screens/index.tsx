/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, QuickView } from '@components';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

class PayServiceScreen extends PureComponent {
  render() {
    return (
      <Container scroll>
        <QuickView marginTop={50} marginHorizontal={18}>
          <Header />
          <Body />
          <Footer />
        </QuickView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PayServiceScreen);

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Container } from '@components';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

class ServiceDetailScreen extends PureComponent {
  render() {
    return (
      <Container>
        <ScrollView>
          <Header />
          <Body />
        </ScrollView>
        <Footer />
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceDetailScreen);

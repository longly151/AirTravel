/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Container, withPureDetail } from '@components';
import { WithDetailProps } from '@utils/hocHelper';
import { IBase } from '@utils/redux';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

class ServiceDetailScreen extends PureComponent<WithDetailProps & IBase> {
  render() {
    const { loading, data, error } = this.props;
    return (
      <Container>
        <ScrollView>
          <Header gallery={data?.gallery} loading={loading} />
          <Body data={data} loading={loading} error={error} />
        </ScrollView>
        <Footer />
      </Container>
    );
  }
}

export default withPureDetail({
  url: '/services/:id',
})(ServiceDetailScreen);

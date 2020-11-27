/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Loading } from '@components';
import { TQuery, TArrayRedux } from '@utils/redux';
import Selector from '@utils/selector';
import { serviceListSelector } from '@contents/Service/redux/selector';
import { serviceGetList } from '@contents/Service/redux/slice';

import Greeting from '../containers/Greeting';
import CrucialCategory from '../containers/CrucialCategory';
import Categories from '../containers/Categories';
import HotDeals from '../containers/HotDeals';
import Destinations from '../containers/Destinations';
import MapButton from '../Map/containers/MapButton';
// import MapButton from '../containers/Map/containers/MapButton';

interface Props {
  list: TArrayRedux;
  getList: (query?: TQuery) => any;
}

class HomeScreen extends PureComponent<Props> {
  componentDidMount() {
    const { getList } = this.props;
    getList({ limit: 5 });
  }

  render() {
    const { list } = this.props;

    const listProps = {
      list,
    };
    return list.loading ? (
      <Loading />
    ) : (
      <Container scrollable>
        <Greeting {...listProps} />
        <CrucialCategory />
        <Categories />
        <HotDeals {...listProps} />
        <Destinations />
        <MapButton />
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  list: Selector.getArray(serviceListSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query?: TQuery) => dispatch(serviceGetList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

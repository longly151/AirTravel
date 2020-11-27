/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Loading } from '@components';
import { TQuery, TArrayRedux } from '@utils/redux';
import Selector from '@utils/selector';
import { serviceSpecialListSelector } from '@contents/Service/redux/selector';
import { serviceGetSpecialList } from '@contents/Service/redux/slice';

import Greeting from '../containers/Greeting';
import CrucialCategory from '../containers/CrucialCategory';
import Categories from '../containers/Categories';
import HotDeals from '../containers/HotDeals';
import Destinations from '../containers/Destinations';
// import MapButton from '../containers/Map/containers/MapButton';

interface Props {
  list: TArrayRedux;
  getSpecialList: (query?: TQuery) => any;
}

class HomeScreen extends PureComponent<Props> {
  componentDidMount() {
    const { getSpecialList } = this.props;
    getSpecialList({ limit: 3, page: 2 });
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
        {/* <MapButton /> */}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  list: Selector.getArray(serviceSpecialListSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  getSpecialList: (query?: TQuery) => dispatch(serviceGetSpecialList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

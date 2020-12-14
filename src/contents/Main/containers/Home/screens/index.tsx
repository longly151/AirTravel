/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Loading } from '@components';
import { TQuery, TArrayRedux } from '@utils/redux';
import Selector from '@utils/selector';
import {
  serviceSpecialListSelector,
  serviceHotDealListSelector,
} from '@contents/Service/redux/selector';
import {
  serviceGetSpecialList,
  serviceGetHotDealList,
} from '@contents/Service/redux/slice';

import Greeting from '../containers/Greeting';
import CrucialCategory from '../containers/CrucialCategory';
import Categories from '../containers/Categories';
import HotDeals from '../containers/HotDeals';
import Destinations from '../containers/Destinations';
import { serviceCategoryGetList } from '../containers/Categories/redux/slice';

interface Props {
  listSpecial: TArrayRedux;
  listHotDeal: TArrayRedux;
  getSpecialList: (query?: TQuery) => any;
  getCategoryList: (query?: TQuery) => any;
  getHotDealList: () => any;
}

class HomeScreen extends PureComponent<Props> {
  componentDidMount() {
    const { getSpecialList, getCategoryList, getHotDealList } = this.props;
    getSpecialList({ limit: 3, page: 3 });
    getCategoryList({ limit: 50, sort: 'id,DESC' });
    getHotDealList();
  }

  render() {
    const { listSpecial, listHotDeal } = this.props;

    const listSpecialProps = {
      list: listSpecial,
    };

    const listHotDealProps = {
      list: listHotDeal,
    };
    return (
      <Container scrollable>
        {listHotDeal.loading ? (
          <Loading marginTop={200} />
        ) : (
          <>
            <Greeting {...listSpecialProps} />
            <CrucialCategory />
            <Categories />
            <HotDeals {...listHotDealProps} />
            {/* <Destinations /> */}
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  listSpecial: Selector.getArray(serviceSpecialListSelector, state),
  listHotDeal: Selector.getArray(serviceHotDealListSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  getSpecialList: (query?: TQuery) =>
    dispatch(serviceGetSpecialList({ query })),
  getHotDealList: () => dispatch(serviceGetHotDealList({})),
  getCategoryList: (query?: TQuery) =>
    dispatch(serviceCategoryGetList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

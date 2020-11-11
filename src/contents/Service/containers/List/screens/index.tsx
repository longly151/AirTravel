/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, QuickView, Text } from '@components';
import AppHelper from '@utils/appHelper';
import { TArrayRedux, TQuery } from '@utils/redux';
import Selector from '@utils/selector';
import { serviceListSelector } from '@contents/Service/redux/selector';
import { serviceGetList } from '@contents/Service/redux/slice';
import LoadingView from '@components/Custom/LoadingView';
import { Dimensions, StyleSheet } from 'react-native';
import SearchBar from '../containers/SearchBar';
import ListCard from '../containers/ListCard';

interface Props {
  list: TArrayRedux;
  getList: (query?: TQuery) => any;
  theme?: any;
}

interface State {
  isSearchBarFixed: boolean;
  isFirstlyLoading: boolean;
}

const styles = StyleSheet.create({
  headerContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    zIndex: 10000,
  },
});

const { width: viewportWidth } = Dimensions.get('screen');

class ListServicesScreen extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isSearchBarFixed: false,
      isFirstlyLoading: true,
    };
  }

  componentDidMount() {
    this.handleGetList(1);
    setTimeout(() => {
      this.setState({ isFirstlyLoading: false });
    }, 1000);
  }

  handleGetList = (page: number) => {
    const { getList } = this.props;
    let arrayQuerry = [];
    if (AppHelper.getIdFromParams(this.props)) {
      arrayQuerry = AppHelper.getIdFromParams(this.props).map((e: any) => ({
        'serviceCategories.id': e,
      }));
    }
    getList({
      s: JSON.stringify({
        $or: arrayQuerry,
        status: 'ACTIVE',
      }),
      page,
    });
  };

  handleScroll = (event: any) => {
    let { isSearchBarFixed } = this.state;
    isSearchBarFixed = event.nativeEvent.contentOffset.y > 0;
    this.setState({
      isSearchBarFixed,
    });
    // Handle load more
    let paddingToBottom = 10;
    paddingToBottom += event.nativeEvent.layoutMeasurement.height;
    if (
      event.nativeEvent.contentOffset.y
      >= event.nativeEvent.contentSize.height - paddingToBottom
    ) {
      const { list } = this.props;
      if (list.metadata.page < list.metadata.pageCount) {
        this.handleGetList(list.metadata.page + 1);
      }
    }
  };

  render() {
    const { list } = this.props;
    const { isSearchBarFixed, isFirstlyLoading } = this.state;
    const ListCardProps = {
      data: list.data,
      total: list.metadata.total,
    };
    return isFirstlyLoading ? (
      <LoadingView />
    ) : (
      <Container
        onScroll={this.handleScroll}
        backgroundColor="#000"
        scroll
        stickyHeaderIndices={[0]}
      >
        {isSearchBarFixed ? (
          <QuickView
            backgroundColor="#fff"
            width={viewportWidth}
            style={styles.headerContainer}
          >
            <SearchBar
              serviceCategoryId={AppHelper.getIdFromParams(this.props)}
            />
          </QuickView>
        ) : (
          <SearchBar
            serviceCategoryId={AppHelper.getIdFromParams(this.props)}
          />
        )}
        {list.data && <ListCard {...ListCardProps} />}
        {list.loading && (
          <QuickView height={40} marginTop={-30}>
            <LoadingView />
          </QuickView>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListServicesScreen);

/* eslint-disable max-len */
import React from 'react';
import Redux, { TQuery, BaseProps } from '@utils/redux';
import Filter from '@utils/filter';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import { ThemeEnum } from '@contents/Config/redux/slice';
import Selector from '@utils/selector';
import { createSelector } from 'reselect';
import HocHelper, { IHocConstant, IExtraItem, IReduxExtraItem } from '@utils/hocHelper';
import _ from 'lodash';
import Container from '../Common/View/Container';
import Body from '../Common/View/Body';
import QuickView from '../Common/View/QuickView';
import FlatList from '../Common/FlatList/DefaultFlatList';

export interface FilterProps {
  applyFilter: () => any;
  filter: Filter;
}

export interface WithReduxListProps extends BaseProps {
  getList: (query?: TQuery) => any;
  filterData: any,
  setFilter: (filter: any) => any;
}

interface State {
}

const withReduxList = (
  { dispatchGetList, dispatchFilter, constant, fields, ListHeaderComponent, renderItem, extraData, reduxExtraData }: {
    dispatchGetList: any,
    dispatchFilter?: any,
    constant: IHocConstant,
    fields?: Array<string>,
    ListHeaderComponent?: React.ComponentType<any>,
    renderItem: ({ item, index }: {item: any, index: number}, themeName: ThemeEnum) => any,
    extraData?: IExtraItem[],
    reduxExtraData?: IReduxExtraItem[]
  }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // Selector
  const arraySelector = HocHelper.createArraySelectorHOC(constant);
  const { listSelector } = arraySelector;
  const { filterSelector } = arraySelector;

  // HOC Class
  class WithReduxList extends React.Component<P & WithReduxListProps, State> {
    flatList: any;

    filter: Filter;

    constructor(props: any) {
      super(props);
      const { filterData } = this.props;
      const state = {};

      // Merge State for ExtraData
      HocHelper.mergeStateForExtraData(state, extraData);

      this.state = state;

      this.filter = new Filter(filterData);
    }

    async componentDidMount() {
      // Fetch Data for ExtraData
      if (extraData && !_.isEmpty(extraData)) {
        await Promise.all(extraData.map(async (item: { key: string, url: string }) => {
          const result = await Redux.fetchDetail(this.props, item.url);
          this.setState({
            [item.key]: result
          });
        }));
      }

      // Trigger Fetch Action for ReduxExtraData
      await HocHelper.triggerActionForReduxExtraData(this.props, reduxExtraData);
    }

    applyFilter = () => {
      const { setFilter } = this.props;
      this.flatList.handleRefresh();
      setFilter(this.filter.filterObject);
    };

    render() {
      const { data, metadata, loading, error, getList, themeName } = this.props;
      const themeNameAny: any = themeName;
      const list = {
        data,
        metadata,
        loading,
        error,
      };

      return (
        <Container>
          {WrappedComponent ? <WrappedComponent {...this.props as P} {...this.state} filter={this.filter} applyFilter={this.applyFilter} /> : null}
          <Body>
            <QuickView>
              <FlatList
                ref={(ref: any) => { this.flatList = ref; }}
                list={list}
                ListHeaderComponent={ListHeaderComponent}
                getList={(query?: TQuery) => {
                  getList({ ...query, fields, filter: this.filter?.filterObject });
                }}
                renderItem={(data) => renderItem(data, themeNameAny)}
              />
            </QuickView>
          </Body>
        </Container>
      );
    }
  }

  const mapStateToProps = (state: any) => {
    let result: any = {
      themeName: themeSelector(state),
      filterData: filterSelector ? filterSelector(state) : {},
      ...Selector.getArray(listSelector, state),
    };
    // Map State for ReduxExtraData
    result = HocHelper.mapStateForReduxExtraData(result, state, reduxExtraData);
    return result;
  };

  const mapDispatchToProps = (dispatch: any) => {
    let result: any = {
      getList: (query?: TQuery) => dispatch(dispatchGetList({ query })),
      setFilter: (filter: any) => dispatch(dispatchFilter({ filter })),
    };
    // Map Dispatch for ReduxExtraData
    result = HocHelper.mapDispatchForReduxExtraData(result, dispatch, reduxExtraData);
    return result;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithReduxList as any);
};
export default withReduxList;

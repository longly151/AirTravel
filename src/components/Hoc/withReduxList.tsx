/* eslint-disable max-len */
import React from 'react';
import { TQuery, BaseProps } from '@utils/redux';
import Filter from '@utils/filter';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import { ThemeEnum } from '@contents/Config/redux/slice';
import Selector from '@utils/selector';
import { createSelector } from 'reselect';
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
  { dispatchGetList, dispatchFilter, constant, fields, ListHeaderComponent, renderItem }: {
    dispatchGetList: any, dispatchFilter?: any, constant: {PARENT_NAME?: string, NAME: string, KEY: string, FILTER_KEY?: string}, fields?: Array<string>, ListHeaderComponent?: React.ComponentType<any>, renderItem: ({ item, index }: {item: any, index: number}, themeName: ThemeEnum) => any
  }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // Selector
  const { PARENT_NAME, NAME, KEY, FILTER_KEY } = constant;
  const root = (state: any) => {
    if (PARENT_NAME) return state[PARENT_NAME][NAME];
    return state[NAME];
  };
  const listSelector = Selector.createArraySelector(root, KEY);
  const filterSelector = FILTER_KEY ? createSelector(root, (data: any) => data[FILTER_KEY]) : null;

  // HOC Class
  class WithReduxList extends React.Component<P & WithReduxListProps, State> {
    flatList: any;

    filter: Filter;

    constructor(props: any) {
      super(props);
      const { filterData } = this.props;
      this.filter = new Filter(filterData);
    }

    applyFilter = () => {
      const { setFilter } = this.props;
      this.flatList.handleRefresh();
      setFilter(this.filter.filterObject);
    };

    render() {
      const { data, metadata, loading, error, getList, themeName, ...otherProps } = this.props;
      const themeNameAny: any = themeName;
      const list = {
        data,
        metadata,
        loading,
        error,
      };

      return (
        <Container>
          {WrappedComponent ? <WrappedComponent {...otherProps as P} filter={this.filter} applyFilter={this.applyFilter} /> : null}
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

  const mapStateToProps = (state: any) => ({
    themeName: themeSelector(state),
    filterData: filterSelector ? filterSelector(state) : {},
    ...Selector.getArray(listSelector, state),
  });

  const mapDispatchToProps = (dispatch: any) => ({
    getList: (query?: TQuery) => dispatch(dispatchGetList({ query })),
    setFilter: (filter: any) => dispatch(dispatchFilter({ filter })),
  });

  return connect(
    mapStateToProps, mapDispatchToProps
  )(WithReduxList as any);
};
export default withReduxList;

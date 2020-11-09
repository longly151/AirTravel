/* eslint-disable max-len */
import React from 'react';
import Redux, { BaseState, TQuery, dataPrefix } from '@utils/redux';
import AppHelper from '@utils/appHelper';
import Filter from '@utils/filter';
import Api from '@utils/api';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import { ThemeEnum } from '@contents/Config/redux/slice';
import Container from '../Common/View/Container';
import Body from '../Common/View/Body';
import QuickView from '../Common/View/QuickView';
import FlatList from '../Common/FlatList/DefaultFlatList';

export interface FilterProps {
  filter: Filter,
  applyFilter: () => any;
}

export interface WithPureListProps {
  themeName?: any;
}

interface State extends BaseState {
  filter: Filter,
}

// function getDisplayName(WrappedComponent: React.ComponentType) {
//   return WrappedComponent.displayName || WrappedComponent.name || 'Component';
// };

const withPureList = (
  { url, fields, ListHeaderComponent, renderItem }: {
    url: string, fields?: Array<string>, ListHeaderComponent?: React.ComponentType<any>, renderItem: ({ item, index }: {item: any, index: number}, themeName: ThemeEnum) => any
  }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithPureList extends React.Component<P & WithPureListProps, State> {
    flatList: any;

    constructor(props: any) {
      super(props);
      this.state = {
        loading: true,
        data: [],
        metadata: {
          count: 10,
          total: 0,
          page: 1,
          pageCount: 1,
        },
        error: null,
        filter: new Filter(),
      };
    }

    fetch = (queryString: string): any => Api.get(`${url}?${queryString}`);

    applyFilter = () => {
      this.flatList.handleRefresh();
    };

    getList = async (query: TQuery) => {
      const { data: dataState } = this.state;
      try {
        this.setState({ loading: true });
        const response = await this.fetch(Redux.stringifyQuery(query));
        const { metadata } = response;
        const dataGet = response[dataPrefix];
        let data = dataGet;
        if (metadata) {
          const currentPage = response.metadata?.page;
          data = currentPage === 1 || !currentPage
            ? dataGet
            : dataState.concat(
              dataGet.filter(
                (item: any) => dataState.indexOf(item) < 0,
              ),
            );
        }
        this.setState({
          loading: false,
          data,
          metadata,
          error: null,
        });
        return true;
      } catch (error) {
        const handledError = AppHelper.handleException(error);
        this.setState({
          loading: false,
          error: handledError,
        });
        return false;
      }
    };

    render() {
      const { loading, data, metadata, error, filter } = this.state;
      const { themeName, ...props } = this.props;
      const list = {
        data,
        metadata,
        loading,
        error,
      };
      return (
        <Container>
          {WrappedComponent ? <WrappedComponent {...props as P} filter={filter} applyFilter={this.applyFilter} /> : null}
          <Body>
            <QuickView>
              <FlatList
                ref={(ref: any) => { this.flatList = ref; }}
                list={list}
                ListHeaderComponent={ListHeaderComponent}
                getList={(query?: TQuery) => {
                  this.getList({ ...query, fields, filter: filter?.filterObject });
                }}
                renderItem={(data) => renderItem(data, themeName)}
              />
            </QuickView>
          </Body>
        </Container>
      );
    }
  }

  const mapStateToProps = (state: any) => ({
    themeName: themeSelector(state)
  });

  return connect(
    mapStateToProps
  )(WithPureList as any);
};
export default withPureList;

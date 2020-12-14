import React, { PureComponent } from 'react';
import { TQuery, TArrayRedux } from '@utils/redux';
import {
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
  RefreshControl,
} from 'react-native';
import { Icon, withTheme, ThemeProps } from 'react-native-elements';
import _ from 'lodash';
import i18next from 'i18next';
import Loading from '../../Loading';
import QuickView from '../../View/QuickView';
import Text from '../../Text';

export interface FlatListProps
  extends Omit<RNFlatListProps<any>, 'data' | 'renderItem'> {
  data?: any;
  list?: TArrayRedux;
  getList?: (query?: TQuery) => any;
  renderItem: ({ item, index }: { item: any; index: number }) => any;
  renderEmpty?: () => any;
  loadingColor?: string;
  textColor?: string;
  loadMore?: boolean;
  theme?: any;
  ref?: any;
}
interface State {
  refreshing: boolean;
  page: number;
}

class FlatList extends PureComponent<FlatListProps, State> {
  static defaultProps = {
    showsVerticalScrollIndicator: false,
    onEndReachedThreshold: 0.5,
    loadMore: true,
  };

  private flatListRef: any;

  constructor(props: FlatListProps) {
    super(props);
    const { list, getList } = this.props;
    if (list && getList) {
      this.state = {
        refreshing: false,
        page: 1,
      };
    }
  }

  componentDidMount() {
    const { list, getList } = this.props;
    if (list && getList) {
      getList();
    }
  }

  handleRefresh = (silent: boolean = false) => {
    const { list, getList } = this.props;
    if (list && getList) {
      this.setState({ page: 1, refreshing: !silent }, () => {
        getList();
      });
    }
  };

  handleLoadMore = () => {
    const { list, getList, loadMore } = this.props;
    if (loadMore && list && getList) {
      const { page: currentPage, pageCount } = list.metadata;
      if (currentPage !== pageCount && !list.loading) {
        this.setState(
          (prevState) => ({
            page: prevState.page + 1,
          }),
          () => {
            const { page } = this.state;
            if (currentPage < pageCount) {
              getList({ page });
            }
          },
        );
      }
    }
  };

  rollToTop = () => {
    if (this.flatListRef) {
      this.flatListRef.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  };

  renderFooter = () => {
    const {
      list, loadingColor: loadingColorProp, getList, theme
    } = this.props;
    if (list && getList) {
      const { refreshing } = this.state;
      /**
       * Theme Handle
       */
      const loadingColor = loadingColorProp || theme.colors.secondaryText;

      if (list.metadata.page === list.metadata.pageCount && !_.isEmpty(list.data)) {
        return (
          <QuickView marginBottom={10}>
            <Icon
              name="up"
              type="antdesign"
              size={30}
              color={loadingColor}
              onPress={this.rollToTop}
            />
          </QuickView>
        );
      }
      if (!list.loading || refreshing) return null;
      return (
        <QuickView marginVertical={5}>
          <Loading animating color={loadingColor} size="small" />
        </QuickView>
      );
    }
    return null;
  };

  renderEmpty = () => {
    const {
      horizontal,
      list,
      textColor: textColorProp,
      getList,
      theme,
    } = this.props;
    if (list && getList) {
      /**
       * Language & Theme Handle
       */
      const textColor = textColorProp || theme.colors.secondaryText;

      if (!horizontal && !list.loading) {
        return (
          <QuickView center>
            <QuickView marginVertical={10}>
              <Icon
                name="exclamationcircleo"
                color={textColor}
                type="antdesign"
                size={30}
              />
            </QuickView>
            <Text color={textColor}>{list.error?.messages || i18next.t('component:flat_list:empty')}</Text>
          </QuickView>
        );
      }
      return null;
    }
    return null;
  };

  render() {
    const {
      data,
      list,
      getList,
      renderItem,
      renderEmpty,
      loadingColor: loadingColorProp,
      theme,
      ...otherProps
    } = this.props;
    if (list && getList) {
      const { refreshing } = this.state;
      /**
       * Theme Handle
       */
      const loadingColor = loadingColorProp || theme.colors.secondaryText;

      if (!list.loading) setTimeout(() => this.setState({ refreshing: false }), 500);
      return (
        <RNFlatList
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          keyExtractor={(item) => `${item.id}`}
          {...otherProps}
          ListEmptyComponent={renderEmpty || this.renderEmpty}
          data={list.data}
          renderItem={renderItem}
          onEndReached={this.handleLoadMore}
          ListFooterComponent={this.renderFooter}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
              tintColor={loadingColor}
            />
          )}
          extraData={refreshing || list.loading}
        />
      );
    }
    return (
      <RNFlatList
        ref={(ref) => {
          this.flatListRef = ref;
        }}
        {...otherProps}
        ListEmptyComponent={renderEmpty || this.renderEmpty}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id || index}`}
        data={data}
      />
    );
  }
}

export default withTheme(
  FlatList as any as React.ComponentType<FlatListProps & ThemeProps<any>>
);

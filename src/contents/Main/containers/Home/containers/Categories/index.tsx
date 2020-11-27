import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { TArrayRedux, TQuery } from '@utils/redux';
import { withTheme } from 'react-native-elements';
import { QuickView, FlatList, Card } from '@components';
import { NavigationService } from '@utils/navigation';
import Selector from '@utils/selector';
import { serviceSetFilter } from '@contents/Service/redux/slice';
import homeStack from '../../routes';
import { serviceCategoryHomeScreenListSelector } from './redux/selector';
import { serviceCategoryGetHomeScreenList } from './redux/slice';

const { width: viewportWidth } = Dimensions.get('window');

interface Props {
  list: TArrayRedux;
  getList: (query?: TQuery) => any;
  setFilter: (filter: any) => any;
  theme?: any;
}

class Categories extends PureComponent<Props> {
  renderItem = ({ item }: { item: any }) => {
    const { theme, setFilter } = this.props;
    return (
      <Card
        data={item}
        cardWidth={0.8 * viewportWidth}
        cardHeight={350}
        marginHorizontal={18}
        backgroundColor={theme.Card.backgroundColor}
        shadowColor={theme.Card.shadowColor}
        onPress={() => {
          setFilter({ 'serviceCategories.id': item.id });
          NavigationService.navigate(homeStack.service);
        }}
        key={item.id}
      />
    );
  };

  render() {
    const { list, getList } = this.props;

    return (
      <QuickView marginTop={40}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          list={list}
          getList={getList}
          renderItem={this.renderItem}
        />
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  list: Selector.getArray(serviceCategoryHomeScreenListSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query?: TQuery) => dispatch(serviceCategoryGetHomeScreenList({ query })),
  setFilter: (filter: any) => dispatch(serviceSetFilter({ filter })),
});

const withReduce = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
});

export default compose(withTheme, withReduce)(Categories as any);

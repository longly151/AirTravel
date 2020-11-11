import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { TArrayRedux, TQuery } from '@utils/redux';
import { withTheme } from 'react-native-elements';
import { QuickView, FlatList, Card } from '@components';
import { NavigationService } from '@utils/navigation';
import Selector from '@utils/selector';
import homeStack from '../../routes';
import { serviceCategoryListSelector } from './redux/selector';
import { serviceCategoryGetList } from './redux/slice';

const { width: viewportWidth } = Dimensions.get('window');

interface Props {
  list: TArrayRedux;
  getList: (query?: TQuery) => any;
  theme?: any;
}

class Categories extends PureComponent<Props> {
  renderItem = ({ item }: { item: any }) => {
    const { theme } = this.props;
    return (
      <Card
        data={item}
        cardWidth={0.8 * viewportWidth}
        cardHeight={350}
        marginHorizontal={18}
        backgroundColor={theme.Card.backgroundColor}
        shadowColor={theme.Card.shadowColor}
        onPress={() => {
          NavigationService.navigate(homeStack.service, {
            id: [item.id],
          });
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
  list: Selector.getArray(serviceCategoryListSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: () => dispatch(serviceCategoryGetList({})),
});

const withReduce = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
});

export default compose(withTheme, withReduce)(Categories as any);

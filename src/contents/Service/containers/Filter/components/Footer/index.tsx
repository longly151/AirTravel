/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-elements';
import { QuickView, Button, Text } from '@components';
import { TQuery } from '@utils/redux';
import { compose } from 'recompose';
import { serviceGetList } from '@contents/Service/redux/slice';
import { connect } from 'react-redux';
import { NavigationService } from '@utils/navigation';
import homeRoutes from '../../../../../Main/containers/Home/routes';

const { width: viewportWidth } = Dimensions.get('window');

interface Props {
  theme?: any;
  selectedCategories: Array<number>;
  getList: (query?: TQuery) => any;
}

const styles = StyleSheet.create({
  footerContainer: {
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

class Footer extends PureComponent<Props> {
  render() {
    const { selectedCategories, getList } = this.props;

    return (
      <QuickView
        position="absolute"
        bottom={0}
        style={styles.footerContainer}
        width={viewportWidth}
        height={100}
        backgroundColor="#fff"
        row
        paddingHorizontal={18}
        alignItems="center"
        justifyContent="space-between">
        <QuickView width="30%">
          <Text fontSize={16} bold>
            Clear all
          </Text>
        </QuickView>
        <Button
          title="Show all services"
          borderRadius={8}
          fontSize={18}
          titlePaddingHorizontal={35}
          titlePaddingVertical={12}
          bold
          onPress={() => {
            const arrayQuerry = selectedCategories.map((e: any) => ({
              'serviceCategories.id': e,
            }));
            getList({
              s: JSON.stringify({
                $or: arrayQuerry,
                status: 'ACTIVE',
              }),
            });
            NavigationService.navigate(homeRoutes.service, {
              id: selectedCategories,
            });
          }}
        />
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query?: TQuery) => dispatch(serviceGetList({ query })),
});

const withReduce = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
});

export default compose(withTheme, withReduce)(Footer as any);

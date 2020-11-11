/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Text,
  QuickView,
  ListCheckBox,
  DividedContent,
} from '@components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';
import { ScrollView } from 'react-native';
import Selector from '@utils/selector';
import { TArrayRedux, TQuery } from '@utils/redux';
import { serviceCategoryListSelector } from '@contents/Main/containers/Home/containers/Categories/redux/selector';
import { compose } from 'recompose';
import { withTheme } from 'react-native-elements';
import AppHelper from '@utils/appHelper';
import Footer from '../components/Footer';

interface Props {
  list: TArrayRedux;
  getList: (query?: TQuery) => any;
  theme?: any;
}
interface State {
  selectedCategories: Array<number>;
}

class FilterServicesScreen extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedCategories: AppHelper.getIdFromParams(props),
    };
  }

  render() {
    const { selectedCategories } = this.state;
    const { list } = this.props;
    const dataRow = list.data.map((e: any) => ({
      id: e.id,
      name: e.enName,
    }));

    const footerProps = {
      selectedCategories,
    };

    return (
      <Container>
        <Footer {...footerProps} />
        <ScrollView>
          <QuickView marginHorizontal={18} marginTop={50}>
            <Icon
              name="close"
              size={30}
              onPress={() => NavigationService.goBack()}
            />
            <DividedContent>
              <Text bold fontSize={22} marginBottom={10}>
                Service
              </Text>
              <QuickView>
                <ListCheckBox
                  data={dataRow}
                  defaultValue={selectedCategories}
                  onChange={(value: any) => {
                    this.setState({
                      selectedCategories: value,
                    });
                  }}
                  checkBoxProps={{
                    iconRight: true,
                    textStyle: {
                      fontWeight: 'normal',
                      marginLeft: -9,
                      fontSize: 20,
                      width: '96%',
                    },
                  }}
                />
              </QuickView>
            </DividedContent>
            <DividedContent>
              <Text bold fontSize={22} marginBottom={30}>
                Price range
              </Text>
              <Text fontSize={20}>Add your trip dates to get prices</Text>
            </DividedContent>
          </QuickView>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  list: Selector.getArray(serviceCategoryListSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({});

const withReduce = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
});

export default compose(withTheme, withReduce)(FilterServicesScreen as any);

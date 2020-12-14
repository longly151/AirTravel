import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { QuickView, Text, Button, Image } from '@components';
import { NavigationService } from '@utils/navigation';
import { serviceSetFilter } from '@contents/Service/redux/slice';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AppView from '@utils/appView';
import homeStack from '../../routes';
import crucialCategory from './data';
import crucialCategoryStyle from './styles';

interface Props {
  theme?: any;
  setFilter: (filter?: any) => any;
}

class CrucialCategory extends PureComponent<Props> {
  render() {
    const width = AppView.screenWidth - 36;
    const { theme, setFilter } = this.props;
    return (
      <View style={crucialCategoryStyle.imageContainer}>
        <Image
          source={{ uri: crucialCategory.illustration }}
          style={{ ...crucialCategoryStyle.image, width }}
        />
        <QuickView
          style={crucialCategoryStyle.imageOverlay}
          backgroundColor={theme.Card.shadowColor}
        />
        <QuickView flex={1} style={crucialCategoryStyle.detailContainer} center>
          <Text
            style={crucialCategoryStyle.title}
            numberOfLines={3}
            color={theme.Card.backgroundColor}
            t="home:crucial_category_title"
          />
          <Text
            style={crucialCategoryStyle.subtitle}
            numberOfLines={3}
            color={theme.Card.backgroundColor}
            t="home:crucial_category_subTitle"
          />
          <Button
            t="home:crucial_category_btn_explore"
            backgroundColor={theme.Card.backgroundColor}
            titleColor={theme.Card.shadowColor}
            sharp
            borderRadius={5}
            width="100%"
            icon={{ name: 'send', style: { marginTop: 3 } }}
            iconRight
            onPress={() => {
              setFilter({});
              NavigationService.navigate(homeStack.service);
            }}
          />
        </QuickView>
      </View>
    );
  }
}
const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setFilter: (filter?: any) => dispatch(serviceSetFilter({ filter })),
});

const withReduce = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
});

export default compose(withTheme, withReduce)(CrucialCategory as any);

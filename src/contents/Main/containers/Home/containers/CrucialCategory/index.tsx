import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { ThemeProps, withTheme } from 'react-native-elements';
import { QuickView, Text, Button, Image } from '@components';
import { NavigationService } from '@utils/navigation';
import homeStack from '../../routes';
import crucialCategory from './data';
import crucialCategoryStyle from './styles';

interface Props {
  theme?: any;
}

class CrucialCategory extends PureComponent<Props> {
  render() {
    const { theme } = this.props;
    return (
      <View style={crucialCategoryStyle.imageContainer}>
        <Image
          source={{ uri: crucialCategory.illustration }}
          style={crucialCategoryStyle.image}
        />
        <QuickView
          style={crucialCategoryStyle.imageOverlay}
          backgroundColor={theme.Card.shadowColor}
        />
        <QuickView flex={1} style={crucialCategoryStyle.detailContainer} center>
          <Text
            style={crucialCategoryStyle.title}
            numberOfLines={3}
            t="home:crucial_category_title"
            color={theme.Card.backgroundColor}
          />
          <Text
            style={crucialCategoryStyle.subtitle}
            numberOfLines={3}
            t="home:crucial_category_subTitle"
            color={theme.Card.backgroundColor}
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
              NavigationService.navigate(homeStack.service);
            }}
          />
        </QuickView>
      </View>
    );
  }
}
export default withTheme(
  (CrucialCategory as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

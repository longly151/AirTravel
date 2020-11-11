import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView, Text, Button } from '@components';
import Carousel from '../Carousel';
// import topTours from './data';
import greetingStyles from './styles';

const { width: viewportWidth } = Dimensions.get('window');

const greetMarginVertical = 16;

interface Props {
  theme?: any;
  list?: any;
}

class Greeting extends PureComponent<Props> {
  render() {
    const { list } = this.props;
    return (
      <View>
        {list && <Carousel data={list.data} />}
        <QuickView flex={1} style={greetingStyles.greetContainer}>
          <QuickView row>
            <Text
              style={greetingStyles.greetText}
              t="home:greet"
              color="#fff"
            />
            <Text style={greetingStyles.greetText} color="#fff">
              Hieu
            </Text>
          </QuickView>

          <Text
            style={greetingStyles.greetText}
            t="home:expected_find"
            color="#fff"
          />
          <Button
            icon={{ name: 'magnify', style: { marginRight: 8 } }}
            t="home:btn_find"
            backgroundColor="rgba(255,255,255,0.2)"
            titleColor="#fff"
            buttonStyle={{ display: 'flex', justifyContent: 'flex-start' }}
            width={viewportWidth - greetMarginVertical * 2}
            fontSize={14}
            marginTop={20}
          />
        </QuickView>
      </View>
    );
  }
}

export default withTheme(
  (Greeting as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

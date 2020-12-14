import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native';
import { withTheme } from 'react-native-elements';
import { QuickView, Text, Button } from '@components';
import { NavigationService } from '@utils/navigation';
import Carousel from '../Carousel';
// import topTours from './data';
import greetingStyles from './styles';
import homeRoutes from '../../routes';

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
              color="#fff"
              t="home:greet"
            />
          </QuickView>

          <Text
            style={greetingStyles.greetText}
            color="#fff"
            t="home:expected_find"
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
            onPress={() => {
              NavigationService.navigate(homeRoutes.service);
            }}
          />
        </QuickView>
      </View>
    );
  }
}

export default withTheme(Greeting as any);

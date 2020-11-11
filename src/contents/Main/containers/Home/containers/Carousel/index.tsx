import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from './Component/SliderEntry';

const { width: viewportWidth } = Dimensions.get('window');

interface Props {
  data: any;
  sliderWidth?: number;
  itemWidth?: number;
  sliderHeight?: number;
  PaginationStyleProps?: any;
  dotStyleProps?: any;
  hide?: boolean;
  theme?: any;
}
interface State {
  activeSlide: number;
}
class MyCarousel extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }

  renderItem = ({ item, index }: { item: any; index: any }) => {
    const { itemWidth, sliderWidth, sliderHeight, theme } = this.props;
    return (
      <SliderEntry
        data={item}
        itemWidth={itemWidth}
        sliderWidth={sliderWidth}
        sliderHeight={sliderHeight}
        backgroundColor={theme.Card.backgroundColor}
        key={index}
      />
    );
  };

  render() {
    const {
      data,
      PaginationStyleProps,
      dotStyleProps,
      hide,
      sliderWidth,
      theme,
    } = this.props;
    const { activeSlide } = this.state;
    const containerStyle = StyleSheet.flatten([
      {
        flexDirection: 'row',
        marginTop: -20,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
      },
      PaginationStyleProps,
    ]);
    const dotstyle = StyleSheet.flatten([
      {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
      },
      dotStyleProps,
    ]);
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <View>
        <Carousel
          data={data}
          renderItem={this.renderItem}
          itemWidth={sliderWidth || viewportWidth}
          sliderWidth={viewportWidth}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          vertical={false}
        />
        {!hide ? (
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={containerStyle}
            dotStyle={dotstyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        ) : (
          false
        )}
      </View>
    );
  }
}
export default withTheme(
  (MyCarousel as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

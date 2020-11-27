import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView, Text, Image, Loading } from '@components';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';

const { width: viewportWidth } = Dimensions.get('window');

interface Props {
  gallery: any;
  loading: boolean;
  theme?: any;
}

interface State {
  activeSlide: number;
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: viewportWidth,
    height: 400,
    borderRadius: 0,
  },
});

class Header extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeSlide: 1,
    };
  }

  renderItem = ({ item, index }: { item: any, index: number }) => (
    <Image
      source={{ uri: item }}
      style={styles.image}
      key={index}
    />
  );

  render() {
    const { activeSlide } = this.state;
    const { loading, gallery } = this.props;
    return (
      <QuickView position="relative" height={300}>
        {
          loading ? <Loading style={{ marginTop: 150 }} />
            : (
              <Carousel
                data={gallery}
                renderItem={this.renderItem}
                sliderWidth={viewportWidth}
                itemWidth={viewportWidth}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                onSnapToItem={(index) => this.setState({ activeSlide: index + 1 })}
                vertical={false}
              />
            )
        }
        <QuickView
          position="absolute"
          top={40}
          left={18}
          backgroundColor="#fff"
          padding={12}
          borderRadius={50}
          onPress={() => NavigationService.goBack()}
        >
          <Icon name="arrow-left" size={24} />
        </QuickView>
        <QuickView
          position="absolute"
          top={40}
          right={18}
          backgroundColor="#fff"
          padding={12}
          borderRadius={50}
        >
          <Icon name="heart-outline" size={24} />
        </QuickView>
        <QuickView
          position="absolute"
          bottom={10}
          right={18}
          backgroundColor="rgba(0, 0, 0, 0.6)"
          paddingVertical={5}
          width={70}
          borderRadius={4}
          alignItems="center"
        >
          {
            gallery ? (
              <Text color="#fff" fontSize={14} bold>
                {`${activeSlide} / ${gallery.length}`}
              </Text>
            ) : null
          }

        </QuickView>
      </QuickView>
    );
  }
}

export default withTheme(
  (Header as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

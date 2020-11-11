import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView, Image } from '@components';
import { AirbnbRating } from 'react-native-ratings';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

function wp(percentage: any) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideHeight = viewportHeight * 0.5;
const slideWidth = wp(100);

const borderBottomRightRadius = 36;

// export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth;

interface Props {
  data: any;
  even?: boolean;
  itemWidth?: number;
  sliderWidth?: number;
  sliderHeight?: number;
  overlayColor?: string;
  backgroundColor?: string;
  theme?: any;
}

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    borderRadius: 30,
    paddingBottom: 10,
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    borderBottomRightRadius,
    position: 'relative',
  },
  imageOverlay: {
    position: 'absolute',
    width: itemWidth,
    height: slideHeight - 10,
    top: 0,
    zIndex: 1,
    borderBottomRightRadius,
    opacity: 0.24,
  },
  image: {
    borderBottomRightRadius,
    width: viewportWidth,
    height: slideHeight - 10,
    borderRadius: 0,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMaskEven: {
    backgroundColor: '#000000',
  },
  detailContainer: {
    position: 'absolute',
    bottom: 10,
    width: itemWidth,
    opacity: 0.8,
    borderTopLeftRadius: 20,
    borderBottomRightRadius,
  },
  textContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    width: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
  },
  reviewContainer: {
    marginRight: 16,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

class SliderEntry extends PureComponent<Props> {
  static defaultProps = {
    backgroundColor: '#fff',
    overlayColor: '#000',
  };

  render() {
    const {
      data,
      sliderHeight,
      sliderWidth,
      theme,
      backgroundColor,
      overlayColor,
    } = this.props;
    const containerStyle = StyleSheet.flatten([
      styles.slideInnerContainer,
      {
        width: sliderWidth || itemWidth,
        height: sliderHeight || slideHeight,
      },
    ]);
    return (
      <TouchableOpacity activeOpacity={1} style={containerStyle}>
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: theme.Modal.backgroundColor || backgroundColor,
            },
          ]}
        >
          <QuickView
            style={styles.imageOverlay}
            backgroundColor={overlayColor}
          />
          <Image source={{ uri: data.thumbnail }} style={styles.image} />
        </View>
        <QuickView
          flex={1}
          row
          alignItems="center"
          justifyContent="space-between"
          style={styles.detailContainer}
          backgroundColor={backgroundColor}
        >
          <View style={styles.textContainer}>
            {data.enTitle ? (
              <Text
                style={[styles.title, { color: theme.Modal.textColor }]}
                numberOfLines={1}
              >
                {data.enTitle}
              </Text>
            ) : (
              false
            )}
            <Text
              style={[styles.subtitle, { color: theme.Modal.textColor }]}
              numberOfLines={1}
            >
              {data.note}
            </Text>
          </View>
          <QuickView
            flex={1}
            alignItems="flex-end"
            style={styles.reviewContainer}
          >
            <AirbnbRating size={20} showRating={false} />
            <Text
              style={[styles.subtitle, { color: theme.Modal.textColor }]}
              numberOfLines={1}
            >
              <Text style={[styles.score, { color: theme.Modal.textColor }]}>
                4.3
              </Text>
              {' '}
              (3456 views)
            </Text>
          </QuickView>
        </QuickView>
      </TouchableOpacity>
    );
  }
}
export default withTheme(
  (SliderEntry as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

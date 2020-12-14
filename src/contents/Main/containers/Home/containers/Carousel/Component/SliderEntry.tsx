/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView, Image, Text } from '@components';
import i18next from 'i18next';
import { LanguageEnum } from '@contents/Config/redux/slice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';
import AppHelper from '@utils/appHelper';
import detailServiceStack from '@contents/Service/containers/Detail/routes';
import serviceStack from '@contents/Service/routes';
import Helper from '@utils/helper';

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
  getDetailService?: any;
}

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    borderRadius: 36,
    backgroundColor: 'red',
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    borderBottomRightRadius,
    position: 'relative',
    height: slideHeight,
  },
  imageOverlay: {
    position: 'absolute',
    width: itemWidth,
    height: slideHeight,
    top: 0,
    zIndex: 1,
    borderBottomRightRadius,
    opacity: 0.24,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderBottomRightRadius,
    width: itemWidth,
    height: slideHeight,
    borderRadius: 0,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMaskEven: {
    backgroundColor: '#000000',
  },
  detailContainer: {
    position: 'absolute',
    bottom: 0,
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
      <TouchableOpacity
        activeOpacity={1}
        style={containerStyle}
        onPress={() =>
          NavigationService.navigate(serviceStack.detail, {
            screen: detailServiceStack.index,
            params: AppHelper.setItemIntoParams(data),
          })}
      >
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
            {i18next.t('key') === LanguageEnum.EN ? (
              data.enTitle ? (
                <Text
                  style={[styles.title, { color: theme.Modal.textColor }]}
                  numberOfLines={1}
                >
                  {data.enTitle}
                </Text>
              ) : (
                false
              )
            ) : data.viTitle ? (
              <Text
                style={[styles.title, { color: theme.Modal.textColor }]}
                numberOfLines={1}
              >
                {data.viTitle}
              </Text>
            ) : (
              false
            )}
            {i18next.t('key') === LanguageEnum.EN
              ? data.enDescription && (
                  <Text
                    style={[styles.subtitle, { color: theme.Modal.textColor }]}
                    numberOfLines={1}
                  >
                    {data.enDescription}
                  </Text>
                )
              : data.viDescription && (
                  <Text
                    style={[styles.subtitle, { color: theme.Modal.textColor }]}
                    numberOfLines={1}
                  >
                    {data.viDescription}
                  </Text>
                )}
          </View>
          <QuickView
            flex={1}
            alignItems="flex-end"
            style={styles.reviewContainer}
          >
            {data.destinations[0] ? (
              <QuickView row alignItems="center" marginTop={10}>
                <Icon name="map-marker" color="red" size={16} />
                <Text fontSize={12} bold>
                  {data.destinations[0].city.name}
                </Text>
              </QuickView>
            ) : null}
            <Text
              style={[styles.subtitle, { color: theme.Modal.textColor }]}
              numberOfLines={1}
            >
              <Text fontSize={14}>
                {`${Helper.numberWithCommas(data.currentPrice)} vnd - ${
                  data.unit
                }`}
              </Text>
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

/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  // Image,
} from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import { Image } from '@components';
import i18next from 'i18next';
import { LanguageEnum } from '@contents/Config/redux/slice';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

interface Props {
  data: any;
  even?: boolean;
  imageHeight?: number;
  cardWidth?: number;
  cardHeight?: number;
  entryBorderRadius?: number;
  marginHorizontal?: number;
  backgroundColor?: string;
  shadowColor?: string;
  type?: string;
  theme?: any;
  onPress?: any;
}

const styles = StyleSheet.create({
  cardInnerContainer: {
    paddingBottom: 18, // needed for shadow
    shadowOpacity: 0.25,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 10,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    // resizeMode: 'cover',
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMaskEven: {
    backgroundColor: '#000000',
  },
  textContainer: {
    justifyContent: 'center',
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    fontStyle: 'italic',
  },
});

class Card extends PureComponent<Props> {
  private player: any;

  static defaultProps = {
    cardWidth: viewportWidth,
    cardHeight: viewportHeight,
    marginHorizontal: 0,
    entryBorderRadius: 8,
    shadowColor: '#000000',
    imageHeight: '100%',
  };

  render() {
    const {
      data,
      cardHeight,
      cardWidth,
      theme,
      marginHorizontal,
      backgroundColor,
      entryBorderRadius,
      imageHeight,
      children,
      shadowColor,
      onPress,
    } = this.props;
    const containerStyle = StyleSheet.flatten([
      styles.cardInnerContainer,
      {
        width: cardWidth,
        height: cardHeight,
        marginHorizontal,
        borderRadius: entryBorderRadius,
        shadowColor,
      },
    ]);
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={containerStyle}
        onPress={onPress}
      >
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: theme.Modal.backgroundColor,
              borderTopLeftRadius: entryBorderRadius,
              borderTopRightRadius: entryBorderRadius,
              height: imageHeight,
            },
          ]}
        >
          <Image
            source={{ uri: data.illustration }}
            height={imageHeight}
            width={cardWidth}
            style={{
              height: imageHeight,
              borderTopLeftRadius: entryBorderRadius,
              borderTopRightRadius: entryBorderRadius,
              borderRadius: 0,
            }}
          />
        </View>
        <View
          style={[
            styles.textContainer,
            {
              backgroundColor: backgroundColor || theme.Modal.backgroundColor,
              paddingTop: entryBorderRadius ? 20 - entryBorderRadius : 12,
              borderBottomLeftRadius: entryBorderRadius,
              borderBottomRightRadius: entryBorderRadius,
            },
          ]}
        >
          {i18next.t('key') === LanguageEnum.EN
            ? data.enName && (
                <Text
                  style={[styles.title, { color: theme.Modal.textColor }]}
                  numberOfLines={2}
                >
                  {data.enName.toUpperCase()}
                </Text>
              )
            : data.viName && (
                <Text
                  style={[styles.title, { color: theme.Modal.textColor }]}
                  numberOfLines={2}
                >
                  {data.viName.toUpperCase()}
                </Text>
              )}

          {i18next.t('key') === LanguageEnum.EN
            ? data.enSubtitle && (
                <Text
                  style={[styles.subtitle, { color: theme.Modal.textColor }]}
                  numberOfLines={2}
                >
                  {data.enSubtitle}
                </Text>
              )
            : data.viSubtitle && (
                <Text
                  style={[styles.subtitle, { color: theme.Modal.textColor }]}
                  numberOfLines={2}
                >
                  {data.viSubtitle}
                </Text>
              )}
          {children}
        </View>
      </TouchableOpacity>
    );
  }
}
export default withTheme(
  (Card as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

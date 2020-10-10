import React, { PureComponent } from 'react';
import {
  Text as EText,
  Icon as EIcon,
  IconProps as EIconProps,
  TextProps as ETextProps,
  withTheme,
  ThemeProps,
} from 'react-native-elements';
import { StyleSheet } from 'react-native';
import Font from '@themes/Font';
import { lightTheme } from '@themes/Theme';
import QuickView from '@components/Common/View/QuickView';
import { Translation } from 'react-i18next';

type TFontFamily = typeof Font.fontFamily;
type TFontSize = typeof Font.fontSize;
type TType = typeof lightTheme.Text;

export interface TextProps extends Omit<ETextProps, 'fontFamily' | 'fontSize'> {
  fontFamily?: keyof TFontFamily;
  fontSize?: keyof TFontSize | number;
  type?: keyof TType;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
  color?: string;
  center?: boolean;
  iconRight?: boolean;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  thin?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  children?: any;
  icon?: EIconProps;
  iconContainerStyle?: any;
  t?: string;
  theme?: any;
}

class Text extends PureComponent<TextProps> {
  static defaultProps = {
    iconRight: false,
    type: 'paragraph',
  };

  render() {
    const {
      fontFamily,
      fontSize,
      primary,
      secondary,
      success,
      error,
      warning,
      color,
      center,
      margin,
      marginLeft,
      marginRight,
      marginBottom,
      marginTop,
      marginHorizontal,
      marginVertical,
      underline,
      thin,
      bold,
      italic,
      icon,
      iconRight,
      iconContainerStyle,
      style,
      children,
      theme,
      type,
      t,
      ...otherProps
    } = this.props;

    /**
     * Color Handle
     */
    const { colors } = theme;
    let textColor = theme.colors.primaryText;
    if (primary) textColor = colors.primary;
    if (secondary) textColor = colors.secondary;
    if (success) textColor = colors.success;
    if (warning) textColor = colors.warning;
    if (error) textColor = colors.error;
    if (color) textColor = color;

    /**
     * textStyle
     */
    const textStyle = StyleSheet.flatten([
      type && theme.Text[type],
      fontFamily && {
        fontFamily: Font.fontFamily[fontFamily],
      },
      italic && {
        fontFamily: Font.fontFamily.RobotoItalic,
      },
      thin && {
        fontWeight: 200,
      },
      bold && {
        fontWeight: 'bold',
      },
      (fontSize && typeof fontSize === 'number') && {
        fontSize,
      },
      (fontSize && typeof fontSize === 'string') && {
        fontSize: Font.fontSize[fontSize],
      },
      center && {
        textAlign: 'center',
      },
      margin && { margin },
      marginTop && { marginTop },
      marginBottom && { marginBottom },
      marginLeft && { marginLeft },
      marginRight && { marginRight },
      marginHorizontal && { marginHorizontal },
      marginVertical && { marginVertical },
      underline && { textDecorationLine: 'underline' },
      { color: textColor },
      style,
    ]);

    /**
     * iconStyle
     */
    const iconStyle = StyleSheet.flatten([
      textStyle,
      { marginRight: iconRight ? 0 : 2 },
      { marginLeft: iconRight ? 2 : 0 },
      iconContainerStyle,
    ]);
    if (icon) {
      return (
        <QuickView testID="EIconText" row={!iconRight} rowReverse={iconRight} justifyContent={iconRight ? 'flex-end' : 'flex-start'}>
          <QuickView style={iconStyle}>
            <EIcon {...icon} name={icon.name} type={icon.type || 'material-community'} size={icon.size || 15} color={icon.color || textColor} />
          </QuickView>
          <QuickView>
            <EText {...otherProps} style={textStyle}>
              {children}
            </EText>
          </QuickView>
        </QuickView>
      );
    }

    if (t) {
      return (
        <Translation>
          {
          (trans) => <EText {...otherProps} style={textStyle}>{trans(t)}</EText>
          }
        </Translation>
      );
    }
    return (
      <EText {...otherProps} style={textStyle}>
        {children}
      </EText>
    );
  }
}

export default withTheme(Text as React.ComponentType<TextProps & ThemeProps<any>>);

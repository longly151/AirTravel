/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  PickerProps as RNPickerProps, ActionSheetIOS, StyleSheet, Platform,
  ScrollView } from 'react-native';
import _ from 'lodash';
import { Picker as RNPicker } from '@react-native-community/picker';
import { ThemeEnum, LanguageEnum } from '@contents/Config/redux/slice';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { themeSelector, languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import AppHelper from '@utils/appHelper';
import AppView from '@utils/appView';
import Button, { ButtonProps } from '../Button/DefaultButton';
import QuickView from '../View/QuickView';
import ModalButton from '../Button/ModalButton';
import Text from '../Text';

export interface PickerProps extends RNPickerProps, Omit<ButtonProps, 'style' >{
  labels?: Array<string>;
  values: Array<string>;
  placeholder?: string;
  width?: number | string;
  iconColor?: string;
  themeName?: ThemeEnum;
  language?: LanguageEnum;
  modal?: boolean;
}
interface State {
  selectedIndex: number | null;
}

class Picker extends PureComponent<PickerProps, State> {
  static defaultProps = {
    width: 100,
    height: 50,
    mode: 'dropdown',
    rounded: true,
  };

  pickerModal: any;

  constructor(props: PickerProps) {
    super(props);
    this.state = {
      selectedIndex: null,
    };
  }

  getDefaultIndex = () => {
    const { selectedValue, values } = this.props;
    let defaultIndex: number | null = null;
    if (typeof selectedValue === 'number') {
      defaultIndex = selectedValue;
    } else if (typeof selectedValue === 'string') {
      defaultIndex = _.indexOf(values, selectedValue);
    }
    return defaultIndex;
  };

  getSelectedIndex = () => {
    const { placeholder } = this.props;
    const { selectedIndex } = this.state;
    if (selectedIndex === null) {
      const defaultIndex = this.getDefaultIndex();
      if (defaultIndex !== null) {
        return defaultIndex;
      }
      if (placeholder) {
        return null;
      } return 0;
    }
    if (Platform.OS === 'android' && selectedIndex < 0) return null;
    return selectedIndex;
  };

  getSelectedValue = () => {
    const { values } = this.props;
    const selectedIndex = this.getSelectedIndex();
    if (selectedIndex === null) return null;
    return values[selectedIndex];
  };

  getText = () => {
    const { labels, values } = this.props;
    const selectedIndex = this.getSelectedIndex();
    if (selectedIndex === null) return null;
    return labels ? labels[selectedIndex] : values[selectedIndex];
  };

  /**
   * iOS
   */

  onPressActionSheetIOS = () => {
    const { labels, values, language } = this.props;
    const itemLabel = labels || values;
    const cancelText = language === LanguageEnum.EN ? 'Cancel' : 'Huỷ bỏ';
    const newLabel = [...itemLabel, cancelText];
    return (
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: newLabel,
          cancelButtonIndex: values.length,
        },
        (buttonIndex) => {
          if (buttonIndex !== values.length) {
            const { selectedIndex } = this.state;
            const { onValueChange } = this.props;
            if (selectedIndex !== buttonIndex) {
              this.setState({ selectedIndex: buttonIndex });
              if (onValueChange) { onValueChange(values[buttonIndex], buttonIndex); }
            }
          }
        },
      )
    );
  };

  /**
   * Android
   */
  renderItemAndroid = () => {
    const {
      titleColor: titleColorProp, themeName,
      primary, secondary, success, warning, error,
      labels: labelsProp, values: valuesProp, placeholder,
    } = this.props;
    const theme: any = AppHelper.getThemeByName(themeName);
    let titleColor = titleColorProp || (theme.key === ThemeEnum.LIGHT ? theme.colors.grey5 : theme.colors.dark);
    if (primary || secondary || success || warning || error) titleColor = theme.dark;
    let labels = labelsProp;
    let values = valuesProp;
    if (placeholder) {
      if (labels) labels = [placeholder, ...labels];
      values = [placeholder, ...values];
    }
    return values.map(
      (value, index) => (<RNPicker.Item key={index} color={titleColor} label={labels ? labels[index] : value} value={value} />),
    );
  };

  onValueChangeAndroid = (itemValue: ItemValue, itemIndex: number): void => {
    const { values, onValueChange, placeholder } = this.props;
    if (!placeholder) {
      this.setState({ selectedIndex: itemIndex });
      if (onValueChange) { onValueChange(values[itemIndex], itemIndex); }
    } else {
      this.setState({ selectedIndex: itemIndex - 1 });
      if (itemIndex >= 1) { if (onValueChange) { onValueChange(values[itemIndex - 1], itemIndex - 1); } }
    }
  };

  render() {
    const {
      labels,
      values,
      placeholder,
      itemStyle: itemStyleProp,
      icon: iconProp,
      titleStyle: titleStyleProp,
      titleProps: titlePropsProp,
      buttonStyle: buttonStyleProp,
      titleCenter,
      iconColor,
      modal,
      themeName,
      ...otherProps
    } = this.props;
    const { width: widthProp, height: heightProp } = this.props;
    const { selectedIndex } = this.state;
    const theme: any = AppHelper.getThemeByName(themeName);

    /**
     * currentLabel (iOS)
     */
    let currentLabel = '';
    const defaultIndex = this.getDefaultIndex();
    const itemLabel = labels || values;
    if (selectedIndex === null) {
      if (defaultIndex !== null) {
        currentLabel = itemLabel[defaultIndex];
      } else {
        currentLabel = placeholder || itemLabel[0];
      }
    } else {
      currentLabel = itemLabel[selectedIndex];
    }

    /**
     * BUTTON PROPS (For iOS & Modal Picker)
     */
    /**
     * titleStyle, titleProps
     */
    const titleStyle: any = StyleSheet.flatten([
      typeof widthProp === 'number' && { maxWidth: widthProp > 50 ? widthProp - 50 : 50 },
      typeof widthProp === 'string' && { maxWidth: widthProp },
      titleStyleProp,
    ]);
    const titleProps: any = _.merge(
      { numberOfLines: 1 },
      titlePropsProp,
    );

    /**
     * buttonStyle
     */
    const buttonStyle: any = StyleSheet.flatten([
      !titleCenter && { justifyContent: 'space-between' },
      buttonStyleProp,
    ]);

    /**
     * Icon
     */
    const { titleColor } = this.props;
    const defaultIcon = {
      name: 'caretdown',
      type: 'antdesign',
      size: 15,
      color: iconColor || titleColor,
    };
    const icon = _.merge(defaultIcon, iconProp);

    if (modal) {
      return (
        <ModalButton
          ref={(ref: any) => { this.pickerModal = ref; }}
          testID="PickerIOS"
          title={currentLabel}
          buttonStyle={buttonStyle}
          icon={icon}
          titleStyle={titleStyle}
          titleProps={titleProps}
          iconRight
          modalProps={{ type: 'bottom-half' }}
          {...otherProps}
        >
          <QuickView
            backgroundColor={theme.colors.primaryBackground}
            height={0.75 * AppView.screenHeight}
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          >
            <Text type="title" bold center marginTop={20}>{placeholder}</Text>
            <ScrollView style={{ marginVertical: 20 }}>
              {itemLabel.map((item: any, buttonIndex: number) => (
                <Button
                  key={buttonIndex.toString()}
                  marginVertical={3}
                  marginHorizontal={AppView.bodyPaddingHorizontal}
                  clear
                  title={item}
                  titleCenter={false}
                  onPress={() => {
                    const { selectedIndex } = this.state;
                    const { onValueChange } = this.props;
                    if (selectedIndex !== buttonIndex) {
                      this.pickerModal.close();
                      this.setState({ selectedIndex: buttonIndex });
                      if (onValueChange) { onValueChange(values[buttonIndex], buttonIndex); }
                    }
                  }}
                />
              ))}
            </ScrollView>
          </QuickView>
        </ModalButton>
      );
    }
    if (Platform.OS === 'ios') {
      return (
        <Button
          testID="PickerIOS"
          onPress={this.onPressActionSheetIOS}
          title={currentLabel}
          buttonStyle={buttonStyle}
          icon={icon}
          titleStyle={titleStyle}
          titleProps={titleProps}
          iconRight
          {...otherProps}
        />
      );
    }

    /**
       * Android
       */

    /**
       * androidStyle
       */
    const { colors } = theme;
    const {
      backgroundColor: backgroundColorProp,
      primary, secondary, success, warning, error,
      style: styleProp,
      mode,
      sharp: sharpProp,
      rounded: roundedProp,
      circle: circleProp,
      borderRadius: borderRadiusProp,
    } = this.props;
    let backgroundColor = backgroundColorProp || theme.Button.backgroundColor;
    if (primary) backgroundColor = colors.primary;
    if (secondary) backgroundColor = colors.secondary;
    if (success) backgroundColor = colors.success;
    if (warning) backgroundColor = colors.warning;
    if (error) backgroundColor = colors.error;

    // borderRadius
    let width = widthProp;
    let height = heightProp;

    let borderRadius: any = 0;
    let sharp = sharpProp;
    let rounded = roundedProp;
    let circle = circleProp;
    if (borderRadiusProp) {
      borderRadius = borderRadiusProp;
    } else {
      if (circle) {
        rounded = false;
        sharp = false;
        const minDimension = _.min([width, height]) || 50;
        width = minDimension;
        height = minDimension;
        borderRadius = minDimension;
      }
      if (rounded) {
        borderRadius = theme.Button.roundedBorderRadius;
      }
      if (sharp) {
        rounded = false;
        circle = false;
        borderRadius = 0;
      }
    }

    const androidStyle = StyleSheet.flatten([
      {
        height, width, backgroundColor, borderRadius,
      },
      styleProp,
    ]);

    /**
       * currentValue
       */
    let currentValue = '';
    if (selectedIndex === null) {
      if (defaultIndex !== null) {
        currentValue = values[defaultIndex];
      } else {
        currentValue = placeholder || values[0];
      }
    } else {
      currentValue = values[selectedIndex];
    }
    const { shadow } = this.props;
    return (
      <QuickView style={androidStyle} testID="PickerAndroid" shadow={shadow}>
        <RNPicker
          selectedValue={currentValue}
          style={{ height, width }}
          mode={mode}
          onValueChange={this.onValueChangeAndroid}
        >
          {this.renderItemAndroid()}
        </RNPicker>
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  themeName: themeSelector(state),
  language: languageSelector(state),
});

const Result: any = connect(mapStateToProps, null, null,
  { forwardRef: true })(Picker as React.ComponentType<PickerProps>);

export default Result as React.ComponentClass<PickerProps, any>;

import React, { Component } from 'react';
import { Platform } from 'react-native';
import RNDateTimePicker, { IOSNativeProps, AndroidNativeProps } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { themeSelector, languageSelector } from '@contents/Config/redux/selector';
import { ThemeEnum, LanguageEnum } from '@contents/Config/redux/slice';
import AppHelper from '@utils/appHelper';
import Modal from 'react-native-modal';
import Color from '@themes/Color';
import { Divider } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import AppView from '@utils/appView';
import Button, { ButtonProps } from '../Button/DefaultButton';
import QuickView from '../View/QuickView';
import Text from '../Text';

type Mode = 'date' | 'time' | 'datetime';
type Display = 'default' | 'spinner';

export interface DateTimePickerProps extends
  Omit<IOSNativeProps, 'mode'|'display'|'onChange'|'value'>,
  Omit<AndroidNativeProps, 'mode'|'display'|'value'>,
  Omit<ButtonProps, 'accessibilityActions'|'accessibilityComponentType'|'accessibilityElementsHidden'|'accessibilityHint'|'accessibilityIgnoresInvertColors'|'accessibilityLabel'|'accessibilityLiveRegion'|'accessibilityRole'|'accessibilityState'|'accessibilityTraits'|'accessibilityValue'|'accessibilityViewIsModal'|'accessible'|'hasTVPreferredFocus'|'hitSlop'|'importantForAccessibility'|'onAccessibilityAction'|'onAccessibilityEscape'|'onAccessibilityTap'|'onLayout'|'onMagicTap'|'style'|'testID'|'tvParallaxProperties' >{
  mode?: Mode;
  display?: Display;
  momentFormat?: string;
  themeName?: ThemeEnum;
  language?: LanguageEnum;
  value?: Date;
  placeholder?: string;
  placeholderTextColor?: string;
}
interface State {
  date: Date;
  tempDate: Date;
  hidePlaceholder: boolean;
  show: boolean;
}

class DateTimePicker extends Component<DateTimePickerProps, State> {
  static defaultProps = {
    mode: 'date',
  };

  momentFormat = 'DD/MM/YYYY hh:mm A';

  minWidth = 250;

  constructor(props: DateTimePickerProps) {
    super(props);
    const { mode, value } = this.props;
    switch (mode) {
      case 'date':
        this.minWidth = 250;
        this.momentFormat = 'DD/MM/YYYY';
        break;
      case 'time':
        this.minWidth = 150;
        this.momentFormat = 'hh:mm A';
        break;
      case 'datetime':
        this.minWidth = 320;
        this.momentFormat = 'DD/MM/YYYY hh:mm A';
        break;
      default:
        this.minWidth = 250;
        this.momentFormat = 'DD/MM/YYYY hh:mm A';
    }
    this.state = {
      date: value || new Date(),
      tempDate: value || new Date(),
      show: false,
      hidePlaceholder: false,
    };
  }

  addTimeAndroid = (event: any, selectedDate: any) => {
    const { date } = this.state;
    const { onChange } = this.props;
    const currentDate = selectedDate || date;

    const dateString = moment(date).format('YYYY-MM-DD');
    const timeString = moment(currentDate).format('hh:mm');
    const newDateString = `${dateString} ${timeString}`;
    const newDate = moment(newDateString, 'YYYY-MM-DD hh:mm').toDate();
    this.setState({
      date: newDate,
    });
    if (onChange) onChange(event, selectedDate);
  };

  customOnChange = (event: any, selectedDate: any) => {
    const { date } = this.state;
    const { onChange } = this.props;
    const currentDate = selectedDate || date;
    this.setState({
      tempDate: currentDate
    });
    if (onChange) onChange(event, selectedDate);
  };

  onDoneIOS = () => {
    const { tempDate } = this.state;
    this.setState({
      date: tempDate,
      show: false,
      hidePlaceholder: true,
    });
  };

  renderDateTime = () => {
    const { date, show } = this.state;
    /**
     * IOS
     */
    const {
      textColor: textColorProp,
      language,
      mode: modeProp,
      themeName,
      ...otherProps
    } = this.props;
    const theme = AppHelper.getThemeByName(themeName);
    const doneText = language === LanguageEnum.EN ? 'Done' : 'Hoàn tất';
    const cancelText = language === LanguageEnum.EN ? 'Cancel' : 'Huỷ bỏ';
    if (Platform.OS === 'ios') {
      const textColor = textColorProp || theme.colors.primaryText;
      const bgColor = theme.colors.primaryBackground;
      return (
        <Modal
          isVisible={show}
          onBackdropPress={() => this.setState({ show: false })}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <QuickView
            backgroundColor={bgColor}
            style={{ minWidth: this.minWidth, borderRadius: 20 }}
          >
            <QuickView row alignItems="center">
              <Button
                title={cancelText}
                titleColor={Color.blue}
                width={120}
                fontSize={20}
                clear
                containerStyle={{ flex: 1 }}
                onPress={() => this.setState({ show: false })}
              />
              <Text fontSize={20}>{this.getDateTimePlaceholder()}</Text>
              <Button
                title={doneText}
                titleColor={Color.blue}
                width={120}
                fontSize={20}
                clear
                containerStyle={{ flex: 1, alignItems: 'flex-end' }}
                onPress={() => this.onDoneIOS()}
              />
            </QuickView>
            <Divider />
            <RNDateTimePicker
              value={date}
              textColor={textColor}
              mode={modeProp}
              onChange={this.customOnChange}
              {...otherProps}
            />
          </QuickView>
        </Modal>
      );
    }

    /**
     * Android
     */
    if (modeProp === 'datetime') {
      return (
        <>
          <RNDateTimePicker
            value={date}
            mode="time"
            onChange={this.addTimeAndroid}
            {...otherProps}
          />
          <RNDateTimePicker
            value={date}
            mode="date"
            onChange={this.customOnChange}
            {...otherProps}
          />
        </>
      );
    }
    return (
      <RNDateTimePicker
        value={date}
        mode={modeProp}
        onChange={this.customOnChange}
        {...otherProps}
      />
    );
  };

  customOnChangeIOS14 = (event: any, selectedDate: any) => {
    const { date } = this.state;
    const { onChange } = this.props;
    const currentDate = selectedDate || date;
    this.setState({
      date: currentDate,
      show: Platform.OS === 'ios',
      hidePlaceholder: true,
    });
    if (onChange) onChange(event, selectedDate);
  };

  renderDateTimeIOS14 = () => {
    const { date } = this.state;
    const {
      textColor: textColorProp,
      language,
      width,
      height,
      mode: modeProp,
      themeName,
      ...otherProps
    } = this.props;
    const theme = AppHelper.getThemeByName(themeName);
    const bgColor = theme.colors.secondaryBackground;
    const parentBgColor = themeName === ThemeEnum.LIGHT ? '#b4bcc6' : '#494e53';
    return (
      <QuickView
        style={{
          minWidth: this.minWidth,
          borderRadius: AppView.roundedBorderRadius,
          backgroundColor: parentBgColor,
          width,
          height,
          marginVertical: 5
        }}
      >
        <RNDateTimePicker
          value={date}
          style={{ backgroundColor: bgColor, marginHorizontal: 10, marginTop: 2 }}
          mode={modeProp}
          onChange={this.customOnChangeIOS14}
          {...otherProps}
        />
      </QuickView>
    );
  };

  getDate = () => {
    const { hidePlaceholder, date } = this.state;
    if (!hidePlaceholder) return null;
    return date;
  };

  getText = () => {
    const { hidePlaceholder, date } = this.state;
    if (!hidePlaceholder) return null;
    const { momentFormat: momentFormatProp } = this.props;
    const momentFormat = momentFormatProp || this.momentFormat;
    return moment(date).format(momentFormat);
  };

  getDateTimePlaceholder = () => {
    const { language, mode } = this.props;
    let placeholder = '';
    let enModeString = '';
    let viModeString = '';
    if (mode === 'date') {
      enModeString = 'date';
      viModeString = 'ngày';
    } else if (mode === 'time') {
      enModeString = 'time';
      viModeString = 'thời gian';
    } else if (mode === 'datetime') {
      enModeString = 'date & time';
      viModeString = 'ngày và giờ';
    }
    placeholder = language === LanguageEnum.EN ? `Pick ${enModeString}` : `Chọn ${viModeString}`;
    return placeholder;
  };

  render() {
    const { show, date, hidePlaceholder } = this.state;
    const {
      mode,
      display,
      momentFormat: momentFormatProp,
      themeName,
      language,
      value,
      locale,
      minuteInterval,
      timeZoneOffsetInMinutes,
      textColor,
      onChange,
      neutralButtonLabel,
      placeholder: placeholderProp,
      titleColor: titleColorProp,
      placeholderTextColor,
      ...otherProps
    } = this.props;

    /**
     * Language Handle
     */
    let placeholder = '';
    if (!value) {
      if (placeholderProp) {
        placeholder = placeholderProp;
      } else {
        placeholder = this.getDateTimePlaceholder();
      }
    }

    /**
     * Color Handle
     */
    const theme = AppHelper.getThemeByName(themeName);
    let titleColor = titleColorProp;
    if (!hidePlaceholder && !value) {
      titleColor = placeholderTextColor || theme.colors.secondaryText;
    }

    /**
     * Time Handle
     */
    const momentFormat = momentFormatProp || this.momentFormat;
    const dateString = (hidePlaceholder || value) ? moment(date).format(momentFormat) : placeholder;

    /**
     * iOS 14.0
     */
    if (Platform.OS === 'ios' && Number.parseFloat(DeviceInfo.getSystemVersion()) >= 14) {
      return this.renderDateTimeIOS14();
    }

    return (
      <QuickView>
        <Button
          {...otherProps}
          titlePaddingHorizontal={15}
          onPress={() => {
            this.setState({ show: !show, tempDate: date });
          }}
          title={dateString}
          titleColor={titleColor}
          titleCenter={show && Platform.OS === 'ios'}
        />
        {this.renderDateTime()}
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  themeName: themeSelector(state),
  language: languageSelector(state),
});

const Result: any = connect(mapStateToProps, null, null,
  { forwardRef: true })(DateTimePicker as any);

export default Result as React.ComponentClass<DateTimePickerProps, any>;

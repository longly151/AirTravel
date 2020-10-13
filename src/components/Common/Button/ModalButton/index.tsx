import React, { PureComponent, ReactNode } from 'react';
import Modal, { ModalProps as RNModalProps } from 'react-native-modal';
import { GestureResponderEvent } from 'react-native';
import { themeSelector, languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import AppHelper from '@utils/appHelper';
import { LanguageEnum } from '@contents/Config/redux/slice';
import _ from 'lodash';
import { OrNull } from 'react-native-modal/dist/types';
import { Animation, CustomAnimation } from 'react-native-animatable';
import { NavigationService } from '@utils/navigation';
import rootStack from '@contents/routes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QuickView from '../../View/QuickView';
import Button, { ButtonProps } from '../DefaultButton';
import Text from '../../Text';

interface ModalProps extends Pick<RNModalProps, 'onSwipeStart' | 'onSwipeMove' | 'onSwipeComplete' | 'onSwipeCancel' | 'style' | 'swipeDirection' | 'onDismiss' | 'onShow' | 'hardwareAccelerated' | 'onOrientationChange' | 'presentationStyle' | 'supportedOrientations'> {
  children?: ReactNode;
  backdropClose?: boolean;
  type?: 'notification' | 'confirmation' | 'bottom-half' | 'fullscreen' ;
  title?: string;
  t?: string;
  onOkButtonPress?: () => any;
  animationIn?: Animation | CustomAnimation;
  animationInTiming?: number;
  animationOut?: Animation | CustomAnimation;
  animationOutTiming?: number;
  avoidKeyboard?: boolean;
  coverScreen?: boolean;
  hasBackdrop?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
  backdropTransitionInTiming?: number;
  backdropTransitionOutTiming?: number;
  customBackdrop?: ReactNode;
  useNativeDriver?: boolean;
  deviceHeight?: number;
  deviceWidth?: number;
  hideModalContentWhileAnimating?: boolean;
  propagateSwipe?: boolean;
  isVisible?: boolean;
  onModalShow?: () => void;
  onModalWillShow?: () => void;
  onModalHide?: () => void;
  onModalWillHide?: () => void;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  swipeThreshold?: number;
  scrollTo?: OrNull<(e: any) => void>;
  scrollOffset?: number;
  scrollOffsetMax?: number;
  scrollHorizontal?: boolean;
}

export interface ModalButtonProps extends ButtonProps {
  ref?: any;
  children?: any;
  buttonChildren?: any;
  invisible?: boolean;
  modalProps?: ModalProps;
  language?: any;
  themeName?: any;
}

interface State {
  isVisible: boolean
}
class ModalButton extends PureComponent<ModalButtonProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  customOnPress = (event: GestureResponderEvent) => {
    const { onPress } = this.props;
    this.setState({ isVisible: true });
    if (onPress) onPress(event);
  };

  renderChildren = () => {
    const { themeName, language, modalProps, children } = this.props;
    if (children) return children;

    if (modalProps) {
      const defaultModalProps: any = _.merge({
        backdropClose: true,
        type: 'notification',
      }, modalProps);
      const {
        type,
        title,
        t,
        onOkButtonPress,
      } = defaultModalProps;

      const theme = AppHelper.getThemeByName(themeName).Modal;
      const okText = language === LanguageEnum.EN ? 'OK' : 'Xác nhận';
      const cancelText = language === LanguageEnum.EN ? 'Cancel' : 'Huỷ bỏ';

      return (
        <QuickView
          backgroundColor={theme.backgroundColor}
          borderRadius={theme.roundedBorderRadius}
          width={theme.width}
          height={theme.height}
          center
        >
          <Text type="xTitle" color={theme.textColor} center marginBottom={15} t={t}>{title}</Text>
          <QuickView row center>
            {
            type === 'notification' ? (
              <Button
                title={okText}
                width={100}
                paddingHorizontal={10}
                onPress={() => {
                  this.setState({ isVisible: false });
                  if (onOkButtonPress) onOkButtonPress();
                }}
              />
            )
              : (
                <>
                  <Button
                    title={okText}
                    width={100}
                    paddingHorizontal={10}
                    onPress={() => {
                      this.setState({ isVisible: false });
                      if (onOkButtonPress) onOkButtonPress();
                    }}
                  />
                  <Button
                    title={cancelText}
                    width={100}
                    paddingHorizontal={10}
                    onPress={() => this.setState({ isVisible: false })}
                  />
                </>
              )
            }
          </QuickView>
        </QuickView>
      );
    }
    return null;
  };

  close = () => this.setState({ isVisible: false });

  render() {
    const { isVisible } = this.state;
    const {
      modalProps,
      children,
      invisible,
      buttonChildren,
      ...otherProps
    } = this.props;

    const defaultModalProps: ModalProps = _.merge({
      backdropClose: true,
      type: 'notification',
    }, modalProps);

    const {
      backdropClose,
      type,
      title,
      t,
      onOkButtonPress,
      style,
      ...otherModalProps
    } = defaultModalProps;

    /**
     * fullscreen
     */
    if (type === 'fullscreen') {
      const { onPress, ...customOtherProps } = otherProps;
      const onPressFn = () => {
        const content = children;
        const id = AppHelper.setModalIntoGlobal(content);
        NavigationService.navigate(rootStack.modalStack, { id });
      };
      if (invisible) {
        return (
          <TouchableOpacity onPress={onPressFn}>
            {buttonChildren}
          </TouchableOpacity>
        );
      }
      return (
        <Button
          {...customOtherProps}
          onPress={onPressFn}
        />
      );
    }

    /**
     * Other types
     */
    let customStyle = style;
    if (type === 'bottom-half') {
      const bottomHalfStyle = {
        justifyContent: 'flex-end',
        margin: 0,
      };
      customStyle = _.merge(bottomHalfStyle, style);
    }
    return (
      <QuickView>
        {
          invisible ? (
            <TouchableOpacity onPress={this.customOnPress}>
              {buttonChildren}
            </TouchableOpacity>
          )
            : <Button {...otherProps} onPress={this.customOnPress} />
        }
        <Modal
          {...otherModalProps}
          isVisible={isVisible}
          onBackdropPress={() => {
            if (backdropClose) this.setState({ isVisible: false });
          }}
          style={customStyle}
        >
          {this.renderChildren()}
        </Modal>
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  themeName: themeSelector(state),
  language: languageSelector(state),
});

export default connect(mapStateToProps, null, null,
  { forwardRef: true })(ModalButton as unknown as React.ComponentType<ModalButtonProps>);

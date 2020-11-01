import React, { Component } from 'react';
import { ActivityIndicatorProps, ActivityIndicator, StyleSheet } from 'react-native';
import Spinner, { SpinnerProps } from 'react-native-loading-spinner-overlay';
import { themeSelector, languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import { LanguageEnum, ThemeEnum } from '@contents/Config/redux/slice';
import AppHelper from '@utils/appHelper';

export interface LoadingProps extends Omit<ActivityIndicatorProps, 'size'>, Omit<SpinnerProps, 'color' | 'size'> {
  size?: 'small' | 'large';
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  overlay?: boolean;
  timeout?: number;
  visible?: boolean;
  textColor?: string;
  themeName?: ThemeEnum;
  language?: LanguageEnum;
}

interface State {
  visibleState?: boolean
}
class Loading extends Component<LoadingProps, State> {
  static defaultProps = {
    visible: true,
  };

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { visible, timeout } = nextProps;
    const { visibleState } = prevState;
    if (timeout) {
      return {
        visibleState,
      };
    }
    return {
      visibleState: visible,
    };
  }

  constructor(props: LoadingProps) {
    super(props);
    const { visible } = this.props;
    this.state = {
      visibleState: visible,
    };
  }

  componentDidMount() {
    const { timeout } = this.props;
    if (timeout) { setTimeout(() => this.setState({ visibleState: false }), timeout); }
  }

  render() {
    const {
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      overlay,
      themeName,
      language,
      color: colorProp,
      textColor: textColorProp,
      style: styleProp,
      textStyle: textStyleProp,
      timeout,
      ...otherProps
    } = this.props;
    const { visibleState } = this.state;
    /**
     * Color & Style
     */
    const theme = AppHelper.getThemeByName(themeName);
    const color = colorProp || theme.colors.loading;
    const textColor = textColorProp || theme.colors.primaryText;

    const style = StyleSheet.flatten([
      {
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
      },
      styleProp,
      textStyleProp
    ]);

    const textStyle = StyleSheet.flatten([
      {
        color: textColor
      },
      textStyleProp
    ]);

    /**
     * TextContent
     */
    const textContent = language === LanguageEnum.VI ? 'Vui lòng đợi' : 'Loading';

    if (visibleState) {
      if (!overlay) {
        return <ActivityIndicator {...otherProps} color={color} style={style} />;
      }
      return (
        <Spinner
          {...otherProps}
          visible={visibleState}
          textContent={textContent}
          textStyle={textStyle}
          color={color}
        />
      );
    }
    return null;
  }
}

const mapStateToProps = (state: any) => ({
  themeName: themeSelector(state),
  language: languageSelector(state),
});

export default connect(mapStateToProps, null, null,
  { forwardRef: true })(Loading as React.ComponentType<LoadingProps>);

import React, { Component } from 'react';
import { ActivityIndicatorProps, ActivityIndicator, StyleSheet } from 'react-native';
import Spinner, { SpinnerProps } from 'react-native-loading-spinner-overlay';
import { withTheme, ThemeProps } from 'react-native-elements';
import i18next from 'i18next';

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
  theme?: any;
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
      color: colorProp,
      textColor: textColorProp,
      style: styleProp,
      textStyle: textStyleProp,
      timeout,
      theme,
      ...otherProps
    } = this.props;
    const { visibleState } = this.state;
    /**
     * Color & Style
     */
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

    if (visibleState) {
      if (!overlay) {
        return <ActivityIndicator {...otherProps} color={color} style={style} />;
      }
      return (
        <Spinner
          {...otherProps}
          visible={visibleState}
          textContent={i18next.t('component:loading:loading')}
          textStyle={textStyle}
          color={color}
        />
      );
    }
    return null;
  }
}

export default withTheme(
  Loading as any as React.ComponentType<LoadingProps & ThemeProps<any>>
);

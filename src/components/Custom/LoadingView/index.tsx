import React, { PureComponent } from 'react';
import { QuickView, Container } from '@components';
import { withTheme, ThemeProps } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

interface Props {
  theme?: any;
}

class LoadingView extends PureComponent<Props> {
  render() {
    const { theme } = this.props;
    return (
      <Container>
        <QuickView
          height="100%"
          justifyContent="center"
          alignItems="center"
          backgroundColor={theme.colors.bgColor}
        >
          <ActivityIndicator animating color={theme.colors.primary} />
        </QuickView>
      </Container>
    );
  }
}

export default withTheme(
  (LoadingView as any) as React.ComponentType<Props & ThemeProps<any>>,
);

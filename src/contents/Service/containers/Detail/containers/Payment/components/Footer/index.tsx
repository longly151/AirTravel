/* eslint-disable react/jsx-closing-bracket-location */
import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView, Button, Text } from '@components';

const { width: viewportWidth } = Dimensions.get('window');

interface Props {
  theme?: any;
}

const styles = StyleSheet.create({
  footerContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    zIndex: 10000,
  },
});

class Footer extends PureComponent<Props> {
  render() {
    return (
      <QuickView
        position="absolute"
        bottom={0}
        style={styles.footerContainer}
        width={viewportWidth}
        height={100}
        backgroundColor="#fff"
        row
        paddingHorizontal={18}
        alignItems="center"
        justifyContent="space-between">
        <QuickView>
          <Text bold fontSize={18}>
            Add dates for prices
          </Text>
        </QuickView>
        <Button
          title="Save"
          borderRadius={8}
          fontSize={18}
          titlePaddingHorizontal={35}
          titlePaddingVertical={12}
          bold
        />
      </QuickView>
    );
  }
}

export default withTheme(
  (Footer as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

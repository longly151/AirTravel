import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView, Text, Image } from '@components';
import { Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';
import rootRoutes from '../../../../../../../routes';
import serviceRoutes from '../../../../../../routes';

const { width: viewportWidth } = Dimensions.get('window');

interface Props {
  theme?: any;
  data?: any;
}

const styles = StyleSheet.create({
  providerBadgetContainer: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: (viewportWidth - 32) / 2 - 12,
  },
});

class CardService extends PureComponent<Props> {
  render() {
    const { data } = this.props;

    return (
      <QuickView
        marginBottom={40}
        row
        onPress={() => {
          NavigationService.navigate(rootRoutes.serviceStack, {
            screen: serviceRoutes.detail,
          });
        }}>
        <Image
          source={{ uri: data.thumbnail }}
          height={130}
          width={(viewportWidth - 32) / 2}
          style={{ position: 'relative' }}
          borderRadius={4}
        />
        <QuickView style={styles.providerBadgetContainer} alignItems="flex-end">
          <Icon name="heart-outline" color="#fff" size={20} />
        </QuickView>
        <QuickView
          width={(viewportWidth - 32) / 2 - 15}
          marginLeft={15}
          justifyContent="space-between">
          <QuickView>
            <Text numberOfLines={2} fontSize={20} bold>
              {data.enTitle}
            </Text>
            <QuickView row alignItems="center" marginTop={10}>
              <Icon name="medal" color="red" size={16} />
              <Text marginHorizontal={3}>Superhost</Text>
            </QuickView>
          </QuickView>
          <Text fontSize={14}>{`${data.currentPrice} vnd - ${data.unit}`}</Text>
        </QuickView>
      </QuickView>
    );
  }
}

export default withTheme(
  (CardService as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

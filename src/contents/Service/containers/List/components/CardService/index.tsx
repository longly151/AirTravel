/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable implicit-arrow-linebreak */
import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView, Text, Image } from '@components';
import { Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationService } from '@utils/navigation';
import AppHelper from '@utils/appHelper';
import detailServiceStack from '@contents/Service/containers/Detail/routes';
import i18next from 'i18next';
import { LanguageEnum } from '@contents/Config/redux/slice';
import WishlistIcon from '@contents/Service/containers/Common/WishlistIcon';
import Helper from '@utils/helper';
import serviceRoutes from '../../../../routes';

const { width: viewportWidth } = Dimensions.get('window');

interface Props {
  theme?: any;
  data?: any;
  showHeartIcon?: boolean;
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
  static defaultProps = {
    showHeartIcon: true,
  };

  render() {
    const { data, showHeartIcon } = this.props;

    return (
      <QuickView
        marginBottom={20}
        row
        onPress={() => {
          if (!showHeartIcon) data.isFavourite = true;
          NavigationService.navigate(serviceRoutes.detail, {
            screen: detailServiceStack.index,
            params: AppHelper.setItemIntoParams(data),
          });
        }
        }>
        <Image
          source={{ uri: data.thumbnail }}
          height={130}
          width={(viewportWidth - 32) / 2}
          style={{ position: 'relative' }}
          borderRadius={4}
        />
        {showHeartIcon ? (
          <QuickView
            style={styles.providerBadgetContainer}
            alignItems="flex-end">
            <WishlistIcon id={data.id} active={data.isFavourite} />
          </QuickView>
        ) : null}

        <QuickView
          width={(viewportWidth - 32) / 2 - 15}
          marginLeft={15}
          justifyContent="space-between">
          <QuickView>
            <Text numberOfLines={2} fontSize={20} bold>
              {i18next.t('key') === LanguageEnum.EN
                ? data.enTitle
                : data.viTitle}
            </Text>
            <QuickView row alignItems="center" marginTop={10}>
              <Icon name="map-marker" color="red" size={16} />
              <Text fontSize={10} bold>
                {data.destinations[0].address}
              </Text>
            </QuickView>
          </QuickView>
          <Text fontSize={14}>
            {`${Helper.numberWithCommas(data.currentPrice)} vnd - ${data.unit}`}
          </Text>
        </QuickView>
      </QuickView>
    );
  }
}

export default withTheme(
  (CardService as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

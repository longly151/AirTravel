import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { QuickView, Text, Avatar, Loading, HTML } from '@components';
import i18next from 'i18next';
import { LanguageEnum } from '@contents/Config/redux/slice';
import { IBase } from '@utils/redux';

interface Props extends IBase {
  theme?: any;
}

class Body extends PureComponent<IBase> {
  render() {
    const { data, loading } = this.props;
    const enLanguage = i18next.t('key') === LanguageEnum.EN;

    return (
      <QuickView marginHorizontal={18} marginBottom={150}>
        <QuickView
          paddingVertical={20}
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}
        >
          <Text bold fontSize={26} numberOfLines={2}>
            {i18next.t('key') === LanguageEnum.EN ? data?.enTitle : data?.viTitle}
          </Text>
          <QuickView row justifyContent="space-between" marginTop={10}>
            <QuickView>
              <QuickView row alignItems="center" marginTop={10} marginBottom={4}>
                {/* <QuickView row alignItems="center" marginRight={20}>
                  <Icon name="star" color="red" size={18} />
                  <Text thin>4.79 (75)</Text>
                </QuickView> */}
                <QuickView row alignItems="center">
                  <Icon name="medal" color="red" size={18} />
                  <Text thin>
                    {enLanguage
                      ? data?.serviceCategories[0]?.enName
                      : data?.serviceCategories[0]?.viName}
                  </Text>
                </QuickView>
              </QuickView>
              <Text thin>{data?.destinations[0]?.address}</Text>
            </QuickView>
            <QuickView center marginRight={10}>
              <Text center fontSize={14} marginBottom={5} t="service_detail:hosted_by" />
              <Avatar
                size="small"
                rounded
                source={{
                  uri: data?.providers[0]?.avatar
                }}
                title={data?.providers[0]?.name.charAt(0).toUpperCase()}
                marginLeft={10}
              />
              <Text bold fontSize={15}>
                {data?.providers[0]?.name}
              </Text>
            </QuickView>
          </QuickView>
        </QuickView>
        <QuickView
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}
        >
          {
              loading ? <Loading style={{ marginTop: 20 }} />
                : (
                  <Text
                    marginVertical={20}
                  >
                    {enLanguage ? data.enDescription : data.viDescription}
                  </Text>
                )
            }
        </QuickView>
        <QuickView
          paddingVertical={30}
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}
        >
          {
              loading ? <Loading style={{ marginTop: 20 }} />
                : <HTML html={enLanguage ? data.enContent : data.viContent} marginVertical={20} />
            }
        </QuickView>
      </QuickView>
    );
  }
}

export default withTheme(
  (Body as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

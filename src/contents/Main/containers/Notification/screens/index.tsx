import React from 'react';
import AppView from '@utils/appView';
import {
  QuickView,
  Text,
  Header,
  withPureList,
  Container,
  Body,
  Image, Icon
} from '@components';
import { WithListProps } from '@utils/hocHelper';
import moment from 'moment';
import { NavigationService } from '@utils/navigation';
import { withTheme } from 'react-native-elements';
import AppHelper from '@utils/appHelper';
import { ThemeEnum } from '@contents/Config/redux/slice';
import tripStack from '../../Trip/routes';

interface Props extends WithListProps {
  navigation: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const renderItem = ({ item }: { item: any }) => <Text>Notification</Text>;

const renderItem = ({ item }: { item: any }, themeName: any) => {
  const theme = AppHelper.getThemeByName(themeName);
  const bgColor = theme.key === ThemeEnum.DARK ? theme.colors.secondaryBackground : '#FFF';
  return (
    <QuickView
      row
      onPress={() => {
        NavigationService.navigate(tripStack.index);
      }}
      marginBottom={20}
      marginHorizontal={AppView.bodyPaddingHorizontal}
      backgroundColor={bgColor}
      borderRadius={AppView.roundedBorderRadius}
      shadow
    >
      <QuickView flex={1.2} marginLeft={10} alignSelf="center">
        <Icon name="notifications" size={30} color={theme.colors.primary} />
      </QuickView>
      <QuickView flex={8.8} marginRight={10}>
        <Text numberOfLines={1} marginTop={10} marginBottom={5} type="title" primary>{item.title}</Text>
        <Text numberOfLines={2}>{item.body}</Text>
        <Text marginTop={5} marginBottom={10} type="subtitle">{moment(item.createdAt).fromNow()}</Text>
      </QuickView>
    </QuickView>
  );
};

function NotificationListScreen(props: Props) {
  const { navigation, applyFilter, renderFlatList } = props;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      applyFilter(true);
    });

    return unsubscribe;
  }, [navigation]);

  const renderEmpty = () => (
    <QuickView center marginTop={AppView.screenHeight / 5}>
      <Image source={require('@assets/images/empty-notification.png')} width={0.7 * AppView.screenWidth} />
      <Text marginTop={30} primary type="xTitle" bold center t="empty:empty_notification" />
    </QuickView>
  );

  return (
    <Container>
      <Header t="header:notification" shadow />
      <Body fullWidth>
        {renderFlatList({
          renderEmpty,
          contentContainerStyle: { marginTop: 15, paddingBottom: 20 },
        })}
      </Body>
    </Container>
  );
}

export default withPureList({
  url: '/customers/notifications?sort=updatedAt%2CDESC&',
  renderItem,
  contentTranslate: true,
})(withTheme(NotificationListScreen));

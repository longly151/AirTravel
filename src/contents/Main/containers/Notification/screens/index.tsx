import React from 'react';
import AppView from '@utils/appView';
import {
  QuickView,
  Text,
  Header,
  withPureList,
  Container,
  Body,
  Image
} from '@components';
import { WithListProps } from '@utils/hocHelper';

interface Props extends WithListProps {
  navigation: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderItem = ({ item }: { item: any }) => <Text>Notification</Text>;

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
      <Body>
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
})(NotificationListScreen);

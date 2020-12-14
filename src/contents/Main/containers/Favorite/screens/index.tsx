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
import CardService from '@contents/Service/containers/List/components/CardService';

interface Props extends WithListProps {
  navigation: any;
}
const renderItem = ({ item }: { item: any }) => <CardService data={item} showHeartIcon={false} />;

function FavoriteListScreen(props: Props) {
  const { navigation, applyFilter, renderFlatList } = props;
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      applyFilter(true);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const renderEmpty = () => (
    <QuickView center marginTop={AppView.screenHeight / 5}>
      <Image source={require('@assets/images/empty-favorite.png')} width={0.7 * AppView.screenWidth} />
      <Text marginTop={30} primary type="xTitle" bold t="empty:empty_favorite" />
    </QuickView>
  );

  return (
    <Container>
      <Header t="header:favorite" shadow />
      <Body>
        {renderFlatList({ renderEmpty,
          contentContainerStyle: { marginTop: 15, paddingBottom: 20 },
        })}
      </Body>
    </Container>
  );
}

export default withPureList({
  url: '/services/favourites',
  fields: [
    'id',
    'enTitle',
    'viTitle',
    'currentPrice',
    'thumbnail',
    'unit',
    'destinations',
    'createdAt',
    'updatedAt'
  ],
  renderItem,
})(FavoriteListScreen);

import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Badge, withTheme } from 'react-native-elements';
import { QuickView, Text, Button, FlatList, Card } from '@components';
import { NavigationService } from '@utils/navigation';
import hotDealStyles from './styles';
import homeStack from '../../routes';

const { width: viewportWidth } = Dimensions.get('window');

const greetMarginVertical = 16;

interface Props {
  theme?: any;
  list?: any;
}

class HotDeals extends PureComponent<Props> {
  renderItem = ({ item }: { item: any }) => {
    const { theme } = this.props;
    const newItem = {
      ...item,
      illustration: item.thumbnail,
      enName: item.enTitle,
      subtitle: item.enDescription,
    };
    return (
      <Card
        data={newItem}
        cardWidth={0.8 * viewportWidth}
        cardHeight={350}
        marginHorizontal={18}
        backgroundColor={theme.Card.backgroundColor}
      >
        <QuickView
          row
          marginTop={20}
          justifyContent="space-between"
          alignItems="center"
        >
          <QuickView row>
            <Text fontSize={18} color="#bf081f" marginRight={8}>
              {`${item.currentPrice} vnd`}
            </Text>
            <Text
              fontSize={16}
              style={{
                textDecorationLine: 'line-through',
              }}
            >
              {`${item.price} vnd`}
            </Text>
          </QuickView>
          <Badge
            value={`-${
              100 - Math.ceil((item.currentPrice * 100) / item.price)
            }%`}
            status="error"
          />
        </QuickView>
      </Card>
    );
  };

  render() {
    const { theme, list } = this.props;
    return (
      <LinearGradient
        colors={['#f49d02', '#f97501', '#ff5f00']}
        style={hotDealStyles.container}
      >
        <Text
          style={hotDealStyles.title}
          t="home:hot_deal_title"
          color={theme.Card.backgroundColor}
          bold
          fontSize={24}
        />
        {list && list.data.length > 0 && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={list.data}
            renderItem={this.renderItem}
          />
        )}
        <QuickView alignItems="center" width="100%">
          <Button
            t="home:hot_deal_explore"
            backgroundColor="transperant"
            width={viewportWidth - greetMarginVertical * 2}
            sharp
            borderColor={theme.Card.backgroundColor}
            borderWidth={2}
            fontSize={16}
            marginVertical={30}
            borderRadius={5}
            titleColor={theme.Card.backgroundColor}
            onPress={() => {
              NavigationService.navigate(homeStack.service);
            }}
          />
        </QuickView>
      </LinearGradient>
    );
  }
}

export default withTheme(HotDeals as any);

import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { QuickView, Button, Text, Avatar, Image } from '@components';

interface Props {
  theme?: any;
}

class Body extends PureComponent<Props> {
  render() {
    return (
      <QuickView marginHorizontal={18} marginBottom={150}>
        <QuickView
          paddingVertical={30}
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}>
          <Text bold fontSize={26}>
            Private villa with private pool for loved couples
          </Text>
          <QuickView row alignItems="center" marginTop={10} marginBottom={4}>
            <QuickView row alignItems="center" marginRight={20}>
              <Icon name="star" color="red" size={18} />
              <Text thin>4.79 (75)</Text>
            </QuickView>
            <QuickView row alignItems="center">
              <Icon name="medal" color="red" size={18} />
              <Text thin>Superhost</Text>
            </QuickView>
          </QuickView>
          <Text thin>Hoi An, Quang Nam, Vietnam</Text>
        </QuickView>
        <QuickView
          paddingVertical={30}
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}>
          <QuickView
            row
            alignItems="center"
            justifyContent="space-between"
            marginBottom={20}>
            <QuickView>
              <Text bold fontSize={26}>
                Entire villa
              </Text>
              <Text bold fontSize={18}>
                hosted by Hieu
              </Text>
            </QuickView>
            <Avatar
              size="medium"
              rounded
              source={{
                uri:
                  'https://www.easy-profile.com/support.html?controller=attachment&task=download&tmpl=component&id=2883',
              }}
              title="M"
            />
          </QuickView>
          <QuickView width="80%">
            <Text fontSize={18}>2 guests - 1 bedroom - 1 bathroom</Text>
          </QuickView>
        </QuickView>
        <QuickView
          paddingVertical={30}
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}>
          <QuickView row marginBottom={15}>
            <Icon name="spray" size={36} />
            <QuickView marginLeft={10} width="80%">
              <Text bold fontSize={18} marginBottom={5}>
                Clean and tidy
              </Text>
              <Text thin>
                Recent guests said that this place was sparkling clean
              </Text>
            </QuickView>
          </QuickView>
          <QuickView row marginBottom={15}>
            <Icon name="spray" size={36} />
            <QuickView marginLeft={10} width="80%">
              <Text bold fontSize={18} marginBottom={5}>
                Clean and tidy
              </Text>
              <Text thin>
                Recent guests said that this place was sparkling clean
              </Text>
            </QuickView>
          </QuickView>
          <QuickView row>
            <Icon name="spray" size={36} />
            <QuickView marginLeft={10} width="80%">
              <Text bold fontSize={18} marginBottom={5}>
                Clean and tidy
              </Text>
              <Text thin>
                Recent guests said that this place was sparkling clean
              </Text>
            </QuickView>
          </QuickView>
        </QuickView>
        <QuickView
          paddingVertical={30}
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}>
          <Text fontSize={18} numberOfLines={5} marginBottom={10}>
            This is your PRIVATE VILLA of 150 square meter included a pool, a
            garden surrounded by a fence to create an absolute privacy and
            romantic space, invisible from outside. Unique & luxury, romance
            with full service
          </Text>
          <QuickView row alignItems="center">
            <Text bold fontSize={18} underline>
              Show more
            </Text>
            <Icon name="chevron-right" size={20} style={{ marginTop: 2 }} />
          </QuickView>
        </QuickView>
        <QuickView
          paddingVertical={30}
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}>
          <Text bold fontSize={26} marginBottom={20}>
            Amenities
          </Text>
          <QuickView
            row
            marginBottom={15}
            alignItems="center"
            justifyContent="space-between">
            <Text fontSize={18}>Wifi</Text>
            <Icon name="wifi" size={28} />
          </QuickView>
          <QuickView
            row
            marginBottom={15}
            alignItems="center"
            justifyContent="space-between">
            <Text fontSize={18}>Wifi</Text>
            <Icon name="wifi" size={28} />
          </QuickView>
          <QuickView
            row
            marginBottom={15}
            alignItems="center"
            justifyContent="space-between">
            <Text fontSize={18}>Wifi</Text>
            <Icon name="wifi" size={28} />
          </QuickView>
          <QuickView
            row
            marginBottom={15}
            alignItems="center"
            justifyContent="space-between">
            <Text fontSize={18}>Wifi</Text>
            <Icon name="wifi" size={28} />
          </QuickView>
          <Button
            title="Show all 19 amenities"
            borderRadius={8}
            backgroundColor="transparent"
            borderColor="#000"
            borderWidth={1}
            titleColor="#000"
            marginTop={15}
          />
        </QuickView>
        <QuickView
          paddingVertical={30}
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}>
          <Text bold fontSize={26} marginBottom={20}>
            Accessibility
          </Text>
          <Text bold fontSize={18} marginBottom={20}>
            Getting inside
          </Text>
          <QuickView
            row
            marginBottom={15}
            alignItems="center"
            justifyContent="space-between">
            <Text fontSize={18}>No stairs or steps to enter</Text>
            <Image
              source={{
                uri:
                  'https://cf.bstatic.com/images/hotel/max1024x768/242/242666738.jpg',
              }}
              width={30}
              height={30}
              borderRadius={4}
              sharp
            />
          </QuickView>
          <QuickView
            row
            marginBottom={15}
            alignItems="center"
            justifyContent="space-between">
            <Text fontSize={18}>No stairs or steps to enter</Text>
            <Image
              source={{
                uri:
                  'https://cf.bstatic.com/images/hotel/max1024x768/242/242666738.jpg',
              }}
              width={30}
              height={30}
              borderRadius={4}
              sharp
            />
          </QuickView>
          <QuickView
            row
            marginBottom={15}
            alignItems="center"
            justifyContent="space-between">
            <Text fontSize={18}>No stairs or steps to enter</Text>
            <Image
              source={{
                uri:
                  'https://cf.bstatic.com/images/hotel/max1024x768/242/242666738.jpg',
              }}
              width={30}
              height={30}
              borderRadius={4}
              sharp
            />
          </QuickView>
          <QuickView
            row
            marginBottom={15}
            alignItems="center"
            justifyContent="space-between">
            <Text fontSize={18}>No stairs or steps to enter</Text>
            <Image
              source={{
                uri:
                  'https://cf.bstatic.com/images/hotel/max1024x768/242/242666738.jpg',
              }}
              width={30}
              height={30}
              borderRadius={4}
              sharp
            />
          </QuickView>
          <Button
            title="Show all 4 features"
            borderRadius={8}
            backgroundColor="transparent"
            borderColor="#000"
            borderWidth={1}
            titleColor="#000"
            marginTop={15}
          />
        </QuickView>
        <QuickView
          paddingVertical={30}
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }}>
          <Text bold fontSize={26} marginBottom={20}>
            Location
          </Text>
          <Text bold fontSize={18} marginBottom={10}>
            Hoi An, Quang Nam, Vietnam
          </Text>
          <Text fontSize={18} numberOfLines={3}>
            Our area is unique. Gently located in between the rice fields and
            the nipa forests, our house is a quiet and relaxed. In addition, our
            house contains various utilities and amenities
          </Text>
        </QuickView>
      </QuickView>
    );
  }
}

export default withTheme(
  (Body as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

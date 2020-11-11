import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView, Text, Image, Button } from '@components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../../data';

interface Props {
  theme?: any;
}

class Body extends PureComponent<Props> {
  render() {
    return (
      <QuickView>
        <QuickView
          alignItems="center"
          row
          paddingVertical={40}
          style={{ borderBottomWidth: 5, borderBottomColor: '#e5e5e5' }}
        >
          <Image
            source={{ uri: 'https://i.imgur.com/UYiroysl.jpg' }}
            height={125}
            width={150}
            borderRadius={8}
          />
          <QuickView
            marginLeft={20}
            width="50%"
            justifyContent="space-between"
            height={125}
          >
            <Text numberOfLines={2} fontSize={20} bold>
              {data.title}
            </Text>
            <Text numberOfLines={1}>{data.subTitle}</Text>
            <Text numberOfLines={1} fontSize={14} thin>
              1 bed - 2 baths
            </Text>
            <QuickView row alignItems="center">
              <Icon name="medal" color="red" size={18} />
              <Text bold fontSize={14} marginLeft={5}>
                Superhost
              </Text>
            </QuickView>
          </QuickView>
        </QuickView>
        <QuickView
          paddingVertical={40}
          style={{ borderBottomWidth: 5, borderBottomColor: '#e5e5e5' }}
        >
          <Text fontSize={22} bold>
            Your trip
          </Text>
          <QuickView row justifyContent="space-between" marginTop={20}>
            <QuickView>
              <Text fontSize={20} bold>
                Dates
              </Text>
              <Text fontSize={18} marginTop={10}>
                10-Sep-2020 - 11-Sep-2020
              </Text>
            </QuickView>
            <Text fontSize={20} bold underline>
              Edit
            </Text>
          </QuickView>
          <QuickView row justifyContent="space-between" marginTop={20}>
            <QuickView>
              <Text fontSize={20} bold>
                Guests
              </Text>
              <Text fontSize={18} marginTop={10}>
                1 guest
              </Text>
            </QuickView>
            <Text fontSize={20} bold underline>
              Edit
            </Text>
          </QuickView>
        </QuickView>
        <QuickView
          paddingVertical={40}
          style={{ borderBottomWidth: 5, borderBottomColor: '#e5e5e5' }}
        >
          <Text fontSize={22} bold>
            Price details
          </Text>
          <QuickView row justifyContent="space-between" marginTop={20}>
            <Text thin fontSize={18}>
              $5 x 1 night
            </Text>
            <Text thin fontSize={18}>
              $5
            </Text>
          </QuickView>
          <QuickView row justifyContent="space-between" marginTop={20}>
            <Text thin fontSize={18}>
              Service fee
            </Text>
            <Text thin fontSize={18}>
              $1.5
            </Text>
          </QuickView>
          <QuickView row justifyContent="space-between" marginTop={20}>
            <Text bold fontSize={20}>
              Total
            </Text>
            <Text bold fontSize={20}>
              $6.5
            </Text>
          </QuickView>
        </QuickView>
        <QuickView
          paddingVertical={40}
          style={{ borderBottomWidth: 5, borderBottomColor: '#e5e5e5' }}
        >
          <Text fontSize={22} bold>
            Your information
          </Text>
          <QuickView row justifyContent="space-between" marginTop={20}>
            <QuickView>
              <Text fontSize={20} bold>
                Full name
              </Text>
              <Text fontSize={18} marginTop={10}>
                Nguyen Dac Phuong Hieu
              </Text>
            </QuickView>
            <Text fontSize={20} bold underline>
              Edit
            </Text>
          </QuickView>
          <QuickView row justifyContent="space-between" marginTop={20}>
            <QuickView>
              <Text fontSize={20} bold>
                Email
              </Text>
              <Text fontSize={18} marginTop={10}>
                phuonghieu***@gmail.com
              </Text>
            </QuickView>
            <Text fontSize={20} bold underline>
              Edit
            </Text>
          </QuickView>
          <QuickView row justifyContent="space-between" marginTop={20}>
            <QuickView>
              <Text fontSize={20} bold>
                Card number
              </Text>
              <Text fontSize={18} marginTop={10}>
                934********
              </Text>
            </QuickView>
            <Text fontSize={20} bold underline>
              Edit
            </Text>
          </QuickView>
        </QuickView>
        <QuickView paddingVertical={40}>
          <Text>
            By selecting the button below, I agree to the House Rules, Safety
            Disclosures and the Guest Refund Policy. I also agree to pay the
            total amount shown, which includes Service Fees.
          </Text>
          <Button
            title="Confirm and pay"
            marginVertical={30}
            fontSize={20}
            borderRadius={8}
          />
        </QuickView>
      </QuickView>
    );
  }
}

export default withTheme(
  (Body as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

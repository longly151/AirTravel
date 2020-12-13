/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, QuickView, Calendar, Text, Button, Loading, Icon } from '@components';
import AppView from '@utils/appView';
import AppHelper from '@utils/appHelper';
import moment from 'moment';
import Helper from '@utils/helper';
import Api from '@utils/api';
import { NavigationService } from '@utils/navigation';
import tripStack from '@contents/Main/containers/Trip/routes';
import { withTheme } from 'react-native-elements';
import { ThemeEnum } from '@contents/Config/redux/slice';

class SelectDateServiceScreen extends PureComponent<any, any> {
  calendar: any;

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      error: '',
      price: null,
      days: null,
    };
  }

  order = async () => {
    const period = this.calendar.getSelectedPeriod();
    const { price } = this.state;
    if (!period) this.setState({ error: 'validator:select_period' });
    else {
      this.setState({ error: false });
      if (price) {
        try {
          this.setState({ loading: true });
          const data = AppHelper.getItemFromParams(this.props);
          const days = moment(period.endDate).diff(moment(period.startDate), 'days');

          await Api.post('/bills/customers', {
            note: 'Note',
            billServices: [{
              serviceId: data.id,
              price: data.price,
              netPrice: data.netPrice,
              quantity: days,
              startDate: moment(period.startDate).format('YYYY-MM-DD'),
              endDate: moment(period.endDate).format('YYYY-MM-DD'),
            }]
          });
          NavigationService.navigate(tripStack.index, { goHome: true });
          this.setState({ loading: false });
        } catch (error) {
          this.setState({ error: 'exception:500' });
        }
      }
    }
  };

  calPrice = () => {
    const period = this.calendar.getSelectedPeriod();
    if (!period) {
      this.setState({ price: null });
    } else {
      const data = AppHelper.getItemFromParams(this.props);
      const days = moment(period.endDate).diff(moment(period.startDate), 'days');
      const price = data.price * days;
      this.setState({ price, days });
    }
  };

  render() {
    const { days, price, error, loading } = this.state;
    const { theme } = this.props;
    const bgColor = theme.key === ThemeEnum.DARK
      ? theme.colors.secondaryBackground
      : theme.colors.primaryBackground;

    return (
      <Container>
        <QuickView marginTop={50} marginHorizontal={18}>
          <QuickView row alignItems="center" justifyContent="space-between">
            <Icon
              name="arrow-left"
              type="material-community"
              size={26}
              onPress={() => NavigationService.goBack()}
            />
          </QuickView>

          <QuickView marginTop={20}>
            <Text fontSize={24} bold t="service_detail:title" />
            {
              days && price ? <Text fontSize={20} marginTop={10} t={['service_detail:night_stay', { night: days }]} />
                : <Text fontSize={20} marginTop={10} t="service_detail:description" />
            }
          </QuickView>
          {error ? <Text center error marginTop={10} t={error} /> : null}
          {loading ? <Loading /> : null}
          <QuickView marginLeft={-18} marginTop={5}>
            <Calendar
              ref={(ref: any) => { this.calendar = ref; }}
              calendarList
              onDayPress={() => this.calPrice()}
              pastScrollRange={24}
              futureScrollRange={24}
              markingType="period"
            />
          </QuickView>
        </QuickView>
        <QuickView
          position="absolute"
          bottom={0}
          style={{
            ...AppView.shadow
          }}
          width={AppView.screenWidth}
          height={100}
          backgroundColor={bgColor}
          justifyContent="center"
          paddingHorizontal={18}
        >
          <QuickView>
            {
              price
                ? (
                  <QuickView row justifyContent="space-between" alignItems="center">
                    <Text bold fontSize={20}>
                      {`${Helper.numberWithCommas(price)} `}
                      &#8363;
                    </Text>
                    <Button
                      primary
                      t="service_detail:order"
                      titleColor="#FFF"
                      borderRadius={8}
                      fontSize={18}
                      titlePaddingHorizontal={35}
                      titlePaddingVertical={12}
                      bold
                      onPress={() => { this.order(); }}
                    />
                  </QuickView>
                )
                : <Text fontSize={18} t="service_detail:add_date" />
            }
          </QuickView>
        </QuickView>
      </Container>
    );
  }
}

export default withTheme(SelectDateServiceScreen as any);

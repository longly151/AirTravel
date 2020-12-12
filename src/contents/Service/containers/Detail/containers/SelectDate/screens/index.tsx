/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, QuickView, Calendar, Text, Button } from '@components';
import AppView from '@utils/appView';
import AppHelper from '@utils/appHelper';
import moment from 'moment';
import Helper from '@utils/helper';
import Header from '../components/Header';

class SelectDateServiceScreen extends PureComponent<any, any> {
  calendar: any;

  constructor(props: any) {
    super(props);

    this.state = {
      error: false,
      price: null,
    };
  }

  order = () => {
    const period = this.calendar.getSelectedPeriod();
    const { price } = this.state;
    if (!period) this.setState({ error: true });
    else {
      this.setState({ error: false });
      // if (price) {

      // }
    }
  };

  calPrice = () => {
    const period = this.calendar.getSelectedPeriod();
    if (!period) {
      this.setState({ price: null });
    } else {
      const data = AppHelper.getItemFromParams(this.props);
      const days = moment(period.endDate).diff(moment(period.startDate), 'days') + 1;
      const price = data.price * days;
      this.setState({ price });
    }
  };

  render() {
    const { price, error } = this.state;
    return (
      <Container>
        <QuickView marginTop={50} marginHorizontal={18}>
          <Header />
          {error ? <Text center error marginTop={10} t="validator:select_period" /> : null}
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
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            zIndex: 10000,
          }}
          width={AppView.screenWidth}
          height={100}
          backgroundColor="#fff"
          row
          paddingHorizontal={18}
          alignItems="center"
          justifyContent="space-between"
        >
          <QuickView>
            {
              price
                ? (
                  <Text bold fontSize={20}>
                    {`${Helper.numberWithCommas(price)} `}
                    &#8363;
                  </Text>
                )
                : <Text fontSize={18} t="select_date:add_date" />
            }
          </QuickView>
          <Button
            primary
            title="Save"
            titleColor="#FFF"
            borderRadius={8}
            fontSize={18}
            titlePaddingHorizontal={35}
            titlePaddingVertical={12}
            bold
            onPress={() => { this.order(); }}
          />
        </QuickView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectDateServiceScreen);

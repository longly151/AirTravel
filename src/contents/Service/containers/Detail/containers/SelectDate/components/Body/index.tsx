import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import { QuickView } from '@components';
import { CalendarList } from 'react-native-calendars';

interface Props {
  theme?: any;
}

const themeCalendar = {
  textMonthFontSize: 18,
  textMonthFontWeight: '600',
  monthTextColor: '#000',
};

class Body extends PureComponent<Props> {
  render() {
    return (
      <QuickView marginLeft={-18} marginTop={20}>
        <CalendarList pastScrollRange={0} theme={themeCalendar} />
      </QuickView>
    );
  }
}

export default withTheme(
  (Body as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);

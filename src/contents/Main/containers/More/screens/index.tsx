/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, StyleSheet, SectionList } from 'react-native';
import { Container, QuickView, Body, Avatar, Text, Header } from '@components';
import { ListItem, Divider, Icon, withTheme } from 'react-native-elements';
import SwitchChangeTheme from '@contents/Config/Shared/SwitchChangeTheme';
import PickerChangeLanguage from '@contents/Config/Shared/PickerChangeLanguage';
import LogoutButton from '@contents/Auth/containers/Login/Shared/LogoutButton';
import LoginButton from '@contents/Auth/containers/Login/Shared/LoginButton';
import i18next from 'i18next';
import AppView from '@utils/appView';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Selector from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { withTranslation } from 'react-i18next';
import { Global } from '@utils/api';
import { ThemeEnum } from '@contents/Config/redux/slice';

const BLUE = '#007AFF';
const GREY = '#8E8E93';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFF4',
  },
  separatorComponent: {
    backgroundColor: 'white',
  },
  separator: {
    marginLeft: 58,
  },
  headerSection: {
    height: 30,
  },
});

interface Props {
  theme: any;
  loginData?: any;
  t?: any;
}

class Settings extends React.PureComponent<Props> {
  renderItem = ({ title, backgroundColor, icon, rightElement }: any) => (
    <ListItem containerStyle={{ paddingVertical: 8 }} key={title} bottomDivider>
      <Icon
        name={icon}
        type="ionicon"
        size={20}
        color="white"
        containerStyle={{
          backgroundColor,
          width: 28,
          height: 28,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      {rightElement}
    </ListItem>
  );

  renderSectionHeader = () => <View style={styles.headerSection} />;

  ItemSeparatorComponent = () => (
    <View style={styles.separatorComponent}>
      <Divider style={styles.separator} />
    </View>
  );

  keyExtractor = (item: any, index: any) => index;

  render() {
    const { t } = this.props;
    const sections = [
      {
        title: t('theme'),
        backgroundColor: BLUE,
        icon: 'ios-bulb',
        hideChevron: true,
        rightElement: <SwitchChangeTheme />,
      },
      {
        title: t('language'),
        icon: 'ios-settings',
        backgroundColor: GREY,
        hideChevron: true,
        rightElement: <PickerChangeLanguage />,
      },
    ];

    const { theme, loginData } = this.props;
    const bgColor = theme.key === ThemeEnum.DARK ? theme.colors.secondaryBackground : '#FFF';

    return loginData.data.token ? (
      <Container>
        <QuickView
          height={200}
          backgroundColor={theme.colors.primary}
          position="relative"
          borderBottomLeftRadius={24}
          borderBottomRightRadius={24}
        >
          <QuickView
            padding={20}
            position="absolute"
            top={120}
            width={AppView.screenWidth}
            borderRadius={10}
          >
            <QuickView
              alignItems="center"
              backgroundColor={bgColor}
              position="relative"
              borderRadius={20}
              style={AppView.shadow}
            >
              <Avatar
                size="xlarge"
                rounded
                source={{
                  uri: loginData.data.avatar,
                }}
                title="L"
                containerStyle={{
                  position: 'absolute',
                  top: -80,
                  borderWidth: 1,
                }}
              />
              <QuickView marginTop={86} alignItems="center">
                <Text fontSize={22} bold>
                  {loginData.data.fullName}
                </Text>
                <Text fontSize={16} thin marginTop={6}>
                  {loginData.data.email}
                </Text>
              </QuickView>
              <QuickView width="100%">
                <QuickView marginTop={10}>
                  {sections.map((e) => this.renderItem(e))}
                </QuickView>
              </QuickView>
              <QuickView marginVertical={14}>
                <LogoutButton />
              </QuickView>
            </QuickView>
          </QuickView>
        </QuickView>

        {/* <QuickView paddingHorizontal={10}>
          <LoginButton />
          <LogoutButton />
        </QuickView> */}
      </Container>
    ) : (
      <Container>
        <Header t="header:setting" shadow />
        <Body scrollable fullWidth>
          <QuickView marginTop={10}>
            {sections.map((e) => this.renderItem(e))}
          </QuickView>
          <QuickView paddingHorizontal={10} paddingVertical={10}>
            {/* <GoToExampleButton /> */}
            <LoginButton />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: Selector.getObject(loginSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({});

const withReduce = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
});

export default compose(
  withTheme,
  withReduce,
  withTranslation(),
)(Settings as any);

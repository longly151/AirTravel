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
}

class Settings extends React.PureComponent<Props> {
  renderItem = ({
    item: { title, backgroundColor, icon, rightElement },
  }: any) => (
    <ListItem containerStyle={{ paddingVertical: 12 }} key={title}>
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
    const sections = [
      {
        data: [
          {
            title: i18next.t('theme'),
            backgroundColor: BLUE,
            icon: 'ios-bulb',
            hideChevron: true,
            rightElement: <SwitchChangeTheme />,
          },
          {
            title: i18next.t('language'),
            icon: 'ios-settings',
            backgroundColor: GREY,
            hideChevron: true,
            rightElement: <PickerChangeLanguage />,
          },
        ],
      },
    ];

    const { theme, loginData } = this.props;

    return Object.keys(loginData.data).length !== 0 ? (
      <Container>
        <QuickView
          height={200}
          backgroundColor={theme.colors.primary}
          position="relative"
          borderBottomLeftRadius={24}
          borderBottomRightRadius={24}>
          <QuickView
            padding={20}
            position="absolute"
            top={120}
            width={AppView.screenWidth}
            borderRadius={10}>
            <QuickView
              alignItems="center"
              backgroundColor={theme.colors.primaryBackground}
              position="relative"
              borderRadius={20}
              style={AppView.shadow}>
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
                <SectionList
                  contentContainerStyle={{ marginTop: 10 }}
                  keyExtractor={this.keyExtractor}
                  sections={sections}
                  renderItem={this.renderItem}
                  renderSectionHeader={this.renderSectionHeader}
                  SectionSeparatorComponent={Divider}
                  stickySectionHeadersEnabled={false}
                />
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
        <Header title={i18next.t('header:setting')} />
        <Body fullWidth>
          <QuickView height={120}>
            <SectionList
              contentContainerStyle={{ marginTop: -30 }}
              keyExtractor={this.keyExtractor}
              sections={sections}
              renderItem={this.renderItem}
              renderSectionHeader={this.renderSectionHeader}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
              SectionSeparatorComponent={Divider}
              stickySectionHeadersEnabled={false}
            />
          </QuickView>
          <QuickView paddingHorizontal={10}>
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

export default compose(withTheme, withReduce)(Settings as any);

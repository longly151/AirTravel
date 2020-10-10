import React from 'react';
import {
  View, StyleSheet, SectionList,
} from 'react-native';
import {
  Container, Header, QuickView
} from '@components';
import { ListItem, Divider, Icon } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import SwitchChangeTheme from '@contents/Config/Shared/SwitchChangeTheme';
import PickerChangeLanguage from '@contents/Config/Shared/PickerChangeLanguage';
import LogoutButton from '@contents/Auth/containers/Login/Shared/LogoutButton';
import LoginButton from '@contents/Auth/containers/Login/Shared/LoginButton';

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
  t: any;
}

class Settings extends React.PureComponent<Props> {
  renderItem = ({
    item: {
      title, backgroundColor, icon, rightElement,
    },
  }: any) => (
    <ListItem
      containerStyle={{ paddingVertical: 8 }}
      key={title}
    >
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
        <ListItem.Title>
          {title}
        </ListItem.Title>
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
        data: [
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
        ],
      },
    ];

    return (
      <Container>
        <Header title={t('header:setting')} />
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
          <LogoutButton />
        </QuickView>
      </Container>
    );
  }
}
export default withTranslation()(Settings as any);

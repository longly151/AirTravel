/* eslint-disable no-console */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, QuickView } from '@components';
import { NavigationService } from '@utils/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';

interface State {
  text: string;
}

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: '#fff',
    marginTop: 24,
    marginLeft: 10,
  },
  input: {
    fontSize: 18,
  },
});

class SearchServicesScreen extends PureComponent<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleOnChangeText = (value: any) => {
    this.setState({ text: value });
  };

  render() {
    const { text } = this.state;
    return (
      <Container>
        <QuickView
          row
          alignItems="center"
          justifyContent="space-between"
          marginTop={40}
          marginHorizontal={18}>
          <Icon
            name="arrow-left"
            size={26}
            onPress={() => NavigationService.goBack()}
          />
          <Input
            placeholder="Where are you going?"
            onChangeText={this.handleOnChangeText}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />

          <Icon
            name="close-circle"
            size={18}
            color="#a5a5a5"
            style={{ marginTop: 2 }}
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
)(SearchServicesScreen);

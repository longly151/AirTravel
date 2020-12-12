import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { TObjectRedux } from '@utils/redux';
import { withTheme } from 'react-native-elements';
import { QuickView, Text, TextError } from '@components';
import Color from '@themes/Color';
import Selector from '@utils/selector';
import i18next from 'i18next';
import { NavigationService } from '@utils/navigation';
import AuthButton from '../../Shared/AuthButton';
import AuthInput from '../../Shared/AuthInput';
import authStack from '../../routes';
import { IRegisterInput } from '../redux/model';
import { register } from '../redux/slice';
import { registerSelector } from '../redux/selector';

interface Props {
  registerData: TObjectRedux;
  reduxRegister: (data: IRegisterInput) => any;
  theme?: any;
}
class RegisterForm extends PureComponent<Props> {
  private fullName: any;

  private email: any;

  private password: any;

  private phoneNumber: any;

  render() {
    const { registerData, reduxRegister, theme } = this.props;
    return (
      <>
        {registerData.data.token && (
          <QuickView alignSelf="center" marginVertical={10}>
            <Text color={Color.green}>Register Succeeded!</Text>
          </QuickView>
        )}
        <TextError error={registerData.error} color="#FA8072" />
        <AuthInput
          ref={(ref: any) => {
            this.fullName = ref;
          }}
          leftIconName="account-outline"
          placeholder="Full name"
          validationField="name"
          keyboardType="default"
        />
        <AuthInput
          ref={(ref: any) => {
            this.email = ref;
          }}
          leftIconName="email-outline"
          placeholder="Email"
          validationField="email"
          keyboardType="email-address"
          marginVertical={10}
        />
        <AuthInput
          ref={(ref: any) => {
            this.password = ref;
          }}
          value="123123"
          leftIconName="lock-outline"
          textContentType="oneTimeCode"
          placeholder="Password"
          validationField="password"
          onSubmitEditing={() => Keyboard.dismiss()}
          blurOnSubmit={false}
          secureTextEntry
        />
        <AuthInput
          ref={(ref: any) => {
            this.phoneNumber = ref;
          }}
          leftIconName="phone-outline"
          placeholder="Phone number"
          validationField="phone"
          keyboardType="number-pad"
          marginVertical={10}
        />
        {/* <AuthButton
          title="Log data"
              // onPress={this.onSignIn}
          onPress={() => {
            console.log('loginData: ', loginData);
            console.log('loginData loading: ', loginData.loading);
            console.log('loginData data: ', loginData.data);
            console.log('loginData error: ', loginData.error);
          }}
        /> */}
        <QuickView marginTop={20}>
          <AuthButton
            title={i18next.t('auth:register')}
            color={Color.white}
            outline
            onPress={() => {
              reduxRegister({
                fullName: this.fullName.getText(),
                email: this.email.getText(),
                password: this.password.getText(),
                phone: this.phoneNumber.getText(),
              });
            }}
            loading={registerData.loading}
          />
          <AuthButton
            title={i18next.t('auth:login')}
            titleColor={theme.colors.primary}
            backgroundColor={Color.white}
            onPress={() => {
              NavigationService.navigate(authStack.loginScreen);
            }}
          />
        </QuickView>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  registerData: Selector.getObject(registerSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxRegister: (data: IRegisterInput) => dispatch(register({ data })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(RegisterForm as any));

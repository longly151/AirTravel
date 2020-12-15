import React, { PureComponent } from 'react';
import { QuickView, Container, Avatar } from '@components';
import { Keyboard } from 'react-native';
import RegisterForm from './Shared/RegisterForm';
import LoginBackIcon from '../Login/Shared/LoginBackIcon';

class RegisterScreen extends PureComponent {
  render() {
    return (
      <Container touchableComponent="TouchableWithoutFeedback" onPress={() => Keyboard.dismiss()}>
        <QuickView
          paddingHorizontal={20}
          backgroundImage={{
            source: require('@assets/images/loginBackground.jpg'),
          }}
        >
          <LoginBackIcon />
          <QuickView marginBottom={20} marginTop={60} center>
            <Avatar
              size="xlarge"
              rounded
              source={{
                uri:
                  'https://www.easy-profile.com/support.html?controller=attachment&task=download&tmpl=component&id=2883',
              }}
              title="M"
              marginBottom={10}
            />
          </QuickView>
          <RegisterForm />
        </QuickView>
      </Container>
    );
  }
}

export default RegisterScreen;

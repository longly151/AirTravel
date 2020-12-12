import React, { PureComponent } from 'react';
import { NavigationService } from '@utils/navigation';
import i18next from 'i18next';
import AuthButton, { AuthButtonProps } from '../../Shared/AuthButton';
import authStack from '../../routes';

interface Props extends AuthButtonProps {}
class RegisterButton extends PureComponent<Props> {
  static defaultProps = {};

  render() {
    const { ...otherProps } = this.props;
    return (
      <AuthButton
        title={i18next.t('auth:register')}
        {...otherProps}
        onPress={() => NavigationService.navigate(authStack.registerScreen)}
      />
    );
  }
}

export default RegisterButton;

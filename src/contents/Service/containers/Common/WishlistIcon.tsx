import { Icon, ModalButton } from '@components';
import authStack from '@contents/Auth/containers/routes';
import { setFavourite } from '@contents/Service/redux/slice';
import Api, { Global } from '@utils/api';
import { NavigationService } from '@utils/navigation';
import i18next from 'i18next';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

interface Props {
  active: boolean;
  id: number;
  inactiveColor?: string;
  size?: number;
  onPress?: any;
  handleSetFavourite?: (id: number, isFavourite: boolean) => any;
}
interface State {
  active: boolean;
}
class WishlistIcon extends Component<Props, State> {
  loginModal: any;

  static defaultProps = {
    active: false,
    size: 25,
    inactiveColor: '#FFF'
  };

  constructor(props: Props) {
    super(props);
    const { active } = this.props;
    this.state = {
      active
    };
  }

  toggleStatus = async (id: number) => {
    const { active } = this.state;
    const { handleSetFavourite } = this.props;
    if (id) {
      if (!Global.token) {
        this.loginModal.open();
      } else {
        try {
          await Api.put(`/customers/services/${id}/favourites`);
          this.setState({ active: !active }, () => {
            const { active } = this.state;
            if (handleSetFavourite) handleSetFavourite(id, active);
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('error', error);
        }
      }
    }
  };

  _onPress = async () => {
    const { id, onPress } = this.props;
    await this.toggleStatus(id);
    if (onPress) {
      onPress();
    }
  };

  render() {
    const { active } = this.state;
    const { inactiveColor } = this.props;
    const iconName = active ? 'heart' : 'heart-outline';
    const color = active ? '#D36363' : inactiveColor;

    return (
      <>
        <TouchableOpacity onPress={() => this._onPress()} style={{ padding: 3 }}>
          <Icon name={iconName} type="material-community" color={color} size={25} />
        </TouchableOpacity>
        <ModalButton
          ref={(ref: any) => {
            this.loginModal = ref;
          }}
          title="Confirmation Modal Button"
          modalProps={{
            title: i18next.t('auth:require_login'),
            type: 'confirmation',
            onOkButtonPress: () => NavigationService.navigate(authStack.loginScreen),
          }}
          invisible
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  handleSetFavourite: (id: number, isFavourite: boolean) => {
    dispatch(setFavourite({ id, isFavourite }));
  }
});

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(WishlistIcon);

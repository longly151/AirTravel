import { Icon } from '@components';
import Api from '@utils/api';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {
  active: boolean;
  id: number | string;
  inactiveColor?: string;
  size?: number;
  onPress?: any;
}
interface State {
  active: boolean;
}
class WishlistIcon extends Component<Props, State> {
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

  toggleStatus = async (id?: number | string) => {
    const { active } = this.state;
    if (id) {
      try {
        await Api.put(`/customers/services/${id}/favourites`);
        this.setState({ active: !active });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error);
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
      <TouchableOpacity onPress={() => this._onPress()} style={{ padding: 3 }}>
        <Icon name={iconName} type="material-community" color={color} size={25} />
      </TouchableOpacity>
    );
  }
}
export default WishlistIcon;

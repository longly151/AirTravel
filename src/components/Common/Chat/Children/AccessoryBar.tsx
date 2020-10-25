import React, { PureComponent } from 'react';
import { Icon } from 'react-native-elements';
import QuickView from '../../View/QuickView';
import Picker from '../../Picker';

class AccessoryBar extends PureComponent {
  actionModalRef: any;

  render() {
    return (
      <QuickView
        row
        height={44}
      >
        <Picker
          labels={['📷 Chụp ảnh', '🏞 Chọn ảnh từ thư viện', '📍 Chọn vị trí']}
          values={[0, 1, 2]}
          modalHeight={250}
          modal
          invisible
          buttonChildren={(
            <Icon containerStyle={{ marginRight: -5, marginLeft: 5, marginTop: 5 }} type="material" name="add-circle-outline" size={30} color="grey" />
          )}
          placeholder="Chọn hành động"
          ref={(ref: any) => { this.actionModalRef = ref; }}
          onValueChange={(value) => {
            // eslint-disable-next-line no-console
            console.log('onValueChange: ', value);
          }}
        />
      </QuickView>
    );
  }
}

export default AccessoryBar;

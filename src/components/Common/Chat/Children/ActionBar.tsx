import React, { PureComponent } from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import QuickView from '../../View/QuickView';
import Picker from '../../Picker';
import EditableImage from '../../Image/EditableImage';

interface Props {
  onSend: (messages: any) => any;
  setImageLoading: (loading: boolean) => any;
}

class ActionBar extends PureComponent<Props> {
  actionModalRef: any;

  editableImageRef: any;

  uploadCallback = (urls: string[]) => {
    const { onSend, setImageLoading } = this.props;
    onSend([{ image: urls[0] }]);
    setImageLoading(false);
  };

  pickSuccess = () => {
    const { setImageLoading } = this.props;
    this.actionModalRef.pickerModal?.close();
    setImageLoading(true);
  };

  handleException = () => {
    this.actionModalRef.pickerModal?.close();
  };

  onPickerValuePress = (value: any, index: any) => {
    // eslint-disable-next-line no-console
    switch (index) {
      case 0:
        this.editableImageRef.openCamera();
        break;
      case 1:
        this.editableImageRef.openGallery();
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <QuickView
        row
        height={44}
      >
        <Picker
          values={['📷 Chụp ảnh', '🏞 Chọn ảnh từ thư viện', '📍 Chọn vị trí']}
          modalHeight={180}
          modal
          invisible
          buttonChildren={(
            <Icon containerStyle={{ marginRight: -5, marginLeft: 5, marginTop: 5 }} type="material" name="add-circle-outline" size={30} color="grey" />
          )}
          // placeholder="Chọn hành động"
          ref={(ref: any) => { this.actionModalRef = ref; }}
          onValuePress={this.onPickerValuePress}
        />
        <EditableImage
          ref={(ref: any) => { this.editableImageRef = ref; }}
          buttonChildren={<View />}
          folderPrefix="chat"
          uploadCallback={this.uploadCallback}
          pickSuccess={this.pickSuccess}
          handleException={this.handleException}
          width={500}
        />
      </QuickView>
    );
  }
}

export default ActionBar;

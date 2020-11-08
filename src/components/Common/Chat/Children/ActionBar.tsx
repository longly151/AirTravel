import React, { PureComponent } from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { IImage } from '@utils/appHelper';
import QuickView from '../../View/QuickView';
import Picker from '../../Picker';
import EditableImage from '../../Image/EditableImage';
import ModalButton from '../../Button/ModalButton';
import Container from '../../View/Container';
import Header from '../../Header';
import Body from '../../View/Body';
import Text from '../../Text';

interface Props {
  onSend: (messages: any) => any;
  setImageLoading: (loading: boolean) => any;
}

class ActionBar extends PureComponent<Props> {
  actionModalRef: any;

  editableImageRef: any;

  mapView: any;

  uploadCallback = ((data: IImage[]) => {
    const { onSend, setImageLoading } = this.props;
    onSend([{ image: data[0].remoteUrl }]);
    setImageLoading(false);
  });

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
        this.openMapModal();
        break;
    }
  };

  openMapModal = () => {
    // console.log('okok', this.mapView.open);

    this.mapView.open(null);
  };

  render() {
    return (
      <QuickView
        row
        height={44}
      >
        <ModalButton
          ref={(ref: any) => { this.mapView = ref; }}
          title="Full Screen Modal"
          modalProps={{ type: 'fullscreen' }}
          // invisible
        >
          <Container>
            <Header backIcon title="ExampleScreen" />
            <Body>
              <QuickView>
                <Text center>Example Screen</Text>
              </QuickView>
            </Body>
          </Container>
        </ModalButton>
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

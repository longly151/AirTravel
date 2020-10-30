import React, { PureComponent } from 'react';
import { Container, Header, Body, ImagePickerButton, Text, QuickView } from '@components';
import { ImageOrVideo } from 'react-native-image-crop-picker';

class ImagePickerButtonExample extends PureComponent {
  pickSingleSuccess = (media: ImageOrVideo) => {
    // eslint-disable-next-line no-console
    console.log('media', media);
  };

  pickMultipleSuccess = (medias: ImageOrVideo[]) => {
    // eslint-disable-next-line no-console
    console.log('medias', medias);
  };

  handleException = (e: any) => {
    // eslint-disable-next-line no-console
    console.log('Error: ', e);
  };

  render() {
    return (
      <Container>
        <Header backIcon title="Image Picker Button" shadow switchTheme />
        <Body scroll>
          <QuickView style={{ marginVertical: 10 }}>
            <Text type="title" center marginVertical={5}>With Camera</Text>
            <ImagePickerButton title="Select Single Image" />
            <ImagePickerButton title="Select Single Image (Base64)" imageOutput="base64" />
            <ImagePickerButton title="Select Single Video" mediaType="video" />
          </QuickView>
          <QuickView style={{ marginVertical: 10 }}>
            <Text type="title" center marginVertical={5}>With Gallery</Text>
            <ImagePickerButton
              title="Select Single Image (Log)"
              dataSource="gallery"
              pickSingleSuccess={this.pickSingleSuccess}
              handleException={this.handleException}
            />
            <ImagePickerButton
              title="Select Single Video (Log)"
              dataSource="gallery"
              mediaType="video"
              pickSingleSuccess={this.pickSingleSuccess}
              handleException={this.handleException}
            />
            <ImagePickerButton
              title="Select Multiple Media (Log)"
              dataSource="gallery"
              multiple
              pickMultipleSuccess={this.pickMultipleSuccess}
              handleException={this.handleException}
            />
          </QuickView>
          <QuickView style={{ marginVertical: 10 }}>
            <Text type="title" center marginVertical={5}>With Camera & Crop</Text>
            <ImagePickerButton title="Select Single Image (Free Style Crop)" cropType="freeStyle" />
            <ImagePickerButton title="Select Single Image (500x500 Crop)" cropType="rectangle" imageWidth={500} imageHeight={500} />
            <ImagePickerButton title="Select Single Image (Circular Crop)" cropType="circular" />
          </QuickView>
          <QuickView style={{ marginTop: 10, marginBottom: 15 }}>
            <ImagePickerButton
              invisible
              dataSource="gallery"
              buttonChildren={<Text center success type="header">Invisible Select Single Image</Text>}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default ImagePickerButtonExample;

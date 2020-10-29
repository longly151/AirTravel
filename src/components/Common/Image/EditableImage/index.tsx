import React, { Component } from 'react';
import { themeSelector, languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import AppHelper from '@utils/appHelper';
import { LanguageEnum, ThemeEnum } from '@contents/Config/redux/slice';
import { Platform } from 'react-native';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import Image, { ImageProps } from '../DefaultImage';
import ImagePickerButton, { ImagePickerButtonProps } from '../../Button/ImagePickerButton';
import QuickView from '../../View/QuickView';
import Picker from '../../Picker';

export interface EditableImageProps extends ImageProps {
  presignedUrlApi: string;
  imagePickerButtonProps?: ImagePickerButtonProps;
  language?: LanguageEnum;
  themeName?: ThemeEnum;
  folderPrefix?: string;
  uploadCallback?: (url: string) => Promise<any> | any;
  buttonChildren?: any;
  pickSingleSuccess?: (media: ImageOrVideo) => Promise<any> | any;
  handleException?: (e: any) => any;
  ref?: any;
}

interface State {
  loading: boolean;
  uri: string;
}

class EditableImage extends Component<EditableImageProps, State> {
  static defaultProps = {
    folderPrefix: 'images'
  };

  pickerRef: any;

  pickerCamera: any;

  pickerGallery: any;

  constructor(props: EditableImageProps) {
    super(props);

    this.state = {
      loading: false,
      uri: '',
    };
  }

  uploadMedia = async (media: ImageOrVideo) => {
    const { folderPrefix, presignedUrlApi, uploadCallback } = this.props;
    this.setState({ loading: true });

    const data = {
      name: media.filename,
      type: media.mime,
      uri: media.path,
    };

    /**
     * Get PresignedURL
     */
    const uploadUrl = await AppHelper.getPresignedUrl(presignedUrlApi, {
      type: data.type,
      fileName: data.name,
      folderPrefix,
    });

    /**
     * Get uploadToS3
     */
    try {
      await AppHelper.uploadToS3(uploadUrl.presignedUrl, data);
      this.setState({ loading: false, uri: uploadUrl.returnUrl });
    } catch (error) {
      this.handleException(error);
    }
    if (uploadCallback) await uploadCallback(uploadUrl.returnUrl);
  };

  pickSingleSuccess = async (media: ImageOrVideo) => {
    const { pickSingleSuccess: pickSingleSuccessProp } = this.props;
    if (pickSingleSuccessProp) pickSingleSuccessProp(media);

    this.pickerRef.pickerModal?.close();
    await this.uploadMedia(media);
  };

  handleException = (e: any) => {
    const { handleException: handleExceptionProp } = this.props;
    if (handleExceptionProp) handleExceptionProp(e);

    // eslint-disable-next-line no-console
    console.log('Error: ', e);
    this.pickerRef.pickerModal?.close();
  };

  openCamera = () => this.pickerCamera.defaultOnPress(null);

  openGallery = () => this.pickerGallery.defaultOnPress(null);

  render() {
    const {
      themeName,
      language,
      imagePickerButtonProps,
      source: sourceProp,
      buttonChildren: buttonChildrenProp,
      ...otherProps
    } = this.props;
    const { loading, uri } = this.state;
    // const theme = AppHelper.getThemeByName(themeName);
    const takePictureText = language === LanguageEnum.EN ? 'Take photograph' : 'Chụp ảnh';
    const selectFromAlbumText = language === LanguageEnum.EN ? 'Select from album' : 'Chọn từ Album';
    const source = uri ? { uri } : sourceProp;
    const buttonChildren = buttonChildrenProp || (
      <Image
        isLoading={loading}
        loadingType="default"
        source={source}
        {...otherProps}
      />
    );
    return (
      <QuickView>
        <Picker
          ref={(ref: any) => { this.pickerRef = ref; }}
          values={[takePictureText, selectFromAlbumText]}
          width={150}
          height={40}
          shadow
          modal={Platform.OS !== 'ios'}
          modalHeight={130}
          invisible
          buttonChildren={buttonChildren}
          onValuePress={(value, index) => {
            switch (index) {
              case 0:
                this.openCamera();
                break;
              default:
                this.openGallery();
            }
          }}
        />
        <ImagePickerButton
          ref={(ref: any) => { this.pickerCamera = ref; }}
          {...imagePickerButtonProps}
          invisible
          pickSingleSuccess={this.pickSingleSuccess}
          handleException={this.handleException}
        />
        <ImagePickerButton
          ref={(ref: any) => { this.pickerGallery = ref; }}
          {...imagePickerButtonProps}
          invisible
          dataSource="gallery"
          pickSingleSuccess={this.pickSingleSuccess}
          handleException={this.handleException}
        />
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  themeName: themeSelector(state),
  language: languageSelector(state),
});
export default connect(mapStateToProps, null, null,
  { forwardRef: true })(EditableImage as React.ComponentType<EditableImageProps>);

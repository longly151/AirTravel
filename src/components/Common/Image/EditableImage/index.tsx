import React, { Component } from 'react';
import { themeSelector, languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import AppHelper from '@utils/appHelper';
import { LanguageEnum, ThemeEnum } from '@contents/Config/redux/slice';
import { FlatList, Platform } from 'react-native';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import Helper from '@utils/helper';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../Button/DefaultButton';
import Icon from '../../Icon';
import Image, { ImageProps } from '../DefaultImage';
import ImagePickerButton, { ImagePickerButtonProps } from '../../Button/ImagePickerButton';
import QuickView from '../../View/QuickView';
import Picker from '../../Picker';

export interface EditableImageProps extends ImageProps {
  imagePickerButtonProps?: ImagePickerButtonProps;
  language?: LanguageEnum;
  themeName?: ThemeEnum;
  folderPrefix?: string;
  uploadCallback?: (urls: string[]) => Promise<any> | any;
  buttonChildren?: any;
  pickSuccess?: (media: ImageOrVideo[]) => Promise<any> | any;
  handleException?: (e: any) => any;
  multiple?: any;
  ref?: any;
}

interface State {
  loading: boolean;
  imageUrls: string[];
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
      imageUrls: [
        // 'https://airtravel.s3.us-east-2.amazonaws.com/images/img0005-2020103108093228.JPG',
        // 'https://airtravel.s3.us-east-2.amazonaws.com/images/img0006-2020103108093229.HEIC'
      ],
    };
  }

  uploadMedias = async (medias: ImageOrVideo[]) => {
    const { folderPrefix, uploadCallback } = this.props;
    this.setState({ loading: true });

    // Get uploadUrls
    const uploadUrlBody: any = [];
    medias.forEach((item: ImageOrVideo) => {
      uploadUrlBody.push({
        type: item.mime,
        fileName: item.filename,
        folderPrefix,
      });
    });
    const uploadUrls = await AppHelper.getUploadUrls(uploadUrlBody);

    await Promise.all(medias.map(async (media: ImageOrVideo, index: number) => {
      const data = {
        name: media.filename,
        type: media.mime,
        uri: media.path,
      };

      /**
       * uploadToS3
       */
      try {
        await AppHelper.uploadToS3(uploadUrls[index].presignedUrl, data);
        this.setState((previousState: any) => ({
          imageUrls: [...previousState.imageUrls, uploadUrls[index].returnUrl]
        }));
      } catch (error) {
        this.handleException(error);
      }
    }));
    this.setState({ loading: false });
    const returnUrls = Helper.selectFields(uploadUrls, 'returnUrl');
    if (uploadCallback) await uploadCallback(returnUrls);
  };

  pickSuccess = async (medias: ImageOrVideo[]) => {
    const { pickSuccess: pickSuccessProp } = this.props;
    if (pickSuccessProp) pickSuccessProp(medias);

    this.pickerRef?.pickerModal?.close();
    await this.uploadMedias(medias);
  };

  handleException = (e: any) => {
    const { handleException: handleExceptionProp } = this.props;
    if (handleExceptionProp) handleExceptionProp(e);

    // eslint-disable-next-line no-console
    console.log('Error: ', e);
    this.pickerRef?.pickerModal?.close();
  };

  openCamera = () => this.pickerCamera.defaultOnPress(null);

  openGallery = () => this.pickerGallery.defaultOnPress(null);

  removeImageItem = (imageUrl: string) => {
    const { imageUrls } = this.state;
    this.setState({ imageUrls: imageUrls.filter((item: string) => item !== imageUrl) });
  };

  renderImageItem = ({ item }: any) => {
    // Just for getting ...otherProps
    const { language, multiple, source: sourceProp, buttonChildren, ...otherProps } = this.props;
    const { loading, imageUrls } = this.state;
    const source = { uri: item };
    return (
      <QuickView>
        <Image
          isLoading={loading}
          loadingType="default"
          source={source}
          containerStyle={{ marginHorizontal: 5 }}
          viewEnable
          multipleSources={Helper.assignKeyToPlainArray(imageUrls, 'uri')}
          {...otherProps}
        />
        <Button
          icon={{ name: 'close', size: 25 }}
          width={35}
          titlePadding={0}
          circle
          backgroundColor="#E6E9F0"
          containerStyle={{ position: 'absolute', right: 15, top: 5 }}
          onPress={() => this.removeImageItem(item)}
        />
      </QuickView>
    );
  };

  renderPickerOrFlatList = () => {
    const {
      language,
      multiple,
      source: sourceProp,
      buttonChildren: buttonChildrenProp,
      ...otherProps
    } = this.props;
    const { loading, imageUrls } = this.state;

    // Single Image
    if (!multiple) {
      const takePictureText = language === LanguageEnum.EN ? 'Take photograph' : 'Chụp ảnh';
      const selectFromAlbumText = language === LanguageEnum.EN ? 'Select from album' : 'Chọn từ Album';
      const source = !_.isEmpty(imageUrls) ? { uri: imageUrls[0] } : sourceProp;

      const buttonChildren = buttonChildrenProp || (
        <Image
          isLoading={loading}
          loadingType="default"
          source={source}
          {...otherProps}
        />
      );
      return (
        <Picker
          ref={(ref: any) => { this.pickerRef = ref; }}
          values={[takePictureText, selectFromAlbumText]}
          width={150}
          height={40}
          shadow
          modal={Platform.OS !== 'ios'}
          modalProps={{ swipeDirection: 'down' }}
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
      );
    }

    // Multiple Images
    const buttonChildren = buttonChildrenProp || (
      <Icon name="folder-multiple-image" size={30} type="material-community" />
    );

    if (_.isEmpty(imageUrls)) {
      return (
        <TouchableOpacity onPress={() => this.openGallery()}>
          {buttonChildren}
        </TouchableOpacity>
      );
    }
    return (
      <FlatList
        data={imageUrls}
        renderItem={this.renderImageItem}
        horizontal
        contentContainerStyle={{ marginHorizontal: -5 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  };

  getData = () => {
    const { imageUrls } = this.state;
    return imageUrls;
  };

  render() {
    const {
      imagePickerButtonProps,
      multiple,
    } = this.props;
    return (
      <QuickView>
        {this.renderPickerOrFlatList()}
        <ImagePickerButton
          ref={(ref: any) => { this.pickerCamera = ref; }}
          {...imagePickerButtonProps}
          invisible
          pickSuccess={this.pickSuccess}
          handleException={this.handleException}
        />
        <ImagePickerButton
          ref={(ref: any) => { this.pickerGallery = ref; }}
          {...imagePickerButtonProps}
          invisible
          dataSource="gallery"
          multiple={multiple}
          pickSuccess={this.pickSuccess}
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

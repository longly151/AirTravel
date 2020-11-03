import React, { Component } from 'react';
import { themeSelector, languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import AppHelper, { IResizedImage, IImage } from '@utils/appHelper';
import { LanguageEnum, ThemeEnum } from '@contents/Config/redux/slice';
import { FlatList, Platform, } from 'react-native';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import Helper from '@utils/helper';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import Button from '../../Button/DefaultButton';
import Icon from '../../Icon';
import Image, { ImageProps } from '../DefaultImage';
import ImagePickerButton, { ImagePickerButtonProps } from '../../Button/ImagePickerButton';
import QuickView from '../../View/QuickView';
import Picker from '../../Picker';

export interface IStateImage extends IImage {
  remoteUrl: string;
  resizedImageUrl: {
    origin: string,
    medium: string,
    thumbnail: string
  } | null;
}

export interface EditableImageProps extends ImageProps {
  imagePickerButtonProps?: ImagePickerButtonProps;
  language?: LanguageEnum;
  themeName?: ThemeEnum;
  folderPrefix?: string;
  uploadCallback?: (data: IStateImage[]) => Promise<any> | any;
  buttonChildren?: any;
  pickSuccess?: (media: ImageOrVideo[]) => Promise<any> | any;
  handleException?: (e: any) => any;
  resizedImageWidth?: {
    'origin': number,
    'medium': number,
    'thumbnail': number
  };
  multiple?: any;
  ref?: any;
}

interface State {
  loading: boolean;
  data: IStateImage[];
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
      data: []
    };
  }

  pickSuccess = async (medias: ImageOrVideo[]) => {
    this.pickerRef?.pickerModal?.close();

    const {
      pickSuccess: pickSuccessProp,
      resizedImageWidth,
      folderPrefix,
      uploadCallback,
    } = this.props;
    if (pickSuccessProp) pickSuccessProp(medias);
    // console.log('medias', medias[0].path);
    if (resizedImageWidth) {
      this.setState({ loading: true });
      await Promise.all(medias.map(async (media: ImageOrVideo) => {
        const originImage = await AppHelper.resize(media, resizedImageWidth.origin);
        const mediumImage = await AppHelper.resize(media, resizedImageWidth.medium);
        const thumbnailImage = await AppHelper.resize(media, resizedImageWidth.thumbnail);
        const resizedImage: IResizedImage = {
          origin: originImage,
          medium: mediumImage,
          thumbnail: thumbnailImage,
        };
        resizedImage.origin.name = `${resizedImage.origin.name.replace(`.${resizedImage.origin.name.split('.').pop()}` || '', `-origin.${resizedImage.origin.name.split('.').pop()}`)}`;
        resizedImage.medium.name = `${resizedImage.medium.name.replace(`.${resizedImage.medium.name.split('.').pop()}` || '', `-medium.${resizedImage.medium.name.split('.').pop()}`)}`;
        resizedImage.thumbnail.name = `${resizedImage.thumbnail.name.replace(`.${resizedImage.thumbnail.name.split('.').pop()}` || '', `-thumbnail.${resizedImage.thumbnail.name.split('.').pop()}`)}`;

        const { data } = this.state;
        // Upload to S3
        const resizedReturnUrl = await AppHelper.uploadResizedImageToS3(folderPrefix, resizedImage);

        const name: string = media.filename || media.path.split('/').pop() || '';

        // For Setting State
        const image: IImage = {
          name,
          mime: media.mime,
          width: media.width,
          height: media.height,
          size: media.size,
          path: media.path,
          sourceURL: media.sourceURL,
        };

        data.push({
          ...image,
          remoteUrl: resizedReturnUrl.thumbnail,
          resizedImageUrl: resizedReturnUrl,
        });

        // Clear Cache
        RNFetchBlob.fs.unlink(originImage.path);
        RNFetchBlob.fs.unlink(mediumImage.path);
        RNFetchBlob.fs.unlink(thumbnailImage.path);

        this.setState((previousState: any) => ({
          data,
          imageUrls: [...previousState.imageUrls, resizedReturnUrl.thumbnail]
        }));
      }));
    } else {
      this.setState({ loading: true });
      await Promise.all(medias.map(async (media: ImageOrVideo) => {
        const name: string = media.filename || media.path.split('/').pop() || '';

        // convert ImageOrVideo to IImage
        const image: IImage = {
          name,
          mime: media.mime,
          width: media.width,
          height: media.height,
          size: media.size,
          path: media.path,
          sourceURL: media.sourceURL,
        };
        const { data } = this.state;

        // Upload to S3
        const returnUrl = await AppHelper.uploadImageToS3(folderPrefix, image);
        data.push({
          ...image,
          remoteUrl: returnUrl,
          resizedImageUrl: null
        });

        this.setState((previousState: any) => ({
          data,
          imageUrls: [...previousState.imageUrls, returnUrl],
        }));
      }));
    }
    const { data } = this.state;
    if (uploadCallback) await uploadCallback(data);
    this.setState({ loading: false });
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
    const { imageUrls, data } = this.state;
    this.setState({
      imageUrls: imageUrls.filter((item: string) => item !== imageUrl),
      data: data.filter((item: IStateImage) => item.remoteUrl !== imageUrl)
    });
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
    const { data } = this.state;
    return data;
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

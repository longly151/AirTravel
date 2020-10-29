import React from 'react';
import RNImagePicker, { Image as TImage, ImageOrVideo as TImageOrVideo } from 'react-native-image-crop-picker';
import { Alert, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import Button, { ButtonProps } from '../DefaultButton';
import QuickView from '../../View/QuickView';

interface IImage{
  uri: string;
  width: number;
  height: number;
  mime?: string;
}

export interface ImagePickerButtonProps extends ButtonProps {
  cropType?: 'freeStyle' | 'rectangle' | 'circular';
  multiple?: boolean;
  dataSource?: 'camera' | 'gallery';
  mediaType?: 'photo' | 'video';
  invisible?: boolean;
  buttonChildren?: any;
  imageOutput?: 'path' | 'base64'
  imageWidth?: number;
  imageHeight?: number;
  pickSingleSuccess?: (media: TImageOrVideo) => any;
  pickMultipleSuccess?: (media: TImageOrVideo[]) => any;
  handleException?: (e: any) => any;
  theme?: any;
}

interface State {
  image: IImage | null;
  images: IImage[] | null;
}
class ImagePickerButton extends React.PureComponent<ImagePickerButtonProps, State> {
  static defaultProps = {
    dataSource: 'camera',
    mediaType: 'photo',
    imageOutput: 'path'
  };

  constructor(props: any) {
    super(props);
    this.state = {
      image: null,
      images: null,
    };
  }

  componentWillUnmount() {
    RNImagePicker.clean()
      .then(() => {})
      .catch((e) => this.customHandleException(e));
  }

  isImage = (media: TImageOrVideo) => media.mime && media.mime.toLowerCase().indexOf('video/') !== -1;

  pickSingleWithCamera = () => {
    const { cropType, mediaType, imageOutput, imageWidth, imageHeight, theme } = this.props;
    const cropping = !!cropType || !!imageWidth || !!imageHeight;
    const cropperCircleOverlay = cropType === 'circular';
    const freeStyleCropEnabled = cropType === 'freeStyle';
    const includeBase64 = mediaType === 'photo' && imageOutput === 'base64';

    const width = cropType === 'freeStyle' ? undefined : imageWidth;
    const height = cropType === 'freeStyle' ? undefined : imageHeight;

    const cropperStatusBarColor = theme.Header.backgroundColor;
    const cropperToolbarColor = theme.Header.backgroundColor;
    const cropperToolbarWidgetColor = theme.Header.centerColor;
    const cropperActiveWidgetColor = theme.colors.primary;
    RNImagePicker.openCamera({
      cropping,
      width,
      height,
      freeStyleCropEnabled,
      cropperCircleOverlay,
      // includeExif: true,
      includeBase64,
      cropperStatusBarColor,
      cropperToolbarColor,
      cropperActiveWidgetColor,
      cropperToolbarWidgetColor,
      mediaType,
    })
      .then((media: TImageOrVideo) => {
        this.customPickSingleSuccess(media);
        if (includeBase64 && this.isImage(media)) {
          const image: TImage = media;
          this.setState({
            image: {
              uri: `data:${image.mime};base64,${image.data}`,
              width: image.width,
              height: image.height,
            },
            images: null,
          });
        } else {
          this.setState({
            image: {
              uri: media.path,
              width: media.width,
              height: media.height,
              mime: media.mime,
            },
            images: null,
          });
        }
      })
      .catch((e) => this.customHandleException(e));
  };

  pickSingleWithGallery = () => {
    const { cropType, mediaType, imageOutput, imageWidth, imageHeight, theme } = this.props;
    const cropping = !!cropType || !!imageWidth || !!imageHeight;
    const cropperCircleOverlay = cropType === 'circular';
    const freeStyleCropEnabled = cropType === 'freeStyle';
    const includeBase64 = mediaType === 'photo' && imageOutput === 'base64';

    const width = cropType === 'freeStyle' ? undefined : imageWidth;
    const height = cropType === 'freeStyle' ? undefined : imageHeight;

    const cropperStatusBarColor = theme.Header.backgroundColor;
    const cropperToolbarColor = theme.Header.backgroundColor;
    const cropperToolbarWidgetColor = theme.Header.centerColor;
    const cropperActiveWidgetColor = theme.colors.primary;

    RNImagePicker.openPicker({
      width,
      height,
      cropping,
      cropperCircleOverlay,
      freeStyleCropEnabled,
      sortOrder: 'none',
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.8,
      compressVideoPreset: 'MediumQuality',
      // includeExif: true,
      cropperStatusBarColor,
      cropperToolbarColor,
      cropperActiveWidgetColor,
      cropperToolbarWidgetColor,
      includeBase64,
      mediaType,
    })
      .then((media: TImageOrVideo) => {
        this.customPickSingleSuccess(media);
        this.setState({
          image: {
            uri: media.path,
            width: media.width,
            height: media.height,
            mime: media.mime,
          },
          images: null,
        });
      })
      .catch((e) => this.customHandleException(e));
  };

  pickMultipleWithGallery = (): void => {
    RNImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      // includeExif: true,
      forceJpg: true,
    })
      .then((images) => {
        this.customPickMultipleSuccess(images);
        this.setState({
          image: null,
          images: images.map((i) => ({
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
          })),
        });
      })
      .catch((e) => this.customHandleException(e));
  };

  cropLast = () => {
    const { image } = this.state;
    if (!image) {
      return Alert.alert(
        'No image',
        'Before open cropping only, please select image'
      );
    }

    RNImagePicker.openCropper({
      path: image.uri,
      width: 200,
      height: 200,
      mediaType: 'photo',
    })
      .then((image: TImage) => {
        this.customPickSingleSuccess(image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => this.customHandleException(e));
    return true;
  };

  scaledHeight = (oldW: number, oldH: number, newW: number) => (oldH / oldW) * newW;

  getSingle = () => {
    const { image } = this.state;
    return image;
  };

  getMultiple = () => {
    const { images } = this.state;
    return images;
  };

  // renderVideo = (video: any) => {
  //   console.log('rendering video');
  //   return (
  //     <View style={{ height: 300, width: 300 }}>
  //       <RNVideo
  //         source={{ uri: video.uri, type: video.mime }}
  //         style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
  //         rate={1}
  //         paused={false}
  //         volume={1}
  //         muted={false}
  //         resizeMode="cover"
  //         onError={(e) => console.log(e)}
  //         onLoad={(load) => console.log(load)}
  //         repeat
  //       />
  //     </View>
  //   );
  // };

  // renderImage(image: TImage) {
  //   return (
  //     <Image
  //       style={{ width: 300, height: 300, resizeMode: 'contain' }}
  //       source={image}
  //     />
  //   );
  // }

  // renderAsset(media: TImageOrVideo) {
  //   if (media.mime && media.mime.toLowerCase().indexOf('video/') !== -1) {
  //     return this.renderVideo(media);
  //   }

  //   return this.renderImage(media);
  // }

  customPickSingleSuccess = (media: TImageOrVideo) => {
    // Custom Action...
    const { pickSingleSuccess } = this.props;
    if (pickSingleSuccess) pickSingleSuccess(media);
  };

  customPickMultipleSuccess = (medias: TImageOrVideo[]) => {
    // Custom Action...
    const { pickMultipleSuccess } = this.props;
    if (pickMultipleSuccess) pickMultipleSuccess(medias);
  };

  customHandleException = (e: any) => {
    // Custom Action...
    const { handleException } = this.props;
    if (handleException) handleException(e);
  };

  defaultOnPress = (event: GestureResponderEvent) => {
    const { dataSource, multiple, onPress } = this.props;
    if (multiple) {
      this.pickMultipleWithGallery();
    } else {
      switch (dataSource) {
        case 'camera':
          this.pickSingleWithCamera();
          break;
        default:
          this.pickSingleWithGallery();
          break;
      }
    }

    if (onPress) onPress(event);
  };

  render() {
    const { invisible, buttonChildren, ...otherProps } = this.props;
    return (
      <QuickView>
        {
          invisible ? (
            <TouchableOpacity onPress={this.defaultOnPress}>
              {buttonChildren}
            </TouchableOpacity>
          )
            : <Button {...otherProps} onPress={this.defaultOnPress} />
        }
      </QuickView>
    );
  }
}

export default withTheme(
  ImagePickerButton as unknown as React.ComponentType<ImagePickerButtonProps & ThemeProps<any>>
);

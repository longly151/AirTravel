/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-community/async-storage';
import { darkTheme, lightTheme } from '@themes/Theme';
import En from '@locales/en.json';
import Vi from '@locales/vi.json';
import { ThemeEnum, LanguageEnum } from '@contents/Config/redux/slice';
import _ from 'lodash';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import { Image } from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import i18next from 'i18next';
import Api from './api';
import { TError } from './redux';

export const Global: any = global;

interface S3Body {
  type?: string;
  fileName?: string;
  folderPrefix?: string;
}

export interface IUploadUrl {
  presignedUrl: string;
  returnUrl: string;
}

export interface IImage {
  name: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  sourceUrl?: string;
  remoteUrl?: string;
  resizedImageUrl?: {
    origin: string,
    medium: string,
    thumbnail: string
  };
}

export interface IResizedImage {
  origin: IImage;
  medium: IImage;
  thumbnail: IImage;
}

export interface IFile {
  name: string;
  mime: string;
  size?: string;
  path?: string;
  sourceUrl?: string;
  remoteUrl?: string;
  updatedAt?: Date;
}

export class CAppHelper {
  private static _instance: CAppHelper;

  private constructor() {
    // ...
  }

  public static get Instance(): CAppHelper {
    if (!this._instance) {
      this._instance = new this();
    }
    return CAppHelper._instance;
  }

  async viewAsyncStorageData() {
    const keys = await AsyncStorage.getAllKeys();
    const itemsArray = await AsyncStorage.multiGet(keys);
    const result: any = {};
    itemsArray.map((item) => {
    // eslint-disable-next-line prefer-destructuring
      result[`${item[0]}`] = item[1];
      return result;
    });
    return result;
  }

  getParams(props: any) {
    const {
      route,
    } = props;
    return route?.params;
  }

  getItemFromParams(props: any) {
    const {
      route,
    } = props;
    return route?.params?.item;
  }

  setItemIntoParams(item: any) {
    return ({ item });
  }

  focusNextField(component: any, name: string) {
    component[name]?.focus();
  }

  getThemeByName(themeName: ThemeEnum = ThemeEnum.LIGHT): any {
    return themeName === ThemeEnum.DARK ? darkTheme : lightTheme;
  }

  getLanguageByName(languageName: LanguageEnum = LanguageEnum.EN): any {
    return languageName === LanguageEnum.EN ? En : Vi;
  }

  getIdFromParams(props: any) {
    const {
      route,
    } = props;
    return route?.params?.item?.id;
  }

  setIdIntoParams(item: any) {
    return ({ item: { id: item.id } });
  }

  setModalIntoGlobal(content: any): number {
    let id = 0;
    let modal = {};
    if (!Global.modal) {
      Global.modal = [];
      id = 1;
      modal = {
        id,
        content
      };
      Global.modal.push(modal);
      return id;
    }

    // Existed Modal
    const result = _.find(Global.modal, (o) => _.isEqual(o.content, content));
    if (result) return result.id;

    // New Modal
    const preModal: any = _.last(Global.modal);
    const preId: number = preModal.id;
    id = preId + 1;
    modal = {
      id,
      content
    };
    Global.modal.push(modal);
    return id;
  }

  getModalFromGlobal(id: number) {
    if (!Global.modal) return null;
    return _.find(Global.modal, (o) => o.id === id);
  }

  // => Customize this function depend on specific project

  // eslint-disable-next-line max-len
  getUploadUrls = async (data: S3Body[]): Promise<IUploadUrl[]> => {
    const presignedUrlApi = '/medias/presigned-url/bulk';
    const result = await Api.post(presignedUrlApi, data);
    const returnResult: any = [];
    result.data.forEach((item: any) => {
      returnResult.push(
        {
          presignedUrl: item.presignedUrl,
          returnUrl: item.url,
        }
      );
    });
    return returnResult;
  };

  async uploadToS3(presignedUrl: string, data: {
    name?: string,
    type: string,
    uri: string,
  }) {
    const uri = Platform.OS === 'ios'
      ? data.uri.replace('file:///', '').replace('file://', '')
      : data.uri.replace('file://', '').replace('file:/', '');

    return RNFetchBlob.fetch(
      'PUT',
      presignedUrl,
      {
        'Content-Type': data.type,
      },
      RNFetchBlob.wrap(uri),
    );
  }

  async uploadImageToS3(folderPrefix: string = 'images', image: IImage): Promise<string> {
    // Get uploadUrl
    const uploadUrlBody: any = [];
    uploadUrlBody.push({
      type: image.mime,
      fileName: image.name,
      folderPrefix,
    });
    // console.log('uploadUrlBody', uploadUrlBody);

    const uploadUrls = await this.getUploadUrls(uploadUrlBody);

    const data = {
      name: image.name,
      type: image.mime,
      uri: image.path,
    };

    try {
      await this.uploadToS3(uploadUrls[0].presignedUrl, data);
      return uploadUrls[0].returnUrl;
    } catch (error) {
      return '';
    }
  }

  async uploadResizedImageToS3(folderPrefix: string = 'images', resizedImage: IResizedImage): Promise<{origin: string, medium: string, thumbnail: string}> {
    // Get uploadUrl
    const uploadUrlBody: any = [];
    const keys: any = [];
    // eslint-disable-next-line no-restricted-syntax
    for (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [key, value] of Object.entries(resizedImage)
    ) {
      uploadUrlBody.push({
        type: value.mime,
        fileName: value.name,
        folderPrefix,
      });
      keys.push(key);
    }

    const uploadUrls = await this.getUploadUrls(uploadUrlBody);

    const returnUrl: any = {};

    try {
      // Origin
      const origin = {
        name: resizedImage.origin.name,
        type: resizedImage.origin.mime,
        uri: resizedImage.origin.path,
      };
      await this.uploadToS3(uploadUrls[_.indexOf(keys, 'origin')].presignedUrl, origin);
      returnUrl.origin = uploadUrls[0].returnUrl;

      // medium
      const medium = {
        name: resizedImage.medium.name,
        type: resizedImage.medium.mime,
        uri: resizedImage.medium.path,
      };
      await this.uploadToS3(uploadUrls[_.indexOf(keys, 'medium')].presignedUrl, medium);
      returnUrl.medium = uploadUrls[0].returnUrl;

      // medium
      const thumbnail = {
        name: resizedImage.thumbnail.name,
        type: resizedImage.thumbnail.mime,
        uri: resizedImage.thumbnail.path,
      };
      await this.uploadToS3(uploadUrls[_.indexOf(keys, 'thumbnail')].presignedUrl, thumbnail);
      returnUrl.thumbnail = uploadUrls[0].returnUrl;

      return returnUrl;
    } catch (error) {
      return {
        origin: '',
        medium: '',
        thumbnail: '',
      };
    }
  }

  // eslint-disable-next-line max-len
  async resize(image: Image, resizedWidth: number = 500, resizedHeight?: number): Promise<IImage> {
    const uri = image.path;
    let imageFormat: any = 'JPEG';
    switch (uri.split('.').pop()) {
      case 'png':
      case 'PNG':
        imageFormat = 'PNG';
        break;
      case 'webp':
      case 'WEBP':
        imageFormat = 'WEBP';
        break;
      default:
        imageFormat = 'JPEG';
        break;
    }
    const height: number = resizedHeight || (image.height / image.width) * resizedWidth;
    const data = await ImageResizer.createResizedImage(
      uri, resizedWidth, height, imageFormat, 95
    );

    return {
      name: data.name,
      mime: image.mime,
      width: data.width,
      height: data.height,
      size: data.size,
      path: data.path,
      sourceUrl: image.sourceURL
    };
  }

  handleException(error: any) {
    const handledError: TError = {
      code: error.code,
      messages: [i18next.t(`exception:${error.code}`)],
    };
    return handledError;
  }
}

const AppHelper = CAppHelper.Instance;
export default AppHelper;

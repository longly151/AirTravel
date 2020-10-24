/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-community/async-storage';
import { darkTheme, lightTheme } from '@themes/Theme';
import En from '@locales/en.json';
import Vi from '@locales/vi.json';
import { ThemeEnum, LanguageEnum } from '@contents/Config/redux/slice';
import _ from 'lodash';

export const Global: any = global;

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
    return route?.params?.id;
  }

  setIdIntoParams(item: any) {
    return ({ id: item.id });
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
}

const AppHelper = CAppHelper.Instance;
export default AppHelper;

/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-community/async-storage';
import { darkTheme, lightTheme } from '@themes/Theme';
import En from '@locales/en.json';
import Vi from '@locales/vi.json';
import { ThemeEnum, LanguageEnum } from '@contents/Config/redux/slice';

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

  getIdFromParams(props: any) {
    const {
      route,
    } = props;
    return route?.params?.id;
  }

  getParams(props: any) {
    const {
      route,
    } = props;
    return route?.params;
  }

  setIdIntoParams(item: any) {
    return ({ id: item.id });
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
}

const AppHelper = CAppHelper.Instance;
export default AppHelper;

import React, { Component } from 'react';
import {
  TouchableOpacity, Platform
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import AppHelper, { IFile } from '@utils/appHelper';
import { themeSelector, languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import { ThemeEnum, LanguageEnum } from '@contents/Config/redux/slice';
import AppView from '@utils/appView';
import Text from '../../Text';
import QuickView from '../../View/QuickView';
import Loading from '../../Loading';
import Icon from '../../Icon';

export interface FileViewButtonProps {
  data: IFile;
  color?: string;
  backgroundColor?: string;
  themeName?: ThemeEnum;
  language?: LanguageEnum;
  horizontal?: boolean;
}
interface State {
  loading: boolean
}
class FileViewButton extends Component<FileViewButtonProps, State> {
  private tempFileUri: string = '';

  constructor(props:FileViewButtonProps) {
    super(props);
    this.state = { loading: false };
  }

  componentWillUnmount() {
    if (this.tempFileUri) {
      RNFetchBlob.fs.unlink(this.tempFileUri).then(() => {
      });
    }
  }

  renderIcon = (size: number = 30) => {
    const { color } = this.props;
    const { loading } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }
    const { data } = this.props;
    let name = 'file';
    // Image
    if (_.startsWith(data.mime, 'image')) {
      name = 'image';
    }
    // Pdf
    if (data.mime === 'application/pdf') {
      name = 'file-pdf';
    }
    // Doc
    if (data.mime === 'application/msword' || data.mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || data.mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' || data.mime === 'application/vnd.ms-word.document.macroEnabled.12' || data.mime === 'application/vnd.ms-word.template.macroEnabled.12') {
      name = 'file-word';
    }
    // Excel
    if (data.mime === 'application/vnd.ms-excel' || data.mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || data.mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' || data.mime === 'application/vnd.ms-excel.sheet.macroEnabled.12' || data.mime === 'application/vnd.ms-excel.template.macroEnabled.12' || data.mime === 'application/vnd.ms-excel.addin.macroEnabled.12' || data.mime === 'application/vnd.ms-excel.sheet.binary.macroEnabled.12') {
      name = 'file-excel';
    }
    // PowerPoint
    if (data.mime === 'application/vnd.ms-powerpoint' || data.mime === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || data.mime === 'application/vnd.openxmlformats-officedocument.presentationml.template' || data.mime === 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' || data.mime === 'application/vnd.ms-powerpoint.addin.macroEnabled.12' || data.mime === 'application/vnd.ms-powerpoint.presentation.macroEnabled.12' || data.mime === 'application/vnd.ms-powerpoint.template.macroEnabled.12' || data.mime === 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12') {
      name = 'file-powerpoint';
    }

    // Color
    return <Icon name={name} type="material-community" size={size} color={color} />;
  };

  onPress = async () => {
    await this.setState({ loading: true });
    const { data } = this.props;
    if (data.remoteUrl) {
      // if (_.startsWith(data.mime, 'image') && Platform.OS === 'android') {
      //   this.setState({ loading: false });
      //   // NavigationService.navigate(rootStack.modalStack, {
      //   //   screen: modalStack.imageModal,
      //   //   params: { title, uri: link, mimeType },
      //   // });
      //   return;
      // }
      const fileExtension = data.remoteUrl.split('.').pop();
      const { dirs } = RNFetchBlob.fs;
      RNFetchBlob
        .config({
          fileCache: true,
          // by adding this option, the temp files will have a file extension
          appendExt: fileExtension,
          path: `${dirs.DocumentDir}/${data.name || 'Untitled'}.${fileExtension}`,
        })
        .fetch('GET', data.remoteUrl, {
          // some headers ..
        })
        .then((res) => {
          this.setState({ loading: false });
          this.tempFileUri = res.path();
          // console.log('res.path()', res.path());
          // the temp file path with file extension `png`
          if (Platform.OS === 'ios') RNFetchBlob.ios.openDocument(res.data);
          else { RNFetchBlob.android.actionViewIntent(`${res.path()}`, data.mime); }
          this.setState({ loading: false });
        });
    }
  };

  render() {
    const {
      data,
      color,
      backgroundColor: backgroundColorProp,
      horizontal,
      themeName,
      language
    } = this.props;
    const theme = AppHelper.getThemeByName(themeName);
    const backgroundColor = backgroundColorProp || theme.colors.secondaryBackground;

    const updatedAtText = language === LanguageEnum.EN ? 'Updated at' : 'Cập nhật ngày';
    if (horizontal) {
      return (
        <TouchableOpacity onPress={this.onPress} style={{ marginVertical: 10 }}>
          <QuickView
            borderRadius={AppView.roundedBorderRadius}
            width={140}
            height={140}
            backgroundColor={backgroundColor}
            padding={15}
            justifyContent="space-around"
          >
            <QuickView center>
              {this.renderIcon(50)}
            </QuickView>
            <Text center fontSize={16} color={color} bold numberOfLines={2}>{data.name}</Text>
          </QuickView>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={this.onPress} style={{ width: '100%', marginVertical: 10 }}>
        <QuickView borderRadius={AppView.roundedBorderRadius} backgroundColor={backgroundColor} style={[{ width: '100%' }]}>
          <QuickView padding={18} row>
            <QuickView row center>
              <QuickView flex={1}>
                {this.renderIcon()}
              </QuickView>
              <QuickView flex={9} marginLeft={10}>
                <Text fontSize={16} color={color} bold numberOfLines={2}>{data.name}</Text>
                <Text fontSize={12} color={color} marginTop={5}>{`${updatedAtText} ${moment(data.updatedAt).format('DD/MM/YYYY')}`}</Text>
              </QuickView>
            </QuickView>
          </QuickView>
        </QuickView>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state: any) => ({
  themeName: themeSelector(state),
  language: languageSelector(state),
});

export default connect(mapStateToProps, null, null,
  { forwardRef: true })(FileViewButton as React.ComponentType<FileViewButtonProps>);

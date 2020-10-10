import React from 'react';
import { ViewProperties, Linking, StyleSheet } from 'react-native';
import RNHTML from 'react-native-render-html';
import AppView from '@utils/appView';
import Image from '../../Image';

interface RootHTMLProps {
  renderers?: any;
  ignoredTags?: Array<any>;
  ignoredStyles?: Array<any>;
  allowedStyles?: Array<any>;
  decodeEntities?: boolean;
  debug?: boolean;
  listsPrefixesRenderers?: any;
  ignoreNodesFunction?: Function;
  alterData?: Function;
  alterChildren?: Function;
  alterNode?: Function;
  html?: string;
  uri?: string;
  tagsStyles?: any;
  classesStyles?: any;
  containerStyle?: ViewProperties;
  customWrapper?: Function;
  onLinkPress?: Function;
  onParsed?: Function;
  imagesMaxWidth?: number;
  staticContentMaxWidth?: number;
  imagesInitialDimensions?: {
    width?: number;
    height?: number;
  };
  emSize?: number;
  ptSize?: number;
  baseFontStyle?: any;
  textSelectable?: boolean;
  renderersProps?: any;
  allowFontScaling?: boolean;
}
export interface HTMLProps extends RootHTMLProps {
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  style?: any;
  theme?: any;
}

class HTML extends React.PureComponent<HTMLProps> {
  onLinkPress = async (event: any, href: any) => {
    await Linking.openURL(href);
  };

  render() {
    const { imagesMaxWidth, style } = this.props;

    const containerStyle = StyleSheet.flatten([style]);
    const renderers = {
      img: {
        renderer: ({ src }: { src: any }) => {
          const key = Math.random() + Date.now();
          return (
            <Image
              key={key}
              source={{ uri: src }}
              resizeMode="contain"
              viewEnable
            />
          );
        },
      },
    };
    return (
      <RNHTML
        {...this.props}
        imagesMaxWidth={
          imagesMaxWidth || AppView.screenWidth - 40 * AppView.ratioW
        }
        onLinkPress={this.onLinkPress}
        renderers={renderers}
        textSelectable
        containerStyle={containerStyle}
      />
    );
  }
}
export default HTML;

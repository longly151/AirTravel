import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AppHelper from '@utils/appHelper';
import {
  Container,
  Body,
  Text,
  ParallaxScrollView,
  QuickView,
  Image,
  Header,
} from '@components';
import { parallaxHeaderHeight } from '@themes/ThemeComponent/ParallaxScrollView';
import { withTheme } from 'react-native-elements';
import Selector from '@utils/selector';
import { productDetailSelector } from '../redux/selector';
import { productGetDetail } from '../redux/slice';

interface Props {
  detail: any;
  getDetail: (item: any) => any;
  theme?: any;
}

class ProductDetail extends PureComponent<Props> {
  componentDidMount() {
    const { getDetail } = this.props;
    getDetail(AppHelper.getItemFromParams(this.props));
  }

  renderForeground = () => {
    const height = 80;
    const marginTop = parallaxHeaderHeight - height;
    const {
      theme,
      detail: { data },
    } = this.props;

    return (
      <QuickView
        height={height}
        backgroundColor={theme.colors.primaryBackground}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        marginTop={marginTop}
      >
        <QuickView margin={20}>
          <Text type="header">{data.enTitle}</Text>
          <Text icon={{ name: 'map-marker' }} numberOfLines={1}>
            {data.viTitle}
          </Text>
        </QuickView>
      </QuickView>
    );
  };

  renderStickyHeader = () => {
    const {
      detail: { data },
    } = this.props;
    return <Header title={data.name} />;
  };

  render() {
    const {
      detail: { data },
    } = this.props;
    return (
      <Container>
        <ParallaxScrollView
          backgroundImageSource={{ uri: data.thumbnail }}
          renderForeground={this.renderForeground}
          renderStickyHeader={this.renderStickyHeader}
        >
          <Body>
            <Image
              source={{
                uri: 'https://picsum.photos/1000/1000',
                cache: 'web',
              }}
              containerStyle={{ marginTop: 20 }}
            />
          </Body>
        </ParallaxScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  detail: Selector.getObject(productDetailSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDetail: (item: any) => dispatch(productGetDetail(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(ProductDetail as any));

import React, { PureComponent } from 'react';
import {
  Container,
  Body,
  Text,
  ParallaxScrollView,
  QuickView,
  Image,
  Header,
  HTML,
  Loading,
} from '@components';
import { parallaxHeaderHeight } from '@themes/ThemeComponent/ParallaxScrollView';
import { withTheme } from 'react-native-elements';
import Redux, { BaseState } from '@utils/redux';

interface Props {
  detail: any;
  getDetail: (item: any) => any;
  theme?: any;
}
interface State extends BaseState {}

class ProductDetail extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = Redux.initDetail(props);
  }

  async componentDidMount() {
    const result = await Redux.fetchDetail(this.props, '/services/:id');
    this.setState(result);
  }

  renderForeground = () => {
    const height = 80;
    const marginTop = parallaxHeaderHeight - height;
    const { theme } = this.props;
    const { data } = this.state;

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
    const { data } = this.state;
    return <Header title={data.name} />;
  };

  render() {
    const { loading, data } = this.state;
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
            {
              loading ? <Loading style={{ marginTop: 20 }} />
                : <HTML html={data.enContent} marginVertical={20} />
            }
          </Body>
        </ParallaxScrollView>
      </Container>
    );
  }
}

// const mapStateToProps = (state: any) => ({
//   detail: Selector.getObject(productDetailSelector, state),
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   getDetail: (item: any) => dispatch(productGetDetail(item)),
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withTheme(ProductDetail as any));

export default withTheme(ProductDetail as any);

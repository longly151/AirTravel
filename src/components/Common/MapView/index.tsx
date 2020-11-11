/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import RNMapView, {
  Marker,
  MapViewProps as RNMapViewProps,
  MarkerProps as RNMarkerProps,
} from 'react-native-maps';
import {
  StyleSheet, ListRenderItem, Platform, View, Image, Animated,
} from 'react-native';
import _ from 'lodash';
import { ThemeProps, withTheme } from 'react-native-elements';
import { NavigationService } from '@utils/navigation';
import { TQuery, TArrayRedux } from '@utils/redux';
import AppView from '@utils/appView';
import { ThemeEnum } from '@contents/Config/redux/slice';
import Color from '@themes/Color';
import Button from '../Button/DefaultButton';
import QuickView from '../View/QuickView';
import Text from '../Text';

const ASPECT_RATIO = AppView.screenWidth / AppView.screenHeight;
const LATITUDE = 10.8253169869135;
const LONGITUDE = 106.668213181553;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACING_FOR_CARD_INSET = AppView.screenWidth * 0.1 - 30;

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

export interface MarkerProps extends RNMarkerProps {
  children?: any;
}
interface IMapItem {
  marker: MarkerProps;
  data: any;
}

export interface MapViewProps extends Omit<RNMapViewProps, 'initialRegion' | 'provider'> {
  staticMap?: boolean;
  initialRegion?: IRegion;
  width?: number;
  height?: number;
  fullScreen?: boolean;
  google?: boolean;
  showDefaultMarker?: boolean;
  defaultMarkerProps?: Omit<MarkerProps, 'coordinate'>;
  markers?: Array<MarkerProps>;
  renderBottomItem?: ListRenderItem<any>;
  bottomItemData?: Array<IMapItem>;
  bottomItemList?: TArrayRedux;
  bottomItemGetList?: (query?: TQuery) => any;
  bottomMarkerData?: Array<string>;
  cardWidth?: number;
  cardHeight?: number;
  markerType?: 'default' | 'tag';
  markerActiveBackgroundColor?: any;
  animationEnable?: boolean;
  backIcon?: boolean;
  theme?: any;
}
interface State {
  scrollX: Animated.Value,
  viewableIndex: number,
  onMomentumScrollEnd: boolean,
}

class MapView extends PureComponent<MapViewProps, State> {
  static defaultProps = {
    initialRegion: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    width: 250,
    height: 250,
    showDefaultMarker: true,
    showsUserLocation: true,
    showsMyLocationButton: true,
    loadingEnabled: true,
    markerType: 'default',
    animationEnable: true,
  };

  mapIndex: number;

  mapRef: any;

  bottomFlatListRef: any;

  constructor(props: MapViewProps) {
    super(props);
    this.mapIndex = 0;
    this.bottomFlatListRef = React.createRef();
    this.mapRef = React.createRef();
    this.state = {
      scrollX: new Animated.Value(0),
      viewableIndex: 0,
      onMomentumScrollEnd: true,
    };
  }

  componentDidMount() {
    const {
      bottomItemData, bottomItemList, bottomItemGetList, cardWidth: cardWidthProp, theme,
    } = this.props;
    if (bottomItemList && bottomItemGetList) {
      bottomItemGetList();
    }
    const { scrollX } = this.state;
    const cardWidth = cardWidthProp || theme.Map.cardWidth;
    if (
      (bottomItemData || bottomItemList)
      && (!_.isEmpty(bottomItemData) || !_.isEmpty(bottomItemList?.data))
    ) {
      scrollX.addListener(({ value }:{value: any}) => {
        // animate 30% away from landing on the next item
        let index = Math.floor(value / cardWidth + 0.3);
        const bottomData = bottomItemData || bottomItemList?.data;

        if (index >= bottomData.length) {
          index = bottomData.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }

        let regionTimeout: any;
        clearTimeout(regionTimeout);
        regionTimeout = setTimeout(() => {
          if (this.mapIndex !== index) {
            this.mapIndex = index;
            const { coordinate } = bottomData[index].marker;
            this.mapRef.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
              350,
            );
          }
        }, 10);
      });
    }
  }

  getMapBoundaries = async () => this.mapRef.current.getMapBoundaries();

  renderMarker = () => {
    const {
      initialRegion: initialRegionProp,
      showDefaultMarker,
      defaultMarkerProps,
      markers,
    } = this.props;
    const initialRegion = _.merge({
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, initialRegionProp);
    const DefaultMarker: any = showDefaultMarker ? (
      <Marker
        {...defaultMarkerProps}
        coordinate={initialRegion}
      />
    ) : null;

    let CustomMarker: any = null;
    if (markers && !_.isEmpty(markers)) {
      CustomMarker = markers.map((marker: MarkerProps, index: number) => (
        <Marker {...marker} key={index.toString()}>
          {marker.children}
        </Marker>
      ));
    }

    return (
      <>
        {DefaultMarker}
        {CustomMarker}
      </>
    );
  };

  onBottomItemMarkerPress = (mapEventData: any) => {
    const {
      bottomItemData, bottomItemList, cardWidth: cardWidthProp, theme,
    } = this.props;
    const cardWidth = cardWidthProp || theme.Map.cardWidth;
    if ((bottomItemList || bottomItemData)
    && (!_.isEmpty(bottomItemData) || !_.isEmpty(bottomItemList?.data))) {
    // eslint-disable-next-line no-underscore-dangle
      const markerID = mapEventData._targetInst.return.key;
      // let x = (markerID * CARD_WIDTH) + (markerID * 20);
      // if (Platform.OS === 'ios') {
      //   x -= SPACING_FOR_CARD_INSET;
      // }
      const extraX = (1 - cardWidth / AppView.screenWidth) / 2 + 0.08;
      const index = markerID >= 1 ? markerID - extraX : 0;
      if (markerID) {
        this.setState({ onMomentumScrollEnd: false });
        this.bottomFlatListRef.current.scrollToIndex({
          animated: true,
          index,
        });
      }
    }
  };

  customRenderBottomItem = (props: any) => {
    const {
      renderBottomItem, cardWidth, cardHeight, theme,
    } = this.props;
    if (renderBottomItem) {
      return (
        <View
          style={{
            // borderTopLeftRadius: 5,
            // borderTopRightRadius: 5,
            margin: 10,
            height: cardHeight || theme.Map.cardHeight,
            width: cardWidth || theme.Map.cardWidth,
            overflow: 'hidden',
          }}
        >
          {renderBottomItem(props)}
        </View>
      );
    }
    return null;
  };

  onViewableItemsChanged = ({ viewableItems }: { viewableItems: any, changed: any }) => {
    const { viewableIndex } = this.state;
    if (!_.isEmpty(viewableItems)) {
      if (viewableItems[0].index !== viewableIndex) {
        this.setState({
          viewableIndex: viewableItems[0].index,
        });
      }
    }
  };

  renderBottomFlatList = () => {
    const {
      bottomItemData, bottomItemList, cardWidth: cardWidthProp, theme, animationEnable, markerType,
    } = this.props;
    const { scrollX } = this.state;
    const cardWidth = cardWidthProp || theme.Map.cardWidth;

    if ((bottomItemList || bottomItemData)
    && (!_.isEmpty(bottomItemData) || !_.isEmpty(bottomItemList?.data))
    ) {
      return (
        <Animated.FlatList
          ref={this.bottomFlatListRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + 20}
          decelerationRate="fast"
          snapToAlignment="center"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingVertical: 10,
          }}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {
              // useNativeDriver === true only effects on transform & opacity
              useNativeDriver: !animationEnable && markerType !== 'default',
            },
          )}
          onResponderGrant={() => this.setState({ onMomentumScrollEnd: false })}
          onMomentumScrollEnd={() => this.setState({ onMomentumScrollEnd: true })}
          data={bottomItemData || bottomItemList?.data}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.customRenderBottomItem}
        />
      );
    }
    return null;
  };

  refreshBottomFlatList = () => {
    const { bottomItemList, bottomItemGetList } = this.props;
    if (bottomItemList && bottomItemGetList) {
      bottomItemGetList();
    }
  };

  renderBottomFlatListMarker = () => {
    const {
      bottomItemData,
      bottomItemList,
      bottomMarkerData,
      cardWidth: cardWidthProp,
      theme,
      markerType,
      markerActiveBackgroundColor,
      animationEnable,
    } = this.props;
    const { scrollX, viewableIndex, onMomentumScrollEnd } = this.state;

    const cardWidth = cardWidthProp || theme.Map.cardWidth;
    if ((bottomItemList || bottomItemData)
    && (!_.isEmpty(bottomItemList?.data) || !_.isEmpty(bottomItemData))) {
      const bottomData = bottomItemData || bottomItemList?.data;
      const markerInactiveBackgroundColor = theme.Map.backgroundColor;
      const interpolations = bottomData.map((item: any, index: number) => {
        const inputRange = [
          (index - 1) * cardWidth - 30,
          index * cardWidth - 30,
          (index + 1) * cardWidth - 30,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [1, markerType === 'default' ? 1.5 : 1.1, 1],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [-0.2, 1.2, -0.2],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            markerInactiveBackgroundColor,
            markerActiveBackgroundColor,
            markerInactiveBackgroundColor,
          ],
        });

        return {
          scale,
          backgroundColor,
          opacity,
        };
      });
      const CustomView: any = animationEnable ? Animated.View : View;

      return bottomData.map((item: any, index: number) => {
        /**
         * animatedStyle
         */
        const {
          scale,
          backgroundColor: animatedBackgroundColor,
          opacity: animatedOpacity,
        } = interpolations[index];

        const scaleStyle = animationEnable ? {
          transform: [
            {
              scale,
            },
          ],
        } : {
          transform: [
            {
              scale: (markerType === 'default' && onMomentumScrollEnd && viewableIndex === index) ? 1.5 : 1.1,
            },
          ],
        };
        const backgroundColor = animationEnable
          ? animatedBackgroundColor
          : ((onMomentumScrollEnd && viewableIndex === index)
            ? markerActiveBackgroundColor
            : markerInactiveBackgroundColor);
        const opacity = animationEnable
          ? animatedOpacity
          : ((onMomentumScrollEnd && viewableIndex === index)
            ? 1
            : 0);

        /**
         * markerType === 'default' || 'tag'
         */
        switch (markerType) {
          case 'tag':
            return (
              <Marker
                key={index.toString()}
                coordinate={item.marker.coordinate}
                onPress={(e) => this.onBottomItemMarkerPress(e)}
              >
                <View style={{ padding: 5 }}>
                  <CustomView style={[{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    height: 30,
                    borderRadius: 10,
                    backgroundColor,
                  }, AppView.createShadow]}
                  >
                    <CustomView style={[
                      scaleStyle,
                    ]}
                    >
                      {bottomMarkerData ? (
                        <Text style={{ fontSize: 11 }}>
                          {bottomMarkerData[index]}
                        </Text>
                      ) : null }
                    </CustomView>
                  </CustomView>
                  <CustomView style={[AppView.createShadow]}>
                    <CustomView style={{
                      width: 0,
                      height: 0,
                      alignSelf: 'center',
                      backgroundColor: 'transparent',
                      borderStyle: 'solid',
                      borderLeftWidth: 10,
                      borderRightWidth: 10,
                      borderBottomWidth: 10,
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderBottomColor: backgroundColor,
                      opacity,
                      transform: [
                        { rotate: '180deg' },
                      ],
                    }}
                    />
                  </CustomView>
                </View>
              </Marker>
            );
          default:
            return (
              <Marker
                key={index.toString()}
                coordinate={item.marker.coordinate}
                onPress={(e) => this.onBottomItemMarkerPress(e)}
              >
                <CustomView style={[{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                }, scaleStyle]}
                >
                  <Image
                    source={require('@assets/images/map_marker.png')}
                    style={[{
                      width: 30,
                      height: 30,
                    }]}
                    resizeMode="cover"
                  />
                </CustomView>
              </Marker>
            );
        }
      });
    }
    return null;
  };

  render() {
    const {
      staticMap,
      backIcon,
      scrollEnabled,
      zoomEnabled,
      pitchEnabled,
      rotateEnabled,
      initialRegion: initialRegionProp,
      width: widthProp,
      height: heightProp,
      fullScreen,
      style: styleProp,
      google,
      showDefaultMarker,
      defaultMarkerProps,
      markers,
      bottomItemData,
      renderBottomItem,
      children,
      theme,
      ...otherProps
    } = this.props;

    /**
     * initialRegion, provider
     */
    const initialRegion = _.merge({
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, initialRegionProp);
    const provider: any = google ? 'google' : null;

    /**
     * width, height, style
     */
    const width = fullScreen ? AppView.screenWidth : widthProp;
    const height = fullScreen ? AppView.screenHeight : heightProp;
    const style = StyleSheet.flatten([{
      width,
      height,
    },
    styleProp,
    ]);
    const customMapStyle = theme.key === ThemeEnum.LIGHT
      ? theme.Map.lightMapStyle
      : theme.Map.darkMapStyle;
    const backIconBackgroundColor = theme.key === ThemeEnum.LIGHT ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
    const backIconColor = theme.key === ThemeEnum.LIGHT ? Color.lightPrimary : Color.darkPrimary;
    return (
      <>
        <RNMapView
          {...otherProps}
          ref={this.mapRef}
          provider={provider}
          scrollEnabled={staticMap ? false : scrollEnabled}
          zoomEnabled={staticMap ? false : zoomEnabled}
          pitchEnabled={staticMap ? false : pitchEnabled}
          rotateEnabled={staticMap ? false : rotateEnabled}
          initialRegion={initialRegion}
          style={style}
          customMapStyle={customMapStyle}
          loadingIndicatorColor={theme.Map.loadingIndicatorColor}
          loadingBackgroundColor={theme.Map.backgroundColor}
        >
          {this.renderMarker()}
          {this.renderBottomFlatListMarker()}
          {children}
        </RNMapView>
        {this.renderBottomFlatList()}
        {
          backIcon
            ? (
              <QuickView position="absolute" top={24} left={0}>
                <Button
                  icon={{
                    name: 'arrowleft',
                    type: 'antdesign',
                    size: 25,
                    color: backIconColor,
                  }}
                  width={40}
                  buttonStyle={{ margin: 10 }}
                  iconContainerStyle={{ marginLeft: 0 }}
                  backgroundColor={backIconBackgroundColor}
                  onPress={() => NavigationService.goBack()}
                  circle
                />
              </QuickView>
            )
            : null
        }
      </>
    );
  }
}

export default withTheme(MapView as any as React.ComponentType<MapViewProps & ThemeProps<any>>);

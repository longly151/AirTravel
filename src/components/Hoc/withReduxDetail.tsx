import React from 'react';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import Selector from '@utils/selector';
import AppHelper from '@utils/appHelper';
import HocHelper, { IHocConstant, IExtraItem, IReduxExtraItem, IHocLog } from '@utils/hocHelper';
import _ from 'lodash';
import Redux from '@utils/redux';

export interface WithReduxDetailProps {
  themeName?: any;
  getDetail: (item: any) => any;
}
interface State {}

const withReduxDetail = (
  { dispatchGetDetail, constant, extraData, reduxExtraData, log }:{
    dispatchGetDetail: any,
    constant: IHocConstant,
    extraData?: IExtraItem[],
    reduxExtraData?: IReduxExtraItem[],
    log?: IHocLog
  }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // Selector
  const detailSelector: any = HocHelper.createObjectSelectorHOC(constant);

  // HOC Class
  class WithReduxDetail extends React.Component<P & WithReduxDetailProps, State> {
    constructor(props: any) {
      super(props);
      const state = {};

      // Merge State for ExtraData
      HocHelper.mergeStateForExtraData(state, extraData);

      this.state = state;
    }

    async componentDidMount() {
      const { getDetail } = this.props;
      const detailFromParams = AppHelper.getItemFromParams(this.props);
      getDetail(detailFromParams);

      // Fetch Data for ExtraData
      if (extraData && !_.isEmpty(extraData)) {
        await Promise.all(extraData.map(async (item: { key: string, url: string }) => {
          const result = await Redux.fetchDetail(this.props, item.url);
          this.setState({
            [item.key]: result
          });
        }));
      }

      // Trigger Fetch Action for ReduxExtraData
      await HocHelper.triggerActionForReduxExtraData(this.props, reduxExtraData);

      // [data & ExtraData] Log Events
      if (log) {
        if (log.payload && !log.payload.key) {
          await HocHelper.logScreenEvent(log, { data: detailFromParams });
        } else {
          await HocHelper.logScreenEvent(log, this.state);
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props as P} {...this.state} />;
    }
  }

  const mapStateToProps = (state: any) => {
    let result: any = {
      themeName: themeSelector(state),
      ...Selector.getObject(detailSelector, state),
    };
    // Map State for ReduxExtraData
    result = HocHelper.mapStateForReduxExtraData(result, state, reduxExtraData);
    return result;
  };

  const mapDispatchToProps = (dispatch: any) => {
    // Map Dispatch for ReduxExtraData
    let result: any = {
      getDetail: (item: any) => dispatch(dispatchGetDetail(item)),
    };
    result = HocHelper.mapDispatchForReduxExtraData(result, dispatch, reduxExtraData);
    return result;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithReduxDetail as any);
};
export default withReduxDetail;

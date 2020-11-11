import React from 'react';
import Redux, { BaseState } from '@utils/redux';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import HocHelper, { IExtraItem, IReduxExtraItem } from '@utils/hocHelper';
import _ from 'lodash';

export interface WithPureDetailProps {
  themeName?: any;
}

const withPureDetail = (
  { url, extraData, reduxExtraData }: {
    url: string,
    extraData?: IExtraItem[],
    reduxExtraData?: IReduxExtraItem[]
  }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithPureDetail extends React.Component<P & WithPureDetailProps, any> {
    constructor(props: any) {
      super(props);
      const state = Redux.initDetail(props);

      // Merge State for ExtraData
      HocHelper.mergeStateForExtraData(state, extraData);

      this.state = state;
    }

    async componentDidMount() {
      const result = await Redux.fetchDetail(this.props, url);
      this.setState(result);

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
    }

    render() {
      return <WrappedComponent {...this.props as P} {...this.state} />;
    }
  }

  const mapStateToProps = (state: any) => {
    let result: any = {
      themeName: themeSelector(state)
    };
    // Map State for ReduxExtraData
    result = HocHelper.mapStateForReduxExtraData(result, state, reduxExtraData);
    return result;
  };

  const mapDispatchToProps = (dispatch: any) => {
    // Map Dispatch for ReduxExtraData
    let result: any = {};
    result = HocHelper.mapDispatchForReduxExtraData(result, dispatch, reduxExtraData);
    return result;
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithPureDetail as any);
};
export default withPureDetail;

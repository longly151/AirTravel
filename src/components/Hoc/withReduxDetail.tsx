import React from 'react';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import Selector from '@utils/selector';
import AppHelper from '@utils/appHelper';

export interface WithReduxDetailProps {
  themeName?: any;
  getDetail: (item: any) => any;
}
interface State {}

const withReduxDetail = (
  { dispatchGetDetail, constant }:
  { dispatchGetDetail: any, constant: {PARENT_NAME?: string, NAME: string, KEY: string} }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // Selector
  const { PARENT_NAME, NAME, KEY } = constant;
  const root = (state: any) => {
    if (PARENT_NAME) return state[PARENT_NAME][NAME];
    return state[NAME];
  };
  const detailSelector = Selector.createObjectSelector(root, KEY);

  // HOC Class
  class WithReduxDetail extends React.Component<P & WithReduxDetailProps, State> {
    componentDidMount() {
      const { getDetail } = this.props;
      getDetail(AppHelper.getItemFromParams(this.props));
    }

    render() {
      return <WrappedComponent {...this.props as P} {...this.state} />;
    }
  }

  const mapStateToProps = (state: any) => ({
    themeName: themeSelector(state),
    ...Selector.getObject(detailSelector, state),
  });

  const mapDispatchToProps = (dispatch: any) => ({
    getDetail: (item: any) => dispatch(dispatchGetDetail(item)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithReduxDetail as any);
};
export default withReduxDetail;

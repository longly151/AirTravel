import React from 'react';
import Redux, { BaseState } from '@utils/redux';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';

export interface WithPureDetailProps {
  themeName?: any;
}
interface State extends BaseState {}

const withPureDetail = (
  { url }: { url: string }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithPureDetail extends React.Component<P & WithPureDetailProps, State> {
    constructor(props: any) {
      super(props);
      this.state = Redux.initDetail(props);
    }

    async componentDidMount() {
      const result = await Redux.fetchDetail(this.props, url);
      this.setState(result);
    }

    render() {
      return <WrappedComponent {...this.props as P} {...this.state} />;
    }
  }

  const mapStateToProps = (state: any) => ({
    themeName: themeSelector(state)
  });

  return connect(
    mapStateToProps
  )(WithPureDetail as any);
};
export default withPureDetail;

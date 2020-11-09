import React from 'react';
import Redux, { BaseState } from '@utils/redux';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';

export interface WithPureInfoProps {
  themeName?: any;
}

const withPureInfo = (
  { url }: {url: string}
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithPureInfo extends React.Component<P & WithPureInfoProps, BaseState> {
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
  )(WithPureInfo as any);
};
export default withPureInfo;

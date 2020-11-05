import React, { Component } from 'react';
import { Container, Body, QuickView, Header, Loading, Button, Text } from '@components';

interface State {
  loading: boolean;
}
class LoadingExample extends Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <Container>
        <Header backIcon title="Loading" shadow switchTheme />
        <Body scrollable>
          <QuickView style={{ marginVertical: 5 }}>
            <Text type="title" center marginVertical={5}>Default Loading</Text>
            <Loading marginVertical={5} />
          </QuickView>
          <QuickView style={{ marginVertical: 10 }}>
            <Text type="title" center>Loading with parent state</Text>
            <Button title="Trigger Loading" onPress={() => this.setState({ loading: !loading })} />
            <Loading visible={loading} color="blue" marginVertical={5} />
            <Loading visible={loading} color="blue" marginVertical={5} size="large" />
          </QuickView>
          <QuickView style={{ marginVertical: 10 }}>
            <Text type="title" center>{'Loading with timeout\n(Listen to current State instead of parent\'s State)'}</Text>
            <Loading visible={loading} color="red" marginVertical={5} timeout={500} />
            <Loading visible={loading} color="red" marginVertical={5} timeout={1000} overlay />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default LoadingExample;

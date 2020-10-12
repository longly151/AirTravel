/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, ModalButton, Button, Text
} from '@components';
import Modal from 'react-native-modal';
import { withTheme } from 'react-native-elements';

interface State {
  isVisible: boolean
}
class ModalExample extends PureComponent<any, State> {
  customChildren: any;

  customBackdrop: any;

  fancyModal: any;

  constructor(props: any) {
    super(props);

    this.state = {
      isVisible: false
    };
  }

  render() {
    const { isVisible } = this.state;
    const { theme } = this.props;
    return (
      <Container>
        <Header backIcon title="Modal" shadow switchTheme />
        <Body scroll>
          <QuickView marginTop={10} marginBottom={15}>
            <Text type="header" marginBottom={10}>Modal with Children</Text>
            <Button title="Native Modal" onPress={() => this.setState({ isVisible: !isVisible })} />
            <Modal
              isVisible={isVisible}
              onBackdropPress={() => this.setState({ isVisible: false })}
            >
              <Button title="Native Modal" onPress={() => this.setState({ isVisible: !isVisible })} />
            </Modal>
            <ModalButton
              ref={(ref: any) => { this.customChildren = ref; }}
              title="Modal Button with custom Children"
            >
              <QuickView
                backgroundColor={theme.colors.primaryBackground}
                borderRadius={10}
                padding={30}
                center
              >
                <Text center>Hi 👋!</Text>
                <Button
                  title="Close"
                  marginTop={20}
                  width={100}
                  onPress={() => this.customChildren.close()}
                />
              </QuickView>
            </ModalButton>
          </QuickView>

          <QuickView marginVertical={10}>
            <Text type="header">Self-Closing Modal Button</Text>
            <ModalButton
              title="Notification Modal Button"
              modalProps={{
                title: 'Successful 🚀',
                onOkButtonPress: () => console.log('Successful')
              }}
            />
            <ModalButton
              title="Confirmation Modal Button"
              modalProps={{
                t: 'auth:login',
                type: 'confirmation',
                onOkButtonPress: () => console.log('Confirm')
              }}
            />
          </QuickView>

          <QuickView marginVertical={10}>
            <Text type="header">Custom Modal Button</Text>
            <ModalButton
              title="Bottom-Half Modal Button"
              modalProps={{
                t: 'auth:login',
                type: 'confirmation',
                onOkButtonPress: () => console.log('Confirm'),
                style: {
                  justifyContent: 'flex-end',
                  margin: 0,
                }
              }}
            />
            <ModalButton
              ref={(ref: any) => { this.customBackdrop = ref; }}
              title="No Backdrop"
              modalProps={{
                t: 'auth:login',
                type: 'confirmation',
                onOkButtonPress: () => console.log('Confirm'),
                hasBackdrop: false,
              }}
            />
            <ModalButton
              ref={(ref: any) => { this.customBackdrop = ref; }}
              title="Custom Backdrop Modal Button"
              modalProps={{
                t: 'auth:login',
                type: 'confirmation',
                onOkButtonPress: () => console.log('Confirm'),
                customBackdrop: <QuickView backgroundColor="orange" height="100%" onPress={() => this.customBackdrop.close()} />,
              }}
            />
            <ModalButton
              ref={(ref: any) => { this.fancyModal = ref; }}
              title="Fancy Modal Button"
              modalProps={{
                t: 'auth:login',
                type: 'confirmation',
                onOkButtonPress: () => console.log('Confirm'),
                backdropColor: '#B4B3DB',
                backdropOpacity: 0.8,
                animationIn: 'zoomInDown',
                animationOut: 'zoomOutUp',
                animationInTiming: 600,
                animationOutTiming: 600,
                backdropTransitionInTiming: 600,
                backdropTransitionOutTiming: 600,
                swipeDirection: ['up', 'left', 'right', 'down'],
                onSwipeComplete: () => this.fancyModal.close()
              }}
            />
          </QuickView>

          {/* <QuickView marginVertical={10}>
            <Text type="header">Scrollable Modal Button</Text>
            <ModalButton
              title="Notification Modal Button"
              modalProps={{
                title: 'Successful 🚀',
                onOkButtonPress: () => console.log('Successful')
              }}
            />
          </QuickView> */}
        </Body>
      </Container>
    );
  }
}

export default withTheme(ModalExample);

import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GiftedChat, IMessage as IDefaultMessage, Send, GiftedChatProps, Bubble } from 'react-native-gifted-chat';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Global } from '@utils/appHelper';
import Api from '@utils/api';
import qs from 'qs';
import Helper from '@utils/helper';
import _ from 'lodash';
import AccessoryBar from './Children/AccessoryBar';

export interface IMessage extends IDefaultMessage{
  room?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IEmitSocket {
  message: string;
  data?: any;
}

interface IOnSocket {
  message: string;
  function?: (message: any) => any;
}
interface IPagingQueryParam {
  offset: string;
  limit: string;
}

interface IUser {
  _id: string | number;
  name?: string;
  avatar?: string;
}

export interface ChatProps extends Omit<GiftedChatProps, 'accessory'>{
  chatOnSocket: IOnSocket;
  partnerJoinOnSocket: IOnSocket;
  partnerTypingOnSocket: IOnSocket;
  apiMessageField: string;
  url: string;
  pagingQueryParam: IPagingQueryParam;
  receiver: IUser,
  sender: IUser,
}

interface State {
  messages: Array<any>,
  room: {
    users: Array<any>,
    _id: number | string,
    name: string,
  }
  isLoadingEarlier: boolean,
  appIsReady: boolean,
  isTyping: boolean,
  offset: number,
  limit: number,
  total: number,
  loadEarlier: boolean;
  seen: boolean;
  input: string;
  hasSentTyping: boolean;
}

class Chat extends Component<ChatProps, State> {
  chatRef: any;

  _isMounted = false;

  params: any = {};

  constructor(props: ChatProps) {
    super(props);

    this.state = {
      messages: [],
      isLoadingEarlier: false,
      appIsReady: false,
      isTyping: false,
      room: {
        _id: '',
        name: '',
        users: [],
      },
      offset: 0,
      limit: 10,
      total: 0,
      loadEarlier: true,
      seen: false,
      input: '',
      hasSentTyping: false,
    };
    const { offset, limit } = this.state;
    const { pagingQueryParam } = this.props;
    this.params = {};
    this.params[pagingQueryParam.offset] = offset;
    this.params[pagingQueryParam.limit] = limit;
  }

  async componentDidMount() {
    const {
      apiMessageField,
      receiver,
      chatOnSocket,
      partnerJoinOnSocket,
      partnerTypingOnSocket
    } = this.props;
    const { socket } = Global;

    // Listen Message
    socket.on(chatOnSocket.message, this.onReceiveMessage);

    // Listen Partner Join Event
    socket.on(partnerJoinOnSocket.message, this.onSeen);
    socket.on(partnerTypingOnSocket.message, this.onTyping);

    this._isMounted = true;

    // Initial messages
    const result: any = await this.getMessageApi();

    let messages = result[apiMessageField];
    messages = Helper.selectFields(messages, ['_id', 'text', 'user', 'createdAt']);
    messages.forEach((item: IMessage, index: number) => {
      messages[index] = this.addUserIntoMessage(item, result.users, item.user._id);
    });
    this.setState({
      messages, // messagesData.filter(message => message.system),
      appIsReady: true,
      room: _.pick(result, ['_id', 'name', 'users']),
      total: result.message_count,
      seen: _.includes(result.currentUsers, receiver._id),
      isTyping: _.includes(result.typingUsers, receiver._id)
    });

    this.onLoadEarlier();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getMessageApi = async () => {
    const { url } = this.props;
    const queryString = qs.stringify(this.params);
    return Api.get(`${url}?${queryString}`);
  };

  addUserIntoMessage = (message: IMessage, users: any, user_id: string | number) => {
    const currentUser = _.filter(users, (o) => o._id === user_id)[0];
    const newMessage = message;
    newMessage.user = {
      _id: user_id,
      name: currentUser.name,
      avatar: currentUser.avatar,
    };
    return newMessage;
  };

  onReceiveMessage = (message: IMessage) => {
    const { room } = this.state;
    message = this.addUserIntoMessage(message, room.users, message.user._id);
    message = _.omit(message, 'room');
    this.setState((previousState: any) => ({
      isTyping: false,
      messages: GiftedChat.prepend(
        [message] as [IMessage],
        previousState.messages,
      ),
    }));
  };

  emitTyping = (text: string) => {
    const { sender } = this.props;
    const { hasSentTyping } = this.state;
    this.setState({ input: text });
    if (!hasSentTyping) {
      Global.socket.emit('typing', {
        user: {
          _id: sender._id
        }
      });
    }
    this.setState({ hasSentTyping: true });

    setTimeout(() => {
      const { input } = this.state;
      if (input === text) {
        Global.socket.emit('stop_typing', {
          user: {
            _id: sender._id
          }
        });
        this.setState({ hasSentTyping: false });
      }
    }, 1000);
  };

  onSeen = (data: any) => {
    const { receiver } = this.props;
    const { messages } = this.state;
    const seen = _.includes(data, receiver._id);
    // Change "Received" in Latest Message to true
    if (seen) {
      messages[0].received = true;
      this.setState({ messages });
    }
    this.setState({ seen });
  };

  onTyping = (data: any) => {
    const { receiver } = this.props;
    const { isTyping: isTypingState } = this.state;
    const isTyping = _.includes(data, receiver._id);
    if (isTyping !== isTypingState) {
      this.setState({ isTyping });
    }
  };

  onLoadEarlier = async () => {
    this.setState(() => ({
      isLoadingEarlier: true,
    }));
    // Handle Offset
    let { offset } = this.state;
    const { limit, total } = this.state;
    const { apiMessageField, pagingQueryParam } = this.props;
    offset += limit;
    if (offset + limit < total) {
      this.setState({ offset });
      this.params[pagingQueryParam.offset] = offset;

      // Handle Api
      const result: any = await this.getMessageApi();
      let messages = result[apiMessageField];
      messages = Helper.selectFields(messages, ['_id', 'text', 'user', 'createdAt']);
      messages.forEach((item: IMessage, index: number) => {
        messages[index] = this.addUserIntoMessage(item, result.users, item.user._id);
      });

      this.setState((previousState: any) => ({
        messages: GiftedChat.prepend(
          previousState.messages,
          messages as IMessage[],
        ),
        isLoadingEarlier: false,
      }));
    } else {
      this.setState({
        isLoadingEarlier: false,
        loadEarlier: false,
      });
    }

    // setTimeout(() => {
    //   if (this._isMounted === true) {
    //   this.setState((previousState: any) => ({
    //     messages: GiftedChat.prepend(
    //       previousState.messages,
    //       earlierMessages() as IMessage[],
    //     ),
    //     isLoadingEarlier: false,
    //   }));
    // }
    // }, 1500); // simulating network
  };

  onSend = (messages: IMessage[] = []) => {
    const { seen } = this.state;
    const message = _.omit(messages[0], '_id', 'createdAt');
    Global.socket.emit('chat', message);
    if (seen) messages[0].received = true;

    this.setState((previousState: any) => {
      const sentMessages = [{ ...messages[0] }];
      previousState.messages[0].received = false;
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
        ),
      };
    });
  };

  // renderCustomView(props) {
  //   return <CustomView {...props} />
  // }

  renderAccessory = () => (
    <AccessoryBar />
  );

  renderSend = (props: Send['props']) => (
    <Send {...props} containerStyle={{ justifyContent: 'center' }}>
      <MaterialIcons size={30} color="tomato" name="send" />
    </Send>
  );

  render() {
    const { sender } = this.props;
    const { appIsReady, messages, isLoadingEarlier, loadEarlier, isTyping } = this.state;
    if (!appIsReady) {
      return <ActivityIndicator style={{ marginTop: 200 }} />;
    }

    return (
      <View
        style={{ flex: 1, backgroundColor: '#FFF' }}
        accessible
      >
        <GiftedChat
          ref={(ref: any) => { this.chatRef = ref; }}
          messages={messages}
          onSend={this.onSend}
          loadEarlier={loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={isLoadingEarlier}
          user={sender}
          scrollToBottom
          keyboardShouldPersistTaps="never"
          renderSend={this.renderSend}
          timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
          infiniteScroll
          onInputTextChanged={this.emitTyping}
          isTyping={isTyping}
          renderActions={this.renderAccessory}
          alwaysShowSend
        />
      </View>
    );
  }
}

export default Chat;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { Chat, Header } from '@components';
import { Global } from '@utils/appHelper';

class ChatDetailScreen extends PureComponent<any> {
  componentDidMount() {
    const { route: { params }, navigation } = this.props;
    const item = params?.item;
  }

  render() {
    const { route: { params } } = this.props;
    const item = params?.item;

    return (
      <>
        <Header backIcon title="ChatDetailScreen" />
        <Chat
          chatOnSocket={{
            message: 'chat',
          }}
          partnerJoinOnSocket={{
            message: 'trigger_chatting',
          }}
          partnerTypingOnSocket={{
            message: 'trigger_typing',
          }}
          url="http://localhost:3000/rooms/5f9a662605aea25743c06038"
          apiMessageField="messages"
          pagingQueryParam={{
            offset: 'message_offset',
            limit: 'message_limit',
          }}
          sender={{
            _id: item.sender_id,
          }}
          receiver={{
            _id: item._id,
            name: item.name,
            avatar: item.avatar
          }}
        />
      </>
    );
  }
}

export default ChatDetailScreen;

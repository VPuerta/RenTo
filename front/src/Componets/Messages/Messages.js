import React, { Component } from 'react';
import { Chat, ChannelList, ChannelListMessenger, ChannelPreviewMessenger, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.chatClient = new StreamChat('qk4nn7rpcn75');
        const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicmVkLWhhemUtMiJ9.LPfZDP2Wwnfm2rvNYZ3JNB4qdvoopsQQq-eEaFaVPDE'

        this.chatClient.setUser({
            id: 'red-haze-2',
            name: 'Vane',
            image: 'https://getstream.io/random_svg/?id=red-haze-2&name=Red+haze'
        },
            userToken,
        );

        this.channel = this.chatClient.channel('messaging', 'rento', {
            // add as many custom fields as you'd like
            image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
            name: 'Rento',
        });
    }

    render() {
        return (
            <div>
                <Chat client={this.chatClient} theme={'messaging light'}>
                    <ChannelList
                        List={ChannelListMessenger}
                        Preview={ChannelPreviewMessenger}
                    />
                    <Channel channel={this.channel}>
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput />
                        </Window>
                        <Thread />
                    </Channel>
                </Chat>
                );
            </div>
        )
    }
}

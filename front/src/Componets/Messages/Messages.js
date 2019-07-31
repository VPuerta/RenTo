import React, { Component } from 'react';
import { Chat, ChannelList, ChannelListMessenger, ChannelPreviewMessenger, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';
import photo from '../Assets/logo-white.png'

export default class Messages extends Component {
    constructor(props) {
        super(props);
        
        // creamos cliente (clase) a partir de nuestra api key
        this.chatClient = new StreamChat('476rbkbracqc');
        //con esto nos logeamos en el cliente, le pasamos el id, el nombre y la imagen del avatar del usuario logado y el token
        this.chatClient.setUser({
            id: this.props.loggedInUser.username,
            name: this.props.loggedInUser.username,
            image: this.props.loggedInUser.photo
        }, this.props.loggedInUser.chatToken);
        //con esto creamos canales,1º tipo de canal(no lo tocamos), 2º identificador de canal:cada vez que lo tocamos se crea un canal nuevo.
        this.channel = this.chatClient.channel('messaging', 'Bici', {
            // add as many custom fields as you'd like
            image: {photo},
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

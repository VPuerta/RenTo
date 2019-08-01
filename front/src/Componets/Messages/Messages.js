import React, { Component } from 'react';
import { Chat, Channel, ChannelList, ChannelHeader, ChannelListMessenger, ChannelPreviewMessenger, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import AuthServices from '../../Services/Services';
import 'stream-chat-react/dist/css/index.css';

export default class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channel: null,
            chatClient: null,
            product: null
        }

        this.service = new AuthServices();
    }

    componentDidMount = () => {
        this.loadChat()
        this.getSingleProduct()
    }

    getSingleProduct = () => {
        if (this.props.productId === null) {
            return
        }

        this.service.getProductDetail(this.props.productId)
            .then(response => {
                console.log("getProductDetail ok", response)
                const product = response;
                this.loadChannel(product);
            })
            .catch((err) => {
                console.log("getProductDetail no ok", err)
            })
    }

    loadChat = () => {
        // creamos cliente (clase) a partir de nuestra api key
        this.state.chatClient = new StreamChat('476rbkbracqc');
        //con esto nos logeamos en el cliente, le pasamos el id, el nombre y la imagen del avatar del usuario logado y el token
        this.state.chatClient.setUser({
            id: this.props.loggedInUser.username,
            name: this.props.loggedInUser.username,
            image: this.props.loggedInUser.photo
        }, this.props.loggedInUser.chatToken);

        this.setState({
            ...this.state,
            chatClient: this.state.chatClient
        })
    }

    loadChannel = (product) => {
        console.log("Loading chat for", product, "members", [this.props.loggedInUser.username, product.owner.username])

        //con esto creamos canales,1º tipo de canal(no lo tocamos), 2º identificador de canal:cada vez que lo tocamos se crea un canal nuevo.
        let channel = this.state.chatClient.channel('messaging', this.getChannelId(product), {
            // add as many custom fields as you'd like
            image: product.imageUrl,
            name: product.name,
            members: [this.props.loggedInUser.username, product.owner.username]
        });

        this.setState({
            ...this.state,
            channel: channel,
            product: product
        });
    }
    
    getChannelId = (product) => {
        let interested = this.props.loggedInUser.id
        let ownerProduct = product.owner._id
        console.log(ownerProduct)

        return interested + "-" + ownerProduct
    }

    render() {
        if (this.state.chatClient === null) {
            return (<div></div>)
        }

        const filters = { members: { $in: [this.props.loggedInUser.username] } };
        const sort = { last_message_at: -1 , limit: 3 };

        return (
            <div>
                <Chat client={this.state.chatClient} theme={'messaging light'}>
                    {this.state.channel === null ?
                        (<ChannelList sort={sort} List={ChannelListMessenger} Preview={ChannelPreviewMessenger} />) :
                        (<div></div>)
                    }
                    {this.state.channel === null ?
                        (<Channel> <Window> <ChannelHeader /> <MessageList /> <MessageInput /> </Window> <Thread /> </Channel>) :
                        (<Channel channel={this.state.channel}> <Window> <ChannelHeader /> <MessageList /> <MessageInput /> </Window> <Thread /> </Channel>)
                    }
                </Chat>
            </div>
        )
    }
}

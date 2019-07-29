import React, { Component } from 'react';

export default class Chat extends Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.chatAreaDOMEl = undefined
        this.state = {
            messagesList: [],
            message: ""
        }
    }

    submitMessage(e) {
        e.preventDefault()
        if (this.state.message.trim() === "") return


        const today = new Date();
        const timeStamp = today.getHours() + ":" + today.getMinutes();
        const messages = [...this.state.messagesList]
        messages.push({
            user: this.props.userName,
            message: this.state.message.trim(),
            timeStamp
        })

        this.setState({
            ...this.state,
            messagesList: messages,
            message: ""
        })

    }

    handleChange(e) {
        this.setState({
            ...this.state,
            message: e.target.value
        })
    }

    componentDidMount() {
        this.chatAreaDOMEl = document.querySelector(".chat-area")

    }

    componentDidUpdate() {
        this.chatAreaDOMEl.scrollTop = this.chatAreaDOMEl.scrollHeight;
    }


    render() {
        const { users, userName } = this.props

        if (!userName) {
            this.props.history.push("/")
        }

        return (
            <div className="chat-container is-fluid">
                <div>
                    <div isSize="1/4">
                        <div className="users-list">
                            <h2 className="title">Users list</h2>
                            <ul>
                                {users.map((user, idx) => {
                                    return user === userName ?
                                        <li key={idx} className="current-user">{user}</li> :
                                        <li key={idx}>{user}</li>
                                })}
                            </ul>
                        </div>
                        <div isSize="3/4">
                            <div className="chat-area">
                                <ul>
                                    {this.state.messagesList.map((message, idx) => {
                                        return message.user === userName ?
                                            <li key={idx} className="current-user-message">[{message.timeStamp}] {message.user}: {message.message} </li> :
                                            <li key={idx}>[{message.timeStamp}] {message.user}: {message.message} </li>
                                    })}
                                </ul>
                            </div>
                            <form className="text-form" onSubmit={(e) => this.submitMessage(e)}>
                                <div isGrouped>
                                    <input
                                        onChange={e => this.handleChange(e)}
                                        type="text"
                                        placeholder="write a message..."
                                        value={this.state.message} />
                                    <div>
                                        <button
                                            isColor="danger"
                                            onClick={(e) => this.submitMessage(e)}>
                                            Send
                </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


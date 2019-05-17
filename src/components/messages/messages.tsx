import * as React from 'react'
import {MessageInterface} from '../../interfaces';
import Message from './message';
import './messages.scss'
export default class Messages extends React.Component<{ messages: MessageInterface[] }, any> {
    render() {
        let messages = this.props.messages.map((msg: MessageInterface, index: number) => {
            return <Message key={`message${index}`} msgKey={msg.msgKey} type={msg.type} title={msg.title} message={msg.message}></Message>

        })
        return (
            <div className="messages-area">
                {messages}
            </div>
        )
    }
}
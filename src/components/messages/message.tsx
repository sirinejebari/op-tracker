import * as React from 'react'
import './message.scss'
import {MessageInterface} from '../../interfaces';
import { store } from '../../store/store'
import { hideMessage } from '../../store/actions'
export default class Message extends React.Component<MessageInterface, any> {
    constructor(props: MessageInterface) {
        super(props)
        setTimeout(() => {
            store.dispatch(hideMessage(this.props))
        }, 5000) //hide message in 5s
    }
    hideMessage = () => {
        store.dispatch(hideMessage(this.props))
    }
    render() {
        return (
            <article className={`${this.props.type} message is-small`}>
                <div className="message-header">
                    <p>{this.props.title}</p>
                    <button className="delete is-small" onClick={this.hideMessage} aria-label="delete"></button>
                </div>
                <div className="message-body">
                    {this.props.message}</div>
            </article>
        )
    }
}


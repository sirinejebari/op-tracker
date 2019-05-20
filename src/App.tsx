import React from 'react';
import './App.css';
import '../node_modules/bulma/css/bulma.css'
import List from "./components/list/list";
import Filters from './components/filters/filters'
import Navbar from './components/navbar/navbar';
import { store } from './store/store'
import { MessageInterface } from './interfaces'
import { addMessage } from './store/actions';
import Messages from './components/messages/messages';
export default class App extends React.Component<any, { messages: MessageInterface[], unsubscribe: any }> {

  constructor(props: any) {
    super(props);
    this.state = {
      messages: [],
      unsubscribe: ''
    }


  }

  componentDidMount() {
    const unsubscribe = store.subscribe(() => {
      let messages = store.getState().messages
      this.setState({
        messages: messages
      })
    })
    this.setState({
      unsubscribe: unsubscribe
    })
  }

  addMEssage = () => {
    store.dispatch(addMessage({ title: 'test', type: 'is-success', message: 'test', msgKey: '' }))
  }

  componentWillUnmount() {
    this.state.unsubscribe()
  }
  render() {

    let messages = this.state.messages
    return (

      <div className="App">
        <Navbar></Navbar>

        <div className="app-title">
          <h1 className="title">
            Order Tracking
      </h1>

        </div>
        <Filters></Filters>
        <List orders={[]} />
        <Messages messages={messages}></Messages>
      </div>
    );
  }
}



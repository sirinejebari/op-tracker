import React from 'react';
import { default as ListItem } from "../list-item/list-item";
import ListHeader from "../list-header/list-header";
import { store } from '../../store/store';
import moment from 'moment'
import {ServerEvent, FiltersInterface} from '../../interfaces';
import { addMessage } from '../../store/actions';
let apiConfig = require('../../api-config.json')
export default class ItemsList extends React.Component<any, {
  counter: number,
  items: { [key: string]: ServerEvent },
  filters: FiltersInterface,
  unsubscribe: any
}> {

  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0,
      items: {},
      filters: {
        status: '',
        reference: '',
        operator: ''
      },
      unsubscribe: ''
    }
   

    this.establishConnection()

  }

  componentDidMount(){
    const unsubscribe = store.subscribe(() => {
      this.setState({
        unsubscribe: unsubscribe
      })
    });
  }

  handleIncomingMessage = (event: any) => {
    let formattedEvent = JSON.parse(event.data)
    let payload = formattedEvent.payload
    if (payload.subtype === 'data_update') {
      payload.description = `${payload.short} updated: ${payload.description}`
    }
    payload['date'] = formattedEvent['create_time']
    this.formatAndSendEvent(payload)
    this.setState({
      counter: this.state.counter + 1
    })
  };

  establishConnection = () => {
    let s = new EventSource(apiConfig.url)

    s.onmessage = this.handleIncomingMessage

    s.onopen = () => {
      store.dispatch(addMessage({ title: 'Success', message: `Connexion established to ${apiConfig.url}`, type: 'is-link', msgKey: '' }))
    }

    s.onerror = (e) => {
      setTimeout(() => {
        this.establishConnection()
      }, 5000) // try again in 5 seconds
      store.dispatch(addMessage({ title: 'Connexion error', message: 'Cannot establish connexion with API, will try again in 5 seconds ', type: 'is-danger', msgKey: '' }))
      s.close()
    }
  }
  groupBy = (xs: any, key: any) => {
    return xs.reduce((rv: any, x: any) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  formatAndSendEvent = (event: ServerEvent) => {
    let currentItems = this.state.items;
    if (currentItems[event.reference] && event.subtype === 'data_update') {
      event.short = currentItems[event.reference].short
    }
    currentItems[event.reference] = event;
    this.setState({
      items: currentItems
    })
  }

  compare = (a: ServerEvent, b: ServerEvent) => {
    if (moment(a.date).isBefore(moment(b.date))) {
      return 1;
    }
    if (moment(b.date).isBefore(moment(a.date))) {
      return -1;
    }
    return 0;
  }

  componentWillUnmount(){
    this.state.unsubscribe.unsubscribe()
  }

  render() {
    let groupedItems = Object.values(this.state.items).sort(this.compare)
    let filters = this.state.filters;

    let itemsToShow = groupedItems.map((item: ServerEvent, index: number) => {
      if (((filters.reference !== '' && item.reference === filters.reference) || filters.reference === '') &&
        ((filters.operator !== '' && item.operator === filters.operator) || filters.operator === '') &&
        ((filters.status !== '' && item.short === filters.status) || filters.status === ''))
        return <ListItem firstItem={index === 0} rowType={index % 2 === 0 ? 'light' : 'dark'} key={item.reference} order={item} />
    });
    return (

      <div className="card">
        <ListHeader></ListHeader>
        {itemsToShow}
      </div>
    )
  }
}
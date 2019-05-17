import React from 'react';
import './list-item.scss'
import moment from "moment"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faCheckCircle, faExclamationCircle, faBox, faShippingFast ,faCheck, faGift, faPlus, faCogs} from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faCheck,faBox,faCheckCircle, faGift,faExclamationCircle, faShippingFast, faPaperPlane, faCogs)

export interface orderProps {
  order: { reference: string; operator: string; subtype: string; short: string; description: string; date: string }
}

export default class ListItem extends React.Component<any, any>  {
  getStatusLAbel = (status: string) => {
    switch (status) {
      case 'CREATED': {
        return <span><FontAwesomeIcon icon="plus" /> Created</span>
      }

      case 'TRANSMITTED': {
        return <span><FontAwesomeIcon icon="paper-plane" /> Transmitted</span>
      }

      case 'IN_PREPARATION': {
        return <span><FontAwesomeIcon icon="cogs" /> In Preparation</span>
      }

      case 'PREPARED': {
        return <span><FontAwesomeIcon icon="box" /> Prepared</span>
      }

      case 'SHIPPED': {
        return <span><FontAwesomeIcon icon="shipping-fast" /> Shipped</span>
      }

      case 'DELIVERY_EXCEPTION': {
        return <span><FontAwesomeIcon icon="exclamation-circle" /> Delivery Exception</span>
      }

      case 'DELIVERED': {
        return <span><FontAwesomeIcon icon="check-circle" /> Delivered</span>
      }

      default: 
      return 'UNKNOWN'
    }

  }
  render() {
    let classname = `item ${this.props.firstItem ? 'animate' : ''}  ${this.props.order.short === 'DELIVERY_EXCEPTION' ? 'exception': ''} ${this.props.order.short === 'DELIVERED' ? 'delivered': ''} ${this.props.rowType}`
    return (
      <div  className={classname} >
        <div className="reference">{this.props.order.reference}</div>
        <div className="operator">{this.props.order.operator}</div>
        <div className="status">{this.getStatusLAbel(this.props.order.short)}</div>
        <div className="description">{this.props.order.description}</div>
        <div className="date-updated">{moment(this.props.order.date).format("DD/MM/YYYY h:mm:ss a")}</div>

      </div>
    )
  }

}
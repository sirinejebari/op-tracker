import * as React from 'react'
import './filters.scss'
import { store } from '../../store/store'
import { updateFilters } from '../../store/actions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEraser} from '@fortawesome/free-solid-svg-icons'

library.add(faEraser)

export default class Filters extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        this.state = {
            status: '',
            reference: '',
            operator: ''
        }
    }

    handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            store.dispatch(updateFilters(this.state))
        });
    }

    resetFilters = () => {
        this.setState({
            operator: '',
            reference: '',
            status: ''
        }, () => {
            store.dispatch(updateFilters(this.state))
        })
    }

    render() {
        const statusList: any[] = [
            <option key="NONE" value=""></option>,
            <option key="CREATED" value="CREATED">Created</option>,
            <option key="TRANSMITTED" value="TRANSMITTED"> Transimtted</option>,
            <option key="IN_PREPARATION" value="IN_PREPARATION">In preparation</option>,
            <option key="PREPARED" value="PREPARED">Prepared</option>,
            <option key="SHIPPED" value="SHIPPED">Shipped</option>,
            <option key="DELIVERY_EXCEPTION" value="DELIVERY_EXCEPTION">Delivery exception</option>,
            <option key="DELIVERED" value="DELIVERED">Delivered</option>
        ]
        return (
            <div className="filters card">
                <p>Search</p>
                <div className="field">
                    <div className="control">
                        <input className="input is-small" name="reference" type="text" onChange={this.handleInputChange} value={this.state.reference} placeholder="Reference..." />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <input className="input is-small" name="operator" onChange={this.handleInputChange} value={this.state.operator} type="text" placeholder="Operator..." />
                    </div>
                </div>

                <div className="select  is-small" >
                    <select onChange={this.handleInputChange} name="status" value={this.state.status}>
                        {statusList}
                    </select>
                </div>

                <button className="button  is-small" onClick={this.resetFilters}>
                <FontAwesomeIcon icon="eraser"></FontAwesomeIcon> &nbsp; Reset filters</button>
            </div>
        )
    }
}
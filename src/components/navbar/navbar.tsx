import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

library.add(faBoxOpen)
export default class Navbar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            time: moment().format('dddd, MMMM Do YYYY, hh:mm:ss a'),
            intervalID: ''
        };

    }

    tick() {
        this.setState({
            time: moment().format('dddd, MMMM Do YYYY, hh:mm:ss a')
        });
    }

    componentDidMount() {
        let intervalID = setInterval(
            () => this.tick(),
            1000
        );
        this.setState({
            intervalID: intervalID
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalID);
    }
    render() {
        return (
            <nav className="navbar card is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a href="" className="navbar-item">
                        <FontAwesomeIcon icon="box-open" /> <strong> &nbsp;BBGC Delivery Tracker</strong>
                    </a>
                </div>

                <p className="App-clock navbar-end navbar-item">
                    {this.state.time}
                </p>

            </nav >
        )
    }
}


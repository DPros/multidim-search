import * as React from 'react';
import {ClassAttributes} from 'react';
import {MonitorModel} from "../models/monitor.model";
import {DbService} from "../services/db.service";
import {DoubleLinkedListService} from "../services/double-linked-list.service";
import Monitor from "./Monitor";

let styles = require('./Home.scss');

export default class Home extends React.Component {

    service: DbService;
    state: { monitors: MonitorModel[], monitor: MonitorModel | undefined };

    constructor(props: ClassAttributes<Home>) {
        super(props);
        this.state = {monitors: [], monitor: undefined};
        this.service = new DoubleLinkedListService();
        this.service.init(() => this.service.get(monitors =>
            setTimeout(() => this.setState({monitors, monitor: monitors[0]}))));
    }

    render() {
        return (
            <div className={styles.container} data-tid="container">
                {this.state.monitor &&
                <Monitor monitor={this.state.monitor} onSelect={m => this.setState({monitor: m})}/>
                }
                {/*<Link to="/counter">to Counter</Link>*/}
            </div>
        );
    }
}

import * as React from 'react';
import {ClassAttributes} from 'react';
import {Link} from "react-router-dom";
import {MonitorModel} from "../models/monitor.model";
import {DbService} from "../services/db.service";
import {DoubleLinkedListService} from "../services/double-linked-list.service";

let styles = require('./Home.scss');

export default class Home extends React.Component {

    service: DbService;
    state: { monitors: MonitorModel[] };

    constructor(props: ClassAttributes<Home>) {
        super(props);
        this.state = {monitors: []};
        this.service = new DoubleLinkedListService();
        this.service.init(() => this.service.get(monitors =>
            setTimeout(() => this.setState({monitors}))));
    }

    render() {
        return (
            <div className={styles.container} data-tid="container">
                {console.log(this.state.monitors) && this.state.monitors.map((m: MonitorModel) =>
                    <div key={m._id}>{m.manufacturer.value} {m.model.value}</div>)}
                <Link to="/counter">to Counter</Link>
            </div>
        );
    }
}

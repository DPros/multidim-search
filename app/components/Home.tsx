import * as React from 'react';
import {ClassAttributes} from 'react';
import {MonitorModel} from "../models/monitor.model";
import Monitor from "./Monitor";
import {ReverseIndicesService} from "../services/reverse-indices.service";
import {default as MonitorForm} from "./Form";

let styles = require('./Home.scss');

const initialState = {monitors: [], monitor: undefined, ordering: {}, formOpen: false, editMode: false};

export default class Home extends React.Component {

    service: ReverseIndicesService;
    state: {
        monitors: MonitorModel[],
        monitor: MonitorModel | undefined,
        ordering: { [criteria: string]: number[] },
        formOpen: boolean,
        editMode: boolean;
    };

    constructor(props: ClassAttributes<Home>) {
        super(props);
        this.state = initialState;
        this.service = new ReverseIndicesService();
        this.service.init(this.reload);
    }

    reload: () => void = () => this.service.get((monitors, ordering) => {
            this.setState(initialState);
            setTimeout(() => this.setState({monitors, monitor: monitors[0], ordering}))
        }
    );

    render() {
        const {monitor, monitors, ordering, formOpen, editMode} = this.state;
        return (
            <div className={styles.container} data-tid="container">
                {monitor && formOpen ?
                    <MonitorForm monitor={editMode ? Object.keys(monitor).reduce(((obj: any, key: string) =>
                            (obj[key] = monitor[key].value, obj)),
                        {}) : {}}
                                 onCancel={() => this.setState({formOpen: false})}
                                 onSave={(m) => this.save(m)}
                    />
                    : <div style={{textAlign: "left"}}>
                        <button onClick={() => this.setState({formOpen: true, editMode: false})}>Add</button>
                        <button onClick={() => this.setState({formOpen: true, editMode: true})}>Edit</button>
                        <button onClick={() => this.delete()}>Delete</button>
                    </div>
                }
                {monitor &&
                <Monitor monitor={monitor} monitors={monitors} ordering={ordering}
                         onSelect={_ => this.setState({monitor: _})}/>
                }
            </div>
        );
    }

    save(m: object) {
        this.setState({formOpen: false});
        const {monitor, editMode} = this.state;
        this.service.save(m, this.reload, editMode ? monitor && monitor._id : undefined);
    }

    delete() {
        this.service.delete(this.state.monitor && this.state.monitor._id, this.reload);
    }
}

import * as React from "react";

export interface IMonitorProps {
    monitor: object & {_id: string};
    onSave: (monitor: object & {_id: string}) => void;
    onCancel: () => void;
}

export default class MonitorForm extends React.Component<IMonitorProps, any> {

    constructor(props: IMonitorProps) {
        super(props);
        this.state = {monitor: props.monitor};
    }

    render() {
        const {monitor} = this.state;
        const {onSave, onCancel} = this.props;
        return (
            <form>
                <div>
                    Manufacturer
                    <input onChange={_ => this.setState({monitor: Object.assign(monitor,{manufacturer: _.target.value})})} value={monitor.manufacturer}/>
                </div>
                <div>
                    Model
                    <input onChange={_ => this.setState({monitor: Object.assign(monitor,{model: _.target.value})})} value={monitor.model}/>
                </div>
                <div>
                    Diagonal
                    <input type="number" onChange={_ => this.setState({monitor: Object.assign(monitor,{diagonal: _.target.value})})} value={monitor.diagonal}/>
                </div>
                <div>
                    Resolution Width
                    <input type="number" onChange={_ => this.setState({monitor: Object.assign(monitor,{pixelWidth: _.target.value})})} value={monitor.pixelWidth}/>
                </div>
                <div>
                    Resolution Height
                    <input type="number" onChange={_ => this.setState({monitor: Object.assign(monitor,{pixelHeight: _.target.value})})} value={monitor.pixelHeight}/>
                </div>
                <div>
                    Price
                    <input type="number" onChange={_ => this.setState({monitor: Object.assign(monitor,{price: _.target.value})})} value={monitor.price}/>
                </div>
                <div>
                    Weight
                    <input type="number" onChange={_ => this.setState({monitor: Object.assign(monitor,{weight: _.target.value})})} value={monitor.weight}/>
                </div>
                <div>
                    <button onClick={() => onSave(monitor)}>Save</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}
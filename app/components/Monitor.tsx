import * as React from "react";
import Criteria from "./Criteria";
import {MonitorModel} from "../models/monitor.model";

export interface IMonitorProps {
    monitor: MonitorModel;
    onSelect: (monitor: MonitorModel | undefined) => void;
}

export default class Monitor extends React.Component<IMonitorProps, any> {

    render() {
        const {monitor, onSelect} = this.props;
        return (
            <div>
                <Criteria criteria={monitor.manufacturer} title="Manufacturer" onSelect={onSelect}/>
                <Criteria criteria={monitor.model} title="Model" onSelect={onSelect}/>
                <Criteria criteria={monitor.diagonal} title="Diagonal" onSelect={onSelect}/>
                <Criteria criteria={monitor.resolution.width} title="Resolution Width" onSelect={onSelect}/>
                <Criteria criteria={monitor.resolution.height} title="Resolution Height" onSelect={onSelect}/>
                <Criteria criteria={monitor.resolution.totalPixels} title="Total Pixel" onSelect={onSelect}/>
                <Criteria criteria={monitor.price} title="Price" onSelect={onSelect}/>
                <Criteria criteria={monitor.weight} title="Weight" onSelect={onSelect}/>
            </div>
        );
    }
}
import * as React from "react";
import Criteria from "./Criteria";
import {MonitorModel} from "../models/monitor.model";

export interface IMonitorProps {
    monitor: MonitorModel;
    monitors: MonitorModel[];
    onSelect: (monitor: MonitorModel) => void;
    ordering: { [criteria: string]: number[] }
}

export default class Monitor extends React.Component<IMonitorProps, any> {

    render() {
        const {monitor, monitors, onSelect, ordering} = this.props;
        return (
            <div>
                <img style={{height: 300}} src={"resources/" + monitor.model.value + ".png"}/>
                <Criteria criteria={monitor.manufacturer} title="Manufacturer"
                          ordering={ordering.manufacturer} monitors={monitors}
                          onSelect={onSelect}/>
                <Criteria criteria={monitor.model} title="Model"
                          ordering={ordering.model} monitors={monitors}
                          onSelect={onSelect}/>
                <Criteria criteria={monitor.diagonal} title="Diagonal"
                          ordering={ordering.diagonal} monitors={monitors}
                          onSelect={onSelect}/>
                <Criteria criteria={monitor.pixelWidth} title="Resolution Width"
                          ordering={ordering.resolutionWidth} monitors={monitors}
                          onSelect={onSelect}/>
                <Criteria criteria={monitor.pixelHeight} title="Resolution Height"
                          ordering={ordering.resolutionHeight} monitors={monitors}
                          onSelect={onSelect}/>
                <Criteria criteria={monitor.totalPixels} title="Total Pixel"
                          ordering={ordering.resolutionTotalPixels} monitors={monitors}
                          onSelect={onSelect}/>
                <Criteria criteria={monitor.price} title="Price"
                          ordering={ordering.price} monitors={monitors}
                          onSelect={onSelect}/>
                <Criteria criteria={monitor.weight} title="Weight"
                          ordering={ordering.weight} monitors={monitors}
                          onSelect={onSelect}/>
            </div>
        );
    }
}
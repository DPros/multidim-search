import * as React from "react";
import {MonitorModel} from "../models/monitor.model";

export interface ICriteriaProps {
    monitor: MonitorModel | undefined;
    onClick: (monitor: MonitorModel) => void;
}

export default class MonitorLink extends React.Component<ICriteriaProps, any> {


    render() {
        const {monitor, onClick} = this.props;
        return (
            <div style={{width: 300}}>
                {monitor && <div style={{cursor: "pointer"}} onClick={() => onClick(monitor)}>
                    <img style={{height: 150}} src={"resources/" + monitor.model.value + ".png"}/>
                    <div>{monitor.manufacturer.value} {monitor.model.value}</div>
                </div>}
            </div>
        );
    }
}
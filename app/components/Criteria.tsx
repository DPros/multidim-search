import * as React from "react";
import {IndexedValueModel} from "../models/indexed-value.model";
import {MonitorModel} from "../models/monitor.model";
import MonitorLink from "./MonitorLink";

export interface ICriteriaProps {
    criteria: IndexedValueModel<number | string>;
    title: string;
    onSelect: (monitor: MonitorModel) => void;
    monitors: MonitorModel[];
    ordering: number[];
}

const styles = require('./Criteria.scss');

export default class Criteria extends React.Component<ICriteriaProps, any> {

    render() {
        const {criteria, title, onSelect, monitors, ordering} = this.props;
        return (
            <div>
                <div className={styles.criteria}>
                    <div style={{cursor: "pointer"}} onClick={() => onSelect(monitors[ordering[0]])}>
                        {"<<"}
                    </div>
                    <div>
                        <MonitorLink monitor={monitors[ordering[criteria.index - 1]]} onClick={onSelect}/>
                    </div>
                    <div className={"center"}>
                        <h1>{title}</h1>
                        <div>{criteria.value}</div>
                    </div>
                    <div className={"right"}>
                        <MonitorLink monitor={monitors[ordering[criteria.index + 1]]} onClick={onSelect}/>
                    </div>
                    <div style={{cursor: "pointer"}} onClick={() => onSelect(monitors[ordering[ordering.length - 1]])}>
                        {">>"}
                    </div>
                </div>
            </div>
        );
    }
}
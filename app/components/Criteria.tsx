import * as React from "react";
import {IterableValueModel} from "../models/iterable-value.model";
import {MonitorModel} from "../models/monitor.model";

export interface ICriteriaProps {
    criteria: IterableValueModel<number | string>;
    title: string;
    onSelect: (monitor: MonitorModel | undefined) => void;
}

const styles = require('./Criteria.scss');

export default class Criteria extends React.Component<ICriteriaProps, any> {

    render() {
        const {criteria, title, onSelect} = this.props;
        return (
            <div>
                <div className={styles.criteria}>
                    <div>
                        {criteria.prev && <span onClick={() => onSelect(criteria.prev)}>{'<'}</span>}
                    </div>
                    <div className={"center"}>
                        <div>{title}</div>
                        <div>{criteria.value}</div>
                    </div>
                    <div className={"right"}>
                        {criteria.next && <span onClick={() => onSelect(criteria.next)}>{'>'}</span>}
                    </div>
                </div>
            </div>
        );
    }
}
import {MonitorModel} from "./monitor.model";

export interface IterableValueModel<T> {
    value: T;
    next?: MonitorModel;
    prev?: MonitorModel;

}
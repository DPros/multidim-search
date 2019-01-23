import {MonitorModel} from "../models/monitor.model";

export interface DbService {
    init(callback: () => void): void;

    get(callback: (monitors: MonitorModel[]) => void): void;
}
import {IterableValueModel} from "./iterable-value.model";

export interface MonitorModel {
    _id?: string;
    weight: IterableValueModel<number>;
    price: IterableValueModel<number>;
    resolution: {
        width: IterableValueModel<number>;
        height: IterableValueModel<number>;
        totalPixels: IterableValueModel<number>;
    }
    diagonal: IterableValueModel<number>;
    manufacturer: IterableValueModel<string>;
    model: IterableValueModel<string>;

    [key: string]: any;
}
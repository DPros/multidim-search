import {IndexedValueModel} from "./indexed-value.model";

export interface MonitorModel {
    _id?: string;
    weight: IndexedValueModel<number>;
    price: IndexedValueModel<number>;
    pixelWidth: IndexedValueModel<number>;
    pixelHeight: IndexedValueModel<number>;
    totalPixels: IndexedValueModel<number>;
    diagonal: IndexedValueModel<number>;
    manufacturer: IndexedValueModel<string>;
    model: IndexedValueModel<string>;

    [key: string]: any;
}
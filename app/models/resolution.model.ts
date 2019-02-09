import {IndexedValueModel} from "./indexed-value.model";

export class ResolutionModel {
    width: IndexedValueModel<number>;
    height: IndexedValueModel<number>;
    totalPixels: IndexedValueModel<number>;

    constructor(width: number, height: number) {
        this.width = {value: width, index: 0};
        this.height = {value: height, index: 0};
        this.totalPixels = {value: width * height, index: 0};
    }
}
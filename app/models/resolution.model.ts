import {IterableValueModel} from "./iterable-value.model";

export class ResolutionModel {
    width: IterableValueModel<number>;
    height: IterableValueModel<number>;
    totalPixels: IterableValueModel<number>;

    constructor(width: number, height: number) {
        this.width = {value: width};
        this.height = {value: height};
        this.totalPixels = {value: width * height};
    }
}
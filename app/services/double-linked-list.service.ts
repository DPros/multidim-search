import {DbService} from "./db.service";
import {MonitorModel} from "../models/monitor.model";
import {ResolutionModel} from "../models/resolution.model";
import Nedb = require("nedb");

export class DoubleLinkedListService implements DbService {

    db: Nedb;

    get(callback: (monitors: MonitorModel[]) => void): void {
        this.db.find({}).exec((err, docs: MonitorModel[]) => {
            this.linkify(docs);
            callback(docs);
        });
    }


    monitor(manufacturer: string,
            model: string,
            price: number,
            pixelWidth: number,
            pixelHeight: number,
            diagonal: number,
            weight: number
    ): MonitorModel {
        return {
            weight: {value: weight},
            price: {value: price},
            resolution: new ResolutionModel(pixelWidth, pixelHeight),
            diagonal: {value: diagonal},
            manufacturer: {value: manufacturer},
            model: {value: model}
        }
    }

    init(callback: () => void): void {
        const $self = this;
        this.db = new Nedb({filename: './monitors.db'});
        this.db.loadDatabase(function () {
            $self.db.find({}).exec(function (err: any, docs: any[]) {
                if (!docs.length) {
                    $self.db.insert([
                        $self.monitor("Samsung", "C24F396F", 3999, 1920, 1080, 23.5, 2.8),
                        $self.monitor("Dell", "SE2416H", 3699, 1920, 1080, 24, 2.9),
                        $self.monitor("Samsung", "C27F396F", 6299, 1920, 1080, 27, 3.6),
                        $self.monitor("LG", "23MP68VQ-P", 4399, 1920, 1080, 23, 2.7),
                        $self.monitor("Philips", "223V5LSB2/10/62", 2499, 1920, 1080, 21.5, 2.35),
                        $self.monitor("Dell", "P2418D", 7749, 2560, 1440, 23.8, 3.44),
                        $self.monitor("Philips", "V-line 193V5LSB2/62", 1999, 1366, 768, 18.5, 1.94),
                        $self.monitor("Samsung", "U28E590D", 8599, 3840, 2160, 28, 4.71),
                        $self.monitor("LG", "29WK500-P", 7599, 2560, 1080, 29, 4.4)
                    ], callback)
                } else {
                    callback();
                }
            });
        });
    }

    linkify(monitors: MonitorModel[]): void {
        console.log(monitors.map(_ => _.weight.value));
        this.linkifyBy(monitors, "weight");
        this.linkifyBy(monitors, "price");
        this.linkifyBy(monitors, "resolution.width");
        this.linkifyBy(monitors, "resolution.height");
        this.linkifyBy(monitors, "resolution.totalPixels");
        this.linkifyBy(monitors, "diagonal");
        this.linkifyBy(monitors, "manufacturer");
        this.linkifyBy(monitors, "model");
    }

    linkifyBy(monitors: MonitorModel[], field: string): void {
        let max = this.compare(monitors[0], monitors[1], field);
        for (let i = 2; i < monitors.length; i++) {
            max = this.compare(max, monitors[i], field);
        }
    }

    compare(a: MonitorModel, b: MonitorModel, field: string): MonitorModel {
        if (!a) return b;
        if (!b) return a;
        if (this.accessField(a, field).value <= this.accessField(b, field).value) {
            this.accessField(b, field).next = this.accessField(a, field).next;
            this.accessField(a, field).next = b;
            this.accessField(b, field).prev = a;
            return b;
        } else {
            this.accessField(a, field).next = this.accessField(b, field).next;
            this.accessField(b, field).next = a;
            this.accessField(a, field).prev = this.compare(this.accessField(a, field).prev, b, field);
            return a;
        }
    }

    accessField(m: MonitorModel, field: string): any {
        const path = field.split(".");
        let res = m;
        for (let i = 0; i < path.length; i++) {
            res = res[path[i]];
        }
        return res;
    }
}
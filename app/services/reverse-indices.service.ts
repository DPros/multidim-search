import {MonitorModel} from "../models/monitor.model";
import Nedb = require("nedb");

export class ReverseIndicesService {

    db: Nedb;

    get(callback: (monitors: MonitorModel[], ordering: { [criteria: string]: number[] }) => void): void {
        this.db.find({}).exec((err, docs: object[]) => {
            const monitors = docs.map(this.monitor);
            callback(monitors, this.sort(monitors));
        });
    }

    save(monitor: object, callback: () => void, id?: string): void {
        if (id) {
            this.delete(id, () => this.db.insert(monitor, callback))
        } else {
            this.db.insert(monitor, callback)
        }
    }

    delete(_id: any, callback: () => void): void {
        this.db.remove({_id}, callback)
    }

    monitor(m: { [key: string]: any }): MonitorModel {
        return {
            weight: {value: m.weight, index: 0},
            price: {value: m.price, index: 0},
            pixelWidth: {value: m.pixelWidth, index: 0},
            pixelHeight: {value: m.pixelHeight, index: 0},
            totalPixels: {value: m.pixelHeight * m.pixelWidth, index: 0},
            diagonal: {value: m.diagonal, index: 0},
            manufacturer: {value: m.manufacturer, index: 0},
            model: {value: m.model, index: 0},
            _id: m._id
        }
    }

    objectify(manufacturer: string,
              model: string,
              price: number,
              pixelWidth: number,
              pixelHeight: number,
              diagonal: number,
              weight: number) {
        return {manufacturer, model, price, pixelHeight, pixelWidth, diagonal, weight}
    }

    init(callback: () => void): void {
        const $self = this;
        this.db = new Nedb({filename: './monitors.db'});
        this.db.loadDatabase(function () {
            $self.db.find({}).exec(function (err: any, docs: any[]) {
                if (!docs.length) {
                    $self.db.insert([
                        $self.objectify("Samsung", "C24F396F", 3999, 1920, 1080, 23.5, 2.8),
                        $self.objectify("Dell", "SE2416H", 3699, 1920, 1080, 24, 2.9),
                        $self.objectify("Samsung", "C27F396F", 6299, 1920, 1080, 27, 3.6),
                        $self.objectify("LG", "23MP68VQ-P", 4399, 1920, 1080, 23, 2.7),
                        $self.objectify("Philips", "223V5LSB2", 2499, 1920, 1080, 21.5, 2.35),
                        $self.objectify("Dell", "P2418D", 7749, 2560, 1440, 23.8, 3.44),
                        $self.objectify("Philips", "V-line 193V5LSB2", 1999, 1366, 768, 18.5, 1.94),
                        $self.objectify("Samsung", "U28E590D", 8599, 3840, 2160, 28, 4.71),
                        $self.objectify("LG", "29WK500-P", 7599, 2560, 1080, 29, 4.4)
                    ], callback)
                } else {
                    callback();
                }
            });
        });
    }

    sort(monitors: MonitorModel[]): { [criteria: string]: number[] } {
        const ordering: { [criteria: string]: number[] } = {};
        ordering.weight = this.sortBy(monitors, "weight");
        ordering.price = this.sortBy(monitors, "price");
        ordering.resolutionWidth = this.sortBy(monitors, "pixelWidth");
        ordering.resolutionHeight = this.sortBy(monitors, "pixelHeight");
        ordering.resolutionTotalPixels = this.sortBy(monitors, "totalPixels");
        ordering.diagonal = this.sortBy(monitors, "diagonal");
        ordering.manufacturer = this.sortBy(monitors, "manufacturer");
        ordering.model = this.sortBy(monitors, "model");
        return ordering;
    }

    sortBy(monitors: MonitorModel[], field: string): number[] {
        const mapped = monitors.map((el, i) => {
            return {index: i, value: el[field].value};
        });

        mapped.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0);
        mapped.forEach(({index}, i) => monitors[index][field].index = i);
        return mapped.map(_ => _.index);
    }
}
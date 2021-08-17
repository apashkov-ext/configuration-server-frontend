import { OptionValueType } from './option-value-type.enum';

export class Option {
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    private __value: any;
    get value() {
        return this.__value;
    }

    get type() {
        return this._type;
    }

    constructor(private _id: string, private _name: string, private _description: string, _value: any, private _type: OptionValueType) {
        this.setValue(_value);
    }

    updateName(name: string) {
        this._name = name;
    }

    updateDescription(description: string) {
        this._name = description;
    }

    updateValue(value: any) {
        this.setValue(value);
    }

    private setValue(v: any) {
        if (v === null || v === undefined) {
            this.__value = v;
        } else if (Array.isArray(v)) {
            this.__value = v as ReadonlyArray<any>;
        } else if (typeof v === 'object') {
            this.__value = Object.assign({}, v);
        }
    }
}
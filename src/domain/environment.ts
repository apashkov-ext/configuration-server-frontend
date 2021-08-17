import { OptionGroup } from './option-group';

export class Environment {
    get id() {
        return this._id;
    }

    get projectId() {
        return this._projectId;
    }

    get name() {
        return this._name;
    }

    get optionGroup() {
        return this._optionGroup;
    }

    constructor(private _id: string, private _projectId: string, private _name: string,  private _optionGroup: OptionGroup) { }

    updateOptionGroup(group: OptionGroup) {
        this._optionGroup = group;
    }
}
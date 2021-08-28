import { Option } from './option';

export class OptionGroup {
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    private __options: Option[];
    get options(): ReadonlyArray<Option> {
        return this.__options;
    }

    private __nestedGroups: OptionGroup[];
    get nestedGroups(): ReadonlyArray<OptionGroup> {
        return this.__nestedGroups;
    }

    get root() {
        return this._root;
    }

    constructor(private _id: string, private _name: string, private _description: string,
        _options: ReadonlyArray<Option>, _nestedGroups: ReadonlyArray<OptionGroup>, private _root: boolean) {
            this.__options = Array.from(_options);
            this.__nestedGroups = Array.from(_nestedGroups);
    }

    addOption(option: Option) {
        this.__options.push(option);
    }

    removeOption(option: Option) {
        this.__options = this.__options.filter(f => f.id !== option.id);
    }

    addNestedGroup(group: OptionGroup) {
        this.__nestedGroups.push(group);
    }

    removeNestedGroup(group: OptionGroup) {
        this.__nestedGroups = this.__nestedGroups.filter(f => f.id !== group.id);
    }

    updateName(name: string) {
        this._name = name;
    }

    updateDescription(descr: string) {
        this._description = descr;
    }

    /**
     * Returns JSON-like representation of current object without extra properties. 
     * @returns object
     */
    truncate(): {} {
        const output = {} as any;

        for (let i = 0; i < this.options.length; i++) {
          const o = this.options[i];
          const key = this.toLowerCamelCase(o.name);
          output[key] = o.value;
        }
            
        for (let i = 0; i < this.nestedGroups.length; i++) {
          const g = this.nestedGroups[i];
          const key = this.toLowerCamelCase(g.name);
          output[key] = g.truncate();
        }
    
        return output;
    }

    private toLowerCamelCase(inp: string): string {
        return inp && `${inp[0].toLowerCase()}${inp.substr(1)}` || '';
    }
}
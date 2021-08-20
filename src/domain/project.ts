import { Environment } from './environment';

export class Project {
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    } 

    private __environments: Environment[];
    get environments(): ReadonlyArray<Environment> {
        return this.__environments;
    }

    constructor(private _id: string, private _name: string, private _environments: ReadonlyArray<Environment>) {
        this.__environments = Array.from(_environments);
    }

    addEnvironment(env: Environment) {
        this.__environments.push(env);
    }

    removeEnvironment(env: Environment) {
        this.__environments = this.__environments.filter(f => f.id !== env.id);
    }
}
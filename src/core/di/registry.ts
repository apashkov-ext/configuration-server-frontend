import { Constructor } from './types';

const registry = new Set<Function>();
const instances = new WeakMap<Function, any>();

export function register(constructor: Function) {
    if (!registry.has(constructor)) {
        registry.add(constructor);
    }
}

export function get(constructor: Constructor) {
    if (instances.has(constructor)) {
        return instances.get(constructor);
    }

    if (!registry.has(constructor)) {
        throw new Error(`Type ${constructor.name} is not registered`);
    }

    const instance = new constructor();
    instances.set(constructor, instance);
    return instance;
}

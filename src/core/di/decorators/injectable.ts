import { register } from '../registry'
import { Constructor } from '../types';

export interface InjectableOptions {
    providers?: Constructor[];
}

export function Injectable(options?: InjectableOptions): ClassDecorator {
    return target => register(target);
}

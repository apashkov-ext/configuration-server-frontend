import { get } from '../registry'
import { Constructor } from '../types'

export function Inject(c: Constructor): PropertyDecorator {
    return <T>(target: object, key: string | symbol) => {
      const getter = function () {
        return get(c);
      };
     
      Object.defineProperty(target, key, {
        get: getter,
        enumerable: true,
        configurable: true
      });
    };
}

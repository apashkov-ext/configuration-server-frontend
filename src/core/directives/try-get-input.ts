import { deepFindInput } from './deep-find-input';

export function tryGetInput(el: HTMLElement): HTMLInputElement {
    const inp = deepFindInput(el);
    if (!inp) {
        throw new Error('Invalid directive using. the directive must be applied to INPUT tags or their parents');
    }
    return inp;
}
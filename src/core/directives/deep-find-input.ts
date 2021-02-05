export function deepFindInput(el: HTMLElement): HTMLInputElement | null {
    if (el instanceof HTMLInputElement) {
        return el;
    }

    const children = Array.from(el.children).map(m => m as HTMLElement).filter(f => !!f);

    if (!children.length) {
        return null;
    }

    for (let i = 0; i < children.length; i++) {
        const input = deepFindInput(children[i]);
        if (input) {
            return input;
        }
    }

    return null;
}
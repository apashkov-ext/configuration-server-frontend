import Vue from 'vue';

function hasQuotes(val: string) {
    return val[0] === "'" && val[val.length - 1] === "'";
}

function isNull(val: string) {
    return val === null || val === undefined;
}

function removeQuotes(e: FocusEvent) {
    const el = e.currentTarget as HTMLInputElement;
    const val = el.value;
    if (isNull(val) || !hasQuotes(val)) {
        return;
    }

    if (!val.length) {
        return;
    }

    el.value = val.substring(1, val.length - 1);
}

function addQuotes(e: FocusEvent) {
    const el = e.currentTarget as HTMLInputElement;
    const val = el.value;
    if (isNull(val) || hasQuotes(val)) {
        return;
    }

    el.value = `'${el.value}'`;
}

function filterQuotes(e: KeyboardEvent) {
    if (e.key === "'") {
        e.preventDefault();
    }
}

Vue.directive('quotes', {
    bind(el, binding) {
        if (!(el instanceof HTMLInputElement)) {
            throw new Error('Invalid directive using: quotes');
        }
        el.addEventListener('focusin', removeQuotes);
        el.addEventListener('focusout', addQuotes);
        el.addEventListener('keydown', filterQuotes);
    },
    inserted(el, binding) {
        const elem = el as HTMLInputElement;
        if (!isNull(elem.value) && !hasQuotes(elem.value)) {
            var ev = new Event('input', { bubbles: false })
            elem.value = `'${elem.value}'`;
            el.dispatchEvent(ev);
        }
    },
    unbind(el) {
        el.removeEventListener('focusin', removeQuotes);
        el.removeEventListener('focusout', addQuotes);
        el.removeEventListener('keydown', filterQuotes);
    }
});
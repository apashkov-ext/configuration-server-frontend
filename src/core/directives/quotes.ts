import Vue from 'vue';
import { tryGetInput } from './try-get-input';

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
    const inp = tryGetInput(el);
    inp.addEventListener('focusin', removeQuotes);
    inp.addEventListener('focusout', addQuotes);
    inp.addEventListener('keydown', filterQuotes);
  },
  inserted(el, binding) {
    const inp = tryGetInput(el);
    if (!isNull(inp.value) && !hasQuotes(inp.value)) {
      const ev = new Event('input', { bubbles: false });
      inp.value = `'${inp.value}'`;
      inp.dispatchEvent(ev);
    }
  },
  unbind(el) {
    const inp = tryGetInput(el);
    inp.removeEventListener('focusin', removeQuotes);
    inp.removeEventListener('focusout', addQuotes);
    inp.removeEventListener('keydown', filterQuotes);
  }
});

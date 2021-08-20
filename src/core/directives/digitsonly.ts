import Vue from 'vue';
import { tryGetInput } from './try-get-input';

function filterKey(e: KeyboardEvent) {
  // delete, backpsace, tab, escape, enter.
  const special = [46, 8, 9, 27, 13];

  if (
    special.indexOf(e.keyCode) !== -1 ||
    // Ctrl+A
    (e.keyCode === 65 && e.ctrlKey === true) ||
    // Ctrl+C
    (e.keyCode === 67 && e.ctrlKey === true) ||
    // Ctrl+X
    (e.keyCode === 88 && e.ctrlKey === true) ||
    // home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39)
  ) {
    return;
  }

  if (
    (!e.shiftKey && e.keyCode >= 48 && e.keyCode <= 57) ||
    (e.keyCode >= 96 && e.keyCode <= 105)
  ) {
    return;
  }

  e.preventDefault();
}

Vue.directive('digitsonly', {
  bind(el, binding) {
    const inp = tryGetInput(el);
    inp.addEventListener('keydown', filterKey);
  },
  unbind(el) {
    const inp = tryGetInput(el);
    inp.removeEventListener('keydown', filterKey);
  }
});

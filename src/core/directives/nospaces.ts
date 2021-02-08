import Vue from 'vue';
import { tryGetInput } from './try-get-input';

function filterKey(e: KeyboardEvent) {
  if (e.keyCode === 32) {
    e.preventDefault();
  }
}

Vue.directive('nospaces', {
  bind(el, binding) {
    const inp = tryGetInput(el);
    inp.addEventListener('keydown', filterKey);
  },
  unbind(el) {
    const inp = tryGetInput(el);
    inp.removeEventListener('keydown', filterKey);
  }
});

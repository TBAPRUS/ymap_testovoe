import { CHANGE_WINDOW, RESET_WINDOW } from './types';

export function changeWindow(window) {
  return {
    type: CHANGE_WINDOW,
    window,
  };
}

export function resetWindow() {
  return {
    type: RESET_WINDOW,
  };
}

import { CHANGE_WINDOW, RESET_WINDOW } from './types';

const initState = {
  title: '',
  text: '',
  answers: [],
};

export const window = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_WINDOW:
      return action.window;
    case RESET_WINDOW:
      return initState;
    default:
      return state;
  }
};

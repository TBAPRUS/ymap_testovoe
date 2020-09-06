import { CHANGE_LOAD } from './types';

export const load = (state = false, action) => {
  switch (action.type) {
    case CHANGE_LOAD:
      return !state;
    default:
      return state;
  }
};

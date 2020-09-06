import { CHANGE_USER_ID } from './types';

export const user = (state = { id: undefined }, action) => {
  switch (action.type) {
    case CHANGE_USER_ID:
      return { id: action.id };
    default:
      return state;
  }
};

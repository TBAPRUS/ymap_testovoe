import {
  CHANGE_FORM_TYPE,
  CHANGE_FORM_LOGIN,
  CHANGE_FORM_PASSWORD,
} from './types';

const defaultState = {
  type: 0,
  login: '',
  password: '',
};

export const form = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_FORM_TYPE:
      return { ...state, type: !state.type };
    case CHANGE_FORM_LOGIN:
      return { ...state, login: action.login };
    case CHANGE_FORM_PASSWORD:
      return { ...state, password: action.password };
    default:
      return state;
  }
};

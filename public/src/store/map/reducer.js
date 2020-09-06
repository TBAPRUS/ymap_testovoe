import { SET_MAP, SET_COLLECTION } from './types';

const defaultState = {
  ymap: null,
  collection: null,
  latitude: undefined,
  longitude: undefined,
};

export const map = (state = defaultState, action) => {
  switch (action.type) {
    // case CHANGE_MAP:
    //   return action.map;
    case SET_MAP:
      return { ...state, ymap: action.map };
    case SET_COLLECTION:
      return { ...state, collection: action.collection };
    default:
      return state;
  }
};

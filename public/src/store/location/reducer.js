import {
  CHANGE_LOCATION_NAME,
  CHANGE_LOCATION_LATITUDE,
  CHANGE_LOCATION_LONGITUDE,
} from './types';

const defaultState = { name: '', latitude: 0, longitude: 0 };

export const location = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LOCATION_NAME:
      return { ...state, name: action.name };
    case CHANGE_LOCATION_LATITUDE:
      return { ...state, latitude: action.latitude };
    case CHANGE_LOCATION_LONGITUDE:
      return { ...state, longitude: action.longitude };
    default:
      return state;
  }
};

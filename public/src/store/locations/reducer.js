import {
  CHANGE_LOCATIONS_lIST,
  ADD_LOCATIONS_lIST_LOCATION,
  REFRESH_LOCATIONS_lIST_LOCATION,
  REMOVE_LOCATIONS_lIST_LOCATION,
  REMOVE_LOCATIONS_CURRENT,
  CHANGE_LOCATIONS_CURRENT,
  CHANGE_LOCATIONS_LIST_NAME,
  CHANGE_LOCATIONS_LIST_LATITUDE,
  CHANGE_LOCATIONS_LIST_LONGITUDE,
} from './types';

const defaultStore = {
  list: [],
  current: null,
};

export const locations = (store = defaultStore, action) => {
  switch (action.type) {
    case CHANGE_LOCATIONS_lIST:
      return { ...store, list: action.locations };
    case ADD_LOCATIONS_lIST_LOCATION:
      return { ...store, list: [...store.list, action.location] };
    case REFRESH_LOCATIONS_lIST_LOCATION:
      return {
        ...store,
        list: store.list.map((location) =>
          location._id === action.id ? action.location : location
        ),
      };
    case REMOVE_LOCATIONS_lIST_LOCATION:
      return {
        ...store,
        list: store.list.filter(({ _id }) => _id !== action.id),
      };
    case REMOVE_LOCATIONS_CURRENT:
      return {
        ...store,
        current: null,
      };
    case CHANGE_LOCATIONS_CURRENT:
      return {
        ...store,
        current: action.id,
      };
    case CHANGE_LOCATIONS_LIST_NAME:
      return {
        ...store,
        list: store.list.map((location) =>
          location._id === store.current
            ? { ...location, name: action.name }
            : location
        ),
      };
    case CHANGE_LOCATIONS_LIST_LATITUDE:
      return {
        ...store,
        list: store.list.map((location) =>
          location._id === store.current
            ? { ...location, latitude: action.latitude }
            : location
        ),
      };
    case CHANGE_LOCATIONS_LIST_LONGITUDE:
      return {
        ...store,
        list: store.list.map((location) =>
          location._id === store.current
            ? { ...location, longitude: action.longitude }
            : location
        ),
      };
    default:
      return store;
  }
};

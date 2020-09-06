import { SET_MAP, SET_COLLECTION } from './types';

export const setMap = (map) => ({ type: SET_MAP, map });

export const setCollection = (collection) => ({
  type: SET_COLLECTION,
  collection,
});

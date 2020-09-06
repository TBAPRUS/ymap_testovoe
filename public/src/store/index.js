import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { form } from './form/reducer';
import { map } from './map/reducer';
import { location } from './location/reducer';
import { locations } from './locations/reducer';
import { user } from './user/reducer';
import { load } from './load/reducer';
import { window } from './window/reducer';

const rootReducer = combineReducers({
  form,
  map,
  location,
  locations,
  user,
  load,
  window,
});

export const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));

  return store;
};

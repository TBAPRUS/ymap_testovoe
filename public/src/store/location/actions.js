import fetch from 'cross-fetch';

import {
  CHANGE_LOCATION_NAME,
  CHANGE_LOCATION_LATITUDE,
  CHANGE_LOCATION_LONGITUDE,
} from './types';

import { addLoactionsListLocation } from '../locations/actions';

import { changeLoad } from '../load/actions';
import { changeWindow } from '../window/actions';

export const changeLocationName = (name) => ({
  type: CHANGE_LOCATION_NAME,
  name,
});

export const changeLocationLatitude = (latitude) => ({
  type: CHANGE_LOCATION_LATITUDE,
  latitude,
});

export const changeLocationLongitude = (longitude) => ({
  type: CHANGE_LOCATION_LONGITUDE,
  longitude,
});

export const fetchLocationCreate = (obj) => (dispatch) => {
  dispatch(changeLoad());
  return fetch('/api/v1/location', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        delete result.data.owner;
        dispatch(
          addLoactionsListLocation({
            ...result.data,
            placemark: new ymaps.Placemark(
              [result.data.latitude, result.data.longitude],
              {
                balloonContent: result.data.name,
              },
              {
                preset: 'islands#icon',
                iconColor: '#333333',
              }
            ),
          })
        );
      } else {
        dispatch(changeWindow({ title: 'Ошибка', text: result.error }));
      }
      dispatch(changeLoad());
    });
};

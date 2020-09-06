import fetch from 'cross-fetch';

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

import { changeLoad } from '../load/actions';
import { changeWindow } from '../window/actions';

export const changeLoactionsList = (locations) => ({
  type: CHANGE_LOCATIONS_lIST,
  locations,
});

export const addLoactionsListLocation = (location) => ({
  type: ADD_LOCATIONS_lIST_LOCATION,
  location,
});

export const refreshLocationsListLocation = (id, location) => ({
  type: REFRESH_LOCATIONS_lIST_LOCATION,
  id,
  location,
});

export const removeLoactionsListLocation = (id) => ({
  type: REMOVE_LOCATIONS_lIST_LOCATION,
  id,
});

export const removeLocationsCurrent = () => ({
  type: REMOVE_LOCATIONS_CURRENT,
});

export const changeLoactionsCurrent = (id) => ({
  type: CHANGE_LOCATIONS_CURRENT,
  id,
});

export const changeLocationsListName = (name) => ({
  type: CHANGE_LOCATIONS_LIST_NAME,
  name,
});

export const changeLocationsListLatitude = (latitude) => ({
  type: CHANGE_LOCATIONS_LIST_LATITUDE,
  latitude,
});

export const changeLocationsListLongitude = (longitude) => ({
  type: CHANGE_LOCATIONS_LIST_LONGITUDE,
  longitude,
});

export const fetchLocationsList = () => (dispatch) => {
  dispatch(changeLoad());
  return fetch('/api/v1/location')
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        dispatch(
          changeLoactionsList(
            result.data.map((location) => {
              return {
                ...location,
                placemark: new ymaps.Placemark(
                  [location.latitude, location.longitude],
                  {
                    balloonContent: location.name,
                  },
                  {
                    preset: 'islands#icon',
                    iconColor: '#333333',
                  }
                ),
              };
            })
          )
        );
      } else {
        dispatch(
          changeWindow({
            title: 'Ошибка',
            text: 'Ошибка сервера, попробуйте перезагрузить страницу',
          })
        );
      }
      dispatch(changeLoad());
    });
};

export const fetchRemoveLoactionsListLocation = (id) => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/location/${id}`, { method: 'DELETE' })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        dispatch(removeLoactionsListLocation(id));
      } else {
        dispatch(
          changeWindow({
            title: 'Ошибка',
            text: 'Ошибка сервера, попробуйте перезагрузить страницу',
          })
        );
      }
      dispatch(changeLoad());
    });
};

export const fetchLocationsChangeCurrent = (id, obj) => (dispatch) => {
  dispatch(changeLoad());
  return fetch(`/api/v1/location/${id}`, {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        obj = {
          ...obj,
          _id: id,
          placemark: new ymaps.Placemark(
            [obj.latitude, obj.longitude],
            {
              balloonContent: obj.name,
            },
            {
              preset: 'islands#icon',
              iconColor: '#333333',
            }
          ),
        };

        dispatch(refreshLocationsListLocation(id, obj));
        dispatch(removeLocationsCurrent());
      } else {
        dispatch(
          changeWindow({
            title: 'Ошибка',
            text:
              result.error ||
              'Ошибка сервера, попробуйте перезагрузить страницу',
          })
        );
      }
      dispatch(changeLoad());
    });
};

import fetch from 'cross-fetch';

import {
  CHANGE_FORM_TYPE,
  CHANGE_FORM_LOGIN,
  CHANGE_FORM_PASSWORD,
} from './types';

import { fetchUserId } from '../user/actions';

import { changeLoad } from '../load/actions';
import { changeWindow } from '../window/actions';

export const changeFormType = () => ({
  type: CHANGE_FORM_TYPE,
});

export const changeFormLogin = (login) => ({
  type: CHANGE_FORM_LOGIN,
  login,
});

export const changeFormPassword = (password) => ({
  type: CHANGE_FORM_PASSWORD,
  password,
});

export const fetchFormLogin = (obj) => (dispatch) => {
  dispatch(changeLoad());
  return fetch('/api/v1/user/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        dispatch(fetchUserId());
      } else {
        dispatch(changeWindow({ title: 'Ошибка', text: 'Неверные данные' }));
      }
      dispatch(changeLoad());
    });
};

export const fetchFormRegister = (obj) => (dispatch) => {
  dispatch(changeLoad());
  return fetch('/api/v1/user/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        dispatch(fetchUserId());
      } else {
        dispatch(
          changeWindow({
            title: 'Ошибка',
            text: 'Неверные данные/Пользователь с таким логином уже существует',
          })
        );
      }
      dispatch(changeLoad());
    });
};

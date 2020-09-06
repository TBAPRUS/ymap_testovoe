import fetch from 'cross-fetch';

import { CHANGE_USER_ID } from './types';

import { changeLoad } from '../load/actions';

export const changeUserId = (id) => ({
  type: CHANGE_USER_ID,
  id,
});

export const fetchUserId = () => (dispatch) => {
  dispatch(changeLoad());
  return fetch('/api/v1/user/me')
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        dispatch(changeUserId(result.data._id));
      } else {
        dispatch(changeUserId(null));
      }
      dispatch(changeLoad());
    });
};

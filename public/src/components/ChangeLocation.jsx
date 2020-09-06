import React from 'react';
import { connect } from 'react-redux';

import {
  changeLocationsListName,
  changeLocationsListLatitude,
  changeLocationsListLongitude,
  fetchLocationsChangeCurrent,
} from '../store/locations/actions';

const ChangeLocationComponent = ({
  _id,
  name,
  latitude,
  longitude,
  changeLocationsListName,
  changeLocationsListLatitude,
  changeLocationsListLongitude,
  fetchLocationsChangeCurrent,
}) => {
  return (
    <div id="change">
      <div id="form">
        <h2>Название:</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => changeLocationsListName(e.target.value)}
        />
        <h2>Широта:</h2>
        <input
          type="text"
          value={latitude}
          onChange={(e) =>
            /^[0-9]*\.?[0-9]*$/.test(e.target.value)
              ? changeLocationsListLatitude(e.target.value)
              : null
          }
        />
        <h2>Долгота:</h2>
        <input
          type="text"
          value={longitude}
          onChange={(e) =>
            /^[0-9]*\.?[0-9]*$/.test(e.target.value)
              ? changeLocationsListLongitude(e.target.value)
              : null
          }
        />
      </div>

      <button
        onClick={() =>
          fetchLocationsChangeCurrent(_id, { name, latitude, longitude })
        }
      >
        Редактировать
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { _id, name, latitude, longitude } = state.locations.list.filter(
    ({ _id }) => _id === state.locations.current
  )[0];
  return { _id, name, latitude, longitude };
};

export const ChangeLocation = connect(mapStateToProps, {
  changeLocationsListName,
  changeLocationsListLatitude,
  changeLocationsListLongitude,
  fetchLocationsChangeCurrent,
})(ChangeLocationComponent);

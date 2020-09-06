import React from 'react';
import { connect } from 'react-redux';

import {
  changeLocationName,
  changeLocationLatitude,
  changeLocationLongitude,
  fetchLocationCreate,
} from '../store/location/actions';

const CreateLocationComponent = ({
  name,
  latitude,
  longitude,
  changeLocationName,
  changeLocationLatitude,
  changeLocationLongitude,
  fetchLocationCreate,
}) => {
  return (
    <div id="create">
      <div id="form">
        <h2>Название:</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => changeLocationName(e.target.value)}
        />

        <h2>Широта:</h2>
        <input
          type="text"
          value={latitude}
          onChange={(e) =>
            /^[0-9]*\.?[0-9]*$/.test(e.target.value)
              ? changeLocationLatitude(e.target.value)
              : null
          }
        />

        <h2>Долгота:</h2>
        <input
          type="text"
          value={longitude}
          onChange={(e) =>
            /^[0-9]*\.?[0-9]*$/.test(e.target.value)
              ? changeLocationLongitude(e.target.value)
              : null
          }
        />
      </div>
      <button
        onClick={() => fetchLocationCreate({ name, latitude, longitude })}
      >
        Добавить
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { name, latitude, longitude } = state.location;
  return { name, latitude, longitude };
};

export const CreateLocation = connect(mapStateToProps, {
  changeLocationName,
  changeLocationLatitude,
  changeLocationLongitude,
  fetchLocationCreate,
})(CreateLocationComponent);

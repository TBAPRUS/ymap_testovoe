import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { ChangeLocation } from './ChangeLocation';
import { CreateLocation } from './CreateLocation';

import { changeWindow } from '../store/window/actions';

import {
  changeLoactionsCurrent,
  fetchRemoveLoactionsListLocation,
  fetchLocationsList,
} from '../store/locations/actions';

const ListLocationComponent = ({
  ymap,
  list,
  current,
  fetchLocationsList,
  changeLoactionsCurrent,
  changeWindow,

  fetchRemoveLoactionsListLocation,
}) => {
  useEffect(() => {
    fetchLocationsList();
  }, []);

  const jsxList = list.map(({ name, longitude, latitude, _id }) => (
    <div key={_id} className="location">
      <div
        className="info"
        onClick={() => ymap.setCenter([latitude, longitude])}
      >
        <h3>{name}</h3>
        <p>Широта: {latitude}</p>
        <p>Долгота: {longitude}</p>
      </div>

      <div className="methods">
        <button
          onClick={() =>
            changeWindow({
              title: 'Удалить маркер',
              text: 'Вы уверены?',
              answers: [
                {
                  text: 'Да',
                  method: () => fetchRemoveLoactionsListLocation(_id),
                },
              ],
            })
          }
        >
          Удалить
        </button>
        <button onClick={() => changeLoactionsCurrent(_id)}>
          Редактировать
        </button>
      </div>
    </div>
  ));

  return (
    <div id="location-action">
      {current !== null && <ChangeLocation />}
      {current === null && <CreateLocation />}
      <div id="list">{jsxList}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { ymap } = state.map;
  const { list, current } = state.locations;
  return { ymap, list, current };
};

export const ListLocation = connect(mapStateToProps, {
  fetchLocationsList,
  changeLoactionsCurrent,
  changeWindow,

  fetchRemoveLoactionsListLocation,
})(ListLocationComponent);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { setMap, setCollection } from '../store/map/actions';

const MapComponent = ({ list, collection, setCollection, setMap }) => {
  if (list.length && collection !== null) {
    collection.removeAll();
    list.forEach(({ placemark }) => collection.add(placemark));
  }

  useEffect(() => {
    const success = ({ coords }) => {
      let { latitude, longitude } = coords;
      const newMap = new ymaps.Map('map', {
        center: [latitude, longitude],
        zoom: 15,
      });
      const newCollection = new ymaps.GeoObjectCollection();
      list.forEach(({ placemark }) => newCollection.add(placemark));
      newMap.geoObjects.add(newCollection);
      setMap(newMap);
      setCollection(newCollection);
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return <div id="map"></div>;
};

const mapStateToProps = (state) => {
  const { list } = state.locations;
  const { collection } = state.map;
  return { list, collection };
};

export const Map = connect(mapStateToProps, { setMap, setCollection })(
  MapComponent
);

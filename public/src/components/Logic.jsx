import React from 'react';
import { connect } from 'react-redux';

import { ListLocation } from './ListLocation';
import { Map } from './Map';

const LogicComponent = () => {
  return (
    <div id="logic">
      <ListLocation />
      <Map />
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export const Logic = connect(mapStateToProps)(LogicComponent);

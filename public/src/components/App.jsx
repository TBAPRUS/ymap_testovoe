import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchUserId } from '../store/user/actions';

import { Logic } from './Logic';
import { Description } from './Description';
import { Load } from './Load';
import { Window } from './Window';

const AppComponent = ({ id, load, window, fetchUserId }) => {
  useEffect(() => {
    fetchUserId();
  }, []);

  if (load && id === undefined) {
    return <Load />;
  }

  return (
    <div id="container">
      {window.title && <Window />}
      {load && <Load />}
      {id === null || id === undefined ? <Description /> : <Logic />}
    </div>
  );
};

const mapStateToProps = (state) => {
  const load = state.load;
  const window = state.window;
  const id = state.user.id;
  return { load, window, id };
};

export const App = connect(mapStateToProps, { fetchUserId })(AppComponent);

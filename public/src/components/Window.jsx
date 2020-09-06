import React from 'react';
import { connect } from 'react-redux';

import { resetWindow } from '../store/window/actions';

const WindowComponent = ({ window, resetWindow }) => (
  <div id="window">
    <div id="window-in">
      <h2>{window.title}</h2>
      <p>{window.text}</p>
      <div id="answers">
        <button key={-1} onClick={() => resetWindow()}>
          Закрыть
        </button>
        {window.answers &&
          window.answers.map(({ text, method }, index) => (
            <button
              key={index}
              onClick={() => {
                method();
                resetWindow();
              }}
            >
              {text}
            </button>
          ))}
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  const window = state.window;
  return { window };
};

export const Window = connect(mapStateToProps, { resetWindow })(
  WindowComponent
);

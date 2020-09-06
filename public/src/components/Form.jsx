import React from 'react';
import { connect } from 'react-redux';

import {
  changeFormType,
  changeFormLogin,
  changeFormPassword,
  fetchFormLogin,
  fetchFormRegister,
} from '../store/form/actions';

const FormController = ({
  type,
  login,
  password,
  changeFormType,
  changeFormLogin,
  changeFormPassword,
  fetchFormLogin,
  fetchFormRegister,
}) => {
  return (
    <div className="form" id={type ? 'login' : 'register'}>
      <h2>{type ? 'Войти' : 'Зарегистрироваться'}</h2>
      <button onClick={changeFormType}>
        {type ? 'Создать аккаунт' : 'У меня уже есть аккаунт'}
      </button>
      <input
        type="text"
        id="login"
        value={login}
        onChange={(e) => changeFormLogin(e.target.value.slice(0, 24))}
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => changeFormPassword(e.target.value.slice(0, 24))}
      />
      <button
        onClick={() =>
          type
            ? fetchFormLogin({ login, password })
            : fetchFormRegister({ login, password })
        }
      >
        Готово
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { type, login, password } = state.form;
  return { type, login, password };
};

export const Form = connect(mapStateToProps, {
  changeFormType,
  changeFormLogin,
  changeFormPassword,
  fetchFormLogin,
  fetchFormRegister,
})(FormController);

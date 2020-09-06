import React, { Fragment } from 'react';

import { Form } from './Form';

export const Description = () => (
  <div id="description">
    <div id="desc-info">
      <h1>Маркер</h1>
      <h2>Сайт для работы с маркерами:D</h2>
      <p>
        На данном сайте вы можете создавать маркеры, подписывать их и находить
        их на карте всего лишь выбрав нужный из списка
      </p>
    </div>
    <Form />
  </div>
);

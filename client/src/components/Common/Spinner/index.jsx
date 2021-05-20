import React from 'react';

import './style.sass';

const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Загрузка...</span>
    </div>
  </div>
);

export default Spinner;

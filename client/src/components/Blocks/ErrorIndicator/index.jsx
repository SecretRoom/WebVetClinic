import React from 'react';
import PropTypes from 'prop-types'
import './style.css';

const Error = ({ message }) => (
  <div id="notfound">
    <div className="box">
      <div className="head">
        <div className="head-copy" />

        <div className="ear-left">
          <div className="inner-ear" />
        </div>

        <div className="ear-right">
          <div className="inner-ear" />
        </div>

        <div className="eye-left">
          <div className="pupil" />
        </div>

        <div className="eye-right">
          <div className="pupil" />
        </div>

        <div className="nose" />

        <div className="hair-left" />
        <div className="hair-right" />
      </div>
    </div>
    <div className="message">Что то пошло не так</div>
    <div className="message">{message}</div>
  </div>
);

Error.defaultProps = {
  message: '',
}

Error.propTypes = {
  message: PropTypes.string,
}

export default Error;

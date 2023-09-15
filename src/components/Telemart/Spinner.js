import React from 'react';
import { CircleLoader } from 'react-spinners';

const Spinner = ({ status }) => {
  return (
    <div>
      {status && (
        <div className="loader-wrapper">
          <h1 className="spinner-text">Loading</h1>
          <CircleLoader color="#ffffff"></CircleLoader>
        </div>
      )}
    </div>
  );
};

export default Spinner;

import React from 'react';
import Illustration from '../../assets/images/illustrations/under_construction.svg';
export default function Alert() {
  return (
    <div className="error-page-wrap">
      <img src={Illustration} alt="illustration" width={400} />
      <h3>Page Not Found</h3>
    </div>
  );
}

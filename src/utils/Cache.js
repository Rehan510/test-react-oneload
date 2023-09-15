import React, { memo } from 'react';

import TelemartCache from './TelemartCache'
import TermLoan from './TermlaonCache'

const Cache = () => {
  let comp = null

  if (window.location.pathname.includes("termloan")) {

    console.log("termloan")
    comp = <TermLoan />
  }
  if (window.location.pathname.includes("telemart")) {
    comp = <TelemartCache />
    console.log("telemart")
  }

  console.log(window.location.pathname)

  return comp
};

export default memo(Cache);

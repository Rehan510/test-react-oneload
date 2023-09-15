import React from 'react';

// import { useDispatch } from "react-redux";
//getting  actions of oneLoadSlice slice
// import { increment, setNewAppName } from "../../reducers/oneLoadSlice";
// import { test } from "../../reducers/oneZappSlice";
// import config from "../../config/config";
const OneLoad = () => {
  // const dispatch = useDispatch();
  //you can get all states of a specific reducer by giving reducer name by this way
  //   const { appName } = useSelector((state) => state.oneLoadSlice);
  //   const { example2 } = useSelector((state) => state.oneZappSlice);

  //By this you can dispatch any action
  // const handleCounter = () => {
  //   dispatch(increment(2));
  //   dispatch(setNewAppName());
  //   dispatch(test());
  // };
  return (
    <div>
      <h1>One Load</h1>
    </div>
  );
};

export default OneLoad;

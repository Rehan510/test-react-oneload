//do api calls here if required

export const exampleOne = () => {
  return async (dispatch, getState) => {
    const { value } = getState().oneLoadSlice;
    dispatch(something([]));
  };
};

export const exampleTwo = () => {
  let rawData = [];
  return async (dispatch) => {
    try {
    } catch (e) {
      rawData = [];
    }
    //return something
    return rawData;
  };
};

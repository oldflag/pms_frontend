import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/box';

export const register = async (box, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/register', body: box },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_BOX', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new box has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_BOX' });

  }

  dispatch({ type: 'END_LOADING' });
};

export const registerMany = async (boxs, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/registerMany', body: boxs },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_BOXS', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new box has been created successfully',
      },
    });
    // dispatch({ type: 'CLOSE_BOX' });

  }

  dispatch({ type: 'END_LOADING' });
};



export const getBoxs = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  console.log("loading box data")

  const result = await fetchData({ url, method: 'GET' }, dispatch);

  console.log(result)
  
  if (result) {
    dispatch({ type: 'UPDATE_BOXS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, boxId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${boxId}`,
      method: 'PATCH',
      body: updatedFields,
    },
    dispatch
  );

};

export const deleteOne = async (id, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: `${url}/${id}`, method: 'DELETE' },
    dispatch
  );

  if (result) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'The box has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_BOX', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};
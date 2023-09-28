import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/productItem';

export const register = async (productItem, dispatch) => {
  dispatch({ type: 'START_LOADING' });
  const result = await fetchData(
    { url: url + '/register', body: productItem },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_PRODUCTITEM', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new productItem has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_PRODUCTITEM' });

  }

  dispatch({ type: 'END_LOADING' });
};

export const registerMany = async (productItems, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/registerMany', body: productItems },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_PRODUCTITEMS', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new productItem has been created successfully',
      },
    });
    // dispatch({ type: 'CLOSE_PRODUCTITEM' });

  }

  dispatch({ type: 'END_LOADING' });
};



export const getProductItems = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_PRODUCTITEMS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, productItemId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${productItemId}`,
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
        message: 'The productItem has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_PRODUCTITEM', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};
import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/order';

export const register = async (order, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/register', body: order },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_ORDER', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new order has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_ORDER' });

  }

  dispatch({ type: 'END_LOADING' });
};

export const registerMany = async (orders, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/registerMany', body: orders },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_ORDERS', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new order has been created successfully',
      },
    });
    // dispatch({ type: 'CLOSE_ORDER' });

  }

  dispatch({ type: 'END_LOADING' });
};



export const getOrders = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_ORDERS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, orderId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${orderId}`,
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
        message: 'The order has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_ORDER', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};
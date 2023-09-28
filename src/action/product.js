import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/product';

export const register = async (product, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/register', body: product },
    dispatch
  );

  if (result) {
    dispatch({ type: 'UPDATE_PRODUCT', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new product has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_PRODUCT' });

  }

  dispatch({ type: 'END_LOADING' });
};

export const registerMany = async (products, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/registerMany', body: products },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_PRODUCTS', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new product has been created successfully',
      },
    });
    // dispatch({ type: 'CLOSE_PRODUCT' });

  }

  dispatch({ type: 'END_LOADING' });
};



export const getProducts = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_PRODUCTS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, productId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${productId}`,
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
        message: 'The product has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_PRODUCT', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};
import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/productCategory';

export const register = async (productCategory, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/register', body: productCategory },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_PRODUCTCATEGORY', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new productCategory has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_PRODUCTCATEGORY' });

  }

  dispatch({ type: 'END_LOADING' });
};

export const registerMany = async (productCategorys, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/registerMany', body: productCategorys },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_PRODUCTCATEGORYS', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new productCategory has been created successfully',
      },
    });
    // dispatch({ type: 'CLOSE_PRODUCTCATEGORY' });

  }

  dispatch({ type: 'END_LOADING' });
};



export const getProductCategorys = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_PRODUCTCATEGORYS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, productCategoryId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${productCategoryId}`,
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
        message: 'The productCategory has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_PRODUCTCATEGORY', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};
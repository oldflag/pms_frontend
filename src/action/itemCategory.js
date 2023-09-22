import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/itemCategory';

export const register = async (itemCategory, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  console.log(itemCategory)

  const result = await fetchData(
    { url: url + '/register', body: itemCategory },
    dispatch
  );

  console.log(result)

  if (result) {
    dispatch({ type: 'UPDATE_ITEMCATEGORY', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new itemCategory has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_ITEMCATEGORY' });

  }

  dispatch({ type: 'END_LOADING' });
};

export const registerMany = async (itemCategorys, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/registerMany', body: itemCategorys },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_ITEMCATEGORYS', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new itemCategory has been created successfully',
      },
    });
    // dispatch({ type: 'CLOSE_ITEMCATEGORY' });

  }

  dispatch({ type: 'END_LOADING' });
};



export const getItemCategorys = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_ITEMCATEGORYS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, itemCategoryId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${itemCategoryId}`,
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
        message: 'The itemCategory has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_ITEMCATEGORY', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};
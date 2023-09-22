import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/client';

export const register = async (client, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/register', body: client },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_CLIENT', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new client has been created successfully',
      },
    });
    dispatch({ type: 'CLOSE_CLIENT' });

  }

  dispatch({ type: 'END_LOADING' });
};

export const registerMany = async (clients, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/registerMany', body: clients },
    dispatch
  );


  if (result) {
    dispatch({ type: 'UPDATE_CLIENTS', payload: result });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'A new client has been created successfully',
      },
    });
    // dispatch({ type: 'CLOSE_CLIENT' });

  }

  dispatch({ type: 'END_LOADING' });
};



export const getClients = async (dispatch) => {

  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url, method: 'GET' }, dispatch);
  
  if (result) {
    dispatch({ type: 'UPDATE_CLIENTS', payload: result });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateStatus = (updatedFields, clientId, dispatch) => {


  return fetchData(
    {
      url: `${url}/updateStatus/${clientId}`,
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
        message: 'The client has been deleted successfully',
      },
    });

    dispatch({ type: 'DELETE_CLIENT', payload: result.id });
  
  }

  dispatch({ type: 'END_LOADING' });
};
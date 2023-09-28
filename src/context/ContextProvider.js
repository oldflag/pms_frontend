import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  currentUser: null,
  openLogin: false,
  openRegister: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  users: [],
  clients: [],
  openClient: false,
  productCategorys: [],
  openProductCategory: false,
  itemCategorys: [],
  openItemCategory: false,
  productItems: [],
  openProductItem: false,
  products: [],
  openProduct: false,
  boxs: [],
  openBox: false,
  tapeStations: [],
  openTapeStation: false,
  selectedTapeStations: [],
  

};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;

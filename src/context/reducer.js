const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };
    case 'OPEN_REGISTER':
      return { ...state, openRegister: true };
    case 'CLOSE_REGISTER':
      return { ...state, openRegister: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'ADD_USER':
      return { ...state, users: [action.payload, ...state.users] };
    
    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'UPDATE_USERS':
      return { ...state, users: action.payload };

    case 'UPDATE_CLIENT':
      return { ...state, clients: [action.payload, ...state.clients] };
    
    case 'UPDATE_CLIENTS':
      return { ...state, clients: action.payload};
    
    case 'DELETE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter((aClient) => aClient.id !== action.payload),
      };
    
    case 'OPEN_CLIENT':
      return { ...state, openClient: true };

    case 'CLOSE_CLIENT':
      return { ...state, openClient: false };

    case 'UPDATE_PRODUCTCATEGORY':
      return { ...state, productCategorys: [action.payload, ...state.productCategorys] };
    
    case 'UPDATE_PRODUCTCATEGORYS':
      return { ...state, productCategorys: action.payload};
    
    case 'DELETE_PRODUCTCATEGORY':
      return {
        ...state,
        productCategorys: state.productCategorys.filter((aCategory) => aCategory.id !== action.payload),
      };
    
    case 'OPEN_PRODUCTCATEGORY':
      return { ...state, openProductCategory: true };

    case 'CLOSE_PRODUCTCATEGORY':
      return { ...state, openProductCategory: false };

    case 'UPDATE_ITEMCATEGORY':
      return { ...state, itemCategorys: [action.payload, ...state.itemCategorys] };
    
    case 'UPDATE_ITEMCATEGORYS':
      return { ...state, itemCategorys: action.payload};
    
    case 'DELETE_ITEMCATEGORY':
      return {
        ...state,
        itemCategorys: state.itemCategorys.filter((aItem) => aItem.id !== action.payload),
      };
    
    case 'OPEN_ITEMCATEGORY':
      return { ...state, openItemCategory: true };

    case 'CLOSE_ITEMCATEGORY':
      return { ...state, openItemCategory: false };
    
    case 'UPDATE_PRODUCTITEM':
      return { ...state, productItems: [action.payload, ...state.productItems] };
    
    case 'UPDATE_PRODUCTITEMS':
      return { ...state, productItems: action.payload};
    
    case 'DELETE_PRODUCTITEM':
      return {
        ...state,
        productItems: state.productItems.filter((aItem) => aItem.id !== action.payload),
      };
    
    case 'OPEN_PRODUCTITEM':
      return { ...state, openProductItem: true };

    case 'CLOSE_PRODUCTITEM':
      return { ...state, openProductItem: false };

    case 'UPDATE_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] };
    
    case 'UPDATE_PRODUCTS':
      return { ...state, products: action.payload};
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((aItem) => aItem.id !== action.payload),
      };
    
    case 'OPEN_PRODUCT':
      return { ...state, openProduct: true };

    case 'CLOSE_PRODUCT':
      return { ...state, openProduct: false };

    case 'UPDATE_BOX':
      return { ...state, boxs: [action.payload, ...state.boxs] };
    
    case 'UPDATE_BOXS':
      return { ...state, boxs: action.payload};
    
    case 'DELETE_BOX':
      return {
        ...state,
        boxs: state.boxs.filter((aItem) => aItem.id !== action.payload),
      };
    
    case 'OPEN_BOX':
      return { ...state, openBox: true };

    case 'CLOSE_BOX':
      return { ...state, openBox: false };
    

    case 'UPDATE_TAPESTATION':
      return { ...state, tapeStations: [action.payload, ...state.tapeStations] };
    
    case 'UPDATE_TAPESTATIONS':
      return { ...state, tapeStations: action.payload};
    
    case 'DELETE_TAPESTATION':
      return {
        ...state,
        tapeStations: state.tapeStations.filter((aItem) => aItem.id !== action.payload),
      };
    case 'OPEN_TAPESTATION':
      return { ...state, openTapeStation: true };
    case 'CLOSE_TAPESTATION':
      return { ...state, openTapeStation: false };
    case 'UPDATE_TAPESTATIONSELECT':
      return { ...state, selectedTapeStations: action.payload};


    default:
      throw new Error('No matched action!');
  }
};

export default reducer;
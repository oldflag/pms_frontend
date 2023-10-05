import { Close, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
} from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import { register } from '../../action/order';
import { useValue } from '../../context/ContextProvider';
import {getProductCategorys} from '../../action/productCategory';
import { getClients } from '../../action/client';

const AddForm = () => {
  const {
    state: { openOrder, productCategorys, clients },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (productCategorys.length === 0) getProductCategorys(dispatch);
    if (clients.length === 0) getClients(dispatch);
  },[]);

  const productCategoryOptions = productCategorys.map(({ name, id }) => ({ label:name, id:id }));
  const [productCategoryValue, setProductCategoryValue] = useState(productCategoryOptions[0]);

  const clientOptions = clients.map(({ name, id }) => ({ label:name, id:id }));
  const [clientValue, setClientValue] = useState(clientOptions[0]);

  const orderNumRef = useRef();
  const quantityRef = useRef();
  const priceRef = useRef();
  const statusRef = useRef();
  const noteRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_ORDER' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderNum = orderNumRef.current.value;
    const quantity = quantityRef.current.value;
    const price = priceRef.current.value;
    const status = statusRef.current.value;
    const note = noteRef.current.value;

    await register({"orderNum":orderNum,
                    "productCategoryId": productCategoryValue.id, 
                    "clientId": clientValue.id, 
                    "quantity":quantity, 
                    "price":price, 
                    "note":note, 
                    "status":status}, 
                  dispatch)

  };

  return (
    <Dialog open={openOrder} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register New Order"
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill a new order's information in the fields below:
          </DialogContentText>
          
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="orderNum"
              label="Order #"
              type="text"
              fullWidth
              inputRef={orderNumRef}
              inputProps={{ minLength: 4 }}
              required
            />

            <Autocomplete
              sx={{mt:1, mr:2}}
              disablePortal
              id="product_"
              options={productCategoryOptions}
              value={productCategoryValue}
              onChange={(e, newValue) => {
                setProductCategoryValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Kit Type" required/>}
            />

            <Autocomplete
              sx={{mt:1, mr:2}}
              disablePortal
              id="client_"
              options={clientOptions}
              value={clientValue}
              onChange={(e, newValue) => {
                setClientValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Client" required/>}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="quantity"
              label="Quantity"
              type="text"
              fullWidth
              inputRef={quantityRef}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="price"
              label="Price"
              type="text"
              fullWidth
              inputRef={priceRef}
            />
            <TextField
              margin="normal"
              variant="standard"
              id="status"
              label="Status"
              type="text"
              fullWidth
              inputRef={statusRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="note"
              label="Note"
              type="text"
              fullWidth
              inputRef={noteRef}
            />

        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddForm;
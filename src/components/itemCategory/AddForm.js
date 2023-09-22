import { Close, Send } from '@mui/icons-material';
import { Autocomplete} from '@mui/material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { register } from '../../action/itemCategory';
import { useValue } from '../../context/ContextProvider';
import {getProductCategorys} from '../../action/productCategory';

const AddForm = () => {
  const {
    state: { openItemCategory, productCategorys },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (productCategorys.length === 0) getProductCategorys(dispatch);
  },[]);

  const productCategoryOptions = productCategorys.map(({ name, id }) => ({ label:name, id:id }));

  const [productCategoryValue, setProductCategoryValue] = useState(productCategoryOptions[0]);
  const nameRef = useRef();
  const partRef = useRef();
  const protocolRef = useRef();
  const subprotocolRef = useRef();
  const boxNumRef = useRef();
  const orderingNumRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_ITEMCATEGORY' });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const name = nameRef.current.value;
    const part = partRef.current.value;
    const protocol = protocolRef.current.value;
    const subprotocol = subprotocolRef.current.value;
    const boxNum = boxNumRef.current.value;
    const orderingNum = orderingNumRef.current.value;


    await register({"name":name, 
                    "part":part,
                    "productCategoryId": productCategoryValue.id,
                    "protocol":protocol,
                    "subprotocol":subprotocol,
                    "boxNum":boxNum,
                    "orderingNum":orderingNum,
                   }, 
                  dispatch)

  };

  return (
    <Dialog open={openItemCategory} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register a New Item Category"
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
            Please fill a new item category's information in the fields below:
          </DialogContentText>
          
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />

             <TextField
              margin="normal"
              variant="standard"
              id="part"
              label="Part #"
              type="text"
              fullWidth
              inputRef={partRef}
              inputProps={{ minLength: 2 }}
              required
            />

            <Autocomplete
              disablePortal
              id="product_"
              options={productCategoryOptions}
              value={productCategoryValue}
              onChange={(e, newValue) => {
                setProductCategoryValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Product Category" variant="standard" required />}
              
            />

             <TextField
              margin="normal"
              variant="standard"
              id="protocol"
              label="Protocol"
              type="text"
              fullWidth
              inputRef={protocolRef}
              required
            />
             <TextField
              margin="normal"
              variant="standard"
              id="subprotocol"
              label="Subprotocol"
              type="text"
              fullWidth
              inputRef={subprotocolRef}
              required
            />
             <TextField
              margin="normal"
              variant="standard"
              id="boxNum"
              label="Box #"
              type="text"
              fullWidth
              inputRef={boxNumRef}
              required
            />
             <TextField
              margin="normal"
              variant="standard"
              id="orderingNum"
              label="Item #"
              type="text"
              fullWidth
              inputRef={orderingNumRef}
              required
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
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
import { useRef} from 'react';
import { register } from '../../action/productItem';
import { useValue } from '../../context/ContextProvider';

const AddForm = () => {
  const {
    state: { openProductItem },
    dispatch,
  } = useValue();

  const nameRef = useRef();
  const partRef = useRef();
  const lotRef = useRef();
  const storeRef = useRef();
  const expireRef = useRef();
  const descriptionRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_PRODUCTITEM' });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const name = nameRef.current.value;
    const part = partRef.current.value;
    const lot = lotRef.current.value;
    const store = storeRef.current.value;
    const expiration_date = expireRef.current.value;
    const description = descriptionRef.current.value;
    



    await register({"name":name, 
                    "part":part,
                    "lot":lot,
                    "store":store,
                    "expiration_date":expiration_date,
                    "description": description,
                   }, 
                  dispatch)

  };

  return (
    <Dialog open={openProductItem} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register a New Product Item"
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
            Please fill a new product item's information in the fields below:
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


             <TextField
              margin="normal"
              variant="standard"
              id="lot"
              label="Lot #"
              type="text"
              fullWidth
              inputRef={lotRef}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="Expiration"
              label="Exp Date"
              type="text"
              fullWidthTAG_Enzyme
              inputRef={expireRef}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="store"
              label="Store Temp"
              type="text"
              fullWidth
              inputRef={storeRef}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="description"
              label="Description"
              type="text"
              fullWidth
              inputRef={descriptionRef}
              
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
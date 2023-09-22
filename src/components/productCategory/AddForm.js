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
} from '@mui/material';
import { useRef } from 'react';
import { register } from '../../action/productCategory';
import { useValue } from '../../context/ContextProvider';

const AddForm = () => {
  const {
    state: { openProductCategory },
    dispatch,
  } = useValue();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const typeRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_PRODUCTCATEGORY' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const type = typeRef.current.value;

    await register({"name":name, 
                    "description":description, 
                    "type":type
                   }, 
                  dispatch)

  };

  return (
    <Dialog open={openProductCategory} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register a New Product Category"
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
            Please fill a new product category's information in the fields below:
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
              id="description"
              label="Description"
              type="text"
              fullWidth
              inputRef={descriptionRef}
              inputProps={{ minLength: 2 }}
              required
            />

             <TextField
              margin="normal"
              variant="standard"
              id="type"
              label="Type"
              type="text"
              fullWidth
              inputRef={typeRef}
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
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
import { register } from '../../action/reagent';
import { useValue } from '../../context/ContextProvider';

const AddForm = () => {
  const {
    state: { openReagent },
    dispatch,
  } = useValue();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const vendorRef = useRef();
  const catNumRef = useRef();
  const partNumRef = useRef();
  const lotNumRef = useRef();
  const expirationRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_REAGENT' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const vendor = vendorRef.current.value;
    const catNum = catNumRef.current.value;
    const partNum = partNumRef.current.value;
    const lotNum = lotNumRef.current.value;
    const expiration = expirationRef.current.value;

    await register({"name":name, 
                    "description":description, 
                    "vendor":vendor, 
                    "catNum":catNum, 
                    "partNum":partNum, 
                    "lotNum":lotNum, 
                    "expiration":expiration}, 
                  dispatch)

  };

  return (
    <Dialog open={openReagent} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register New Reagent"
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
            Please fill a new reagent's information in the fields below:
          </DialogContentText>
          
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Component"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="lotNum"
              label="Lot#"
              type="text"
              fullWidth
              inputRef={lotNumRef}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="catNum"
              label="Cat#"
              type="text"
              fullWidth
              inputRef={catNumRef}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="vendor"
              label="Vendor"
              type="text"
              fullWidth
              inputRef={vendorRef}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="exp"
              label="Exp. Date"
              type="text"
              fullWidth
              inputRef={expirationRef}
              required
            />

             <TextField
              margin="normal"
              variant="standard"
              id="partNum"
              label="P/N"
              type="text"
              fullWidth
              inputRef={partNumRef}
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
import { Close, Send } from '@mui/icons-material';
import { Autocomplete, Paper} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Grid,
  Divider,
  Alert
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { register as registerProduct, connectBoxs } from '../../action/product';
import { register as registerBox, updateStatus as updateBox } from '../../action/box';
import { register as registerProductItem } from '../../action/productItem';
import { useValue } from '../../context/ContextProvider';
import {getProductCategorys} from '../../action/productCategory';
import {getItemCategorys} from '../../action/itemCategory';
import { getBoxs } from '../../action/box';
import { getProductItems } from '../../action/productItem';
import { getOrders } from '../../action/order';


const AddForm2 = () => {
  const {
    state: { openProduct2, productCategorys, boxs, productItems, orders  },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (productCategorys.length === 0) getProductCategorys(dispatch);
    if (boxs.length === 0) getBoxs(dispatch);
    if (productItems.length === 0) getProductItems(dispatch);
    if (orders.length === 0) getOrders(dispatch);
  },[]);



  const findBoxId = (boxName) => {
    return boxs.find(item => item.name === boxName)
  }

  const productCategoryOptions = productCategorys.map(({ name, id }) => ({ label:name, id:id }));
  const [productCategoryValue, setProductCategoryValue] = useState(productCategoryOptions[0]);

  const orderOptions = orders.map(({ orderNum, id }) => ({ label:orderNum, id:id }));
  const [orderValue, setOrderValue] = useState(orderOptions[0]);
  
  //for product table 
  // const nameRef = useRef();

  //for Box
  const box1NameRef = useRef();
  // const box1PartRef = useRef();
  const box2NameRef = useRef();
  // const box2PartRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_PRODUCT2' });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // const name = nameRef.current.value;

    const box1Name = box1NameRef.current.value;
    // const box1Part = box1PartRef.current.value;
    const box2Name = box2NameRef.current.value;
    // const box2Part = box2PartRef.current.value;

    if(window.confirm("Ready to submit?")){

      let productId = uuidv4()

      let box1Obj = findBoxId(box1Name)
      
      if(!box1Obj) {
        alert("No Box for : \n" + box1Name);
        return
      }
      let box2Obj = findBoxId(box2Name)
      if(!box2Obj) {
        alert("No Box for : \n" + box2Name);
        return
      }

       await registerProduct(
        {
          "id":productId,
          "name":orderValue.label,
          "orderId":orderValue.id, 
          "productCategoryId": productCategoryValue.id,
        }, 
      dispatch)
      
      await updateBox(
        {productId},
        box1Obj.id,
        dispatch
      )
      await updateBox(
        {productId},
        box2Obj.id,
        dispatch
      )

    }
    
    
  };

  return (
    <Dialog fullWidth={true} maxWidth='md' open={openProduct2} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        "Register a kit and connect to existing boxes"
        <IconButton
          sx={{
            position: 'absolute',
            top: 3,
            right: 3,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Paper elevation={0}>
            <Grid container spacing={1} >
              <Grid item xs={12} container direction="row" spacing={1}>
                <Grid item xs={6}>
                <Autocomplete
                  sx={{mt:1, mr:2}}
                  disablePortal
                  id="name"
                  options={orderOptions}
                  value={orderValue}
                  onChange={(e, newValue) => {
                    setOrderValue(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} label="Order #" required/>}
                />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                  sx={{mt:1, mr:2}}
                  disablePortal
                  id="product_"
                  options={productCategoryOptions}
                  value={productCategoryValue}
                  onChange={(e, newValue) => {
                    setProductCategoryValue(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} label="Product Type" required/>}
                />
                </Grid>
              </Grid>
              <Grid item xs={12} container direction="row" spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      margin="dense"
                      id="box1"
                      label="Box1 Serial#/UniqueID"
                      type="text"
                      fullWidth
                      inputRef={box1NameRef}
                      inputProps={{ minLength: 2 }}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                      <TextField
                        margin="dense"
                        id="box2"
                        label="Box2 Serial#/UniqueID"
                        type="text"
                        fullWidth
                        inputRef={box2NameRef}
                        inputProps={{ minLength: 2 }}
                        required
                    />
                </Grid>
              </Grid>
            </Grid>
          </Paper>

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

export default AddForm2;
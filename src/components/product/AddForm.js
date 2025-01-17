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
import { register as registerProduct } from '../../action/product';
import { register as registerBox } from '../../action/box';
import { register as registerProductItem } from '../../action/productItem';
import { useValue } from '../../context/ContextProvider';
import {getProductCategorys} from '../../action/productCategory';
import {getItemCategorys} from '../../action/itemCategory';
import { getBoxs } from '../../action/box';
import { getProductItems } from '../../action/productItem';
import { getOrders } from '../../action/order';

const AddForm = () => {
  const {
    state: { openProduct, productCategorys, itemCategorys, boxs, productItems, orders  },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (productCategorys.length === 0) getProductCategorys(dispatch);
    if (itemCategorys.length === 0) getItemCategorys(dispatch);
    if (boxs.length === 0) getBoxs(dispatch);
    if (productItems.length === 0) getProductItems(dispatch);
    if (orders.length === 0) getOrders(dispatch);
  },[]);

  const productCategoryOptions = productCategorys.map(({ name, id }) => ({ label:name, id:id }));
  const [productCategoryValue, setProductCategoryValue] = useState(productCategoryOptions[0]);

  const orderOptions = orders.map(({ orderNum, id }) => ({ label:orderNum, id:id }));
  const [orderValue, setOrderValue] = useState(orderOptions[0]);
  
  //for product table 
  // const nameRef = useRef();

  //for Box
  const box1NameRef = useRef();
  const box1PartRef = useRef();
  const box2NameRef = useRef();
  const box2PartRef = useRef();

  // for box1 tubes(b1t)
  const b1t1Ref = useRef();
  const b1t2Ref = useRef();
  const b1t3Ref = useRef();
  const b1t4Ref = useRef();

  // for box2 tubes(b2t)
  const b2t1Ref = useRef();
  const b2t2Ref = useRef();
  const b2t3Ref = useRef();
  const b2t4Ref = useRef();


  const handleClose = () => {
    dispatch({ type: 'CLOSE_PRODUCT' });
  };

  const handleMatch = (target, scanString) => {

    if (!scanString.includes(target)){
        alert("No match: \n" + scanString);
    }

  }

  const parseQRstr = (qrStr) =>{
    //label:xxxx,p/n:xxxx,lot:xxxx,exp:xxxx,store:xxxx
    let qrObject ={}
    if(qrStr){
      for(let x of qrStr.split(',')){
        const key_value = x.split(':')
        qrObject[key_value[0]]=key_value[1]
      }
    }
    return qrObject

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    // const name = nameRef.current.value;

    const box1Name = box1NameRef.current.value;
    const box1Part = box1PartRef.current.value;
    const box2Name = box2NameRef.current.value;
    const box2Part = box2PartRef.current.value;

    const b1t1 = b1t1Ref.current.value;
    const b1t2 = b1t2Ref.current.value;
    const b1t3 = b1t3Ref.current.value;
    const b1t4 = b1t4Ref.current.value;
    

    const b2t1 = b2t1Ref.current.value;
    const b2t2 = b2t2Ref.current.value;
    const b2t3 = b2t3Ref.current.value;
    const b2t4 = b2t4Ref.current.value;

    const qrList1 =[b1t1, b1t2, b1t3, b1t4]  
    const qrList2 =[b2t1, b2t2, b2t3, b2t4]

    if(window.confirm("Ready to submit?")){

      const today = new Date();

      let productId = uuidv4()

      await registerProduct(
        {
          "id":productId,
          "name":orderValue.label,
          "orderId":orderValue.id, 
          "productCategoryId": productCategoryValue.id,
        }, 
      dispatch)

      let boxId1 = uuidv4()
      let boxId2 = uuidv4()

      await registerBox(
        {
          "id":boxId1,
          "name":box1Name,
          "part":box1Part, 
          "productId": productId,
        }, 
      dispatch)

      await registerBox(
        {
          "id":boxId2,
          "name":box2Name,
          "part":box2Part, 
          "productId": productId,
        }, 
      dispatch)

      for(let aItem of qrList1){

        let aProductItemObj = parseQRstr(aItem) 

        const isAfterToday = new Date(aProductItemObj.exp) < today;

        if (isAfterToday){
          alert("Please check expiration date: " + aProductItemObj.exp);
          return
        }

        await registerProductItem(
        {
          "id":uuidv4(),
          "boxId": boxId1,
          "name":aProductItemObj.label,
          "description":aProductItemObj.name,
          "part":aProductItemObj.part,
          "lot":aProductItemObj.lot,
          "store":aProductItemObj.store,
          "expiration_date":aProductItemObj.exp,
        }, 
        dispatch)
      
      }

      for(let aItem of qrList2){

        let aProductItemObj = parseQRstr(aItem) 

        const isAfterToday = new Date(aProductItemObj.exp) > today;

        if (isAfterToday){
          alert("Please check expiration date: " + aProductItemObj.exp);
          return
        }

        await registerProductItem(
        {
          "id":uuidv4(),
          "boxId": boxId2,
          "name":aProductItemObj.label,
          "description":aProductItemObj.name,
          "part":aProductItemObj.part,
          "lot":aProductItemObj.lot,
          "store":aProductItemObj.store,
          "expiration_date":aProductItemObj.exp,
        }, 
        dispatch)
      
      }

    }
    
    
  };

  return (
    <Dialog fullWidth={true} maxWidth='md' open={openProduct} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        "Register a New Droplet Paired-Tag Kit"
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
                  {/* <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Order #"
                  type="text"
                  fullWidth
                  inputRef={nameRef}
                  inputProps={{ minLength: 2 }}
                  required
                /> */}
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
                  <Grid item xs={3}>
                    <Paper elevation={0}>
                      <Grid item xs={12} container direction="column" spacing={1}>
                        <Grid item xs={3}>
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
                        <Grid item xs={3}>
                          <TextField
                            margin="dense"
                            id="box1_2"
                            label="Box1 Part#"
                            type="text"
                            fullWidth
                            inputRef={box1PartRef}
                            inputProps={{ minLength: 2 }}
                            required
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={9}>
                   <Paper elevation={0}>
                      <Grid item xs container direction="column" spacing={1}>
                        <Grid item xs={12}>
                          <Paper elevation={0}>
                            <Grid item xs container direction="row" spacing={1}>
                              <Grid item xs={3}>
                                <TextField
                                  margin="dense"
                                  id="perm_lzr"
                                  type="text"
                                  fullWidth
                                  defaultValue="1. Perm_lzr"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={9}>
                                <TextField
                                  margin="dense"
                                  id="b1tube1"
                                  label="1st Tube"
                                  type="text"
                                  fullWidth
                                  inputRef={b1t1Ref}
                                  onKeyPress={(e) => {    //TODO: depreciated event, need to replace it 
                                    if (e.key === 'Enter') {
                                      handleMatch("Perm_lzr", e.target.value)
                                    }
                                  }}
                                  required

                                />
                              </Grid>
                             
                            </Grid>
                          </Paper>
                          <Paper elevation={0}>
                            <Grid item xs container direction="row" spacing={1}>
                              <Grid item xs={3}>
                                <TextField
                                  margin="dense"
                                  id="rnzse_in"
                                  type="text"
                                  fullWidth
                                  defaultValue="2. RNAse_in"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={9}>
                                <TextField
                                  margin="dense"
                                  id="b1tube2"
                                  label="2nd Tube"
                                  type="text"
                                  fullWidth
                                  inputRef={b1t2Ref}
                                  onKeyPress={(e) => {    //TODO: depreciated event, need to replace it 
                                    if (e.key === 'Enter') {
                                      handleMatch("RNAse_in", e.target.value)
                                    }
                                  }}
                                  required
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                          <Paper elevation={0}>
                            <Grid item xs container direction="row" spacing={1}>
                              <Grid item xs={3}>
                                <TextField
                                  margin="dense"
                                  id="stab_lzr"
                                  type="text"
                                  fullWidth
                                  defaultValue="3. Stab_lzr"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={9}>
                                <TextField
                                  margin="dense"
                                  id="b1tube3"
                                  label="3rd Tube"
                                  type="text"
                                  fullWidth
                                  inputRef={b1t3Ref}
                                  onKeyPress={(e) => {    //TODO: depreciated event, need to replace it 
                                    if (e.key === 'Enter') {
                                      handleMatch("Stab_lzr", e.target.value)
                                    }
                                  }}
                                  required
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                          <Paper elevation={0}>
                            <Grid item xs container direction="row" spacing={1}>
                              <Grid item xs={3}>
                                <TextField
                                  margin="dense"
                                  id="tag_e"
                                  type="text"
                                  fullWidth
                                  defaultValue="4. TAG_E"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={9}>
                                <TextField
                                  margin="dense"
                                  id="b1tube4"
                                  label="4th Tube"
                                  type="text"
                                  fullWidth
                                  inputRef={b1t4Ref}
                                  onKeyPress={(e) => {    //TODO: depreciated event, need to replace it 
                                    if (e.key === 'Enter') {
                                      handleMatch("TAG_E", e.target.value)
                                    }
                                  }}
                                  required
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
              </Grid>

              <Grid item xs={12} container direction="row" spacing={1}>
                {/* <Grid item xs container direction="column" spacing={2}> */}
                  <Grid item xs={3}>
                    <Paper elevation={0}>
                      <Grid item xs container direction="column" spacing={1}>
                        <Grid item xs={3}>
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
                        <Grid item xs={3}>
                          <TextField
                            margin="dense"
                            id="box2_2"
                            label="Box2 Part#"
                            type="text"
                            fullWidth
                            inputRef={box2PartRef}
                            inputProps={{ minLength: 2 }}
                            required
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={9}>
                   <Paper elevation={0}>
                      <Grid item xs container direction="column" spacing={1}>
                        <Grid item xs={12}>
                          <Paper elevation={0}>
                            <Grid item xs container direction="row" spacing={1}>
                              <Grid item xs={3}>
                                <TextField
                                  margin="dense"
                                  id="incu_buf"
                                  type="text"
                                  fullWidth
                                  defaultValue="1. Incu_buf"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={9}>
                                <TextField
                                  margin="dense"
                                  id="b2tube1"
                                  label="1st Tube"
                                  type="text"
                                  fullWidth
                                  inputRef={b2t1Ref}
                                  onKeyPress={(e) => {    //TODO: depreciated event, need to replace it 
                                    if (e.key === 'Enter') {
                                      handleMatch("Incu_buf", e.target.value)
                                    }
                                  }}
                                  required
                                />
                              </Grid>
                             
                            </Grid>
                          </Paper>
                          <Paper elevation={0}>
                            <Grid item xs container direction="row" spacing={1}>
                              <Grid item xs={3}>
                                <TextField
                                  margin="dense"
                                  id="activator"
                                  type="text"
                                  fullWidth
                                  defaultValue="2. Tag_buf"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={9}>
                                <TextField
                                  margin="dense"
                                  id="b2tube2"
                                  label="2nd Tube"
                                  type="text"
                                  fullWidth
                                  inputRef={b2t2Ref}
                                  onKeyPress={(e) => {    //TODO: depreciated event, need to replace it 
                                    if (e.key === 'Enter') {
                                      handleMatch("Tag_buf", e.target.value)
                                    }
                                  }}
                                  required
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                          <Paper elevation={0}>
                            <Grid item xs container direction="row" spacing={1}>
                              <Grid item xs={3}>
                                <TextField
                                  margin="dense"
                                  id="Activator"
                                  type="text"
                                  fullWidth
                                  defaultValue="3. Activator"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={9}>
                                <TextField
                                  margin="dense"
                                  id="b2tube3"
                                  label="3rd Tube"
                                  type="text"
                                  fullWidth
                                  inputRef={b2t3Ref}
                                  onKeyPress={(e) => {    //TODO: depreciated event, need to replace it 
                                    if (e.key === 'Enter') {
                                      handleMatch("Activator", e.target.value)
                                    }
                                  }}
                                  required
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                          <Paper elevation={0}>
                            <Grid item xs container direction="row" spacing={1}>
                              <Grid item xs={3}>
                                <TextField
                                  margin="dense"
                                  id="Quench"
                                  type="text"
                                  fullWidth
                                  defaultValue="4. Quench"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={9}>
                                <TextField
                                  margin="dense"
                                  id="b2tube4"
                                  label="4th Tube"
                                  type="text"
                                  fullWidth
                                  inputRef={b2t4Ref}
                                  onKeyPress={(e) => {    //TODO: depreciated event, need to replace it 
                                    if (e.key === 'Enter') {
                                      handleMatch("Quench", e.target.value)
                                    }
                                  }}
                                  required
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>

                    </Paper>
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

export default AddForm;
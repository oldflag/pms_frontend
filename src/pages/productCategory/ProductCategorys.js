import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Fab, Typography, Box, IconButton } from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { register, updateStatus } from '../../action/productCategory';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { getProductCategorys, registerMany } from '../../action/productCategory';
import ProductCategorysActions from './ProductCategorysActions'
import AddForm from '../../components/productCategory/AddForm';
import importData from '../../action/utils/importData';

function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_PRODUCTCATEGORY' })
  };

  const cbFileData = async(data) => {

    console.log(data)


    if(data?.length ===0 ){

      dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: 'No data are loaded. Please check the input file!'
        },
      });
      return
    }

    const headerlist = Object.keys(data[0]);
    if(!headerlist.includes('name')){

      dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: 'Please check header names: name(required), contactName, contactEmail, contactPhone, note, url'
        },
      });
      return
    }

      await registerMany(data, dispatch)
    
  }

  const handleClickFile = (e) => {

   
    importData(e.target.files[0], 1, cbFileData, 'Category')
    
  };

  const handleUploadInfo = (e) => {

     dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'info',
        message: 'header(1st row): name contactName contactEmail contactPhone note url'
      },
    });
    

  }

  return (
    <GridToolbarContainer sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
       {/* <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: 'left', flexGrow: 1 }}
      >
        Categorys
      </Typography> */}
      <GridToolbarQuickFilter />

      <Fab size="small" color="primary" aria-label="add" onClick={handleClick} sx={{ml:1}} >
        <AddIcon />
      </Fab>
      
      {/* <Fab size="small" color="primary" aria-label="add" sx={{ml:1}} component="label">
        <input hidden accept="*" type="file" onChange={handleClickFile}/>
        <UploadFileIcon onClick={handleUploadInfo}/>
      </Fab> */}

      <Fab size="small" color="primary" aria-label="download" sx={{ml:1}} component="label">
        <GridToolbarExport size="small" color="primary" sx={{ml:1}}
          csvOptions={{
            fileName: 'ProductCategorys',
          }}
          startIcon={
            // <Fab size="small" color="primary" aria-label="download" sx={{ml:1}} component="label">
            <IconButton>
              <FileDownloadIcon sx={{color:"white"}} />  
            </IconButton>
            // </Fab>
            
          }
        />
      </Fab>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function ProductCategorys() {

  const {
    state: { productCategorys },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (productCategorys.length === 0) getProductCategorys(dispatch);
  }, []);

  const [rows, setRows] = useState(productCategorys);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(productCategorys)
    
  }, [productCategorys]);


  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };


  const processRowUpdate = async (newRow) => {
    
    const isNewRecord = newRow.isNew

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    const { name, description, type, id} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ name, description, type}, id, dispatch);
      if(result) {
        getProductCategorys(dispatch)
      }
    }

    return updatedRow;
  };

  const columns = useMemo(
    () =>  [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      renderCell: (params) => (
        <ProductCategorysActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    { field: 'description', headerName: 'Description', flex: 1, editable: true },
    { field: 'type', headerName: 'Type', flex: 1, editable: true },
    
  ],
  [rows, rowModesModel]
  );

  return (
    <>
    <AddForm />
    <Box
      sx={{
        mt :2,
        ml: "auto",
        mr: "auto",
        height: 700,
        width: '100%',
        // boxShadow: 2,
        // borderRadius: 2,
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: 'center', mt: 2, mb: 2 }}
      >
        Product Types
      </Typography>
      <DataGrid
        sx={{
        m: 2,
        boxShadow: 2,
        borderRadius: 2,
        borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        // rowHeight={30}
        density='compact'
        initialState={{
          // sorting: {
          //   sortModel: [{ field: 'createdAt', sort: 'desc' }],
          // },
        }}

        checkboxSelection={true}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[15, 30, 45]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        localeText={{toolbarExport:''}}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </>
  );
}
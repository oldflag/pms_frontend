import React from 'react'
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography, Stack, Link} from '@mui/material'
import {Lock, Menu} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';

import Users from './user/Users';
import logo from '../images/epigenome_logo.png'
import Clients from './client/Clients'
import ProductCategorys from './productCategory/ProductCategorys';
import ItemCategorys from './itemCategory/ItemCategorys';
import ProductItems from './productItem/ProductItems';
import Products from './product/Products';
import Boxs from './box/Boxs';
import Orders from './order/Orders';


const NavBar = () => {

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const navigate = useNavigate()

  return (
    <>
      <AppBar style={{ background: '#2E3B55' }}>
        <Container maxWidth={ false }>
          <Toolbar disableGutters>
            <Typography variant='h6' component='h6' noWrap sx={{flexGrow:1}}>
               Epigenome Technologies Inc.
            </Typography>
            
            <Stack direction={'row'} spacing={1}>
              {currentUser && (
                <>
               <Button
                color="inherit"
                // startIcon={<Lock />}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button> 
               {/* {(currentUser.role === "ADMIN") && <Users />} */}
               <Users />
              <Clients />
              <Orders />
              
              <Products />
              {/* <ItemCategorys /> */}
              <Boxs />
              <ProductItems />
              <ProductCategorys />
              

              </>
              )}
      
            </Stack>
            {!currentUser ? (
              <Button
                color="inherit"
                startIcon={<Lock />}
                onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
              >
                Login
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
        </Container>
    </AppBar>
    <Toolbar />
    </>
  )
}

export default NavBar
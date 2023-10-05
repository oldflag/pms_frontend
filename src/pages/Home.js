import { Box } from '@mui/material';

import { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useValue } from '../context/ContextProvider';
import Protected from '../components/Protected';

import Notification from '../components/Notification';
import NavBar from '../components/NavBar';
import Login from '../components/user/Login';
import Register from '../components/user/Register';
import UserTable from './user/UserTable';
import Clients from './client/Clients';
import ProductCategorys from './productCategory/ProductCategorys';
import ItemCategorys from './itemCategory/ItemCategorys';
import ProductItems from './productItem/ProductItems';
import Products from './product/Products';
import Boxs from './box/Boxs';
import Orders from './order/Orders';

import Dashboard from './dashboard/dashboard';

const Home = () => {

const {
    state: { currentUser },
    dispatch,
} = useValue();

const [selectedLink, setSelectedLink] = useState('');

const linklist = useMemo(
    () => [
      {
        title: 'Dashboard',
        link: 'dashboard',
        component: <Dashboard {...{ setSelectedLink, link: 'dashboard' }} />,
      },
      {
        title: 'Users',
        link: 'usertable',
        component: <UserTable {...{ setSelectedLink, link: 'usertable' }} />,
      },
      {
        title: 'Clients',
        link: 'clients',
        component: <Clients {...{ setSelectedLink, link: 'clients' }} />,
      },
      {
        title: 'Products',
        link: 'products',
        component: <Products {...{ setSelectedLink, link: 'products' }} />,
      },
      
      {
        title: 'Product Category',
        link: 'productCategorys',
        component: <ProductCategorys {...{ setSelectedLink, link: 'productCategorys' }} />,
      },
      {
        title: 'Item Category',
        link: 'itemCategorys',
        component: <ItemCategorys {...{ setSelectedLink, link: 'itemCategorys' }} />,
      },
      {
        title: 'Product Item',
        link: 'productItems',
        component: <ProductItems {...{ setSelectedLink, link: 'productItems' }} />,
      },
       {
        title: 'Boxes',
        link: 'boxs',
        component: <Boxs {...{ setSelectedLink, link: 'boxs' }} />,
      },
      {
        title: 'Orders',
        link: 'orders',
        component: <Orders {...{ setSelectedLink, link: 'orders' }} />,
      },
      
      
      // {
      //   title: 'Accounts',
      //   link: 'account/accounts',
      //   component: <Quotes {...{ setSelectedLink, link: 'account/quote' }} />,
      // },
      

    ],
    []
  );


//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch({ type: 'UPDATE_USER', payload: null });
//     navigate('/');
//   };


  return (
    <>
    {/* <Loading /> */}
    <Notification />
    <Login />
    <Register />
    <NavBar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route key="dashboard" path="/dashboard" element={<Dashboard {...{ setSelectedLink, link: 'dashboard' }} />} />
          <Route key="oms" path="/" element={<Dashboard {...{ setSelectedLink, link: 'dashboard' }} />} />
          {linklist.map((item) => (
            <Route key={item.title} path={item.link} element={<Protected currentUser={currentUser}> {item.component}</Protected>} />
          ))}
        </Routes>
    </Box>

    </>
  );
};

export default Home;

import { Group, MapsHomeWork } from '@mui/icons-material';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import {
  Avatar,
  Box,
  Grid,
} from '@mui/material';
import { useEffect } from 'react';

import { useValue } from '../../context/ContextProvider';
import moment from 'moment';
import logo from '../../images/epigenome_logo2.png'


const Dashboard = ({ setSelectedLink, link }) => {
  const {
    state: { users },
    dispatch,
  } = useValue();


  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="70vh">
      <Box
        component="img"
        sx={{ height: '300', width: '300' }}
        alt="Logo"
        src={logo}

        // sx={{
        //   backgroundImage: "url('../../images/epigenome_logo2.png')",
        //   backgroundRepeat: "no-repeat",
        //   height: '385px',
        //   width: '385px'
        // }}
      >
        {/* <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4">Epigenome Technologies</Typography>
        </Paper> */}
        {/* <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4">test2</Typography>
        </Paper> */}
        
      </Box>
    </Grid>
  );
};

export default Dashboard;


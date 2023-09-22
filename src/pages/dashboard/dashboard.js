
import { Group, MapsHomeWork } from '@mui/icons-material';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

import { useValue } from '../../context/ContextProvider';
import moment from 'moment';


const Dashboard = ({ setSelectedLink, link }) => {
  const {
    state: { users },
    dispatch,
  } = useValue();


  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3,1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">test</Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">test2</Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;


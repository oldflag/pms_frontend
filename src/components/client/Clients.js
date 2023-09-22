import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Clients = () => {

  const navigate = useNavigate()

  return (
    <Button
        color="inherit"
        id="client-button"
        onClick={() => navigate('clients')}
      >
        Clients
    </Button>
  )
}

export default Clients
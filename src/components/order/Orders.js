import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Orders = () => {

  const navigate = useNavigate()

  return (
    <Button
        color="inherit"
        id="order-button"
        onClick={() => navigate('orders')}
      >
        Orders
    </Button>
  )
}

export default Orders
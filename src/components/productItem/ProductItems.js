import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ProductItems = () => {

  const navigate = useNavigate()

  return (
    <Button
        color="inherit"
        id="productItem-button"
        onClick={() => navigate('productItems')}
      >
        Tubes
    </Button>
  )
}

export default ProductItems
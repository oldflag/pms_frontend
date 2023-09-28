import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Products = () => {

  const navigate = useNavigate()

  return (
    <Button
        color="inherit"
        id="product-button"
        onClick={() => navigate('products')}
      >
        Kits
    </Button>
  )
}

export default Products
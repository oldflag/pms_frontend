import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ProductCategorys = () => {

  const navigate = useNavigate()

  return (
    <Button
        color="inherit"
        id="productCategory-button"
        onClick={() => navigate('productCategorys')}
      >
        Category
    </Button>
  )
}

export default ProductCategorys
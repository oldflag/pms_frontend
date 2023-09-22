import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ItemCategorys = () => {

  const navigate = useNavigate()

  return (
    <Button
        color="inherit"
        id="itemCategory-button"
        onClick={() => navigate('itemCategorys')}
      >
        Items
    </Button>
  )
}

export default ItemCategorys
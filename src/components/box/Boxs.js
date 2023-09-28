import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Boxs = () => {

  const navigate = useNavigate()

  return (
    <Button
        color="inherit"
        id="box-button"
        onClick={() => navigate('boxs')}
      >
        Boxes
    </Button>
  )
}

export default Boxs
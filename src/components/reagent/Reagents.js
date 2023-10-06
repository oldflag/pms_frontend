import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Reagents = () => {

  const navigate = useNavigate()

  return (
    <Button
        color="inherit"
        id="reagent-button"
        onClick={() => navigate('reagents')}
      >
        Reagents
    </Button>
  )
}

export default Reagents
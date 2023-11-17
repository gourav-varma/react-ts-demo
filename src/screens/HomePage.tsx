import { MouseEventHandler, useEffect, useState } from 'react';
// import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ButtonEle from '../components/Button';
import { deleteUserdata } from '../services/DB';
import { Container, Snackbar, Alert, Button, Stack, Box, AlertColor } from '@mui/material';
import { snackbar } from '../components/SnackBar';

function HomePage() {
  const navigate = useNavigate();
  const [errorSnackBar, setErrorSnackBar] = useState(false);
  const [successSnackBar, setSuccessSnackBar] = useState(false);
  const [deletingSnackBar, setDeletingSnackBar] = useState(false);

  const handleSuccessSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSnackBar(false);
  };

  const handleErrorSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorSnackBar(false);
  };

  const handleDeletingSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeletingSnackBar(false);
  };

  return (
    <div className='App'>
      <Container sx={{width:'90%', alignItems:'center', mb: '40px'}}>
        <h1>
          Home Page
        </h1>
      </Container>
      <ButtonEle text={'View Data'} onclick={() => {
        console.log('clicked view data')
        navigate('/viewData');
      }}/>
      <ButtonEle text={'Upload Excel Data'} onclick={() => {
        console.log('clicked view data')
        navigate('/uploadData');
      }}/>
      <ButtonEle text={'Delete All'} onclick={async () => {
        setDeletingSnackBar(true)
        let res = await deleteUserdata();
        setDeletingSnackBar(false);
        if(res){
          setSuccessSnackBar(true);
        }else {
          setErrorSnackBar(true);
        }
      }}/>
      {
         (snackbar("success", "Successfully Deleted Data", successSnackBar, 4000, handleSuccessSnackBarClose)) 
      }
      {
         (snackbar("info", "Deleting Data", deletingSnackBar, null, handleDeletingSnackBarClose)) 
      }
      {
         (snackbar("error", "Error: Unable to delete", errorSnackBar, 4000, handleErrorSnackBarClose)) 
      }
    </div>
  );
}

export { HomePage };
import { MouseEventHandler, useEffect, useState } from 'react';
// import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ButtonEle from '../Components/Button';
import { deleteUserdata } from '../Services/DB/Db';
import { Container, Snackbar, Alert, Button, Stack, Box, AlertColor } from '@mui/material';


// const theme = createTheme({

//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });

function HomePage() {
  const navigate = useNavigate();
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);

  const handleSnackBar = (success: boolean) => {
    if(success){
      setDeleteSuccess(true);
    }else {
      setDeleteFailed(true);
    }
  
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteSuccess(false);
    setDeleteFailed(false);
  };

  const snackbar = (severity: AlertColor, text: String, open: boolean) => {
    return (
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical:"top", horizontal: "right"}}> 
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {text}
          {/* Error: Invalid Schema */}
        </Alert>
      </Snackbar>
    )
  }

  return (
    <div className='App'>
      <Container sx={{width:'90%', alignItems:'center', mb: '40px'}}>
        <h1>
          Home Page
        </h1>
      </Container>
      <ButtonEle text={'View Data'} onclick={() => {
        console.log('clicked view data')
        navigate('/viewdata');
      }}/>
      <ButtonEle text={'Upload Excel Data'} onclick={() => {
        console.log('clicked view data')
        navigate('/addDataExcel');
      }}/>
      <ButtonEle text={'Delete All'} onclick={async () => {
        let res = await deleteUserdata();
        if(res){
          handleSnackBar(true);
        }else {
          handleSnackBar(false);
        }
      }}/>
      {
         (snackbar("success", "Successfully Deleted Data", deleteSuccess)) 
      }
      {
         (snackbar("error", "Error: Unable to delete", deleteFailed)) 
      }
    </div>
  );
}

export { HomePage };
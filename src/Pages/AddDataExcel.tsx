import { useEffect, useState } from 'react';
import { Container, Snackbar, Alert, Button, Stack, Box, AlertColor } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { addAllUserData } from '../Services/DB/Db';
import * as XLSX from "xlsx";
import ButtonEle from '../Components/Button';
import UserType from '../Components/Type/UserType';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'first_name', headerName: 'First name', width: 130 },
	{ field: 'last_name', headerName: 'Last name', width: 130 },
	{ field: 'gender', headerName: 'Gender', width: 130 },
	{ field: 'mobile', headerName: 'Mobile', width: 130 },
	{ field: 'email', headerName: 'Email', width: 200 },
	{ field: 'address', headerName: 'Address', width: 200 },
	// {
	//   field: 'fullName',
	//   headerName: 'Full name',
	//   description: 'This column has a value getter and is not sortable.',
	//   sortable: false,
	//   width: 160,
	//   valueGetter: (params: GridValueGetterParams) =>
	//     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
	// },
];

function AddDataExcel() {
  const [data, setData] = useState<UserType[]>();
  const [previewData, setPreviewData] = useState<UserType[]>();

  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleFileUpload = (e: any) => {
    setData([]);
    setPreviewData([]);
    const reader = new FileReader();
    let errorFlag = false;
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e?.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      // testing invalid schema
      // let temp = {
      //   "id": 1,
      //   "first_name": "Chester",
      //   "last_name": "Lannen",
      //   "email": "clannen0@webs.com",
      //   "gender": "Male",
      //   "address": "9960 Lindbergh Park",
      //   "mobile": "758-259-2553",
      //   "wow": "hi"
      // }
      // parsedData[0] = temp;

      console.log(parsedData[0]);

      if(validSchema(parsedData[0])){
        setData(parsedData as UserType[]);
        setPreviewData(parsedData.slice(0, 5) as UserType[]);
      }else {
        console.error('Invalid Excel Schema');
        handleSnackBar(false);
        setData([]);
        setPreviewData([]);
        errorFlag = true;
      }
    };
    if(errorFlag && e?.target?.value) {
        e.target.value = null;
    }
  }

  const handleSnackBar = (success: boolean) => {
    if(success){
      setSuccessOpen(true);
    }else {
      setOpen(true);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setSuccessOpen(false);
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
    <Stack spacing={2} sx={{ width: '100%' }}>
      <div className="App">
        <h1>
          Add Data from Excel
        </h1>
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            hidden
            accept=".xlsx, .xls" 
            onChange={handleFileUpload} 
          />
        </Button>
        {
          (!previewData || previewData.length === 0) && (
            <Container
              sx={{ mt: "14px" }}
            >
              The excel file must contain columns [id, first_name, last_name,	email, gender, address,	mobile]
            </Container>
          )
        }

        {(previewData ? previewData?.length > 0 : false)  && (
          <Container disableGutters={true} sx={{height: '60%', width: '90%', my: '2rem'}}>
            <Box 
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ m: "10px" }}
            >
              Previewing first 5 records
            </Box>
            <DataGrid
              rows={previewData ? previewData : []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
            />
          </Container>
        )}
        {(data ? data.length > 0 : false) && (
            <Container disableGutters={true} sx={{height: '60%', width: '90%', my: '2rem'}}>
              <ButtonEle text={'Upload Data'} onclick={async () => {
                if(data){
                  const res = await addAllUserData(data);
                  if(res){
                    handleSnackBar(true);
                  }
                }
              }}/>
            </Container>
        )}
      </div>
      {
         (snackbar("error", "Error: Invalid Schema", open)) 
      }
      {
         (snackbar("success", "Uploaded Data", successOpen)) 
      }
    </Stack>
  );
}

function validSchema(obj: any) {
  if(Object.keys(obj).length === 7 && obj.id && obj.first_name && obj.last_name && obj.address && obj.gender && obj.mobile && obj.email){
    return true;
  }
  return false;
}

export {AddDataExcel};
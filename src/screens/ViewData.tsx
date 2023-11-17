import { useEffect, useState } from "react";
import { Box, Container, CircularProgress, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { getAllUserdata } from "../services/DB";
import UserType from "../component/types/UserType";
import ButtonEle from "../component/Button";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "first_name", headerName: "First name", width: 130 },
  { field: "last_name", headerName: "Last name", width: 130 },
  { field: "gender", headerName: "Gender", width: 130 },
  { field: "mobile", headerName: "Mobile", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "address", headerName: "Address", width: 200 },
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

function ViewData() {
  const [data, setData] = useState<UserType[]>();
  const [rows, setRows] = useState<UserType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getAllUserdata().then((e) => {
      if (mounted) {
        setRows(e as UserType[]);
        setData(e as UserType[]);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
      console.log("cleaned up");
      setLoading(false);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value === "") {
      setRows(data);
      return;
    }
    let temp: UserType[] = rows
      ? rows.filter((data: UserType) => {
          if (
            data.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            data.last_name.toLowerCase().includes(e.target.value.toLowerCase())
          )
            return data;
        })
      : [];

    setRows(temp);
  };

  return (
    <div className="App">
      <h1>User Data</h1>
      {data && data.length > 0 ? (
        <Container
          // disableGutters={true}
          sx={{ height: "60%", width: "90%", my: "2rem" }}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ my: "10px" }}
          >
            <TextField
              size="small"
              id="outlined-basic"
              label="Search"
              variant="outlined"
              onChange={(e) => {
                handleSearchChange(e);
              }}
            />
          </Box>
          <DataGrid
            sx={{ px: "10px" }}
            rows={rows ? rows : []}
            getRowId={(row) => row.docId}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 50]}
          />
        </Container>
      ) : !loading ? (
        <Box sx={{ my: "14px" }}>
          <Container sx={{ mt: "50px", mb: "24px" }}>
            No data available, please add data using an excel file.
          </Container>
          <ButtonEle
            text={"Upload Excel Data"}
            onclick={() => {
              console.log("clicked view data");
              navigate("/uploadData");
            }}
          />
        </Box>
      ) : (
        // <Box sx={{ display: "flex" }}>
        <Box>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export { ViewData };

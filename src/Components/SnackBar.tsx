import { Alert, AlertColor, Snackbar } from "@mui/material"

const snackbar = (severity: AlertColor, text: String, open: boolean, duration: (number|null), handleClose: ((event: Event | React.SyntheticEvent<any, Event>) => void) | undefined) => {
    return (
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose} anchorOrigin={{vertical:"top", horizontal: "right"}}> 
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    )
}

export { snackbar }
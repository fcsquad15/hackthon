import { Alert, Snackbar } from "@mui/material";
import useUser from "../../hooks/useUser";

export default function ToastNotification() {
    const { open, setOpen, errorMesage } = useUser();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }

        setOpen(false);
      };

return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      sx={{ width: 500 }}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{ width: "100%", fontSize: 16 }}
      >
        {errorMesage}
      </Alert>
    </Snackbar>
          );
}

import { Grid, Typography } from "@mui/material";
import RegistrationForm from "../../components/Registration/registrationForm";
import { submitRegistration } from "../../shared/userRequests/userRequests";


const Registration = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "92vh",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "400px",
            marginTop: "20px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Регистрация нового пользователя
          </Typography>
          <RegistrationForm onSubmit={submitRegistration} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Registration;

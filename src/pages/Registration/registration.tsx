import { Grid, Typography } from "@mui/material";
import RegistrationForm from "../../components/Registration/registrationForm";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { IUserRegistrationData } from "../../types/types";
import { setTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { login } from "../../store/user/userSlice";
import { toast } from "react-toastify";

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: IUserRegistrationData) => {
    try {
      const data = await AuthService.registration(values);
      if (data) {
        setTokenFromLocalStorage("token", data.token);
        localStorage.setItem("email", values.email);
        dispatch(login());
        navigate("/");
      }
    } catch (err) {
      toast.error("Ошибка при регистрации");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "92vh" }}
    >
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
        <Typography variant="h6" gutterBottom>
          Регистрация нового пользователя
        </Typography>
        <RegistrationForm onSubmit={onSubmit} />
      </Grid>
    </Grid>
  );
};

export default Registration;

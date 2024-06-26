import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { setTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { login } from "../../store/user/userSlice";
import { Grid, Typography } from "@mui/material";
import { IUserLoginData } from "../../types/types";
import LoginForm from "../../components/Login/loginForm";
import { toast } from "react-toastify";

const Authorization = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: IUserLoginData) => {
    try {
      localStorage.clear();
      const data = await AuthService.login(values);
      if (data) {
        setTokenFromLocalStorage("token", data.token);
        localStorage.setItem("email", values.email);
        dispatch(login());
        navigate("/");
      }
    } catch (err) {
      toast.error("Ошибка при авторизации, проверьте свои данные еще раз!");
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
          width: "100%",
          maxWidth: "400px",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Авторизация
        </Typography>
        <LoginForm onSubmit={onSubmit} />
      </Grid>
    </Grid>
  );
};

export default Authorization;

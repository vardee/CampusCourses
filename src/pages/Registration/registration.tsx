import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthService } from "../../services/auth.service";
import { setTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { validationRegisterSchema } from "../../helpers/validation.schemas";
import { initialRegisterScheme } from "../../components/InitialValues/initialValues";
import { toast } from "react-toastify";

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialRegisterScheme,
    validationSchema: validationRegisterSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const data = await AuthService.registration(values);
        if (data) {
          setTokenFromLocalStorage("token", data.token);
          localStorage.setItem('email', values.email);
          dispatch(login());
          navigate("/");
        }
      } catch (err: any) {
        toast.error("Что-то пошло не так");
      } finally {
        setSubmitting(false);
      }
    },
  });

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
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1.5}> {/* Уменьшаем отступ между элементами формы */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="ФИО"
                  autoComplete="fullName"
                  {...formik.getFieldProps("fullName")}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="birthDate"
                  label="Дата рождения"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...formik.getFieldProps("birthDate")}
                  error={
                    formik.touched.birthDate && Boolean(formik.errors.birthDate)
                  }
                  helperText={
                    formik.touched.birthDate && formik.errors.birthDate
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  type="password"
                  label="Пароль"
                  autoComplete="current-password"
                  {...formik.getFieldProps("password")}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  type="password"
                  label="Повторите пароль"
                  autoComplete="current-password"
                  {...formik.getFieldProps("confirmPassword")}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={formik.isSubmitting}
                >
                  Зарегистрироваться
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Registration;

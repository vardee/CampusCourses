import React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { setTokenFromLocalStorage } from '../../helpers/localstorage.helper';
import { login } from '../../store/user/userSlice';
import { validationLoginSchema } from '../../helpers/validation.schemas';
import { initialLoginValues } from '../../components/InitialValues/initialValues';

const Authorization = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialLoginValues,
    validationSchema: validationLoginSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const data = await AuthService.login(values);
        if (data) {
          setTokenFromLocalStorage('token', data.token);
          localStorage.setItem('email', values.email);
          dispatch(login());
          navigate('/');
        }
      } catch (err: any) {
        const errorMessage = err.response?.data.message || 'Что-то пошло не так';
        setErrors({ email: errorMessage });
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
        height: "97vh",
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
          }}>
          <Typography variant="h6" gutterBottom>
            Авторизация
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
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
                  Войти
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authorization;

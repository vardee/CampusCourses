import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../store/hooks';
import { IUserLoginData } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { setTokenFromLocalStorage } from '../../helpers/localstorage.helper';
import { login } from '../../store/user/userSlice';

const Authorization = () => {
  const dispatch = useAppDispatch()
  const navigate  = useNavigate()
  const initialUserData: IUserLoginData = {
      email: '',
      password: '',
  };
  const [userData, setUserData] = useState<IUserLoginData>(initialUserData);

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      console.log(userData)
      try {
          e.preventDefault();
          const data = await AuthService.login(userData); 
          if (data) {
              setTokenFromLocalStorage('token', data.token);
              localStorage.setItem('email',userData.email)
              dispatch(login())
              console.log(data)
              navigate('/')
          }
      } catch (err: any) {
          const error = err.response?.data.message;
          console.log(error);
      }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
            Авторизация
          </Typography>
          <form onSubmit={loginHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
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

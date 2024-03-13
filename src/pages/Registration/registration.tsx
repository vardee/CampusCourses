import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AuthService } from '../../services/auth.service';
import { IUserRegistrationData } from '../../types/types';
import { setTokenFromLocalStorage } from '../../helpers/localstorage.helper';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const dispatch = useAppDispatch()
    const navigate  = useNavigate()
    const initialUserData: IUserRegistrationData = {
        fullName: '',
        birthDate: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    const [userData, setUserData] = useState<IUserRegistrationData>(initialUserData);

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(userData)
        try {
            e.preventDefault();
            const data = await AuthService.registration(userData); 
            if (data) {
                setTokenFromLocalStorage('token', data.token);
                dispatch(login())
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
                <Grid item xs={12} sm={6} md={5}>
                    <Typography variant="h4" gutterBottom>
                        Регистрация нового пользователя
                    </Typography>
                    <form onSubmit={registrationHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    ФИО
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="fullName"
                                    name="fullName"
                                    autoComplete="fullName"
                                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Дата рождения
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="birthDate"
                                    name="birthDate"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Email
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Пароль
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Повторите пароль
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            >
                                Зарегистрироваться
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default Registration;

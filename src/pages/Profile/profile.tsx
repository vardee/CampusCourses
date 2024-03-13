import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IEditProfile, IGetUser } from "../../types/types";
import { AuthService } from "../../services/auth.service";


const Profile = () => {

    const initialGetUserData: IGetUser = {
        fullName: '',
        email: '',
        birthDate: ''
    };
    const [getUserData, setGetUserData] = useState<IGetUser>(initialGetUserData);
    const getProfileHandler = async () => {
        const token = localStorage.getItem('token')
        try {
            if (token) {
                const data = await AuthService.getProfile()
                if (data) {
                    const formattedBirthDate = data.birthDate.split('T')[0];
                    setGetUserData({ ...data, birthDate: formattedBirthDate });
                    console.log(data);
                }
            }
        } catch (error) {
        }
    }
    
    const editProfileHandler = async (e: React.FormEvent<HTMLFormElement>) =>{
        const token = localStorage.getItem('token')
        try {
            e.preventDefault();
            if (token) {
              await AuthService.editProfile(getUserData);
              console.log(getUserData)
            }
        } catch (error) {
          
        }
    }
    useEffect(() => {
        getProfileHandler();
    }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
            Профиль
          </Typography>
          <form onSubmit={editProfileHandler}>
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
                  value={getUserData.fullName} 
                  onChange={(e) =>
                    setGetUserData({ ...getUserData, fullName: e.target.value })
                  }
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
                  value={getUserData.email}
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
                  value={getUserData.birthDate} 
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>
                    setGetUserData({ ...getUserData, birthDate: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Изменить
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile

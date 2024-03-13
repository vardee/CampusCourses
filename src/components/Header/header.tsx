import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/user/userSlice";
import { AuthService } from "../../services/auth.service";
import { useEffect, useState } from "react";
import { IGetUserRole } from "../../types/types";

const Header = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailUser = localStorage.getItem("email");
  const [userData, setUserData] = useState<string | null>(emailUser || null);
  const initialGetUserData: IGetUserRole = {
    isTeacher: false,
    isStudent: false,
    isAdmin: false
};
  const [userRoleData, setUserRoleData] = useState<IGetUserRole>(initialGetUserData);

  const logoutHandler = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      if (token) {
        await AuthService.logout();
        localStorage.clear();
        dispatch(logout());
        navigate("/authorization");
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      console.log(error);
    }
  };

  const getUserRole = async() =>{
    const token = localStorage.getItem("token");
    try {
        if(token){
            const userRole = await AuthService.getUserRole();
            if(userRole){
                setUserRoleData(userRole);
            }
        }
    } catch (error) {
        
    }
  }

  useEffect(() => {
    setUserData(emailUser);
    getUserRole();
  }, [emailUser]);

  return (
    <AppBar position="fixed" color="inherit" sx={{ background: "grey" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          color="inherit"
          style={{ textDecoration: "none" }}
        >
          Кампусные курсы
        </Typography>
        {isAuth && (
          <Button color="inherit" component={Link} to="/courses">
            Группы курсов
          </Button>
        )}
        {isAuth && userRoleData.isStudent && (
          <Button color="inherit" component={Link} to="/profile">
            Мои курсы
          </Button>
        )}
        {isAuth && userRoleData.isTeacher && (
          <Button color="inherit" component={Link} to="/courses/teaching">
            Преподаваемые курсы
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {isAuth ? (
          <>
            <Button color="inherit" component={Link} to="/profile">
              {userData}
            </Button>
            <Button color="inherit" onClick={logoutHandler}>
              Выход
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/registration" color="inherit">
              Регистрация
            </Button>
            <Button component={Link} to="/authorization" color="inherit">
              Вход
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

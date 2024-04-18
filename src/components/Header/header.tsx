import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/user/userSlice";
import { AuthService } from "../../services/auth.service";
import { useEffect, useState } from "react";
import { IGetUserRole } from "../../types/types";
import MenuIcon from "@mui/icons-material/Menu";
import { toast } from "react-toastify";

const Header = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailUser = localStorage.getItem("email");
  const [userData, setUserData] = useState<string | null>(emailUser || null);
  const initialGetUserData: IGetUserRole = {
    isTeacher: false,
    isStudent: false,
    isAdmin: false,
  };
  const [userRoleData, setUserRoleData] =
    useState<IGetUserRole>(initialGetUserData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const logoutHandler = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await AuthService.logout();
        localStorage.clear();
        dispatch(logout());
        navigate("/authorization");
      }
    } catch (err: any) {
      toast.error("Ошибка при логауте");
    }
  };

  const getUserRole = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const userRole = await AuthService.getUserRole();
        if (userRole) {
          setUserRoleData(userRole);
        }
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    setUserData(emailUser);
    getUserRole();
  }, [emailUser, userRoleData]);

  return (
    <AppBar position="fixed" color="inherit" sx={{ background: "white" }}>
      <Toolbar>
        {!isSmallScreen && (
          <>
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
              <Button color="inherit" component={Link} to="/groups" sx={{ marginTop: { xs: 0, sm: 0.5 } }}>
                Группы курсов
              </Button>
            )}
            {isAuth && userRoleData.isStudent && (
              <Button color="inherit" component={Link} to="/mycourses" sx={{ marginTop: { xs: 0, sm: 0.5 } }}>
                Мои курсы
              </Button>
            )}
            {isAuth && userRoleData.isTeacher && (
              <Button color="inherit" component={Link} to="/courses/teaching" sx={{ marginTop: { xs: 0, sm: 0.5 } }}>
                Преподаваемые курсы
              </Button>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {isAuth ? (
              <>
                <Button color="inherit" component={Link} to="/profile" sx={{ marginTop: { xs: 0, sm: 0.5 } }}>
                  {userData}
                </Button>
                <Button color="inherit" onClick={logoutHandler} sx={{ marginTop: { xs: 0, sm: 0.5 } }}>
                  Выход
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/registration" color="inherit" sx={{ marginTop: { xs: 0, sm: 0.5 } }}>
                  Регистрация
                </Button>
                <Button component={Link} to="/authorization" color="inherit" sx={{ marginTop: { xs: 0, sm: 0.5 } }}>
                  Вход
                </Button>
              </>
            )}
          </>
        )}
        {isSmallScreen && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              color="inherit"
              style={{ textDecoration: "none" }}
            >
              Кампусные курсы
            </Typography>
          </Box>
        )}
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <List>
            {isAuth && (
              <ListItemButton
                onClick={toggleDrawer(false)}
                component={Link}
                to="/groups"
              >
                <ListItemText primary="Группы курсов" />
              </ListItemButton>
            )}
            {isAuth && userRoleData.isStudent && (
              <ListItemButton
                onClick={toggleDrawer(false)}
                component={Link}
                to="/mycourses"
              >
                <ListItemText primary="Мои курсы" />
              </ListItemButton>
            )}
            {isAuth && userRoleData.isTeacher && (
              <ListItemButton
                onClick={toggleDrawer(false)}
                component={Link}
                to="/courses/teaching"
              >
                <ListItemText primary="Преподаваемые курсы" />
              </ListItemButton>
            )}
            {isAuth ? (
              <>
                <ListItemButton
                  onClick={toggleDrawer(false)}
                  component={Link}
                  to="/profile"
                >
                  <ListItemText primary={userData} />
                </ListItemButton>
                <ListItemButton onClick={logoutHandler}>
                  <ListItemText primary="Выход" />
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton
                  onClick={toggleDrawer(false)}
                  component={Link}
                  to="/registration"
                >
                  <ListItemText primary="Регистрация" />
                </ListItemButton>
                <ListItemButton
                  onClick={toggleDrawer(false)}
                  component={Link}
                  to="/authorization"
                >
                  <ListItemText primary="Вход" />
                </ListItemButton>
              </>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

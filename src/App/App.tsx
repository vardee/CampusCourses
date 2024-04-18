import Header from "../components/Header/header";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "../store/hooks";
import { AuthService } from "../services/auth.service";
import { login, logout } from "../store/user/userSlice";
import { useEffect } from "react";

const App = () => {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const data = await AuthService.getProfile();
        if (data) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="name">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;

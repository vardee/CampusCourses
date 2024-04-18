import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { setTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { login } from "../../store/user/userSlice";
import { IUserRegistrationData } from "../../types/types";

export const submitRegistration = async (values: IUserRegistrationData) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  try {
    const data = await AuthService.registration(values);
    if (data) {
      setTokenFromLocalStorage("token", data.token);
      localStorage.setItem("email", values.email);
      dispatch(login());
      navigate("/");
    }
  } catch (err) {
    // обработка ошибок
  }
};

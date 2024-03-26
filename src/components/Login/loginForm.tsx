import { useFormik } from "formik"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { IUserLoginData } from "../../types/types";
import { initialLoginValues } from "../InitialValues/initialValues";

interface LoginFormProps {
  onSubmit: (values: IUserLoginData) => Promise<void>;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const formik = useFormik({
    initialValues: initialLoginValues,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              formik.touched.email && typeof formik.errors.email === "string"
                ? formik.errors.email
                : ""
            }
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
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              formik.touched.password &&
              typeof formik.errors.password === "string"
                ? formik.errors.password
                : ""
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
            Войти
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;

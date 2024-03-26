import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { IUserRegistrationData } from "../../types/types";
import { validationRegisterSchema } from "../../helpers/validation.schemas";
import { initialRegisterScheme } from "../InitialValues/initialValues";


interface RegistrationFormProps {
    onSubmit: (values: IUserRegistrationData) => Promise<void>;
  }



const RegistrationForm= ({ onSubmit }: RegistrationFormProps) => {

  const formik = useFormik({
    initialValues: initialRegisterScheme,
    validationSchema: validationRegisterSchema,
    onSubmit: async (values) => {
      await onSubmit(values as IUserRegistrationData);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="fullName"
            label="ФИО"
            autoComplete="fullName"
            {...formik.getFieldProps("fullName")}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
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
            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
            helperText={formik.touched.birthDate && formik.errors.birthDate}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
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
              formik.touched.confirmPassword && formik.errors.confirmPassword
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
  );
};

export default RegistrationForm;

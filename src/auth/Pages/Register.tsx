import {
  Grid,
  TextField,
  Link,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { FormEvent, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  StateFormValidator as StateFormValidator,
  useForm,
} from "../../hooks/useForm";
import {
  startRegisterUserWithCredential,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { AuthLayout } from "./authLayout";
import { AuthState } from "../../types";

const formValidations: StateFormValidator = {
  email: [
    (value: string) => value.includes("@"),
    "El correo debe de tener una @",
  ],
  password: [
    (value: string) => value.length >= 6,
    "El password debe de tener más de 6 letras.",
  ],
  displayName: [
    (value: string) => value.length >= 1,
    "El nombre es obligatorio.",
  ],
};

const formData ={
  displayName: "",
  email: "",
  password: "",
}

export const Register = () => {
  const {
    email,
    password,
    displayName,
    emailValid,
    passwordValid,
    displayNameValid,
    formState,
    onInputChange,
    isFormValid,
  } = useForm<AuthState>(
    formData,
    formValidations
  );

  const [formSubmited, setFormSubmited] = useState(false);
  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const isCheckingAuth = useMemo(() => status === "checking", [status]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;
    dispatch(startRegisterUserWithCredential(formState));
  };
  return (
    <AuthLayout title="Registrar usuario">
      <form onSubmit={onSubmit} noValidate>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              data-testid="displayName"
              label="Nombre Completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth={true}
              value={displayName}
              name="displayName"
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={formSubmited ? displayNameValid : ""}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              data-testid="email"
              label="Correo"
              type="email"
              placeholder="Correo"
              fullWidth={true}
              value={email}
              name="email"
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={formSubmited ? emailValid : ""}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              data-testid="password"
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth={true}
              value={password}
              name="password"
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={formSubmited ? passwordValid : ""}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'} data-testid="error-msg">
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuth}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una Crear?</Typography>
            <Link to={"/auth/login"} component={RouterLink} color="inherit">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

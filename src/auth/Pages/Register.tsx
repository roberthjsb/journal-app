import { Google } from "@mui/icons-material";
import { Grid, TextField, Link, Button, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  stateFormValidator as StateFormValidator,
  useForm,
} from "../../hooks/useForm";
import { AuthLayout } from "./authLayout";

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

export const Register = () => {
  const {
    email,
    password,
    displayName,
    emailValid,
    passwordValid,
    displayNameValid,
    onInputChange,
    isFormValid,
  } = useForm(
    {
      displayName: "",
      email: "",
      password: "",
    },
    formValidations
  );

  const [formSubmited, setFormSubmited] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmited(true);
  };
  return (
    <AuthLayout title="Registrar usuario">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
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
            <Grid item xs={12}>
              <Button variant="contained" fullWidth type="submit">
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}> ¿Ya tienes una Crear?</Typography>
            <Link to={"/auth/login"} component={RouterLink} color="inherit">
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

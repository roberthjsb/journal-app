import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import { AuthLayout } from "../../auth/Pages/authLayout";

export const AuthChecking = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
     <CircularProgress color="info" />
    </Grid>
  );
};

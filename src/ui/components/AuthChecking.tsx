import { CircularProgress, Grid } from "@mui/material";

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

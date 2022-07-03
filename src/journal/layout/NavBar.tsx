import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { StartLogut, useAppDispatch } from "../../store";

export const NavBar: FC<{ drawerWidth: number }> = ({ drawerWidth }) => {
  const dispatch = useAppDispatch()
  const onLogout=()=>{
      dispatch(StartLogut())
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography variant="h6" noWrap component={"div"}>
            Journal App
          </Typography>
          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

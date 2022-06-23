import { Box, Toolbar } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";

const drawerWidth = 240;
export const JournalLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth}/>
      <SideBar drawerWidth={drawerWidth}/>
      <Box component={"main"} sx={{ flexGrow: 1, p: 1 , width:`calc(100% - ${drawerWidth}px)`}}>
        <Toolbar/>
        {children}
      </Box>
    </Box>
  );
};

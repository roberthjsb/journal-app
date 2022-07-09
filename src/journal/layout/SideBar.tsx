import {
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../store";
import { SideBarItem } from "./SideBarItem";

export const SideBar: FC<{ drawerWidth: number }> = ({ drawerWidth }) => {
  const { displayName } = useAppSelector((state) => state.auth);
  const { notes } = useAppSelector((state) => state.journal);
  return (
    <Box
      component={"nav"}
      sx={{ width: { sm: drawerWidth, flexShrink: { sm: 0 } } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" component={"div"} noWrap>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => {
            console.log(note.id)
            return <SideBarItem key={note.id} note={note} />}
          )}
        </List>
      </Drawer>
    </Box>
  );
};

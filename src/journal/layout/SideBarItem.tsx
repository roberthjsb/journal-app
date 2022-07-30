import { TurnedInNot } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from "@mui/material";
import { FC, useMemo } from "react";
import { useAppDispatch } from "../../store";
import {  setActiveNote } from "../../store/journal/journalSlice";
import { JournalNote } from "../../types";

export const SideBarItem: FC<{ note: JournalNote }> = ({ note }) => {
  const dispatch = useAppDispatch();
  const { title, body } = note;
  //TODO: esto se podria hacer con css
  const newTitle: string = useMemo(() => {
    return title.length > 17 ? `${title.substring(0, 17)}...` : title;
  }, [title]);

  const handlerClickItem = (): void => {
    dispatch(setActiveNote(note));
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handlerClickItem}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

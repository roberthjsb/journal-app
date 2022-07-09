import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import { startNewNote } from "../../store/journal/thunks";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView } from "../views/NoteView";
import { NothingSelectedView } from "../views/NothingSelectedView";

export const Journal = () => {
  const dispatch = useAppDispatch();
  const { active, isSaving } = useAppSelector((state) => state.journal);
  const newNote = () => dispatch(startNewNote());
  return (
    <JournalLayout>
      {/* <Typography >Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis amet culpa illum quaerat consectetur beatae earum, quae, expedita eligendi, labore animi nemo et repellendus dicta sunt dolore harum est veniam.</Typography> */}
      {!!active ? <NoteView /> : <NothingSelectedView />}
      <IconButton
        disabled={isSaving}
        onClick={newNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 20,
          bottom: 50,
        }}
      >
        <AddOutlined />
      </IconButton>
    </JournalLayout>
  );
};

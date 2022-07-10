import { SaveOutlined, UploadFileOutlined,DeleteOutline } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteNoteById, setActiveNote } from "../../store/journal/journalSlice";
import {
  startUpdateNote,
  startUploadingFile,
} from "../../store/journal/thunks";
import { ImageGallery } from "../components/ImageGallery";

export const NoteView = () => {
  const {
    active: activeNote,
    isSaving,
    messageSaved,
  } = useAppSelector((state) => state.journal);

  const dispatch = useAppDispatch();
  const { title, body, date,id, formState, onInputChange } = useForm(activeNote!);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [title, body]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire({
        title: "Nota actualizada",
        text: messageSaved,
        icon: "success",
      });
    }
  }, [messageSaved]);

  const saveNote = () => {
    dispatch(startUpdateNote());
  };
  const onFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return;
    const files = Array.from(target.files);
    dispatch(startUploadingFile(files));
  };
  const onDelete = ()=>{
      dispatch(deleteNoteById(id))
  }

  return (
    <Grid
      container
      direction={"row"}
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <input
          ref={fileInputRef}
          type={"file"}
          multiple
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <IconButton
          color="primary"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadFileOutlined />
        </IconButton>

        <Button
          onClick={saveNote}
          disabled={isSaving}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type={title}
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          value={title}
          name={"title"}
          onChange={onInputChange}
        />
        <TextField
          type={body}
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Que sucedio el dia de hoy?"
          minRows={5}
          value={body}
          name={"body"}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent={'end'}>
        <Button color="error" sx={{mt:2}} onClick={onDelete}>
        <DeleteOutline/>
        Borrar
        </Button>
      </Grid>
      <ImageGallery images={activeNote?.imageUrls??[]} />
    </Grid>
  );
};

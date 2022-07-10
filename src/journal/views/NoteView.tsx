import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../store";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startUpdateNote } from "../../store/journal/thunks";
import { ImageGallery } from "../components/ImageGallery";

export const NoteView = () => {
  const { active: activeNote,isSaving,messageSaved } = useAppSelector((state) => state.journal);
  const dispatch = useAppDispatch();
  const { title, body, date, formState, onInputChange } = useForm(activeNote!);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [title, body]);

  useEffect(() => {
    if(messageSaved.length>0){
      Swal.fire({
        title:'Nota actualizada',
        text:messageSaved,
        icon:'success'
      })
    }
  
  }, [messageSaved])
  

  const saveNote = () => {
    dispatch(startUpdateNote());
  };

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
        <Button onClick={saveNote} disabled={isSaving} color="primary" sx={{ padding: 2 }}>
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
      <ImageGallery />
    </Grid>
  );
};

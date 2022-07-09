import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { useAppSelector } from "../../store";
import { JournalNote } from "../../store/journal/journalSlice";
import { ImageGallery } from "../components/ImageGallery";
import { Journal } from "../Pages/Journal";

export const NoteView = () => {
  const { active: activeNote } = useAppSelector((state) => state.journal);
  const { title, body, date, onInputChange } = useForm(activeNote!);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

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
        <Button color="primary" sx={{ padding: 2 }}>
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
          name={'title'}
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
          name={'body'}
          onChange={onInputChange}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};

import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";

import { NoteView } from "../../../journal/views/NoteView";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  journalSlice,
  setActiveNote,
  updateNote,
} from "../../../store/journal/journalSlice";
import { journalTestWithInfo } from "../../fixtures/journalFixture";
import { authSlice } from "../../../store";
import * as thunks from "../../../store/journal/thunks";

import Swal from "sweetalert2";
import { vi } from "vitest";
import userEvent, { PointerEventsCheckLevel } from "@testing-library/user-event";


const testStore = configureStore({
  reducer: {
    journal: journalSlice.reducer,
    auth: authSlice.reducer,
  },
  preloadedState: { journal: journalTestWithInfo, auth: {} },
});

vi.mock('firebase/auth')

describe("NoteView", () => {
  const title = "new title test";
  const body = "this is test";
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    testStore.dispatch = mockDispatch;
   
  });

  test("should update active note when change input title or text body", async () => {
    render(
      <Provider store={testStore}>
        <NoteView />
      </Provider>
    );
    const bodyTxtArea = screen.getByPlaceholderText(
      /Que sucedio el dia de hoy/i
    );
    const titleInput = screen.getByPlaceholderText(/Ingrese un título/i);
    await userEvent.type(titleInput, title, { pointerEventsCheck: PointerEventsCheckLevel.Never });
    await userEvent.type(bodyTxtArea, body, { pointerEventsCheck: PointerEventsCheckLevel.Never });
    waitFor(()=>{
      const active = journalTestWithInfo.active!;
      expect(mockDispatch).toHaveBeenCalledWith(setActiveNote(active));
    })
  });

  test("should call startUpdateNote when clicked button Guardar ", () => {
    render(
      <Provider store={testStore}>
        <NoteView />
      </Provider>
    );
    testStore.dispatch = mockDispatch;
    const startUpdateNotespy = vi.spyOn(thunks, "startUpdateNote");

    const btnGuardar = screen.getByText("Guardar");
    mockDispatch.mockReset();
    fireEvent.click(btnGuardar);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(startUpdateNotespy).toHaveBeenCalledTimes(1);
  });

  test("should call deleteNote when clicked button delete ", () => {
    render(
      <Provider store={testStore}>
        <NoteView />
      </Provider>
    );
    testStore.dispatch = mockDispatch;
    const startDeleteNotespy = vi.spyOn(thunks, "startDeleteNote");

    const btnBorrar = screen.getByText("Borrar");
    mockDispatch.mockReset();
    fireEvent.click(btnBorrar);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(startDeleteNotespy).toHaveBeenCalledTimes(1);
  });

  //TODO:test click en botton subir archivo

  test("should call onFileChange  when trigger event change ", async () => {
    render(
      <Provider store={testStore}>
        <NoteView />
      </Provider>
    );
    const files = ["foto.jpg", "foto2.jpg"];
    const startUploadingFilespy = vi.spyOn(thunks, "startUploadingFile");
    const fileInput = screen.getByTestId("fileInput");

    fireEvent.change(fileInput, { target: { files } });

    expect(startUploadingFilespy).toHaveBeenCalledTimes(1);
    expect(startUploadingFilespy).toHaveBeenCalledWith(files);
  });

  test("should call Swal.fire when saveMessage change ", async () => {
    
    const testStore = configureStore({
      reducer: {
        journal: journalSlice.reducer,
        auth: authSlice.reducer,
      },
      preloadedState: { journal: journalTestWithInfo },
    });
    const SwalFireSpy = vi.spyOn(Swal, "fire");
    testStore.dispatch(updateNote(journalTestWithInfo.active!));

    render(
      <Provider store={testStore}>
        <NoteView />
      </Provider>
    );

    await waitFor(() => {
      expect(SwalFireSpy).toHaveBeenCalledTimes(1);
      expect(SwalFireSpy).toHaveBeenCalledWith({
        title: "Nota actualizada",
        text: `${journalTestWithInfo.active?.title}, actualizada correctamente`,
        icon: "success",
      });
    });
  });
});

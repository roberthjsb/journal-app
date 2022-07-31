import * as React from "react";
import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";

import { NoteView } from "../../../src/journal/views/NoteView";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  journalSlice,
  setActiveNote,
  updateNote,
} from "../../../src/store/journal/journalSlice";
import { journalTestWithInfo } from "../../fixtures/journalFixture";
import { authSlice } from "../../../src/store";
import * as thunks from "../../../src/store/journal/thunks";

import Swal from "sweetalert2";

const testStore = configureStore({
  reducer: {
    journal: journalSlice.reducer,
    auth: authSlice.reducer,
  },
  preloadedState: { journal: journalTestWithInfo , auth:{}},
});

describe("NoteView", () => {
  const title = "new title test";
  const body = "this is test";
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
    testStore.dispatch = mockDispatch;
    render(
      <Provider store={testStore}>
        <NoteView />
      </Provider>
    );
  });

  test("should update active note when change input title or text body", async () => {
    const bodyTxtArea = screen.getByPlaceholderText(
      /Que sucedio el dia de hoy/i
    );
    const titleInput = screen.getByPlaceholderText(/Ingrese un título/i);

    fireEvent.change(titleInput, { target: { name: "title", value: title } });
    fireEvent.change(bodyTxtArea, { target: { name: "body", value: body } });

    const active = journalTestWithInfo.active!;
    expect(mockDispatch).toHaveBeenCalledWith(setActiveNote(active));
    expect(mockDispatch).toHaveBeenCalledWith(
      setActiveNote({ ...active, title })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      setActiveNote({ ...active, title, body })
    );
  });

  test("should call startUpdateNote when clicked button Guardar ", () => {
    testStore.dispatch = mockDispatch;
    const startUpdateNotespy = jest.spyOn(thunks, "startUpdateNote");

    const btnGuardar = screen.getByText("Guardar");
    mockDispatch.mockReset();
    fireEvent.click(btnGuardar);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(startUpdateNotespy).toHaveBeenCalledTimes(1);
  });

  test("should call deleteNote when clicked button delete ", () => {
    testStore.dispatch = mockDispatch;
    const startDeleteNotespy = jest.spyOn(thunks, "startDeleteNote");

    const btnBorrar = screen.getByText("Borrar");
    mockDispatch.mockReset();
    fireEvent.click(btnBorrar);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(startDeleteNotespy).toHaveBeenCalledTimes(1);
  });

  //TODO:test click en botton subir archivo

  test("should call onFileChange  when trigger event change ", async () => {
    const files = ["foto.jpg", "foto2.jpg"];
    const startUploadingFilespy = jest.spyOn(thunks, "startUploadingFile");
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
    const SwalFireSpy = jest.spyOn(Swal, "fire");

    render(
      <Provider store={testStore}>
        <NoteView />
      </Provider>
    );

    testStore.dispatch(updateNote(journalTestWithInfo.active!));
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

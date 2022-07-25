import React from "react";
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
} from "../../../src/store/journal/journalSlice";
import { journalTestWithInfo } from "../../fixtures/journalFixture";
import { AppDispatch, authSlice, RootState } from "../../../src/store";
import * as thunks from "../../../src/store/journal/thunks";

const testStore = configureStore({
  reducer: {
    journal: journalSlice.reducer,
    auth: authSlice.reducer,
  },
  preloadedState: { journal: journalTestWithInfo },
});

describe("NoteView", () => {
  const title = "new title test";
  const body = "this is test";
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
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

  test("should call saveNote when clicked button save ", () => {
    testStore.dispatch = mockDispatch;
    const startUpdateNotespy = jest.spyOn(thunks, "startUpdateNote");
   

    render(
      <Provider store={testStore}>
        <NoteView />
      </Provider>
    );

    const btnGuardar = screen.getByText("Guardar");
    mockDispatch.mockReset()
  
    fireEvent.click(btnGuardar);
   
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(startUpdateNotespy).toHaveBeenCalledTimes(1);
  });
});

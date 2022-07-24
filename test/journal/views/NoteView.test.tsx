import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { NoteView } from "../../../src/journal/views/NoteView";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { journalSlice, setActiveNote } from "../../../src/store/journal/journalSlice";
import { journalTestWithInfo } from "../../fixtures/journalFixture";
const testStore = configureStore({
  reducer: {
    journal: journalSlice.reducer,
  },
  preloadedState: { journal: journalTestWithInfo },
});

describe.only("NoteView", () => {
 //TODO: preparar Mocks
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call saveNote when clicked button save", () => {
    const title = "new title test";
    const body = "this is test";
  
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

     const btnGuardar = screen.getByText('Guardar')
    fireEvent.click(btnGuardar);

  });
});

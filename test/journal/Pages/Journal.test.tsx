import React from "react";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Journal } from "../../../src/journal/Pages/Journal";
import { render, testStore } from "../../fixtures/storeFixture";
import {
  journalTestWithInfo,
  testInitialStateJournal,
} from "../../fixtures/journalFixture";
import * as thunks from "../../../src/store/journal/thunks";

describe("Pages/Journal", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  test("should be button add enabled ", () => {
    render(<Journal />, testStore(testInitialStateJournal));
    const btn = screen.getByTestId("AddBtn");
    expect(btn).not.toBeDisabled();
  });

  test("should call newNote when clicked button add ", () => {
    const store = testStore(testInitialStateJournal);
    const { dispatch } = store;
    const mockDispatch = jest.fn(() => dispatch);
    (store.dispatch as any)=mockDispatch
    const spy =jest.spyOn(thunks,'startNewNote')
    render(<Journal />, store);

    const btn = screen.getByTestId("AddBtn");
    fireEvent.click(btn);
    
    expect(mockDispatch).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  test("should show nothingSelected when active note is null", () => {
    render(<Journal />, testStore(testInitialStateJournal));
    const nothingSelected = screen.getByText(/Selecciona o crea una entrada/i);
    expect(nothingSelected).toBeInTheDocument();
  });

  test("should show noteView when active note have values", () => {
    
    render(<Journal />, testStore(journalTestWithInfo));
    const NoteForm = screen.getByTestId("NoteActive");
    expect(NoteForm).toBeInTheDocument();
  });
});

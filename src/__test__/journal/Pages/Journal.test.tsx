import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Journal } from "../../../journal/Pages/Journal";
import { render, testStore } from "../../fixtures/storeFixture";
import {
  journalTestWithInfo,
  testInitialStateJournal,
} from "../../fixtures/journalFixture";
import * as thunks from "../../../store/journal/thunks";
import { vi } from "vitest";

describe("Pages/Journal", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  test("should be button add enabled ", () => {
    render(<Journal />, testStore({journal:testInitialStateJournal}));
    const btn = screen.getByTestId("AddBtn");
    expect(btn).not.toBeDisabled();
  });

  test("should call newNote when clicked button add ", () => {
    const store = testStore({journal:testInitialStateJournal});
    const { dispatch } = store;
    const mockDispatch = vi.fn(() => dispatch);
    (store.dispatch as any)=mockDispatch
    const spy =vi.spyOn(thunks,'startNewNote')
    render(<Journal />, store);

    const btn = screen.getByTestId("AddBtn");
    fireEvent.click(btn);
    
    expect(mockDispatch).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  test("should show nothingSelected when active note is null", () => {
    render(<Journal />, testStore({journal:testInitialStateJournal}));
    const nothingSelected = screen.getByText(/Selecciona o crea una entrada/i);
    expect(nothingSelected).toBeInTheDocument();
  });

  test("should show noteView when active note have values", () => {
    
    render(<Journal />, testStore({journal:journalTestWithInfo}));
    const NoteForm = screen.getByTestId("NoteActive");
    expect(NoteForm).toBeInTheDocument();
  });
});

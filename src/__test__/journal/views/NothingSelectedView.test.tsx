import React from "react";
import {screen} from '@testing-library/react'
import { NothingSelectedView } from "../../../journal/views/NothingSelectedView";
import { render, testStore } from "../../fixtures/storeFixture";

describe("NothingSelectedView", () => {
  test("should render component NothingSelectedView", () => {
   render(<NothingSelectedView />,testStore({}));
    expect(screen.getByText(/Selecciona o crea una entrada/)).toBeTruthy()
  });
});

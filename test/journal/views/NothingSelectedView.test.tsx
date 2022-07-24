import React from "react";
import {render,screen} from '@testing-library/react'
import { NothingSelectedView } from "../../../src/journal/views/NothingSelectedView";

describe("NothingSelectedView", () => {
  test("should render component NothingSelectedView", () => {
   render(<NothingSelectedView />);
    expect(screen.getByText(/Selecciona o crea una entrada/)).toBeTruthy()
  });
});

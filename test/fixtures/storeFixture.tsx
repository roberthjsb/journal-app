import { render as renderRL, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "../../src/store";
import { journalSlice } from "../../src/store/journal/journalSlice";
import { journalTestWithInfo } from "./journalFixture";

export const testStore = (state: any) =>
  configureStore({
    reducer: {
      journal: journalSlice.reducer,
      auth: authSlice.reducer,
    },
    preloadedState: { journal: state },
  });
export interface WrapperProps {
  children: ReactElement;
}
export const render = (
  ui: ReactElement,
  store: any,
  renderOptions?: RenderOptions
) => {
  const Wrapper = ({ children }: WrapperProps): ReactElement => (
    <Provider store={store}>{children}</Provider>
  );
  return renderRL(ui, { wrapper: Wrapper, ...renderOptions });
};

import { render as renderRL, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "../../store";
import { journalSlice } from "../../store/journal/journalSlice";
import { MemoryRouter } from "react-router-dom";

export const testStore = (state: any) =>
  configureStore({
    reducer: {
      journal: journalSlice.reducer,
      auth: authSlice.reducer,
    },
    preloadedState:   state ,
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
    <Provider store={store}>
      <MemoryRouter>
      {children}
      </MemoryRouter>
    </Provider>
  );
  return renderRL(ui, { wrapper: Wrapper, ...renderOptions });
};


export const wrapperWithRedux=(store:any) => ({ children }:WrapperProps) => (
  <Provider store={ store }>{children}</Provider>
 )

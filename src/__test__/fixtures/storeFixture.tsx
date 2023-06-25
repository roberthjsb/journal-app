import { render as renderRL, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { configureStore,clearAllListeners } from "@reduxjs/toolkit";

import { authSlice } from "../../store/auth/authSlice";
import { journalSlice } from "../../store/journal/journalSlice";
import { MemoryRouter as Router} from 'react-router-dom'
import { StoreState } from "../../types";

export const testStore = (state: Partial<StoreState>) =>
  configureStore({
    reducer: {
      journal: journalSlice.reducer,
      auth: authSlice.reducer,
    },
    preloadedState: state,
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

export const renderWithRouter = (
  ui: ReactElement,
  store: any,
  renderOptions?: RenderOptions
) => {
  const Wrapper = ({ children }: WrapperProps): ReactElement => (
   <Router>
     <Provider store={store}>{children}</Provider>
   </Router>
  );
  return renderRL(ui, { wrapper: Wrapper, ...renderOptions });
};


export const wrapperWithRedux=(store:any) => ({ children }:WrapperProps) => (
  <Provider store={ store }>{children}</Provider>
 )

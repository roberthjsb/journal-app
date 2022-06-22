import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./themes/AppTheme";

export const JournalApp: React.FC = () => (
  <BrowserRouter>
    <AppTheme>
      <AppRouter />
    </AppTheme>
  </BrowserRouter>
);

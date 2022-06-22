import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthRouter } from "../auth/router/AuthRouter";
import { Journal } from "../journal/Pages/Journal";
import { JournalApp } from "../JournalApp";

export const AppRouter = () => (
  <Routes>
    <Route path="auth/*" element={<AuthRouter />} />
    <Route path="*" element={<Journal/>} />
  </Routes>
);

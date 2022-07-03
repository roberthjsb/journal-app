import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRouter } from "../auth/router/AuthRouter";
import { FirebaseAuth } from "../firebase/config";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { JournalRouter } from "../journal/router/JournalRouter";
import { login, logout, useAppDispatch, useAppSelector } from "../store";
import { AuthChecking } from "../ui/components/AuthChecking";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === "checking") return <AuthChecking />;
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRouter />} />
      ) : (
        <Route path="/auth/*" element={<AuthRouter />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";

export type AuthUser = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  // add more fields if you want, or just use `any`
};

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home requires login */}
        <Route
          path="/"
          element={
            token ? (
              <Home user={user} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* Sign In page */}
        <Route
          path="/signin"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <SignIn setToken={setToken} setUser={setUser} />
            )
          }
        />

        {/* SignUp still available if you want it */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history/:id"
          element={
            <ProtectedRoute>
              <HistoryDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

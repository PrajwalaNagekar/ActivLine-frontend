import React from "react";
import { useEffect } from "react";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Router from "./routes/Router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import AppLoaderGate from "./components/loaders/AppLoaderGate";
import cors from "cors";
import { listenToMessages } from "./components/firebase";

function App() {
    useEffect(() => {
    listenToMessages();
  }, []);
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppLoaderGate>
          <Router />
        </AppLoaderGate>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

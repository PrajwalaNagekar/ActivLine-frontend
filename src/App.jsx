import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Router from "./routes/Router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import AppLoaderGate from "./components/loaders/AppLoaderGate";

function App() {
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

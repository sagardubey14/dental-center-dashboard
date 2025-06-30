import React from "react";
import { AppProvider } from "./context/AppContext";
import Auth from "./Components/Auth";

function App() {
  return (
    <AppProvider>
      <h1 className="text-3xl font-bold underline">dental-center-dashboard</h1>
      <Auth />
    </AppProvider>
  );
}

export default App;

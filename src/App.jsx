import React from "react";
import { AppProvider } from "./context/AppContext";
import Auth from "./Components/Auth";
import AppRoutes from "./Components/AppRoutes";

function App() {
  return (
    <AppProvider>
      <h1 className="text-3xl font-bold underline">dental-center-dashboard</h1>
      {/* <Auth /> */}
      <AppRoutes />
    </AppProvider>
  );
}

export default App;

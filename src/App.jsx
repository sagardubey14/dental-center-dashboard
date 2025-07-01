import React from "react";
import { AppProvider } from "./context/AppContext";
import Auth from "./Components/Auth";
import AppRoutes from "./AppRoutes";

function App() {
  
  return (
    <AppProvider>
      {/* <h1 className="text-3xl font-bold underline">dental-center-dashboard</h1> */}
      <AppRoutes />
    </AppProvider>
  );
}

export default App;

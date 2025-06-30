import { createContext, useContext, useEffect, useState } from "react";
import NotificationPopup from "../Components/NotificationPopup";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [message, setMessage] = useState(null);

  const notify = (type, text) => {
    setMessage({ type, text });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AppContext.Provider value={{ user, setUser, notify }}>
      {children}
      {message && (
        <NotificationPopup message={message} onClose={() => setMessage(null)} />
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

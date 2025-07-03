import { createContext, useContext, useEffect, useState } from "react";
import NotificationPopup from "../Components/NotificationPopup";
import { useNavigate } from "react-router-dom";
import { mockData } from "../data/seedUsers";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers]= useState(mockData.users);
  const [patients, setPatients]= useState(mockData.patients);
  const [incidents, setIncidents]= useState(mockData.incidents);
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
    <AppContext.Provider value={{ user, setUser, notify, navigate, users, setUsers, patients, setPatients, incidents, setIncidents }}>
      {children}
      {message && (
        <NotificationPopup message={message} onClose={() => setMessage(null)} />
      )}
    </AppContext.Provider>
  );
};

export function useApp() {
  return useContext(AppContext);
}

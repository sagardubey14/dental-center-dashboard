import { useEffect, useState } from "react";

export default function NotificationPopup({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(enterTimer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-100 transform transition-all duration-300 ease-in-out
        px-6 py-3 rounded shadow text-white flex items-center justify-between gap-4
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}
    >
      <span>{message.text}</span>
      <button onClick={handleClose} className="text-white font-bold text-xl leading-none">
        ×
      </button>
    </div>
  );
}

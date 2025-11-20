import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(4000);

  // Llama esto para mostrar una notificación
  const notify = useCallback(({ success, message, duration = 4000 }) => {
    setSuccess(!!success);
    setMessage(message);
    setDuration(duration);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifier = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotifier debe usarse dentro de NotificationProvider");
  return context.notify;
};

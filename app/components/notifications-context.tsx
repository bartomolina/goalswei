import { createContext, useContext, useState } from "react";

const NotificationsContext = createContext({
  show: false,
  setShow: () => {},
  notification: {},
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }: React.PropsWithChildren) => {
  const [show, setShow] = useState(true);
  const [notification, setNotification] = useState({
    error: false,
    message: "Completed!",
    txId: "0x",
  });

  // @ts-ignore
  return (
    <NotificationsContext.Provider value={{ show, setShow, notification }}>
      {children}
    </NotificationsContext.Provider>
  );
};

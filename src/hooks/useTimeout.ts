import { useState, useEffect } from "react";

export const useTimeout = (timeout: number): boolean => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout]);

  return showAlert;
};

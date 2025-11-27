import { useEffect, useRef } from "react";
const SESSION_TIMEOUT = 30000000;
const useSessionTimeout = (logoutCallback, timeoutDuration = SESSION_TIMEOUT) => {
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(logoutCallback, timeoutDuration);
  };

  // Initialize listeners for user activity
  useEffect(() => {
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimeout));

    resetTimeout(); 

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimeout));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [logoutCallback, timeoutDuration]);
};

export default useSessionTimeout;
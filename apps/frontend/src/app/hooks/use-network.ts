import { useEffect, useState } from 'react';

export const useNetwork = () => {
  const [online, setOnline] = useState(navigator.onLine);

  const goOnline = () => setOnline(true);
  const goOffline = () => setOnline(false);

  useEffect(() => {
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return online;
};

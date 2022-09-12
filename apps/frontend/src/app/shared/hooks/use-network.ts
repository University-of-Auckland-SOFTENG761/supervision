import { useEffect, useState } from 'react';

/*
Pings google.com to check for internet connection.
 */
const ping = async () => {
  if (!navigator.onLine) return false;

  try {
    await fetch('https://www.google.com/', {
      mode: 'no-cors',
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const useNetwork = () => {
  const [online, setOnline] = useState(navigator.onLine);
  console.log(online);

  const checkOnline = async () => {
    // Ping google.com to check for internet connection (navigator.onLine only checks network connection)
    const online = await ping();
    setOnline(online);
  };

  const goOffline = () => setOnline(false);
  const goOnline = () => setOnline(true);

  useEffect(() => {
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    checkOnline();
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return online;
};

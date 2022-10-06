import { useEffect, useState } from 'react';
import environment from '@environment';
import { showNotification } from '@mantine/notifications';

/*
Pings api to check for internet connection.
 */
const ping = async () => {
  if (!navigator.onLine) return false;

  try {
    const url = new URL('ping', environment.api_url);
    await fetch(url);
    return true;
  } catch (error) {
    return false;
  }
};

let lastPing = true;

const setNotification = async () => {
  const pingResult = await ping();
  if (pingResult !== lastPing) {
    if (pingResult === true) {
      showNotification({
        title: 'You are online',
        message: '',
        autoClose: 3000,
      });
    } else {
      showNotification({
        title: 'You are offline',
        message: 'Please try to reconnect when possible',
        autoClose: 3000,
      });
    }

    lastPing = pingResult;
  }
};

setInterval(setNotification, 6 * 1000);

export const useNetwork = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

  const checkOnline = async () => {
    // Ping api to check for internet connection (navigator.onLine only checks network connection)
    const online = await ping();
    setOnline(online);
  };

  const goOffline = () => setOnline(false);
  const goOnline = () => setOnline(true);

  useEffect(() => {
    setIsLoading(true);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    checkOnline();
    setIsLoading(false);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return { online, isLoading };
};

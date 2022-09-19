import { useEffect, useState } from 'react';
import environment from '@environment';

/*
Pings api to check for internet connection.
 */
const ping = async () => {
  if (!navigator.onLine) return false;

  try {
    const url = new URL('health', environment.api_url);
    const response = await fetch(url, {
      mode: 'no-cors',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

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

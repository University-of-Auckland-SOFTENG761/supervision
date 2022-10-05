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

const setNotification = async () => {
  const pingResult = await ping();
  if (pingResult == true) {
    showNotification({
      title: 'True ping',
      message: 'i hate react',
      autoClose: 3000,
    });
  } else {
    showNotification({
      title: 'False ping',
      message: 'i still hate react',
      autoClose: 3000,
    });
  }
};

setInterval(setNotification, 6 * 1000);

// export const IsOnline = () => {

//   const [lastPing, setLastPing] = useState(false);

//   const setNotification = async () => {
//     const pingResult = await ping();
//     if (pingResult !== lastPing) {
//       showNotification({
//         title: 'True ping',
//         message: 'i hate react',
//         autoClose: 3000,
//       })
//       setLastPing(pingResult);
//     } else {
//       showNotification({
//         title: 'False ping',
//         message: 'i still hate react',
//         autoClose: 3000,
//       })
//     }
//   }

//   setInterval(setNotification, 6*1000)
// }

export const useNetwork = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const [lastPing, setLastPing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkOnline = async () => {
    // Ping api to check for internet connection (navigator.onLine only checks network connection)
    const online = await ping();
    // if (online !== lastPing) {
    //   setLastPing(online);
    //   // setNotification();
    // }
    setOnline(online);
  };

  // const setNotification = () => {
  //   if (online !== lastPing) {
  //     showNotification({
  //     title: 'Default notification',
  //     message: 'Hey there, your code is awesome! 🤥',
  //     autoClose: 3000,
  //   })
  //   setLastPing(online);
  //   }
  // }

  // // setNotification();

  // const reCheckOnline = async () => {
  //   await checkOnline();
  //   setNotification();
  // }

  // setInterval(reCheckOnline, 6000)

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

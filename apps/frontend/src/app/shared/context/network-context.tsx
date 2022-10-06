import {
  createContext,
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { showNotification } from '@mantine/notifications';
import environment from '@environment';

interface INetworkContext {
  online: MutableRefObject<boolean>;
  isLoading: boolean;
}

const NetworkContext = createContext<Partial<INetworkContext>>({});

type NetworkProviderProps = {
  children: React.ReactNode;
};

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

export const NetworkProvider = ({ children }: NetworkProviderProps) => {
  // const [online, setOnline] = useState(navigator.onLine);
  const online = useRef(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

  const setNotification = async (newOnline: boolean) => {
    console.log('newOnline', newOnline);
    console.log('online', online);
    if (newOnline !== online.current) {
      if (newOnline === true) {
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
      online.current = newOnline;
    }
  };

  const checkOnline = async () => {
    // Ping api to check for internet connection (navigator.onLine only checks network connection)
    // setIsLoading(true);
    const newOnline = await ping();
    setNotification(newOnline);
    // setIsLoading(false);
  };

  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    checkOnline();
    intervalRef.current = setInterval(() => checkOnline(), 6 * 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const value = useMemo(
    () => ({ online, isLoading }),
    [online.current, isLoading]
  );

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);

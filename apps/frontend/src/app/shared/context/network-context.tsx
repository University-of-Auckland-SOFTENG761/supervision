import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from 'react';
import { showNotification } from '@mantine/notifications';
import environment from '@environment';

interface INetworkContext {
  online: boolean;
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
  const onlineRef = useRef(navigator.onLine);
  const [online, setOnline] = useState(onlineRef.current);
  const [isLoading, setIsLoading] = useState(false);

  const setNotification = async (newOnline: boolean) => {
    if (newOnline !== onlineRef.current) {
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
      onlineRef.current = newOnline;
    }
  };

  const checkOnline = useCallback(async () => {
    const newOnline = await ping();
    setNotification(newOnline);
    return newOnline;
  }, []);

  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    setIsLoading(true);
    checkOnline();
    intervalRef.current = setInterval(() => {
      checkOnline();
      setOnline(onlineRef.current);
    }, 6 * 1000);
    setIsLoading(false);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [checkOnline]);

  const value = useMemo(() => ({ online, isLoading }), [online, isLoading]);

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MantineTheme from './mantine.config';
import Routes from 'app/routes';
import { Auth0Provider } from '@login';
import { DatabaseProvider, NetworkProvider } from '@shared';

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js');
//   });
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={MantineTheme}
    >
      <NotificationsProvider position="top-center">
        <NetworkProvider>
          <BrowserRouter>
            <Auth0Provider>
              <DatabaseProvider>
                <Routes />
              </DatabaseProvider>
            </Auth0Provider>
          </BrowserRouter>
        </NetworkProvider>
      </NotificationsProvider>
    </MantineProvider>
  </StrictMode>
);

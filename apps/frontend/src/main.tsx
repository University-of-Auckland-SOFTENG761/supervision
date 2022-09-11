import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MantineTheme from './mantine.config';
import Routes from 'app/routes';
import { Auth0Provider } from '@login';

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
      <Auth0Provider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Auth0Provider>
    </MantineProvider>
  </StrictMode>
);

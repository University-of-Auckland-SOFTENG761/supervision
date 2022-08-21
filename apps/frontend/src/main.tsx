import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MantineTheme from './mantine.config';
import App from './app/app';
import Routes from 'app/pages/routes';

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
    <MantineProvider withGlobalStyles withNormalizeCSS theme={MantineTheme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);

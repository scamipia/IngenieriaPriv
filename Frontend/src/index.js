import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from "./theme";
import { BrowserRouter } from 'react-router-dom';
import { DatabaseProvider } from './Mocking';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <DatabaseProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
          <App />
        </DatabaseProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
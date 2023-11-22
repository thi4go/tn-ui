import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LoginScreen from './screens/Login/Login';
import HomeScreen from './screens/Home/Home';

import './App.css';
import AuthProvider from './hocs/AuthProvider';

const queryClient = new QueryClient();

function App() {
  const theme = extendTheme({
    colors: {
      truenorth: {
        blue: '#1FC4DB',
        darkBlue: '#0B132C',
        midBlue: '#136986',
      },
    },
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeScreen />,
    },
    {
      path: '/login',
      element: <LoginScreen />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;

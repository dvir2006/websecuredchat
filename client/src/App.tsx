import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { auth, username } from './utils/signals';
import RegisterPage from './pages/RegisterPage';
import { GetRequest, ProtectedGetRequest, apiUrl } from './services/Server';
import { effect } from '@preact/signals';
import { useComputed } from '@preact/signals-react';
import { useContext } from "preact/hooks";
import { useAuth } from './context/AuthContext';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export const ColorModeContext = React.createContext({toggleColorMode: () => {} });

const App:React.FC = () => {
  const { isAuthenticated } = useAuth();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(() => {
    setMode(prefersDarkMode? "dark":"light");
  }, []);
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo( () => ({toggleColorMode: () => { setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')); } }), []);
  const theme = React.useMemo( () => createTheme({palette: {
    mode,
    primary: {
      main: '#1976d2',
    },
  }}), [mode]);
  return ( 
    <div className="App" style={{ backgroundColor: "background.default" }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={!isAuthenticated ? <LoginPage  /> : <MainPage user={username.value} />} />
              <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <MainPage user={username.value}/>} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>

    </div>
  );
}

export default App;

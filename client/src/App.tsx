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


const App:React.FC = () => {
  const { isAuthenticated } = useAuth();
  return ( 
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <LoginPage  /> : <MainPage user={username.value} />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <MainPage user={username.value}/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

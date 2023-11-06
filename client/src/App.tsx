import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <LoginPage onLogin={HandleLogin} /> : <MainPage onLogout={HandleLogout} />} />
        <Route path="/login" element={!isLoggedIn ? <LoginPage onLogin={HandleLogin} /> : <MainPage onLogout={HandleLogout} />} />
        <Route path="/signup" element={<SignupPage onSignup={HandleSignup} />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

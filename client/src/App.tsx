import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { auth, username } from './utils/signals';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" element={!auth.value.isLoggedIn ? <LoginPage /> : <MainPage user={username} />} />
          <Route path="/login" element={!auth.value.isLoggedIn ? <LoginPage /> : <MainPage user={username}/>} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="*" element={<PageNotFound/>} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;

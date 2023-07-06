import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navbar } from './components/navbar';
import { Login } from './pages/login';
import { Home } from './pages/home'; 

export const appContext= createContext();
function App() {
  const user= useAuthState(auth);
  useEffect(()=>{},[user]);
  return (
    <div className="flex text-center h-screen">
      <appContext.Provider user={user}>
        <Router>
          <Navbar/> 
          <Routes>
            <Route path='/' element={auth?<Home/>:<Login/>}/>
          </Routes>
        </Router>
      </appContext.Provider>
    </div>
  );
}

export default App;

import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navbar } from './components/navbar';
import { Login } from './pages/login';
import { Home } from './pages/home'; 
import { Post } from './pages/post/post';

export const appContext= createContext();
function App() {
  const [user]= useAuthState(auth);
  return (
    <div className="flex text-center h-screen">
      <Router>
        <Navbar user={user}/> 
        <Routes>
          <Route path='/' element={auth?<Home/>:<Login/>}/>
          <Route path='/post' element={<Post user={user}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

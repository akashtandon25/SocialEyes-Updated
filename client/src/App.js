import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navbar } from './components/navbar';
import { Login } from './pages/login';
import { Home } from './pages/home/home'; 
import { Post } from './pages/post/post';

export const appContext= createContext();
function App() {
  const [user]= useAuthState(auth);
  const [ refresh, setRefresh ]=useState(0);
  return (
    <div className="flex text-center h-screen">
      <appContext.Provider value={{refresh,setRefresh}}>
        <Router>
          <Navbar user={user}/> 
          <Routes>
            <Route path='/' element={auth?<Home user={user}/>:<Login/>}/>
            <Route path='/post' element={<Post user={user}/>}/>
          </Routes>
        </Router>
      </appContext.Provider>
    </div>
  );
}

export default App;
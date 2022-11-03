import './App.css';

import {Routes, Route } from "react-router-dom";
import Home from './Componants/Home';
import About from './Componants/About';
import Navbar from './Componants/Navbar';
import NoteState from './context/notes/NoteState';
import Login from './Componants/Login';
import SignUp from './Componants/SignUp';

const  App=()=> {
  return (
   <>
      <NoteState>
      <Navbar/>
      
      <div className='  container mt-4'>
        <Routes>
          <Route   path="/" element={<Home />} />
          <Route   path="/about" element={<About />} />
          <Route   path="/login" element={<Login />} />
          <Route   path="/signup" element={<SignUp />} />
        </Routes>
      </div>
   
    </NoteState>
    </>
   
  );
}

export default App;

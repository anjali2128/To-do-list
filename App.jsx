import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TaskNest from './components/Todo';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <header className="custom-header">
        <div className="logo">📋 TaskNest</div>
        <div className="tagline">Your Daily Goals, Organized</div>
      </header>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<TaskNest />} />
      </Routes>
    </>
  );
}

export default App;

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
  
<header className="tn-header">
  <div className="tn-left">
    <div className="planet">🪐</div>
    <div className="tn-branding">
      <h1 className="tn-brand">TaskNest</h1>
      <h2 className="tn-subtitle">Productivity. Organized.</h2>
    </div>
  </div>

  <div className="tn-right">
    <p className="tn-quote">"The secret to success is consistency."</p>
  </div>
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

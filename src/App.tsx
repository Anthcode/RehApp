import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Board from './pages/Board'

const App:React.FC =()=> {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout  />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="board" element={<Board />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App

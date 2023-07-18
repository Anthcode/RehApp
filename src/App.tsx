import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout  />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

import './App.css'

import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CounterPage from "./pages/CounterPage/CounterPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/counter" element={<CounterPage />} />
      </Routes>
    </div>
  );
}

export default App;
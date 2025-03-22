import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/ai" element={<ChatPage />} />
          <Route path="/ai/*" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
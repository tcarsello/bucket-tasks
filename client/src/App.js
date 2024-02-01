import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Home from './pages/Home.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div id="page-container">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/register"
              element={<Register />}
            />
            <Route 
              path="/login"
              element={<Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

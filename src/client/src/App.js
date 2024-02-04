import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './css/App.css'

import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Home from './pages/Home.js'

import Navbar from './components/Navbar.js'

import { useAuthContext } from './hooks/useAuthContext.js'

function App() {

  const { user} = useAuthContext()

  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <div id="page-container">
          <Routes>
            <Route 
              path="/"
              element={ user ? <Home /> : <Navigate to="/login"/>}
            />
            <Route 
              path="/register"
              element={ user ? <Navigate to="/"/> : <Register />}
            />
            <Route 
              path="/login"
              element={ user ? <Navigate to="/"/> : <Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

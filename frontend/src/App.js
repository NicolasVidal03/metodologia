import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import './App.css';
import PerritoPerdidoForm from './components/PerritoPerdido/PerritoPerdidoForm';
import { AuthContext } from './AuthContext';

const App = () => {
  const { user, logout } = useContext(AuthContext);


  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-brand">
            <span className="brand-title">Canes perdidos</span>
          </div>
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/home">Home</Link></li>
            <li className="navbar-item"><Link to="/perritoperdidoform">Registrar Perrito Perdido</Link></li>
            <li className="navbar-item"><Link to="/login">Login</Link></li>
            {
              user !== null && (
                <li className='navbar-item'><Link to="home" onClick={logout}>Cerrar Sesion</Link></li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perritoperdidoform" element={<PerritoPerdidoForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

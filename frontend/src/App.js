import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import './App.css';
import PerritoPerdidoForm from './components/PerritoPerdido/PerritoPerdidoForm';
import PerritoEncontradoForm from './components/PerritoEncontrado/PerritoEncontradoForm';
import PaginaPerrosPerdidos from './components/PaginaPerroPerdido/PaginaPerroPerdido';
import PaginaPerrosEncontrados from './components/PaginaPerroEncontrado/PaginaPerroEncontrado';
import { AuthContext } from './AuthContext';

const App = () => {
  const { user, logout } = useContext(AuthContext);


  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-brand">
            <span className="brand-title"> <Link to="/home">Canes perdidos</Link></span>
          </div>
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/perroperdido">Perros Perdidos</Link></li>
            <li className="navbar-item"><Link to="/perroencontrado">Perros Encontrados</Link></li>
            <li className="navbar-item"><Link to="/perritoperdidoform">Registrar Perrito Perdido</Link></li>
            <li className="navbar-item"><Link to="/perritoencontradoform">Registrar Perrito Encontrado</Link></li>
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
          <Route path='/perritoencontradoform' element={<PerritoEncontradoForm/>}></Route>
          <Route path='/perroperdido' element={<PaginaPerrosPerdidos/>}/>
          <Route path='/perroencontrado' element={<PaginaPerrosEncontrados/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import Navbar from './estaticos/navbar/Navbar';
import Footer from './estaticos/footer/Footer';
import {Grid} from "@material-ui/core"
import Home from './paginas/home/Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';



function App() {
  return(
    <Router>
        <Navbar />
            <div style={{ minHeight: '100vh' }}>
              <Routes> 
                
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastrousuario" element={<CadastroUsuario/>} />

              </Routes>
                
            </div>
          <Footer />
  </Router>
);
}

export default App;


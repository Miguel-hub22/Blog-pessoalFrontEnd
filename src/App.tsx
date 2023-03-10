import React from 'react';
import Navbar from './estaticos/navbar/Navbar';
import Footer from './estaticos/footer/Footer';
import {Grid} from "@material-ui/core"
import Home from './paginas/home/Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTema from './conponets/temas/listatema/ListaTema';
import ListaPostagem from './conponets/postagens/listapostagem/ListaPostagem';

import CadastroTema from './conponets/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './conponets/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './conponets/temas/deletarTema/DeletarTema';
import CadastroPost from './conponets/postagens/cadastroPost/CadastroPost';
import store from './store/tokens/store';
import { Provider } from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function App() {
  return(
    <Provider store={store}>
      <ToastContainer/>
    <Router>
        <Navbar/>
            <div style={{ minHeight: '100vh' }}>
              <Routes> 
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastrousuario" element={<CadastroUsuario/>} />
              <Route path="/temas" element={<ListaTema/>} />
              <Route path="/posts" element={<ListaPostagem/>} />
              <Route path="/formularioPostagem/" element={<CadastroPost/>} />
              <Route path="/formularioPostagem/:id" element={<CadastroPost/>} />
              <Route path="/formularioTema/" element={<CadastroTema/>} />
              <Route path="/formularioTema/:id" element={<CadastroTema/>} />
              <Route path="/deletarPostagem/:id" element={<DeletarPostagem/>} />
              <Route path="/deletarTema/:id" element={<DeletarTema/>} />
              </Routes>
            </div>
          <Footer />
  </Router>
  </Provider>
);
}

export default App;


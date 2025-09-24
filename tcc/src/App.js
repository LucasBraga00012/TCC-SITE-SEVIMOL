import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Perfil from './components/Perfil';
import RecuperarSenha from './components/RecuperarSenha';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      try {
        const usuario = JSON.parse(usuarioSalvo);
        setUsuarioLogado(usuario);
        setCurrentScreen('perfil');
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('usuarioLogado');
      }
    }
  }, []);

  const handleLoginSucesso = (usuario) => {
    setUsuarioLogado(usuario);
    setCurrentScreen('perfil');
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setUsuarioLogado(null);
    setCurrentScreen('login');
  };

  const handleCadastroSucesso = (usuario) => {
    setUsuarioLogado(usuario);
    setCurrentScreen('perfil');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <Login
            onCadastro={() => setCurrentScreen('cadastro')}
            onRecuperarSenha={() => setCurrentScreen('recuperar-senha')}
            onLoginSucesso={handleLoginSucesso}
          />
        );
      case 'cadastro':
        return (
          <Cadastro
            onVoltarLogin={() => setCurrentScreen('login')}
            onCadastroSucesso={handleCadastroSucesso}
          />
        );
      case 'perfil':
        return (
          <Perfil
            usuario={usuarioLogado}
            onLogout={handleLogout}
            onVoltarLogin={() => setCurrentScreen('login')}
          />
        );
      case 'recuperar-senha':
        return (
          <RecuperarSenha
            onVoltarLogin={() => setCurrentScreen('login')}
          />
        );
      default:
        return (
          <Login
            onCadastro={() => setCurrentScreen('cadastro')}
            onRecuperarSenha={() => setCurrentScreen('recuperar-senha')}
            onLoginSucesso={handleLoginSucesso}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;

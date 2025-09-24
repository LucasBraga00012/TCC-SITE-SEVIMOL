import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import './Login.css';

const Login = ({ onCadastro, onRecuperarSenha, onLoginSucesso }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Buscar usuário no Supabase
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', formData.email)
        .eq('ativo', true)
        .single();

      if (error) {
        throw new Error('Usuário não encontrado ou inativo');
      }

      if (!data) {
        throw new Error('Credenciais inválidas');
      }

      // Verificar senha (em produção, use bcrypt ou similar)
      if (data.senha !== formData.password) {
        throw new Error('Senha incorreta');
      }

      // Login bem-sucedido
      console.log('Login realizado com sucesso:', data);
      
      // Salvar dados do usuário no localStorage
      localStorage.setItem('usuarioLogado', JSON.stringify(data));
      
      // Chamar callback de sucesso
      if (onLoginSucesso) {
        onLoginSucesso(data);
      } else {
        alert(`Bem-vindo, ${data.nome}!`);
      }
      
    } catch (error) {
      console.error('Erro no login:', error);
      alert(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Bem-vindo de volta!</h1>
          <p>Faça login em sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="seu@email.com"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Sua senha"
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Lembrar de mim
            </label>
            <button 
              type="button" 
              onClick={onRecuperarSenha} 
              className="forgot-password"
            >
              Esqueceu a senha?
            </button>
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Não tem uma conta? <button onClick={onCadastro} className="signup-link">Cadastre-se</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

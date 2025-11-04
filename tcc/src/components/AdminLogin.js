import React, { useState } from 'react';
import './AdminLogin.css';
import { supabase } from '../lib/supabase';

const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [createUserData, setCreateUserData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cargo: 'Administrador'
  });
  const [createUserErrors, setCreateUserErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);

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
    setErrors({}); // Limpar erros anteriores
    
    try {
      // Autenticação real com Supabase
      const { data, error } = await supabase.rpc('verificar_login_admin', {
        email_param: formData.email,
        senha_param: formData.password
      });

      if (error) {
        console.error('Erro na autenticação:', error);
        throw new Error('Erro na conexão com o banco de dados');
      }

      if (data && data.length > 0) {
        const admin = data[0];
        
        // Verificar se o usuário está ativo
        if (!admin.ativo) {
          throw new Error('Usuário desabilitado. Entre em contato com o administrador.');
        }

        const adminData = {
          id: admin.id,
          name: admin.nome,
          email: admin.email,
          role: admin.cargo,
          telefone: admin.telefone
        };
        
        // Atualizar último login
        await supabase.rpc('atualizar_ultimo_login', {
          admin_id: admin.id
        });
        
        localStorage.setItem('adminToken', admin.id);
        localStorage.setItem('adminData', JSON.stringify(adminData));
        
        onLoginSuccess(adminData);
      } else {
        throw new Error('Email ou senha incorretos');
      }
      
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({ general: error.message || 'Erro ao fazer login. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUserChange = (e) => {
    const { name, value } = e.target;
    setCreateUserData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando usuário começar a digitar
    if (createUserErrors[name]) {
      setCreateUserErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateCreateUserForm = () => {
    const newErrors = {};

    if (!createUserData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!createUserData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(createUserData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!createUserData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (createUserData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!createUserData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (createUserData.senha !== createUserData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
    }

    if (!createUserData.cargo.trim()) {
      newErrors.cargo = 'Cargo é obrigatório';
    }

    setCreateUserErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    
    if (!validateCreateUserForm()) {
      return;
    }

    setIsCreating(true);
    setCreateUserErrors({}); // Limpar erros anteriores
    
    try {
      // Verificar se o email já existe
      const { data: existingUser, error: checkError } = await supabase
        .from('administradores')
        .select('email')
        .eq('email', createUserData.email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw new Error('Erro ao verificar email existente');
      }

      if (existingUser) {
        throw new Error('Este email já está sendo usado por outro usuário');
      }

      // Criar usuário no banco de dados
      const { data, error } = await supabase
        .from('administradores')
        .insert([{
          nome: createUserData.nome,
          email: createUserData.email,
          senha: createUserData.senha, // Será criptografada pela função crypt() no banco
          cargo: createUserData.cargo,
          telefone: createUserData.telefone || null,
          ativo: true,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Erro ao criar usuário:', error);
        
        // Tratar erros específicos
        if (error.code === '23505') { // Unique violation
          throw new Error('Este email já está sendo usado por outro usuário');
        } else if (error.code === '23502') { // Not null violation
          throw new Error('Todos os campos obrigatórios devem ser preenchidos');
        } else {
          throw new Error('Erro ao criar usuário no banco de dados');
        }
      }

      if (data && data.length > 0) {
        const successMessage = `Usuário "${createUserData.nome}" criado com sucesso!`;
        
        // Limpar formulário e fechar modal
        setCreateUserData({
          nome: '',
          email: '',
          senha: '',
          confirmarSenha: '',
          telefone: '',
          cargo: 'Administrador'
        });
        setCreateUserErrors({});
        setShowCreateUser(false);
        
        // Mostrar mensagem de sucesso
        alert(successMessage);
        
        console.log('Usuário criado:', data[0]);
      } else {
        throw new Error('Erro inesperado ao criar usuário');
      }
      
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setCreateUserErrors({ 
        general: error.message || 'Erro ao criar usuário. Verifique os dados e tente novamente.' 
      });
    } finally {
      setIsCreating(false);
    }
  };

  const closeCreateUserModal = () => {
    setShowCreateUser(false);
    setCreateUserData({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      telefone: '',
      cargo: 'Administrador'
    });
    setCreateUserErrors({});
  };

  return (
    <>
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="login-header">
            <div className="logo">
              <img src="/logo-sevimol.png" alt="SEVIMOL" />
              <div className="logo-text">
                <h1>SEVIMOL</h1>
                <span>Painel Administrativo</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {errors.general && (
              <div className="error-message general-error">
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="admin@sevimol.com.br"
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
                'Entrar no Painel'
              )}
            </button>
          </form>

          <div className="login-footer">
            <div className="credentials-info">
              <p>Credenciais padrão:</p>
              <small>Email: admin@sevimol.com.br | Senha: admin123</small>
            </div>
            
            <button 
              type="button"
              className="create-user-button"
              onClick={() => setShowCreateUser(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="22" y1="11" x2="16" y2="11"></line>
              </svg>
              Criar Novo Usuário
            </button>
            
            <button 
              type="button"
              className="back-button"
              onClick={onBackToSite}
              title="Voltar ao site"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Voltar ao Site
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Criação de Usuário - Renderizado condicionalmente fora do container principal */}
      {showCreateUser && (
        <div className="modal-overlay" onClick={closeCreateUserModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Criar Novo Administrador</h2>
              <button className="close-button" onClick={closeCreateUserModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="create-user-form">
              {createUserErrors.general && (
                <div className="error-message general-error">
                  {createUserErrors.general}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="create-nome">Nome Completo *</label>
                  <input
                    type="text"
                    id="create-nome"
                    name="nome"
                    value={createUserData.nome}
                    onChange={handleCreateUserChange}
                    className={createUserErrors.nome ? 'error' : ''}
                    placeholder="João Silva"
                    disabled={isCreating}
                  />
                  {createUserErrors.nome && <span className="error-message">{createUserErrors.nome}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="create-cargo">Cargo *</label>
                  <select
                    id="create-cargo"
                    name="cargo"
                    value={createUserData.cargo}
                    onChange={handleCreateUserChange}
                    className={createUserErrors.cargo ? 'error' : ''}
                    disabled={isCreating}
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Super Administrador">Super Administrador</option>
                    <option value="Editor">Editor</option>
                    <option value="Moderador">Moderador</option>
                  </select>
                  {createUserErrors.cargo && <span className="error-message">{createUserErrors.cargo}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="create-email">Email *</label>
                <input
                  type="email"
                  id="create-email"
                  name="email"
                  value={createUserData.email}
                  onChange={handleCreateUserChange}
                  className={createUserErrors.email ? 'error' : ''}
                  placeholder="joao@sevimol.com.br"
                  disabled={isCreating}
                />
                {createUserErrors.email && <span className="error-message">{createUserErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="create-telefone">Telefone</label>
                <input
                  type="tel"
                  id="create-telefone"
                  name="telefone"
                  value={createUserData.telefone}
                  onChange={handleCreateUserChange}
                  placeholder="(34) 99999-9999"
                  disabled={isCreating}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="create-senha">Senha *</label>
                  <input
                    type="password"
                    id="create-senha"
                    name="senha"
                    value={createUserData.senha}
                    onChange={handleCreateUserChange}
                    className={createUserErrors.senha ? 'error' : ''}
                    placeholder="Mínimo 6 caracteres"
                    disabled={isCreating}
                  />
                  {createUserErrors.senha && <span className="error-message">{createUserErrors.senha}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="create-confirmarSenha">Confirmar Senha *</label>
                  <input
                    type="password"
                    id="create-confirmarSenha"
                    name="confirmarSenha"
                    value={createUserData.confirmarSenha}
                    onChange={handleCreateUserChange}
                    className={createUserErrors.confirmarSenha ? 'error' : ''}
                    placeholder="Digite a senha novamente"
                    disabled={isCreating}
                  />
                  {createUserErrors.confirmarSenha && <span className="error-message">{createUserErrors.confirmarSenha}</span>}
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button"
                  className="cancel-button"
                  onClick={closeCreateUserModal}
                  disabled={isCreating}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className={`create-button ${isCreating ? 'loading' : ''}`}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <span className="spinner"></span>
                      Criando...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <line x1="19" y1="8" x2="19" y2="14"></line>
                        <line x1="22" y1="11" x2="16" y2="11"></line>
                      </svg>
                      Criar Usuário
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;

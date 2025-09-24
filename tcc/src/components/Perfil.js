import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Perfil.css';

const Perfil = ({ usuario, onLogout, onVoltarLogin }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarNovaSenha: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  useEffect(() => {
    if (usuario) {
      setFormData(prev => ({
        ...prev,
        nome: usuario.nome || '',
        email: usuario.email || '',
        telefone: usuario.telefone || ''
      }));
    }
  }, [usuario]);

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

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({
      ...prev,
      telefone: formatted
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Formato: (11) 99999-9999';
    }

    // Validações para mudança de senha
    if (showPasswordSection) {
      if (!formData.senhaAtual) {
        newErrors.senhaAtual = 'Senha atual é obrigatória';
      }

      if (formData.novaSenha && formData.novaSenha.length < 6) {
        newErrors.novaSenha = 'Nova senha deve ter pelo menos 6 caracteres';
      }

      if (formData.novaSenha && formData.novaSenha !== formData.confirmarNovaSenha) {
        newErrors.confirmarNovaSenha = 'Senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Verificar se email já existe em outro usuário
      if (formData.email !== usuario.email) {
        const { data: existingUser } = await supabase
          .from('usuarios')
          .select('email')
          .eq('email', formData.email)
          .neq('id', usuario.id)
          .single();

        if (existingUser) {
          throw new Error('Este email já está sendo usado por outro usuário');
        }
      }

      // Verificar senha atual se estiver mudando senha
      if (showPasswordSection && formData.senhaAtual) {
        if (formData.senhaAtual !== usuario.senha) {
          throw new Error('Senha atual incorreta');
        }
      }

      // Preparar dados para atualização
      const updateData = {
        nome: formData.nome.trim(),
        email: formData.email.toLowerCase(),
        telefone: formData.telefone,
        data_atualizacao: new Date().toISOString()
      };

      // Adicionar nova senha se fornecida
      if (showPasswordSection && formData.novaSenha) {
        updateData.senha = formData.novaSenha;
      }

      // Atualizar usuário
      const { data, error } = await supabase
        .from('usuarios')
        .update(updateData)
        .eq('id', usuario.id)
        .select();

      if (error) {
        throw new Error('Erro ao atualizar perfil: ' + error.message);
      }

      console.log('Perfil atualizado com sucesso:', data[0]);
      alert('Perfil atualizado com sucesso!');
      
      // Limpar campos de senha
      setFormData(prev => ({
        ...prev,
        senhaAtual: '',
        novaSenha: '',
        confirmarNovaSenha: ''
      }));
      setShowPasswordSection(false);
      setIsEditing(false);
      
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert(error.message || 'Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  if (!usuario) {
    return (
      <div className="perfil-container">
        <div className="perfil-card">
          <div className="perfil-header">
            <h1>Erro</h1>
            <p>Usuário não encontrado</p>
          </div>
          <button onClick={onVoltarLogin} className="voltar-button">
            Voltar ao Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-header">
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações pessoais</p>
        </div>

        <form onSubmit={handleUpdateProfile} className="perfil-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={errors.nome ? 'error' : ''}
              disabled={!isEditing || isLoading}
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              disabled={!isEditing || isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handlePhoneChange}
              className={errors.telefone ? 'error' : ''}
              maxLength="15"
              disabled={!isEditing || isLoading}
            />
            {errors.telefone && <span className="error-message">{errors.telefone}</span>}
          </div>

          {/* Seção de mudança de senha */}
          {showPasswordSection && (
            <div className="password-section">
              <h3>Alterar Senha</h3>
              
              <div className="form-group">
                <label htmlFor="senhaAtual">Senha Atual</label>
                <input
                  type="password"
                  id="senhaAtual"
                  name="senhaAtual"
                  value={formData.senhaAtual}
                  onChange={handleChange}
                  className={errors.senhaAtual ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.senhaAtual && <span className="error-message">{errors.senhaAtual}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="novaSenha">Nova Senha</label>
                <input
                  type="password"
                  id="novaSenha"
                  name="novaSenha"
                  value={formData.novaSenha}
                  onChange={handleChange}
                  className={errors.novaSenha ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.novaSenha && <span className="error-message">{errors.novaSenha}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmarNovaSenha">Confirmar Nova Senha</label>
                <input
                  type="password"
                  id="confirmarNovaSenha"
                  name="confirmarNovaSenha"
                  value={formData.confirmarNovaSenha}
                  onChange={handleChange}
                  className={errors.confirmarNovaSenha ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.confirmarNovaSenha && <span className="error-message">{errors.confirmarNovaSenha}</span>}
              </div>
            </div>
          )}

          <div className="form-actions">
            {!isEditing ? (
              <>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                >
                  Editar Perfil
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="password-button"
                >
                  {showPasswordSection ? 'Cancelar' : 'Alterar Senha'}
                </button>
              </>
            ) : (
              <>
                <button 
                  type="submit" 
                  className={`save-button ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Salvando...
                    </>
                  ) : (
                    'Salvar Alterações'
                  )}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setIsEditing(false);
                    setShowPasswordSection(false);
                    setFormData(prev => ({
                      ...prev,
                      nome: usuario.nome || '',
                      email: usuario.email || '',
                      telefone: usuario.telefone || '',
                      senhaAtual: '',
                      novaSenha: '',
                      confirmarNovaSenha: ''
                    }));
                    setErrors({});
                  }}
                  className="cancel-button"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </form>

        <div className="perfil-footer">
          <button onClick={handleLogout} className="logout-button">
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;

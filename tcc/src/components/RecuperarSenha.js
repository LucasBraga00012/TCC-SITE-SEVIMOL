import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import './RecuperarSenha.css';

const RecuperarSenha = ({ onVoltarLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    codigo: '',
    novaSenha: '',
    confirmarNovaSenha: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: código, 3: nova senha
  const [codigoEnviado, setCodigoEnviado] = useState(false);

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

  const validateEmail = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCodigo = () => {
    const newErrors = {};
    
    if (!formData.codigo) {
      newErrors.codigo = 'Código é obrigatório';
    } else if (formData.codigo.length !== 6) {
      newErrors.codigo = 'Código deve ter 6 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSenha = () => {
    const newErrors = {};

    if (!formData.novaSenha) {
      newErrors.novaSenha = 'Nova senha é obrigatória';
    } else if (formData.novaSenha.length < 6) {
      newErrors.novaSenha = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmarNovaSenha) {
      newErrors.confirmarNovaSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.novaSenha !== formData.confirmarNovaSenha) {
      newErrors.confirmarNovaSenha = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateCodigo = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleEnviarCodigo = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Verificar se email existe
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', formData.email.toLowerCase())
        .eq('ativo', true)
        .single();

      if (error || !usuario) {
        throw new Error('Email não encontrado ou usuário inativo');
      }

      // Gerar código de recuperação
      const codigo = generateCodigo();
      
      // Simular envio de email (em produção, usar serviço de email real)
      console.log(`Código de recuperação para ${formData.email}: ${codigo}`);
      
      // Salvar código temporariamente (em produção, usar Redis ou tabela temporária)
      localStorage.setItem('codigoRecuperacao', codigo);
      localStorage.setItem('emailRecuperacao', formData.email);
      localStorage.setItem('timestampRecuperacao', Date.now().toString());

      setCodigoEnviado(codigo);
      setStep(2);
      alert(`Código enviado para ${formData.email}. Verifique sua caixa de entrada.`);
      
    } catch (error) {
      console.error('Erro ao enviar código:', error);
      alert(error.message || 'Erro ao enviar código. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificarCodigo = async (e) => {
    e.preventDefault();
    
    if (!validateCodigo()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const codigoSalvo = localStorage.getItem('codigoRecuperacao');
      const timestampSalvo = localStorage.getItem('timestampRecuperacao');
      
      // Verificar se código expirou (5 minutos)
      const agora = Date.now();
      const tempoExpiracao = 5 * 60 * 1000; // 5 minutos
      
      if (!codigoSalvo || !timestampSalvo || (agora - parseInt(timestampSalvo)) > tempoExpiracao) {
        throw new Error('Código expirado. Solicite um novo código.');
      }

      if (formData.codigo !== codigoSalvo) {
        throw new Error('Código inválido');
      }

      setStep(3);
      alert('Código verificado com sucesso! Agora defina sua nova senha.');
      
    } catch (error) {
      console.error('Erro ao verificar código:', error);
      alert(error.message || 'Erro ao verificar código. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedefinirSenha = async (e) => {
    e.preventDefault();
    
    if (!validateSenha()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const emailRecuperacao = localStorage.getItem('emailRecuperacao');
      
      if (!emailRecuperacao) {
        throw new Error('Sessão expirada. Inicie o processo novamente.');
      }

      // Atualizar senha no banco
      const { data, error } = await supabase
        .from('usuarios')
        .update({ 
          senha: formData.novaSenha,
          data_atualizacao: new Date().toISOString()
        })
        .eq('email', emailRecuperacao)
        .select();

      if (error) {
        throw new Error('Erro ao redefinir senha: ' + error.message);
      }

      // Limpar dados temporários
      localStorage.removeItem('codigoRecuperacao');
      localStorage.removeItem('emailRecuperacao');
      localStorage.removeItem('timestampRecuperacao');

      console.log('Senha redefinida com sucesso:', data[0]);
      alert('Senha redefinida com sucesso! Você já pode fazer login com a nova senha.');
      
      // Voltar para login
      onVoltarLogin();
      
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      alert(error.message || 'Erro ao redefinir senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoltar = () => {
    if (step === 1) {
      onVoltarLogin();
    } else if (step === 2) {
      setStep(1);
      setFormData(prev => ({ ...prev, codigo: '' }));
    } else if (step === 3) {
      setStep(2);
      setFormData(prev => ({ 
        ...prev, 
        novaSenha: '', 
        confirmarNovaSenha: '' 
      }));
    }
  };

  const renderStep1 = () => (
    <form onSubmit={handleEnviarCodigo} className="recuperar-form">
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

      <button 
        type="submit" 
        className={`recuperar-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Enviando...
          </>
        ) : (
          'Enviar Código'
        )}
      </button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleVerificarCodigo} className="recuperar-form">
      <div className="form-group">
        <label htmlFor="codigo">Código de Verificação</label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          className={errors.codigo ? 'error' : ''}
          placeholder="000000"
          maxLength="6"
          disabled={isLoading}
        />
        {errors.codigo && <span className="error-message">{errors.codigo}</span>}
        <p className="help-text">
          Digite o código de 6 dígitos enviado para {formData.email}
        </p>
      </div>

      <button 
        type="submit" 
        className={`recuperar-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Verificando...
          </>
        ) : (
          'Verificar Código'
        )}
      </button>
    </form>
  );

  const renderStep3 = () => (
    <form onSubmit={handleRedefinirSenha} className="recuperar-form">
      <div className="form-group">
        <label htmlFor="novaSenha">Nova Senha</label>
        <input
          type="password"
          id="novaSenha"
          name="novaSenha"
          value={formData.novaSenha}
          onChange={handleChange}
          className={errors.novaSenha ? 'error' : ''}
          placeholder="Mínimo 6 caracteres"
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
          placeholder="Digite a senha novamente"
          disabled={isLoading}
        />
        {errors.confirmarNovaSenha && <span className="error-message">{errors.confirmarNovaSenha}</span>}
      </div>

      <button 
        type="submit" 
        className={`recuperar-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Redefinindo...
          </>
        ) : (
          'Redefinir Senha'
        )}
      </button>
    </form>
  );

  return (
    <div className="recuperar-container">
      <div className="recuperar-card">
        <div className="recuperar-header">
          <h1>Recuperar Senha</h1>
          <p>
            {step === 1 && 'Digite seu email para receber um código de verificação'}
            {step === 2 && 'Digite o código enviado para seu email'}
            {step === 3 && 'Defina sua nova senha'}
          </p>
        </div>

        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="recuperar-footer">
          <button onClick={handleVoltar} className="voltar-button">
            {step === 1 ? 'Voltar ao Login' : 'Voltar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;

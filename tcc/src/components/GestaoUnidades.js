import React, { useState, useEffect } from 'react';
import './GestaoUnidades.css';

const GestaoUnidades = ({ onVoltar }) => {
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'Filial',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    responsavel: '',
    capacidadeEstoque: '',
    servicos: [],
    ativo: true
  });

  const tiposUnidade = ['Matriz', 'Filial', 'Depósito'];
  const servicosDisponiveis = [
    'Venda de Produtos',
    'Corte e Dobra',
    'Fabricação de Telhas',
    'Corte Laser',
    'Corte Plasma',
    'Montagem',
    'Entrega',
    'Consultoria Técnica'
  ];

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  useEffect(() => {
    // Simular carregamento de unidades
    setTimeout(() => {
      setUnidades([
        {
          id: 1,
          nome: 'SEVIMOL - Matriz',
          tipo: 'Matriz',
          endereco: 'Rua Eduardo Braz de Queiroz, 852, Amazonas',
          cidade: 'Carmo do Paranaíba',
          estado: 'MG',
          cep: '38840-000',
          telefone: '(34) 3851-6500',
          email: 'matriz@sevimol.com.br',
          responsavel: 'Baltazar Moreira',
          capacidadeEstoque: 5000,
          servicos: ['Venda de Produtos', 'Corte e Dobra', 'Fabricação de Telhas', 'Corte Laser', 'Corte Plasma', 'Entrega'],
          ativo: true,
          dataInauguracao: '1981-02-15',
          funcionarios: 45,
          faturamento: 2500000,
          clientesAtivos: 180
        },
        {
          id: 2,
          nome: 'SEVIMOL - Lagoa Seca',
          tipo: 'Filial',
          endereco: 'Rodovia Ageu Garcia De Deus, 120 B. Amazonas',
          cidade: 'Carmo do Paranaíba',
          estado: 'MG',
          cep: '38840-000',
          telefone: '(34) 3851-6500',
          email: 'lagoaseca@sevimol.com.br',
          responsavel: 'João Batista Moreira',
          capacidadeEstoque: 3000,
          servicos: ['Venda de Produtos', 'Corte e Dobra', 'Entrega'],
          ativo: true,
          dataInauguracao: '1995-06-10',
          funcionarios: 25,
          faturamento: 1200000,
          clientesAtivos: 85
        },
        {
          id: 3,
          nome: 'SEVIMOL - Patos de Minas',
          tipo: 'Filial',
          endereco: 'Av. Juscelino Kubitschek de Oliveira, 4200, Planalto',
          cidade: 'Patos de Minas',
          estado: 'MG',
          cep: '38706-001',
          telefone: '(34) 3826-2000',
          email: 'patos@sevimol.com.br',
          responsavel: 'Paulo Moreira',
          capacidadeEstoque: 4000,
          servicos: ['Venda de Produtos', 'Corte e Dobra', 'Fabricação de Telhas', 'Entrega'],
          ativo: true,
          dataInauguracao: '2000-03-20',
          funcionarios: 35,
          faturamento: 1800000,
          clientesAtivos: 120
        },
        {
          id: 4,
          nome: 'SEVIMOL - Patrocínio',
          tipo: 'Filial',
          endereco: 'Av Dom José André Coimbra, 1691 - São Cristovão',
          cidade: 'Patrocínio',
          estado: 'MG',
          cep: '38742-212',
          telefone: '(34) 3515-7100',
          email: 'patrocinio@sevimol.com.br',
          responsavel: 'Maria Silva Santos',
          capacidadeEstoque: 2500,
          servicos: ['Venda de Produtos', 'Corte e Dobra', 'Entrega'],
          ativo: true,
          dataInauguracao: '2005-11-15',
          funcionarios: 20,
          faturamento: 950000,
          clientesAtivos: 65
        },
        {
          id: 5,
          nome: 'SEVIMOL - Uberaba',
          tipo: 'Filial',
          endereco: 'Av. Tonico dos Santos, 477, Jardim Induberaba',
          cidade: 'Uberaba',
          estado: 'MG',
          cep: '38040-000',
          telefone: '(34) 3315-8000',
          email: 'uberaba@sevimol.com.br',
          responsavel: 'Carlos Eduardo Lima',
          capacidadeEstoque: 3500,
          servicos: ['Venda de Produtos', 'Corte e Dobra', 'Fabricação de Telhas', 'Corte Laser', 'Entrega'],
          ativo: true,
          dataInauguracao: '2008-09-08',
          funcionarios: 30,
          faturamento: 1500000,
          clientesAtivos: 95
        },
        {
          id: 6,
          nome: 'SEVIMOL - Paracatu',
          tipo: 'Filial',
          endereco: 'Rodovia Presidente Juscelino Kubitschek, Av. Alto Córrego, 160',
          cidade: 'Paracatu',
          estado: 'MG',
          cep: '38606-000',
          telefone: '(38) 3365-1990',
          email: 'paracatu@sevimol.com.br',
          responsavel: 'Ana Paula Rodrigues',
          capacidadeEstoque: 2000,
          servicos: ['Venda de Produtos', 'Corte e Dobra', 'Entrega'],
          ativo: true,
          dataInauguracao: '2012-04-12',
          funcionarios: 15,
          faturamento: 750000,
          clientesAtivos: 45
        },
        {
          id: 7,
          nome: 'SEVIMOL - São Gotardo',
          tipo: 'Filial',
          endereco: 'Rodovia MG 205 Km 83, n° 1690 - Zona Rural',
          cidade: 'São Gotardo',
          estado: 'MG',
          cep: '38800-000',
          telefone: '(34) 3615-4400',
          email: 'saogotardo@sevimol.com.br',
          responsavel: 'Roberto Alves Costa',
          capacidadeEstoque: 1800,
          servicos: ['Venda de Produtos', 'Corte e Dobra', 'Entrega'],
          ativo: true,
          dataInauguracao: '2015-07-25',
          funcionarios: 12,
          faturamento: 600000,
          clientesAtivos: 35
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'servicos') {
      const servico = value;
      setFormData(prev => ({
        ...prev,
        servicos: prev.servicos.includes(servico)
          ? prev.servicos.filter(s => s !== servico)
          : [...prev.servicos, servico]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingUnit) {
      // Editar unidade existente
      setUnidades(prev => prev.map(unidade => 
        unidade.id === editingUnit.id 
          ? { 
              ...unidade, 
              ...formData, 
              capacidadeEstoque: parseInt(formData.capacidadeEstoque),
              funcionarios: parseInt(formData.funcionarios) || unidade.funcionarios,
              faturamento: parseFloat(formData.faturamento) || unidade.faturamento,
              clientesAtivos: parseInt(formData.clientesAtivos) || unidade.clientesAtivos
            }
          : unidade
      ));
    } else {
      // Adicionar nova unidade
      const novaUnidade = {
        id: Date.now(),
        ...formData,
        capacidadeEstoque: parseInt(formData.capacidadeEstoque),
        dataInauguracao: new Date().toISOString().split('T')[0],
        funcionarios: 0,
        faturamento: 0,
        clientesAtivos: 0
      };
      setUnidades(prev => [novaUnidade, ...prev]);
    }

    // Limpar formulário
    setFormData({
      nome: '',
      tipo: 'Filial',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      telefone: '',
      email: '',
      responsavel: '',
      capacidadeEstoque: '',
      servicos: [],
      ativo: true
    });
    setShowForm(false);
    setEditingUnit(null);
  };

  const handleEdit = (unidade) => {
    setFormData({
      nome: unidade.nome,
      tipo: unidade.tipo,
      endereco: unidade.endereco,
      cidade: unidade.cidade,
      estado: unidade.estado,
      cep: unidade.cep,
      telefone: unidade.telefone,
      email: unidade.email,
      responsavel: unidade.responsavel,
      capacidadeEstoque: unidade.capacidadeEstoque.toString(),
      servicos: unidade.servicos,
      ativo: unidade.ativo
    });
    setEditingUnit(unidade);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta unidade?')) {
      setUnidades(prev => prev.filter(unidade => unidade.id !== id));
    }
  };

  const handleViewDetails = (unidade) => {
    setSelectedUnit(unidade);
  };

  if (loading) {
    return (
      <div className="gestao-unidades-loading">
        <div className="loading-spinner"></div>
        <p>Carregando unidades...</p>
      </div>
    );
  }

  return (
    <div className="gestao-unidades">
      <header className="gestao-header">
        <button onClick={onVoltar} className="back-btn">← Voltar</button>
        <h1>Gestão de Unidades</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="add-unit-btn"
        >
          + Nova Unidade
        </button>
      </header>

      <div className="gestao-content">
        {/* Cards das Unidades */}
        <div className="units-grid">
          {unidades.map(unidade => (
            <div key={unidade.id} className={`unit-card ${unidade.tipo.toLowerCase()}`}>
              <div className="unit-header">
                <div className="unit-type">{unidade.tipo}</div>
                <div className="unit-status">
                  <span className={`status ${unidade.ativo ? 'ativo' : 'inativo'}`}>
                    {unidade.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
              
              <div className="unit-info">
                <h3>{unidade.nome}</h3>
                <p className="unit-location">
                  {unidade.cidade}/{unidade.estado}
                </p>
                <p className="unit-phone">{unidade.telefone}</p>
                <p className="unit-responsavel">Responsável: {unidade.responsavel}</p>
              </div>

              <div className="unit-stats">
                <div className="stat">
                  <span className="stat-label">Funcionários:</span>
                  <span className="stat-value">{unidade.funcionarios}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Faturamento:</span>
                  <span className="stat-value">R$ {unidade.faturamento.toLocaleString('pt-BR')}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Clientes:</span>
                  <span className="stat-value">{unidade.clientesAtivos}</span>
                </div>
              </div>

              <div className="unit-services">
                <h4>Serviços:</h4>
                <div className="services-list">
                  {unidade.servicos.map(servico => (
                    <span key={servico} className="service-tag">{servico}</span>
                  ))}
                </div>
              </div>

              <div className="unit-actions">
                <button 
                  onClick={() => handleViewDetails(unidade)}
                  className="view-btn"
                >
                  Ver Detalhes
                </button>
                <button 
                  onClick={() => handleEdit(unidade)}
                  className="edit-btn"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => handleDelete(unidade.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas Gerais */}
        <div className="stats-section">
          <div className="stat-card">
            <h3>Total de Unidades</h3>
            <p>{unidades.length}</p>
          </div>
          <div className="stat-card">
            <h3>Unidades Ativas</h3>
            <p>{unidades.filter(u => u.ativo).length}</p>
          </div>
          <div className="stat-card">
            <h3>Total de Funcionários</h3>
            <p>{unidades.reduce((total, u) => total + u.funcionarios, 0)}</p>
          </div>
          <div className="stat-card">
            <h3>Faturamento Total</h3>
            <p>R$ {unidades.reduce((total, u) => total + u.faturamento, 0).toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedUnit && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Detalhes da Unidade</h2>
              <button 
                onClick={() => setSelectedUnit(null)}
                className="close-btn"
              >
                ✕
              </button>
            </div>

            <div className="unit-details">
              <div className="detail-section">
                <h3>Informações Básicas</h3>
                <div className="detail-grid">
                  <div><strong>Nome:</strong> {selectedUnit.nome}</div>
                  <div><strong>Tipo:</strong> {selectedUnit.tipo}</div>
                  <div><strong>Responsável:</strong> {selectedUnit.responsavel}</div>
                  <div><strong>Email:</strong> {selectedUnit.email}</div>
                  <div><strong>Telefone:</strong> {selectedUnit.telefone}</div>
                  <div><strong>Data de Inauguração:</strong> {selectedUnit.dataInauguracao}</div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Localização</h3>
                <div className="detail-grid">
                  <div><strong>Endereço:</strong> {selectedUnit.endereco}</div>
                  <div><strong>Cidade:</strong> {selectedUnit.cidade}</div>
                  <div><strong>Estado:</strong> {selectedUnit.estado}</div>
                  <div><strong>CEP:</strong> {selectedUnit.cep}</div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Capacidade e Serviços</h3>
                <div className="detail-grid">
                  <div><strong>Capacidade de Estoque:</strong> {selectedUnit.capacidadeEstoque} m²</div>
                  <div className="full-width">
                    <strong>Serviços Oferecidos:</strong>
                    <div className="services-list">
                      {selectedUnit.servicos.map(servico => (
                        <span key={servico} className="service-tag">{servico}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Estatísticas</h3>
                <div className="detail-grid">
                  <div><strong>Funcionários:</strong> {selectedUnit.funcionarios}</div>
                  <div><strong>Clientes Ativos:</strong> {selectedUnit.clientesAtivos}</div>
                  <div><strong>Faturamento Anual:</strong> R$ {selectedUnit.faturamento.toLocaleString('pt-BR')}</div>
                  <div><strong>Status:</strong> 
                    <span className={`status ${selectedUnit.ativo ? 'ativo' : 'inativo'}`}>
                      {selectedUnit.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal do Formulário */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingUnit ? 'Editar Unidade' : 'Nova Unidade'}</h2>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditingUnit(null);
                  setFormData({
                    nome: '',
                    tipo: 'Filial',
                    endereco: '',
                    cidade: '',
                    estado: '',
                    cep: '',
                    telefone: '',
                    email: '',
                    responsavel: '',
                    capacidadeEstoque: '',
                    servicos: [],
                    ativo: true
                  });
                }}
                className="close-btn"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="unit-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nome da Unidade *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tipo *</label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                    required
                  >
                    {tiposUnidade.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Responsável *</label>
                  <input
                    type="text"
                    name="responsavel"
                    value={formData.responsavel}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Telefone *</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Capacidade Estoque (m²)</label>
                  <input
                    type="number"
                    name="capacidadeEstoque"
                    value={formData.capacidadeEstoque}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione</option>
                    {estados.map(estado => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>CEP</label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Serviços Oferecidos</label>
                <div className="services-checkboxes">
                  {servicosDisponiveis.map(servico => (
                    <label key={servico} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="servicos"
                        value={servico}
                        checked={formData.servicos.includes(servico)}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      {servico}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="ativo"
                    checked={formData.ativo}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Unidade ativa
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  {editingUnit ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestaoUnidades;

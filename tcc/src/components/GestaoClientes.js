import React, { useState, useEffect } from 'react';
import './GestaoClientes.css';

const GestaoClientes = ({ onVoltar }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo: 'Pessoa Física',
    cpfCnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    segmento: '',
    observacoes: '',
    ativo: true
  });

  const tiposCliente = ['Pessoa Física', 'Pessoa Jurídica'];
  const segmentos = [
    'Construção Civil',
    'Indústria',
    'Comércio',
    'Serralheria',
    'Metalurgia',
    'Agronegócio',
    'Prestador de Serviço',
    'Outros'
  ];

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  useEffect(() => {
    // Simular carregamento de clientes
    setTimeout(() => {
      setClientes([
        {
          id: 1,
          nome: 'Construtora ABC Ltda',
          email: 'contato@construtoraabc.com.br',
          telefone: '(34) 3851-1234',
          tipo: 'Pessoa Jurídica',
          cpfCnpj: '12.345.678/0001-90',
          endereco: 'Rua das Construções, 123',
          cidade: 'Carmo do Paranaíba',
          estado: 'MG',
          cep: '38840-000',
          segmento: 'Construção Civil',
          observacoes: 'Cliente preferencial, sempre pontual nos pagamentos',
          ativo: true,
          dataCadastro: '2024-01-15',
          ultimoPedido: '2024-01-20',
          totalPedidos: 15,
          valorTotal: 125000
        },
        {
          id: 2,
          nome: 'João Silva',
          email: 'joao.silva@email.com',
          telefone: '(34) 99999-8888',
          tipo: 'Pessoa Física',
          cpfCnpj: '123.456.789-00',
          endereco: 'Av. Principal, 456',
          cidade: 'Patos de Minas',
          estado: 'MG',
          cep: '38706-001',
          segmento: 'Serralheria',
          observacoes: 'Serralheiro autônomo, trabalha com portões e grades',
          ativo: true,
          dataCadastro: '2024-01-10',
          ultimoPedido: '2024-01-18',
          totalPedidos: 8,
          valorTotal: 45000
        },
        {
          id: 3,
          nome: 'Metalúrgica XYZ S.A.',
          email: 'vendas@metalurgicaxyz.com.br',
          telefone: '(34) 3826-5555',
          tipo: 'Pessoa Jurídica',
          cpfCnpj: '98.765.432/0001-10',
          endereco: 'Rodovia BR-365, Km 120',
          cidade: 'Uberaba',
          estado: 'MG',
          cep: '38040-000',
          segmento: 'Indústria',
          observacoes: 'Grande consumidor de chapas e perfis',
          ativo: true,
          dataCadastro: '2024-01-05',
          ultimoPedido: '2024-01-22',
          totalPedidos: 25,
          valorTotal: 280000
        },
        {
          id: 4,
          nome: 'Fazenda São José',
          email: 'contato@fazendasaose.com.br',
          telefone: '(34) 3615-7777',
          tipo: 'Pessoa Jurídica',
          cpfCnpj: '11.222.333/0001-44',
          endereco: 'Zona Rural',
          cidade: 'São Gotardo',
          estado: 'MG',
          cep: '38800-000',
          segmento: 'Agronegócio',
          observacoes: 'Compra arame e telas para cercas',
          ativo: true,
          dataCadastro: '2024-01-12',
          ultimoPedido: '2024-01-19',
          totalPedidos: 6,
          valorTotal: 32000
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingClient) {
      // Editar cliente existente
      setClientes(prev => prev.map(cliente => 
        cliente.id === editingClient.id 
          ? { ...cliente, ...formData }
          : cliente
      ));
    } else {
      // Adicionar novo cliente
      const novoCliente = {
        id: Date.now(),
        ...formData,
        dataCadastro: new Date().toISOString().split('T')[0],
        ultimoPedido: null,
        totalPedidos: 0,
        valorTotal: 0
      };
      setClientes(prev => [novoCliente, ...prev]);
    }

    // Limpar formulário
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      tipo: 'Pessoa Física',
      cpfCnpj: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      segmento: '',
      observacoes: '',
      ativo: true
    });
    setShowForm(false);
    setEditingClient(null);
  };

  const handleEdit = (cliente) => {
    setFormData({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      tipo: cliente.tipo,
      cpfCnpj: cliente.cpfCnpj,
      endereco: cliente.endereco,
      cidade: cliente.cidade,
      estado: cliente.estado,
      cep: cliente.cep,
      segmento: cliente.segmento,
      observacoes: cliente.observacoes,
      ativo: cliente.ativo
    });
    setEditingClient(cliente);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes(prev => prev.filter(cliente => cliente.id !== id));
    }
  };

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || cliente.tipo === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="gestao-clientes-loading">
        <div className="loading-spinner"></div>
        <p>Carregando clientes...</p>
      </div>
    );
  }

  return (
    <div className="gestao-clientes">
      <header className="gestao-header">
        <button onClick={onVoltar} className="back-btn">← Voltar</button>
        <h1>Gestão de Clientes</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="add-client-btn"
        >
          + Novo Cliente
        </button>
      </header>

      <div className="gestao-content">
        {/* Filtros e Busca */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="type-filter">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              {tiposCliente.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabela de Clientes */}
        <div className="clients-table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Contato</th>
                <th>Localização</th>
                <th>Segmento</th>
                <th>Pedidos</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>
                    <div className="client-info">
                      <strong>{cliente.nome}</strong>
                      <small>{cliente.tipo} - {cliente.cpfCnpj}</small>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div>{cliente.email}</div>
                      <div>{cliente.telefone}</div>
                    </div>
                  </td>
                  <td>
                    <div className="location-info">
                      <div>{cliente.cidade}/{cliente.estado}</div>
                      <small>{cliente.endereco}</small>
                    </div>
                  </td>
                  <td>{cliente.segmento}</td>
                  <td>
                    <div className="orders-info">
                      <div><strong>{cliente.totalPedidos}</strong> pedidos</div>
                      <div>R$ {cliente.valorTotal.toLocaleString('pt-BR')}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`status ${cliente.ativo ? 'ativo' : 'inativo'}`}>
                      {cliente.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleEdit(cliente)}
                        className="edit-btn"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(cliente.id)}
                        className="delete-btn"
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Estatísticas */}
        <div className="stats-section">
          <div className="stat-card">
            <h3>Total de Clientes</h3>
            <p>{clientes.length}</p>
          </div>
          <div className="stat-card">
            <h3>Clientes Ativos</h3>
            <p>{clientes.filter(c => c.ativo).length}</p>
          </div>
          <div className="stat-card">
            <h3>Pessoa Jurídica</h3>
            <p>{clientes.filter(c => c.tipo === 'Pessoa Jurídica').length}</p>
          </div>
          <div className="stat-card">
            <h3>Receita Total</h3>
            <p>R$ {clientes.reduce((total, c) => total + c.valorTotal, 0).toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>

      {/* Modal do Formulário */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingClient ? 'Editar Cliente' : 'Novo Cliente'}</h2>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditingClient(null);
                  setFormData({
                    nome: '',
                    email: '',
                    telefone: '',
                    tipo: 'Pessoa Física',
                    cpfCnpj: '',
                    endereco: '',
                    cidade: '',
                    estado: '',
                    cep: '',
                    segmento: '',
                    observacoes: '',
                    ativo: true
                  });
                }}
                className="close-btn"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="client-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nome/Razão Social *</label>
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
                    {tiposCliente.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
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
                  <label>{formData.tipo === 'Pessoa Física' ? 'CPF' : 'CNPJ'} *</label>
                  <input
                    type="text"
                    name="cpfCnpj"
                    value={formData.cpfCnpj}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Segmento *</label>
                  <select
                    name="segmento"
                    value={formData.segmento}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione um segmento</option>
                    {segmentos.map(segmento => (
                      <option key={segmento} value={segmento}>{segmento}</option>
                    ))}
                  </select>
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
                <label>Observações</label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                  rows="3"
                />
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
                  Cliente ativo
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  {editingClient ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestaoClientes;

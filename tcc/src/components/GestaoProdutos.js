import React, { useState, useEffect } from 'react';
import './GestaoProdutos.css';

const GestaoProdutos = ({ onVoltar }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    descricao: '',
    preco: '',
    estoque: '',
    unidade: 'UN',
    ativo: true
  });

  const categorias = [
    'Arame Recozido',
    'Arruela',
    'Barra Chata',
    'Barra Quadrada',
    'Barra Redonda',
    'Chapa de Aço',
    'Perfil L',
    'Perfil U',
    'Perfil T',
    'Telha Galvanizada',
    'Viga I',
    'Viga U',
    'Corte Laser',
    'Corte Plasma',
    'Dobra'
  ];

  useEffect(() => {
    // Simular carregamento de produtos
    setTimeout(() => {
      setProdutos([
        {
          id: 1,
          nome: 'Barra de Aço 12mm',
          categoria: 'Barra Redonda',
          descricao: 'Barra de aço carbono SAE 1020, diâmetro 12mm, 6 metros',
          preco: 45.50,
          estoque: 150,
          unidade: 'UN',
          ativo: true,
          dataCadastro: '2024-01-15'
        },
        {
          id: 2,
          nome: 'Chapa de Aço 3mm',
          categoria: 'Chapa de Aço',
          descricao: 'Chapa de aço carbono, espessura 3mm, 2.5x1.25m',
          preco: 85.00,
          estoque: 45,
          unidade: 'M²',
          ativo: true,
          dataCadastro: '2024-01-10'
        },
        {
          id: 3,
          nome: 'Perfil L 50x50x3mm',
          categoria: 'Perfil L',
          descricao: 'Perfil L de aço carbono, 50x50x3mm, 6 metros',
          preco: 125.00,
          estoque: 80,
          unidade: 'UN',
          ativo: true,
          dataCadastro: '2024-01-20'
        },
        {
          id: 4,
          nome: 'Telha Galvanizada 0.5mm',
          categoria: 'Telha Galvanizada',
          descricao: 'Telha trapezoidal galvanizada, espessura 0.5mm',
          preco: 35.00,
          estoque: 200,
          unidade: 'M²',
          ativo: true,
          dataCadastro: '2024-01-05'
        },
        {
          id: 5,
          nome: 'Arame Recozido 8mm',
          categoria: 'Arame Recozido',
          descricao: 'Arame de aço recozido, diâmetro 8mm, rolo 50kg',
          preco: 180.00,
          estoque: 25,
          unidade: 'ROL',
          ativo: true,
          dataCadastro: '2024-01-12'
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
    
    if (editingProduct) {
      // Editar produto existente
      setProdutos(prev => prev.map(produto => 
        produto.id === editingProduct.id 
          ? { ...produto, ...formData, preco: parseFloat(formData.preco), estoque: parseInt(formData.estoque) }
          : produto
      ));
    } else {
      // Adicionar novo produto
      const novoProduto = {
        id: Date.now(),
        ...formData,
        preco: parseFloat(formData.preco),
        estoque: parseInt(formData.estoque),
        dataCadastro: new Date().toISOString().split('T')[0]
      };
      setProdutos(prev => [novoProduto, ...prev]);
    }

    // Limpar formulário
    setFormData({
      nome: '',
      categoria: '',
      descricao: '',
      preco: '',
      estoque: '',
      unidade: 'UN',
      ativo: true
    });
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (produto) => {
    setFormData({
      nome: produto.nome,
      categoria: produto.categoria,
      descricao: produto.descricao,
      preco: produto.preco.toString(),
      estoque: produto.estoque.toString(),
      unidade: produto.unidade,
      ativo: produto.ativo
    });
    setEditingProduct(produto);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(prev => prev.filter(produto => produto.id !== id));
    }
  };

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || produto.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="gestao-produtos-loading">
        <div className="loading-spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="gestao-produtos">
      <header className="gestao-header">
        <button onClick={onVoltar} className="back-btn">← Voltar</button>
        <h1>Gestão de Produtos</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="add-product-btn"
        >
          + Novo Produto
        </button>
      </header>

      <div className="gestao-content">
        {/* Filtros e Busca */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filter">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProdutos.map(produto => (
                <tr key={produto.id}>
                  <td>
                    <div className="product-info">
                      <strong>{produto.nome}</strong>
                      <small>{produto.descricao}</small>
                    </div>
                  </td>
                  <td>{produto.categoria}</td>
                  <td>R$ {produto.preco.toFixed(2)}</td>
                  <td>
                    <span className={`estoque ${produto.estoque < 10 ? 'low' : produto.estoque < 50 ? 'medium' : 'high'}`}>
                      {produto.estoque} {produto.unidade}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${produto.ativo ? 'ativo' : 'inativo'}`}>
                      {produto.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => handleEdit(produto)}
                        className="edit-btn"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(produto.id)}
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
            <h3>Total de Produtos</h3>
            <p>{produtos.length}</p>
          </div>
          <div className="stat-card">
            <h3>Produtos Ativos</h3>
            <p>{produtos.filter(p => p.ativo).length}</p>
          </div>
          <div className="stat-card">
            <h3>Estoque Baixo</h3>
            <p>{produtos.filter(p => p.estoque < 10).length}</p>
          </div>
          <div className="stat-card">
            <h3>Valor Total Estoque</h3>
            <p>R$ {produtos.reduce((total, p) => total + (p.preco * p.estoque), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      {/* Modal do Formulário */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  setFormData({
                    nome: '',
                    categoria: '',
                    descricao: '',
                    preco: '',
                    estoque: '',
                    unidade: 'UN',
                    ativo: true
                  });
                }}
                className="close-btn"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nome do Produto *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Categoria *</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map(categoria => (
                      <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preço (R$) *</label>
                  <input
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Estoque *</label>
                  <input
                    type="number"
                    name="estoque"
                    value={formData.estoque}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Unidade</label>
                  <select
                    name="unidade"
                    value={formData.unidade}
                    onChange={handleInputChange}
                  >
                    <option value="UN">Unidade</option>
                    <option value="M">Metro</option>
                    <option value="M²">Metro Quadrado</option>
                    <option value="KG">Quilograma</option>
                    <option value="ROL">Rolo</option>
                    <option value="CHAPA">Chapa</option>
                  </select>
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
                  Produto ativo
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
                  Cancelar
                </button>
                <button type="submit" className="save-btn">
                  {editingProduct ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestaoProdutos;

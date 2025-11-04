import React, { useState, useEffect } from 'react';
import './Relatorios.css';

const Relatorios = ({ onVoltar }) => {
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState('vendas');
  const [dateRange, setDateRange] = useState({
    inicio: '2024-01-01',
    fim: '2024-12-31'
  });

  const [reportData, setReportData] = useState({});

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setReportData({
        vendas: {
          total: 12500000,
          crescimento: 15.2,
          topProdutos: [
            { nome: 'Barra de Aço 12mm', quantidade: 2500, valor: 113750 },
            { nome: 'Chapa de Aço 3mm', quantidade: 1800, valor: 153000 },
            { nome: 'Perfil L 50x50x3mm', quantidade: 1200, valor: 150000 },
            { nome: 'Telha Galvanizada 0.5mm', quantidade: 3500, valor: 122500 },
            { nome: 'Arame Recozido 8mm', quantidade: 450, valor: 81000 }
          ],
          vendasPorMes: [
            { mes: 'Jan', valor: 950000 },
            { mes: 'Fev', valor: 1100000 },
            { mes: 'Mar', valor: 1050000 },
            { mes: 'Abr', valor: 1200000 },
            { mes: 'Mai', valor: 1350000 },
            { mes: 'Jun', valor: 1250000 },
            { mes: 'Jul', valor: 1400000 },
            { mes: 'Ago', valor: 1300000 },
            { mes: 'Set', valor: 1450000 },
            { mes: 'Out', valor: 1500000 },
            { mes: 'Nov', valor: 1600000 },
            { mes: 'Dez', valor: 1250000 }
          ]
        },
        clientes: {
          total: 485,
          novos: 45,
          ativos: 420,
          segmentos: [
            { nome: 'Construção Civil', quantidade: 180, percentual: 37.1 },
            { nome: 'Indústria', quantidade: 95, percentual: 19.6 },
            { nome: 'Serralheria', quantidade: 85, percentual: 17.5 },
            { nome: 'Comércio', quantidade: 60, percentual: 12.4 },
            { nome: 'Agronegócio', quantidade: 35, percentual: 7.2 },
            { nome: 'Outros', quantidade: 30, percentual: 6.2 }
          ]
        },
        produtos: {
          total: 1200,
          ativos: 1150,
          baixoEstoque: 25,
          maisVendidos: [
            { nome: 'Barra de Aço 12mm', vendas: 2500, estoque: 150 },
            { nome: 'Chapa de Aço 3mm', vendas: 1800, estoque: 45 },
            { nome: 'Perfil L 50x50x3mm', vendas: 1200, estoque: 80 },
            { nome: 'Telha Galvanizada 0.5mm', vendas: 3500, estoque: 200 },
            { nome: 'Arame Recozido 8mm', vendas: 450, estoque: 25 }
          ]
        },
        unidades: {
          total: 7,
          ativas: 7,
          faturamentoPorUnidade: [
            { nome: 'Matriz - Carmo do Paranaíba', faturamento: 2500000, crescimento: 12.5 },
            { nome: 'Patos de Minas', faturamento: 1800000, crescimento: 8.3 },
            { nome: 'Uberaba', faturamento: 1500000, crescimento: 15.7 },
            { nome: 'Lagoa Seca', faturamento: 1200000, crescimento: 6.2 },
            { nome: 'Patrocínio', faturamento: 950000, crescimento: 18.9 },
            { nome: 'Paracatu', faturamento: 750000, crescimento: 22.1 },
            { nome: 'São Gotardo', faturamento: 600000, crescimento: 14.6 }
          ]
        }
      });
      setLoading(false);
    }, 1500);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const renderVendasReport = () => (
    <div className="report-content">
      <div className="report-summary">
        <div className="summary-card">
          <h3>Faturamento Total</h3>
          <p className="big-number">{formatCurrency(reportData.vendas?.total)}</p>
          <span className={`growth ${reportData.vendas?.crescimento > 0 ? 'positive' : 'negative'}`}>
            {reportData.vendas?.crescimento > 0 ? '+' : ''}{reportData.vendas?.crescimento}% vs ano anterior
          </span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h4>Vendas por Mês</h4>
          <div className="bar-chart">
            {reportData.vendas?.vendasPorMes?.map((item, index) => (
              <div key={index} className="bar-item">
                <div 
                  className="bar" 
                  style={{ height: `${(item.valor / 1600000) * 100}%` }}
                ></div>
                <span className="bar-label">{item.mes}</span>
                <span className="bar-value">{formatCurrency(item.valor)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h4>Top 5 Produtos</h4>
          <div className="top-products">
            {reportData.vendas?.topProdutos?.map((produto, index) => (
              <div key={index} className="product-item">
                <div className="product-info">
                  <span className="product-rank">#{index + 1}</span>
                  <span className="product-name">{produto.nome}</span>
                </div>
                <div className="product-stats">
                  <span className="product-quantity">{produto.quantidade} un</span>
                  <span className="product-value">{formatCurrency(produto.valor)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientesReport = () => (
    <div className="report-content">
      <div className="report-summary">
        <div className="summary-card">
          <h3>Total de Clientes</h3>
          <p className="big-number">{reportData.clientes?.total}</p>
          <span className="growth positive">+{reportData.clientes?.novos} novos clientes</span>
        </div>
        <div className="summary-card">
          <h3>Clientes Ativos</h3>
          <p className="big-number">{reportData.clientes?.ativos}</p>
          <span className="growth neutral">{Math.round((reportData.clientes?.ativos / reportData.clientes?.total) * 100)}% do total</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h4>Clientes por Segmento</h4>
          <div className="pie-chart">
            {reportData.clientes?.segmentos?.map((segmento, index) => (
              <div key={index} className="segment-item">
                <div className="segment-info">
                  <div 
                    className="segment-color" 
                    style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                  ></div>
                  <span className="segment-name">{segmento.nome}</span>
                </div>
                <div className="segment-stats">
                  <span className="segment-quantity">{segmento.quantidade}</span>
                  <span className="segment-percent">{segmento.percentual}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProdutosReport = () => (
    <div className="report-content">
      <div className="report-summary">
        <div className="summary-card">
          <h3>Total de Produtos</h3>
          <p className="big-number">{reportData.produtos?.total}</p>
          <span className="growth neutral">{reportData.produtos?.ativos} ativos</span>
        </div>
        <div className="summary-card">
          <h3>Estoque Baixo</h3>
          <p className="big-number">{reportData.produtos?.baixoEstoque}</p>
          <span className="growth negative">Produtos com estoque crítico</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container full-width">
          <h4>Produtos Mais Vendidos</h4>
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Vendas (Un)</th>
                  <th>Estoque Atual</th>
                  <th>Status Estoque</th>
                </tr>
              </thead>
              <tbody>
                {reportData.produtos?.maisVendidos?.map((produto, index) => (
                  <tr key={index}>
                    <td>{produto.nome}</td>
                    <td>{produto.vendas.toLocaleString('pt-BR')}</td>
                    <td>{produto.estoque}</td>
                    <td>
                      <span className={`stock-status ${produto.estoque < 50 ? 'low' : produto.estoque < 100 ? 'medium' : 'high'}`}>
                        {produto.estoque < 50 ? 'Baixo' : produto.estoque < 100 ? 'Médio' : 'Alto'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUnidadesReport = () => (
    <div className="report-content">
      <div className="report-summary">
        <div className="summary-card">
          <h3>Unidades Ativas</h3>
          <p className="big-number">{reportData.unidades?.ativas}/{reportData.unidades?.total}</p>
          <span className="growth neutral">Todas operacionais</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container full-width">
          <h4>Faturamento por Unidade</h4>
          <div className="units-table">
            <table>
              <thead>
                <tr>
                  <th>Unidade</th>
                  <th>Faturamento</th>
                  <th>Crescimento</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.unidades?.faturamentoPorUnidade?.map((unidade, index) => (
                  <tr key={index}>
                    <td>{unidade.nome}</td>
                    <td>{formatCurrency(unidade.faturamento)}</td>
                    <td>
                      <span className={`growth ${unidade.crescimento > 0 ? 'positive' : 'negative'}`}>
                        +{unidade.crescimento}%
                      </span>
                    </td>
                    <td>
                      <span className="status ativo">Ativo</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentReport = () => {
    switch (selectedReport) {
      case 'vendas':
        return renderVendasReport();
      case 'clientes':
        return renderClientesReport();
      case 'produtos':
        return renderProdutosReport();
      case 'unidades':
        return renderUnidadesReport();
      default:
        return renderVendasReport();
    }
  };

  if (loading) {
    return (
      <div className="relatorios-loading">
        <div className="loading-spinner"></div>
        <p>Carregando relatórios...</p>
      </div>
    );
  }

  return (
    <div className="relatorios">
      <header className="relatorios-header">
        <button onClick={onVoltar} className="back-btn">← Voltar</button>
        <h1>Relatórios e Analytics</h1>
        <div className="header-actions">
          <input
            type="date"
            value={dateRange.inicio}
            onChange={(e) => setDateRange(prev => ({ ...prev, inicio: e.target.value }))}
            className="date-input"
          />
          <span>até</span>
          <input
            type="date"
            value={dateRange.fim}
            onChange={(e) => setDateRange(prev => ({ ...prev, fim: e.target.value }))}
            className="date-input"
          />
        </div>
      </header>

      <div className="relatorios-content">
        <nav className="reports-nav">
          <button 
            className={`nav-btn ${selectedReport === 'vendas' ? 'active' : ''}`}
            onClick={() => setSelectedReport('vendas')}
          >
            💰 Vendas
          </button>
          <button 
            className={`nav-btn ${selectedReport === 'clientes' ? 'active' : ''}`}
            onClick={() => setSelectedReport('clientes')}
          >
            👥 Clientes
          </button>
          <button 
            className={`nav-btn ${selectedReport === 'produtos' ? 'active' : ''}`}
            onClick={() => setSelectedReport('produtos')}
          >
            📦 Produtos
          </button>
          <button 
            className={`nav-btn ${selectedReport === 'unidades' ? 'active' : ''}`}
            onClick={() => setSelectedReport('unidades')}
          >
            🏢 Unidades
          </button>
        </nav>

        {renderCurrentReport()}
      </div>
    </div>
  );
};

export default Relatorios;

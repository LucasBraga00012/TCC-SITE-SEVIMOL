import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = ({ usuario, onLogout, onNavigate }) => {
  const [stats, setStats] = useState({
    totalVendas: 0,
    totalClientes: 0,
    produtosAtivos: 0,
    unidadesAtivas: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento
    const t = setTimeout(() => {
      setStats({
        totalVendas: 1250000,
        totalClientes: 485,
        produtosAtivos: 1200,
        unidadesAtivas: 7,
      });
      setRecentOrders([
        { id: 1, cliente: "Construtora ABC", produto: "Barra de Aço 12mm", valor: 15000, status: "Entregue" },
        { id: 2, cliente: "Metalúrgica XYZ", produto: "Telha Galvanizada", valor: 8500, status: "Em Produção" },
        { id: 3, cliente: "Serralheria 123", produto: "Perfil L 50x50", valor: 12300, status: "Aguardando" },
        { id: 4, cliente: "Indústria DEF", produto: "Chapa de Aço 3mm", valor: 22000, status: "Entregue" },
      ]);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  const unidades = [
    { nome: "Carmo do Paranaíba (Matriz)", cidade: "Carmo do Paranaíba-MG", telefone: "(34) 3851-6500" },
    { nome: "Carmo do Paranaíba (Lagoa Seca)", cidade: "Carmo do Paranaíba-MG", telefone: "(34) 3851-6500" },
    { nome: "Patos de Minas", cidade: "Patos de Minas-MG", telefone: "(34) 3826-2000" },
    { nome: "Patrocínio", cidade: "Patrocínio-MG", telefone: "(34) 3515-7100" },
    { nome: "Uberaba", cidade: "Uberaba-MG", telefone: "(34) 3315-8000" },
    { nome: "Paracatu", cidade: "Paracatu-MG", telefone: "(38) 3365-1990" },
    { nome: "São Gotardo", cidade: "São Gotardo-MG", telefone: "(34) 3615-4400" },
  ];

  if (loading) {
    return (
      <div className="sev-loading">
        <div className="sev-spinner" />
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="sev-dashboard">
      {/* TOPBAR */}
      <header className="sev-topbar">
        <div className="sev-topbar-inner">
          <div className="sev-brand">
            {/* Se tiver PNG, troque por <img src="/img/sevimol-logo.png" alt="Sevimol" /> */}
            <h1 className="sev-logo">SEVIMOL</h1>
            <span className="sev-tagline">Ferro e Aço</span>
          </div>

          <nav className="sev-menu">
            <button className="sev-link" onClick={() => onNavigate?.("dashboard")}>INÍCIO</button>
            <button className="sev-link" onClick={() => onNavigate?.("sobre")}>SOBRE NÓS</button>
            <button className="sev-link" onClick={() => onNavigate?.("unidades")}>UNIDADES</button>
            <button className="sev-link" onClick={() => onNavigate?.("industria")}>INDÚSTRIA</button>
            <button className="sev-link" onClick={() => onNavigate?.("comercio")}>COMÉRCIO</button>
            <button className="sev-link" onClick={() => onNavigate?.("atuacao")}>ATUAÇÃO</button>
            <button className="sev-link" onClick={() => onNavigate?.("trabalhe")}>FAÇA PARTE</button>
          </nav>

          <div className="sev-user">
            <span className="sev-user-welcome">Bem-vindo, {usuario?.nome}</span>
            <button className="sev-btn-yellow" onClick={onLogout}>Sair</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="sev-hero">
        <div className="sev-hero-overlay" />
        <div className="sev-hero-content">
          <div className="sev-hero-mark">
            <div className="sev-hero-logo">SEVIMOL</div>
            <div className="sev-hero-sub">FERRO E AÇO</div>
          </div>
        </div>
      </section>

      {/* ABAS RÁPIDAS (atalhos internos) */}
      <div className="sev-quicknav">
        <button className="sev-qitem" onClick={() => onNavigate?.("dashboard")}>🏠 Dashboard</button>
        <button className="sev-qitem" onClick={() => onNavigate?.("produtos")}>📦 Produtos</button>
        <button className="sev-qitem" onClick={() => onNavigate?.("unidades")}>🏢 Unidades</button>
        <button className="sev-qitem" onClick={() => onNavigate?.("clientes")}>👥 Clientes</button>
        <button className="sev-qitem" onClick={() => onNavigate?.("relatorios")}>📊 Relatórios</button>
        <button className="sev-qitem" onClick={() => onNavigate?.("perfil")}>👤 Perfil</button>
      </div>

      <main className="sev-content">
        {/* CARDS */}
        <section className="sev-stats">
          <article className="sev-card sev-stat">
            <div className="sev-stat-ico">💰</div>
            <div className="sev-stat-body">
              <h3>Vendas do Mês</h3>
              <p className="sev-stat-val">R$ {stats.totalVendas.toLocaleString("pt-BR")}</p>
              <span className="sev-stat-tag sev-ok">+12% vs mês anterior</span>
            </div>
          </article>

          <article className="sev-card sev-stat">
            <div className="sev-stat-ico">👥</div>
            <div className="sev-stat-body">
              <h3>Total de Clientes</h3>
              <p className="sev-stat-val">{stats.totalClientes}</p>
              <span className="sev-stat-tag sev-ok">+8 novos clientes</span>
            </div>
          </article>

          <article className="sev-card sev-stat">
            <div className="sev-stat-ico">📦</div>
            <div className="sev-stat-body">
              <h3>Produtos Ativos</h3>
              <p className="sev-stat-val">{stats.produtosAtivos}</p>
              <span className="sev-stat-tag">Catálogo atualizado</span>
            </div>
          </article>

          <article className="sev-card sev-stat">
            <div className="sev-stat-ico">🏢</div>
            <div className="sev-stat-body">
              <h3>Unidades Ativas</h3>
              <p className="sev-stat-val">{stats.unidadesAtivas}</p>
              <span className="sev-stat-tag">Todas operacionais</span>
            </div>
          </article>
        </section>

        {/* PEDIDOS */}
        <section className="sev-section">
          <div className="sev-section-title">
            <h2>Pedidos Recentes</h2>
          </div>
          <div className="sev-table-wrap">
            <table className="sev-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Produto</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.cliente}</td>
                    <td>{o.produto}</td>
                    <td>R$ {o.valor.toLocaleString("pt-BR")}</td>
                    <td>
                      <span className={`sev-badge ${o.status.toLowerCase().replace(" ", "-")}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* UNIDADES */}
        <section className="sev-section">
          <div className="sev-section-title">
            <h2>Nossas Unidades</h2>
          </div>
          <div className="sev-units">
            {unidades.map((u, i) => (
              <article className="sev-unit" key={i}>
                <h3>{u.nome}</h3>
                <p>{u.cidade}</p>
                <p className="sev-unit-phone">{u.telefone}</p>
                <button className="sev-btn-blue">Ver Detalhes</button>
              </article>
            ))}
          </div>
        </section>

        {/* CULTURA */}
        <section className="sev-section">
          <div className="sev-section-title">
            <h2>Nossa Cultura</h2>
          </div>
          <div className="sev-culture">
            <article className="sev-culture-card">
              <h3>🎯 Missão</h3>
              <p>
                Fabricar, beneficiar e fornecer produtos de aço com alta qualidade, contribuindo
                para o desenvolvimento dos diversos setores da economia.
              </p>
            </article>
            <article className="sev-culture-card">
              <h3>👁️ Visão</h3>
              <p>
                Ser reconhecidos como a melhor empresa de aço da região, através da qualidade dos
                nossos produtos e relacionamentos perenes.
              </p>
            </article>
            <article className="sev-culture-card">
              <h3>💎 Valores</h3>
              <p>
                Satisfação do cliente, valorização dos colaboradores, credibilidade e
                responsabilidade socioambiental.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
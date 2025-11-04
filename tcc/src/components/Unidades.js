import React from 'react';
import './Unidades.css';

const Unidades = () => {
  const unidades = [
    {
      nome: 'Carmo do Paranaíba (Matriz)',
      endereco: 'Rua Eduardo Braz de Queiroz, 852, Amazonas',
      cidade: 'Carmo do Paranaíba-MG',
      cep: '38.840-000',
      telefone: '(34) 3851-6500',
      tipo: 'matriz'
    },
    {
      nome: 'Carmo do Paranaíba (Lagoa Seca)',
      endereco: 'Filial (Lagoa Seca) Rodovia Ageu Garcia De Deus, 120 B. Amazonas',
      cidade: 'Carmo do Paranaíba-MG',
      cep: '38.840-000',
      telefone: '(34) 3851-6500',
      tipo: 'filial'
    },
    {
      nome: 'Patos de Minas',
      endereco: 'Av. Juscelino Kubitschek de Oliveira, 4200, Planalto',
      cidade: 'Patos de Minas-MG',
      cep: '38.706-001',
      telefone: '(34) 3826-2000',
      tipo: 'filial'
    },
    {
      nome: 'Patrocínio',
      endereco: 'Av Dom Jose Andrade, Av. Dom José André Coimbra, 1691 - São Cristovao',
      cidade: 'Patrocínio-MG',
      cep: '38742-212',
      telefone: '(34) 3515-7100',
      tipo: 'filial'
    },
    {
      nome: 'Uberaba',
      endereco: 'Av. Tonico dos Santos, 477, Jardim Induberaba',
      cidade: 'Uberaba-MG',
      cep: '38.040-000',
      telefone: '(34) 3315-8000',
      tipo: 'filial'
    },
    {
      nome: 'Paracatu',
      endereco: 'Rodovia Presidente Juscelino Kubitschek, Av. Alto Córrego, 160',
      cidade: 'Paracatu-MG',
      cep: '38606-000',
      telefone: '(38) 3365-1990',
      tipo: 'filial'
    },
    {
      nome: 'São Gotardo',
      endereco: 'Rodovia MG 205 Km 83, n° 1690 - Zona Rural',
      cidade: 'São Gotardo-MG',
      cep: '38.800-000',
      telefone: '(34) 3615-4400',
      tipo: 'filial'
    }
  ];

  return (
    <section className="unidades" id="unidades">
      <div className="container">
        <div className="section-header">
          <h2>NOSSAS UNIDADES</h2>
          <div className="section-divider"></div>
          <p>Presentes em 7 cidades de Minas Gerais, sempre próximos de nossos clientes</p>
        </div>

        <div className="unidades-grid">
          {unidades.map((unidade, index) => (
            <div key={index} className={`unidade-card ${unidade.tipo}`}>
              <div className="unidade-header">
                <div className="unidade-tipo">
                  {unidade.tipo === 'matriz' ? 'Matriz' : 'Filial'}
                </div>
                <div className="unidade-status">Ativo</div>
              </div>
              
              <div className="unidade-content">
                <h3>{unidade.nome}</h3>
                <div className="unidade-info">
                  <div className="info-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" fill="#e74c3c"/>
                    </svg>
                    <span>{unidade.endereco}</span>
                  </div>
                  <div className="info-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#e74c3c"/>
                    </svg>
                    <span>{unidade.cidade}</span>
                  </div>
                  <div className="info-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#e74c3c"/>
                    </svg>
                    <span>{unidade.telefone}</span>
                  </div>
                  <div className="info-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#e74c3c"/>
                      <path d="M2 17L12 22L22 17" fill="#e74c3c"/>
                      <path d="M2 12L12 17L22 12" fill="#e74c3c"/>
                    </svg>
                    <span>CEP: {unidade.cep}</span>
                  </div>
                </div>
              </div>

              <div className="unidade-actions">
                <button className="btn-contato">Entrar em Contato</button>
                <button className="btn-ver-mais">Ver Mais</button>
              </div>
            </div>
          ))}
        </div>

        {/* Mapa Interativo */}
        <div className="mapa-section">
          <h3>Localização de Nossas Unidades</h3>
          <div className="mapa-container">
            <div className="mapa-placeholder">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" fill="#e74c3c"/>
              </svg>
              <p>Mapa Interativo</p>
              <span>Clique nos marcadores para ver informações das unidades</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Unidades;

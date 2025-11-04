import React from 'react';
import './FacaParte.css';

const FacaParte = () => {
  return (
    <section className="faca-parte" id="faca-parte">
      <div className="container">
        <div className="section-header">
          <h2>Faça Parte</h2>
          <div className="section-divider"></div>
          <p>Junte-se à nossa equipe e faça parte de uma empresa com mais de 40 anos de história</p>
        </div>

        <div className="faca-parte-content">
          <div className="vagas-section">
            <h3>Vagas Disponíveis</h3>
            <div className="vagas-grid">
              <div className="vaga-card">
                <div className="vaga-header">
                  <h4>Vendedor Externo</h4>
                  <span className="vaga-local">Carmo do Paranaíba - MG</span>
                </div>
                <div className="vaga-content">
                  <p>Buscamos profissional experiente para atuar com vendas externas no setor de aço.</p>
                  <ul>
                    <li>Experiência em vendas B2B</li>
                    <li>Conhecimento em produtos de aço</li>
                    <li>CNH categoria B</li>
                    <li>Disponibilidade para viagens</li>
                  </ul>
                  <button className="btn-candidatar">Candidatar-se</button>
                </div>
              </div>

              <div className="vaga-card">
                <div className="vaga-header">
                  <h4>Operador de Máquinas</h4>
                  <span className="vaga-local">Patos de Minas - MG</span>
                </div>
                <div className="vaga-content">
                  <p>Operação de máquinas de corte e dobra de aço com experiência em indústria.</p>
                  <ul>
                    <li>Experiência com máquinas industriais</li>
                    <li>Conhecimento em leitura de desenho</li>
                    <li>Disponibilidade para turnos</li>
                    <li>Ensino médio completo</li>
                  </ul>
                  <button className="btn-candidatar">Candidatar-se</button>
                </div>
              </div>

              <div className="vaga-card">
                <div className="vaga-header">
                  <h4>Auxiliar Administrativo</h4>
                  <span className="vaga-local">Uberaba - MG</span>
                </div>
                <div className="vaga-content">
                  <p>Suporte administrativo com foco em faturamento e atendimento ao cliente.</p>
                  <ul>
                    <li>Experiência com sistemas ERP</li>
                    <li>Pacote Office intermediário</li>
                    <li>Boa comunicação</li>
                    <li>Ensino médio completo</li>
                  </ul>
                  <button className="btn-candidatar">Candidatar-se</button>
                </div>
              </div>
            </div>
          </div>

          <div className="beneficios-section">
            <h3>Benefícios</h3>
            <div className="beneficios-grid">
              <div className="beneficio-item">
                <div className="beneficio-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#e74c3c"/>
                  </svg>
                </div>
                <h4>Plano de Saúde</h4>
                <p>Cobertura completa para você e sua família</p>
              </div>

              <div className="beneficio-item">
                <div className="beneficio-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#e74c3c"/>
                  </svg>
                </div>
                <h4>Vale Refeição</h4>
                <p>Auxílio alimentação para todos os colaboradores</p>
              </div>

              <div className="beneficio-item">
                <div className="beneficio-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#e74c3c"/>
                  </svg>
                </div>
                <h4>Participação nos Lucros</h4>
                <p>Participe dos resultados da empresa</p>
              </div>

              <div className="beneficio-item">
                <div className="beneficio-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#e74c3c"/>
                  </svg>
                </div>
                <h4>Desenvolvimento</h4>
                <p>Programas de capacitação e crescimento</p>
              </div>
            </div>
          </div>

          <div className="contato-rh">
            <div className="rh-content">
              <h3>Entre em Contato com o RH</h3>
              <p>Envie seu currículo ou entre em contato conosco para mais informações sobre oportunidades.</p>
              
              <div className="contato-info">
                <div className="contato-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#e74c3c"/>
                  </svg>
                  <div>
                    <strong>Telefone:</strong>
                    <span>(34) 3851-6500</span>
                  </div>
                </div>
                
                <div className="contato-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM20 6L12 11L4 6H20ZM20 18V8L12 13L4 8V18H20Z" fill="#e74c3c"/>
                  </svg>
                  <div>
                    <strong>Email:</strong>
                    <span>rh@sevimol.com.br</span>
                  </div>
                </div>
              </div>
              
              <button className="btn-enviar-curriculo">Enviar Currículo</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacaParte;

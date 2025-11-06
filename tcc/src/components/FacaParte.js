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
                  <span className="vaga-local">Patrocínio - MG</span>
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

              <div className="vaga-card">
                <div className="vaga-header">
                  <h4>Assistente de Logística</h4>
                  <span className="vaga-local">Uberaba - MG</span>
                </div>
                <div className="vaga-content">
                  <p>Controle de estoque e organização de entregas de materiais de aço.</p>
                  <ul>
                    <li>Experiência em logística</li>
                    <li>Conhecimento em sistemas de gestão</li>
                    <li>Organização e proatividade</li>
                    <li>Ensino médio completo</li>
                  </ul>
                  <button className="btn-candidatar">Candidatar-se</button>
                </div>
              </div>

              <div className="vaga-card">
                <div className="vaga-header">
                  <h4>Auxiliar de Produção</h4>
                  <span className="vaga-local">Paracatu - MG</span>
                </div>
                <div className="vaga-content">
                  <p>Auxiliar nas atividades de produção e beneficiamento de aço.</p>
                  <ul>
                    <li>Experiência em produção industrial</li>
                    <li>Disponibilidade para turnos</li>
                    <li>Comprometimento e pontualidade</li>
                    <li>Ensino fundamental completo</li>
                  </ul>
                  <button className="btn-candidatar">Candidatar-se</button>
                </div>
              </div>

              <div className="vaga-card">
                <div className="vaga-header">
                  <h4>Operador de Empilhadeira</h4>
                  <span className="vaga-local">São Gotardo - MG</span>
                </div>
                <div className="vaga-content">
                  <p>Movimentação de materiais e produtos acabados no pátio e estoque.</p>
                  <ul>
                    <li>CNH categoria B com curso de empilhadeira</li>
                    <li>Experiência comprovada</li>
                    <li>Atenção e cuidado com materiais</li>
                    <li>Ensino médio completo</li>
                  </ul>
                  <button className="btn-candidatar">Candidatar-se</button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default FacaParte;

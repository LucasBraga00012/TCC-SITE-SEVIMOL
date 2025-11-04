import React from 'react';
import './SobreNos.css';

const SobreNos = () => {
  return (
    <section className="sobre-nos" id="sobre-nos">
      <div className="container">
        <div className="section-header">
          <h2>NOSSA HISTÓRIA</h2>
          <div className="section-divider"></div>
        </div>

        <div className="sobre-content">
          <div className="sobre-text">
            <p className="intro-text">
              Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981 como <strong>SERRALHERIA E VIDRAÇARIA MOREIRA LTDA – SEVIMOL</strong>
            </p>
            <p>
              Formada pelos três irmãos, sócios e diretores: <strong>Baltazar, João Batista e Paulo</strong>.
            </p>
            <p>
              Hoje a SEVIMOL atua como indústria e distribuidora de aço, fornecendo material de primeira qualidade para diversos setores.
            </p>
            <button className="btn-primary">Saiba mais</button>
          </div>

          <div className="sobre-image">
            <img src="/sobre-nos.jpg" alt="História da SEVIMOL" />
          </div>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="valores-grid">
          <div className="valor-card">
            <div className="valor-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#e74c3c"/>
              </svg>
            </div>
            <h3>Missão</h3>
            <p>
              Fabricar, beneficiar e fornecer produtos de aço com alta qualidade. Contribuir nas diversas linhas de atendimento: comércio, indústria, agronegócio e prestadores de serviço, fomentando a ascensão nas diversas áreas produtivas, gerando empregos e contribuindo com impostos e tributos.
            </p>
          </div>

          <div className="valor-card">
            <div className="valor-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5S21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12S9.24 7 12 7S17 9.24 17 12S14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15S15 13.66 15 12S13.66 9 12 9Z" fill="#e74c3c"/>
              </svg>
            </div>
            <h3>Visão</h3>
            <p>
              Ser reconhecidos como a melhor empresa de aço da região, através da qualidade dos nossos produtos e por relacionamentos perenes que geram confiança, satisfação e orgulho aos nossos clientes, colaboradores e parceiros.
            </p>
          </div>

          <div className="valor-card">
            <div className="valor-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#e74c3c"/>
              </svg>
            </div>
            <h3>Valores</h3>
            <ul>
              <li>Satisfação do nosso cliente o qual é a razão da nossa existência.</li>
              <li>Valorização e respeito aos colaboradores, pois são eles o grande diferencial para tornar tudo possível.</li>
              <li>Credibilidade no mercado.</li>
              <li>Processos eficientes com foco nos resultados.</li>
              <li>Trabalho com responsabilidade socioambiental.</li>
              <li>Construir amizade sincera, forte como ferro e aço.</li>
            </ul>
          </div>
        </div>

        {/* Destaque Final */}
        <div className="destaque-final">
          <h3>Amizade sincera, forte como ferro e aço</h3>
        </div>
      </div>
    </section>
  );
};

export default SobreNos;

import React from 'react';
import './Atuacao.css';

const Atuacao = () => {
  const segmentosAtuacao = [
    {
      nome: 'Construção Civil',
      descricao: 'Fornecemos materiais de aço para obras residenciais, comerciais e industriais.',
      imagem: '/construcao-civil.jpg',
      produtos: ['Barras de aço', 'Chapas', 'Perfis estruturais', 'Telhas']
    },
    {
      nome: 'Indústria',
      descricao: 'Soluções em aço para o setor industrial com qualidade e precisão.',
      imagem: '/industria-setor.jpg',
      produtos: ['Chapas industriais', 'Perfis especiais', 'Materiais para máquinas', 'Componentes']
    },
    {
      nome: 'Agronegócio',
      descricao: 'Produtos específicos para o campo, como arame, telas e estruturas rurais.',
      imagem: '/agronegocio.jpg',
      produtos: ['Arame recozido', 'Telas', 'Portões', 'Estruturas rurais']
    },
    {
      nome: 'Prestadores de Serviço',
      descricao: 'Suporte completo para serralheiros, soldadores e profissionais da área.',
      imagem: '/prestadores-servico.jpg',
      produtos: ['Materiais diversos', 'Assistência técnica', 'Corte personalizado', 'Consultoria']
    }
  ];

  return (
    <section className="atuacao" id="atuacao">
      <div className="container">
        <div className="section-header">
          <h2>Nossa Atuação</h2>
          <div className="section-divider"></div>
          <p>Atendemos diversos segmentos com produtos de qualidade e soluções personalizadas</p>
        </div>

        <div className="segmentos-grid">
          {segmentosAtuacao.map((segmento, index) => (
            <div key={index} className="segmento-card">
              <div className="segmento-imagem">
                <img src={segmento.imagem} alt={segmento.nome} />
                <div className="segmento-overlay">
                  <button className="btn-saiba-mais">Saiba mais</button>
                </div>
              </div>
              
              <div className="segmento-content">
                <h3>{segmento.nome}</h3>
                <p>{segmento.descricao}</p>
                
                <div className="segmento-produtos">
                  <h4>Principais Produtos:</h4>
                  <div className="produtos-tags">
                    {segmento.produtos.map((produto, idx) => (
                      <span key={idx} className="produto-tag">{produto}</span>
                    ))}
                  </div>
                </div>
                
                <button className="btn-contatar">Entrar em Contato</button>
              </div>
            </div>
          ))}
        </div>

        {/* Destaque Experiência */}
        <div className="destaque-experiencia">
          <div className="experiencia-content">
            <div className="experiencia-text">
              <h3>Mais de 40 anos de experiência</h3>
              <p>
                Desde 1981, a SEVIMOL tem sido referência em qualidade e confiabilidade no mercado de aço. 
                Nossa experiência acumulada nos permite oferecer as melhores soluções para cada segmento de atuação.
              </p>
              
              <div className="experiencia-stats">
                <div className="stat-item">
                  <div className="stat-number">40+</div>
                  <div className="stat-label">Anos de experiência</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">7</div>
                  <div className="stat-label">Unidades</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Produtos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Clientes satisfeitos</div>
                </div>
              </div>
            </div>
            
            <div className="experiencia-imagem">
              <img src="/experiencia-sevimol.jpg" alt="Experiência SEVIMOL" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Atuacao;

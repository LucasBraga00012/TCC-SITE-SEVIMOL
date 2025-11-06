import React, { useState, useEffect, useRef } from 'react';
import './Atuacao.css';
import ModalDetalhes from './ModalDetalhes';
import experienciaImage from '../img/40anos_xp.jpg';

const Atuacao = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSegmento, setSelectedSegmento] = useState(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const sectionRef = useRef(null);
  
  // Contador animado
  const [anos, setAnos] = useState(0);
  const [unidades, setUnidades] = useState(0);
  const [produtos, setProdutos] = useState(0);
  const [clientes, setClientes] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [countersStarted]);

  useEffect(() => {
    if (!countersStarted) return;

    const animateCounter = (setter, target, duration = 2000) => {
      const increment = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);
      return timer;
    };

    const timer1 = animateCounter(setAnos, 40);
    const timer2 = animateCounter(setUnidades, 7);
    const timer3 = animateCounter(setProdutos, 1000);
    const timer4 = animateCounter(setClientes, 500);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
      clearInterval(timer4);
    };
  }, [countersStarted]);
  
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
                  <button className="btn-saiba-mais" onClick={() => { setSelectedSegmento(segmento); setModalOpen(true); }}>Saiba mais</button>
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
                
                <a href="tel:3438262000" className="btn-contatar" style={{textDecoration: 'none'}}>Entrar em Contato</a>
              </div>
            </div>
          ))}
        </div>

        {/* Destaque Experiência */}
        <div className="destaque-experiencia" ref={sectionRef}>
          <div className="experiencia-content">
            <div className="experiencia-text">
              <h3>Mais de 40 anos de experiência</h3>
              <p>
                Desde 1981, a SEVIMOL tem sido referência em qualidade e confiabilidade no mercado de aço. 
                Nossa experiência acumulada nos permite oferecer as melhores soluções para cada segmento de atuação.
              </p>
              
              <div className="experiencia-stats">
                <div className="stat-item">
                  <div className="stat-number">{anos}+</div>
                  <div className="stat-label">Anos de experiência</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{unidades}</div>
                  <div className="stat-label">Unidades</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{produtos}+</div>
                  <div className="stat-label">Produtos</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{clientes}+</div>
                  <div className="stat-label">Clientes satisfeitos</div>
                </div>
              </div>
            </div>
            
            <div className="experiencia-imagem">
              <img src={experienciaImage} alt="Experiência SEVIMOL" />
            </div>
          </div>
        </div>
      </div>
      
      <ModalDetalhes 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedSegmento}
      />
    </section>
  );
};

export default Atuacao;

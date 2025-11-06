import React, { useState } from 'react';
import './SobreNos.css';
import ModalDetalhes from './ModalDetalhes';
import logoSevimol from '../img/logoWide.png';
import imagemSobre from '../img/aboutUs.png';

const SobreNos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const historiaCompleta = {
    nome: 'Nossa História',
    descricao: 'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981 como SERRALHERIA E VIDRAÇARIA MOREIRA LTDA – SEVIMOL. Formada pelos três irmãos, sócios e diretores: Baltazar, João Batista e Paulo. Desde então, a empresa cresceu e se consolidou como referência no mercado de ferro e aço em Minas Gerais. Hoje a SEVIMOL atua como indústria e distribuidora de aço, fornecendo material de primeira qualidade para diversos setores, incluindo construção civil, indústria, agronegócio e prestadores de serviço. Com mais de 40 anos de experiência, mantemos os valores de qualidade, compromisso e respeito aos nossos clientes e colaboradores.',
    imagem: imagemSobre
  };

  return (
    <section className="sobre-nos" id="sobre-nos">
      {/* Hero Section - Estilo AçoFort */}
      <div className="sobre-hero">
        <div className="sobre-hero-image">
          <img src={imagemSobre} alt="Unidade SEVIMOL - Carmo do Paranaíba" />
          <div className="hero-image-overlay"></div>
        </div>
        
        <div className="sobre-hero-content">
          <div className="sobre-hero-inner">
            <div className="logo-container">
              <img src={logoSevimol} alt="SEVIMOL - Ferro e Aço" className="sobre-logo" />
            </div>
            
            <div className="hero-divider"></div>
            
            <h1 className="hero-title">
              Conheça a história da<br />
              <span className="highlight-text">SEVIMOL</span>
            </h1>
            
            <div className="hero-text">
              <p>
                Uma história de trabalho, princípios e união administrativa que teve início em <strong>fevereiro de 1981</strong> como <strong>SERRALHERIA E VIDRAÇARIA MOREIRA LTDA – SEVIMOL</strong>.
              </p>
              <p>
                Formada pelos três irmãos, sócios e diretores: <strong>Baltazar, João Batista e Paulo</strong>.
              </p>
              <p>
                Hoje a SEVIMOL atua como <strong>indústria e distribuidora de aço</strong>, fornecendo material de primeira qualidade para diversos setores: <strong>construção civil, indústria, agronegócio e prestadores de serviço</strong>.
              </p>
              <p className="experience-text">
                Com mais de <strong>40 anos de experiência</strong>, mantemos os valores de qualidade, compromisso e respeito aos nossos clientes e colaboradores.
              </p>
            </div>

            <button className="btn-primary btn-saiba-mais" onClick={() => setModalOpen(true)}>
              Saiba mais sobre nossa história
            </button>
          </div>
        </div>
      </div>

      
      <ModalDetalhes 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={historiaCompleta}
      />
    </section>
  );
};

export default SobreNos;

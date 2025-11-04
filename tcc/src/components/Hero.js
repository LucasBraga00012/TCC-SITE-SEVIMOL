import React, { useState, useEffect } from 'react';
import './Hero.css';
import { supabase } from '../lib/supabase';

const Hero = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'SEVIMOL',
    subtitle: 'Ferro e Aço',
    description: 'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981',
    buttonText: 'Nossa História',
    backgroundImage: '/hero-bg-1.jpg'
  });

  useEffect(() => {
    loadHeroContent();
  }, []);

  const loadHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true })
        .limit(1);

      if (error) {
        console.error('Erro ao carregar hero:', error);
        return;
      }

      if (data && data.length > 0) {
        setHeroContent({
          title: data[0].titulo || 'SEVIMOL',
          subtitle: data[0].subtitulo || 'Ferro e Aço',
          description: data[0].descricao || 'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981',
          buttonText: data[0].texto_botao || 'Nossa História',
          backgroundImage: data[0].imagem_fundo || '/hero-bg-1.jpg'
        });
      }
    } catch (error) {
      console.error('Erro ao carregar conteúdo do hero:', error);
    }
  };

  return (
    <section className="hero" id="inicio">
      <div className="hero-slider">
        <div className="slide active">
          <div 
            className="slide-bg" 
            style={{ backgroundImage: `url(${heroContent.backgroundImage})` }}
          ></div>
          <div className="slide-content">
            <div className="container">
              <div className="hero-text">
                <h1>{heroContent.title}</h1>
                <h2>{heroContent.subtitle}</h2>
                <p>{heroContent.description}</p>
                <div className="hero-buttons">
                  <button className="btn-primary" onClick={() => document.getElementById('sobre-nos').scrollIntoView({ behavior: 'smooth' })}>
                    {heroContent.buttonText}
                  </button>
                  <button className="btn-secondary" onClick={() => document.getElementById('unidades').scrollIntoView({ behavior: 'smooth' })}>
                    Nossas Unidades
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="slider-nav prev" aria-label="Slide anterior">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="slider-nav next" aria-label="Próximo slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        <button className="indicator active"></button>
        <button className="indicator"></button>
        <button className="indicator"></button>
      </div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import './Hero.css';
import { supabase } from '../lib/supabase';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([
    {
      title: 'SEVIMOL',
      subtitle: 'Ferro e Aço',
      description: 'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981',
      buttonText: 'Nossa História',
      backgroundImage: '/hero-bg-1.jpg'
    },
    {
      title: 'QUALIDADE E TRADIÇÃO',
      subtitle: 'Mais de 40 anos',
      description: 'Referência em produtos de aço com excelência e compromisso com nossos clientes',
      buttonText: 'Saiba Mais',
      backgroundImage: '/hero-bg-2.jpg'
    },
    {
      title: 'SOLUÇÕES COMPLETAS',
      subtitle: 'Para sua empresa',
      description: 'Atendemos indústria, comércio e agronegócio com produtos de primeira qualidade',
      buttonText: 'Nossos Produtos',
      backgroundImage: '/hero-bg-3.jpg'
    }
  ]);

  useEffect(() => {
    loadHeroContent();
    // Auto slide a cada 5 segundos
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const loadHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true });

      if (error) {
        console.error('Erro ao carregar hero:', error);
        return;
      }

      if (data && data.length > 0) {
        const loadedSlides = data.map(item => ({
          title: item.titulo || 'SEVIMOL',
          subtitle: item.subtitulo || 'Ferro e Aço',
          description: item.descricao || 'Uma história de trabalho, princípios e união administrativa',
          buttonText: item.texto_botao || 'Nossa História',
          backgroundImage: item.imagem_fundo || '/hero-bg-1.jpg'
        }));
        setSlides(loadedSlides);
      }
    } catch (error) {
      console.error('Erro ao carregar conteúdo do hero:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero" id="inicio">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
            <div 
              className="slide-bg" 
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            ></div>
            <div className="slide-content">
              <div className="container">
                <div className="hero-text">
                  <h1>{slide.title}</h1>
                  <h2>{slide.subtitle}</h2>
                  <p>{slide.description}</p>
                  <div className="hero-buttons">
                    <button className="btn-primary" onClick={() => document.getElementById('sobre-nos')?.scrollIntoView({ behavior: 'smooth' })}>
                      {slide.buttonText}
                    </button>
                    <button className="btn-secondary" onClick={() => document.getElementById('unidades')?.scrollIntoView({ behavior: 'smooth' })}>
                      Nossas Unidades
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="slider-nav prev" onClick={prevSlide} aria-label="Slide anterior">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="slider-nav next" onClick={nextSlide} aria-label="Próximo slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;

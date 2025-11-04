import React, { useState, useEffect } from 'react';
import './Industria.css';
import { supabase } from '../lib/supabase';

const Industria = () => {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    loadServicos();
  }, []);

  const loadServicos = async () => {
    try {
      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true });

      if (error) {
        console.error('Erro ao carregar serviços:', error);
        return;
      }

      if (data) {
        // Remover duplicações baseado no nome
        const servicosUnicos = data.filter((servico, index, self) => 
          index === self.findIndex(s => s.nome === servico.nome)
        );
        
        // Debug: verificar imagens
        console.log('Serviços carregados:', servicosUnicos);
        servicosUnicos.forEach(servico => {
          console.log(`Serviço: ${servico.nome}, Imagem: ${servico.imagem}`);
        });
        
        setServicos(servicosUnicos);
      }
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    }
  };

  return (
    <section className="industria" id="industria">
      <div className="container">
        <div className="section-header">
          <h2>Indústria</h2>
          <div className="section-divider"></div>
          <p>Transformação e beneficiamento de aço com tecnologia de ponta</p>
        </div>

        <div className="servicos-grid">
          {servicos.map((servico, index) => {
            // Filtrar URLs blob inválidas e vazias
            const imagemValida = servico.imagem && 
                                 !servico.imagem.startsWith('blob:') && 
                                 servico.imagem.trim() !== '' 
                                 ? servico.imagem 
                                 : null;
            
            return (
              <div key={servico.id || index} className="servico-card">
                <div className="servico-imagem">
                  {imagemValida ? (
                    <img 
                      src={imagemValida} 
                      alt={servico.nome}
                      onError={(e) => {
                        console.error(`Erro ao carregar imagem de ${servico.nome}:`, servico.imagem);
                        e.target.src = '/placeholder-servico.jpg';
                      }}
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>{servico.nome}</span>
                    </div>
                  )}
                  <div className="servico-overlay">
                    <button className="btn-ver-mais">Ver mais</button>
                  </div>
                </div>
              
              <div className="servico-content">
                <h3>{servico.nome}</h3>
                <p>{servico.descricao}</p>
                
                <button className="btn-solicitar">Solicitar Orçamento</button>
              </div>
            </div>
            );
          })}
        </div>

        {/* Destaque Tecnológico */}
        <div className="destaque-tecnologico">
          <div className="destaque-content">
            <div className="destaque-text">
              <h3>Tecnologia de Ponta</h3>
              <p>
                Nossa indústria conta com equipamentos modernos e tecnologia de última geração, 
                garantindo precisão, qualidade e eficiência em todos os processos de transformação do aço.
              </p>
              <div className="tecnologia-lista">
                <div className="tecnologia-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#e74c3c"/>
                    <path d="M2 17L12 22L22 17" fill="#e74c3c"/>
                    <path d="M2 12L12 17L22 12" fill="#e74c3c"/>
                  </svg>
                  <span>CNC Automatizado</span>
                </div>
                <div className="tecnologia-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#e74c3c"/>
                    <path d="M2 17L12 22L22 17" fill="#e74c3c"/>
                    <path d="M2 12L12 17L22 12" fill="#e74c3c"/>
                  </svg>
                  <span>Laser de Alta Precisão</span>
                </div>
                <div className="tecnologia-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#e74c3c"/>
                    <path d="M2 17L12 22L22 17" fill="#e74c3c"/>
                    <path d="M2 12L12 17L22 12" fill="#e74c3c"/>
                  </svg>
                  <span>Controle de Qualidade</span>
                </div>
              </div>
            </div>
            <div className="destaque-imagem">
              <img src="/tecnologia-industria.jpg" alt="Tecnologia Industrial" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industria;

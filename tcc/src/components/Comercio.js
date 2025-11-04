import React, { useState, useEffect } from 'react';
import './Comercio.css';
import { supabase } from '../lib/supabase';

const Comercio = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true });

      if (error) {
        console.error('Erro ao carregar produtos:', error);
        return;
      }

      if (data) {
        // Remover duplicações baseado no nome
        const produtosUnicos = data.filter((produto, index, self) => 
          index === self.findIndex(p => p.nome === produto.nome)
        );
        
        // Debug: verificar imagens
        console.log('Produtos carregados:', produtosUnicos);
        produtosUnicos.forEach(produto => {
          console.log(`Produto: ${produto.nome}, Imagem: ${produto.imagem}`);
        });
        
        setProdutos(produtosUnicos);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  return (
    <section className="comercio" id="comercio">
      <div className="container">
        <div className="section-header">
          <h2>Comércio</h2>
          <div className="section-divider"></div>
          <p>Ampla variedade de produtos de aço para atender todas as suas necessidades</p>
        </div>

        <div className="produtos-grid">
          {produtos.map((produto, index) => {
            // Filtrar URLs blob inválidas e vazias
            const imagemValida = produto.imagem && 
                                 !produto.imagem.startsWith('blob:') && 
                                 produto.imagem.trim() !== '' 
                                 ? produto.imagem 
                                 : null;
            
            return (
              <div key={produto.id || index} className="produto-card">
                <div className="produto-imagem">
                  {imagemValida ? (
                    <img 
                      src={imagemValida} 
                      alt={produto.nome}
                      onError={(e) => {
                        console.error(`Erro ao carregar imagem de ${produto.nome}:`, produto.imagem);
                        e.target.src = '/placeholder-produto.jpg';
                      }}
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>{produto.nome}</span>
                    </div>
                  )}
                  <div className="produto-overlay">
                    <button className="btn-orcamento">Solicitar Orçamento</button>
                  </div>
                </div>
              
              <div className="produto-content">
                <h3>{produto.nome}</h3>
                <p>{produto.descricao}</p>
                
                <div className="produto-aplicacoes">
                  <h4>Categoria:</h4>
                  <span className="categoria-tag">{produto.categoria}</span>
                </div>
                
                <div className="produto-actions">
                  <button className="btn-detalhes">Ver Detalhes</button>
                  <button className="btn-contato">Falar com Vendedor</button>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Destaque Qualidade */}
        <div className="destaque-qualidade">
          <div className="qualidade-content">
            <div className="qualidade-text">
              <h3>Qualidade Garantida</h3>
              <p>
                Todos os nossos produtos passam por rigoroso controle de qualidade, 
                garantindo que você receba sempre o melhor material para suas necessidades.
              </p>
              
              <div className="qualidade-beneficios">
                <div className="beneficio">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Certificação de Qualidade</span>
                </div>
                <div className="beneficio">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Garantia de Origem</span>
                </div>
                <div className="beneficio">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Atendimento Especializado</span>
                </div>
                <div className="beneficio">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Entrega Rápida</span>
                </div>
              </div>
            </div>
            
            <div className="qualidade-imagem">
              <img src="/qualidade-produtos.jpg" alt="Controle de Qualidade" />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h3>Precisa de um produto específico?</h3>
            <p>Entre em contato conosco e solicite um orçamento personalizado</p>
            <div className="cta-buttons">
              <button className="btn-whatsapp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="#25D366"/>
                </svg>
                WhatsApp
              </button>
              <button className="btn-telefone">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#e74c3c"/>
                </svg>
                Telefone
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comercio;

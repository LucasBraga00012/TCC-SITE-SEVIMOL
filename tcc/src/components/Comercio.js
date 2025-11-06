import React, { useState, useEffect } from 'react';
import './Comercio.css';
import { supabase } from '../lib/supabase';
import ModalDetalhes from './ModalDetalhes';

const Comercio = () => {
  const [produtos, setProdutos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);

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
                  <button className="btn-detalhes" onClick={() => { setSelectedProduto(produto); setModalOpen(true); }}>Ver Detalhes</button>
                  <a href="https://wa.me/553438262012" target="_blank" rel="noopener noreferrer" className="btn-contato" style={{textDecoration: 'none'}}>Falar com Vendedor</a>
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

      </div>
      
      <ModalDetalhes 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedProduto}
      />
    </section>
  );
};

export default Comercio;

import React from 'react';
import './ModalDetalhes.css';

const ModalDetalhes = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {item.imagem && (
          <div className="modal-image">
            <img src={item.imagem} alt={item.nome || item.title} />
          </div>
        )}
        
        <div className="modal-body">
          <h2>{item.nome || item.title}</h2>
          
          {item.categoria && (
            <span className="modal-categoria">{item.categoria}</span>
          )}
          
          <p className="modal-descricao">{item.descricao || item.description}</p>
          
          {item.detalhes && (
            <div className="modal-detalhes">
              <h3>Detalhes</h3>
              <p>{item.detalhes}</p>
            </div>
          )}
          
          {item.caracteristicas && (
            <div className="modal-caracteristicas">
              <h3>Características</h3>
              <ul>
                {item.caracteristicas.map((carac, index) => (
                  <li key={index}>{carac}</li>
                ))}
              </ul>
            </div>
          )}
          
          {item.aplicacoes && (
            <div className="modal-aplicacoes">
              <h3>Aplicações</h3>
              <ul>
                {item.aplicacoes.map((aplic, index) => (
                  <li key={index}>{aplic}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="modal-actions">
            <a 
              href="https://wa.me/553438262012" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-modal-primary"
            >
              Solicitar Orçamento
            </a>
            <a 
              href="tel:3438262000" 
              className="btn-modal-secondary"
            >
              Entrar em Contato
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalhes;


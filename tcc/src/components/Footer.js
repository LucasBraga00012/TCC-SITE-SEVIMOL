import React from 'react';
import './Footer.css';

const Footer = () => {
  const unidades = [
    {
      nome: 'Carmo do Paranaíba (Matriz)',
      telefone: '(34) 3851-6500'
    },
    {
      nome: 'Patos de Minas',
      telefone: '(34) 3826-2000'
    },
    {
      nome: 'Patrocínio',
      telefone: '(34) 3515-7100'
    },
    {
      nome: 'Uberaba',
      telefone: '(34) 3315-8000'
    },
    {
      nome: 'Paracatu',
      telefone: '(38) 3365-1990'
    },
    {
      nome: 'São Gotardo',
      telefone: '(34) 3615-4400'
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo e Descrição */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/logo-sevimol.png" alt="SEVIMOL" className="logo-img" />
              <div className="logo-text">
                <h3>SEVIMOL</h3>
                <span>Ferro e Aço</span>
              </div>
            </div>
            <p className="footer-description">
              Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981. 
              Hoje a SEVIMOL atua como indústria e distribuidora de aço, fornecendo material de primeira qualidade.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C18.105 2.291 18.82 2.533 19.375 2.788C20.017 3.081 20.519 3.474 21.021 3.976C21.523 4.478 21.916 4.98 22.209 5.622C22.464 6.177 22.706 6.892 22.764 8.147C22.822 9.413 22.834 9.793 22.834 12.997C22.834 16.201 22.822 16.581 22.764 17.847C22.706 19.102 22.464 19.817 22.209 20.372C21.916 21.014 21.523 21.516 21.021 22.018C20.519 22.52 20.017 22.913 19.375 23.206C18.82 23.461 18.105 23.703 16.85 23.761C15.584 23.819 15.204 23.831 12 23.831C8.796 23.831 8.416 23.819 7.15 23.761C5.895 23.703 5.18 23.461 4.625 23.206C3.983 22.913 3.481 22.52 2.979 22.018C2.477 21.516 2.084 21.014 1.791 20.372C1.536 19.817 1.294 19.102 1.236 17.847C1.178 16.581 1.166 16.201 1.166 12.997C1.166 9.793 1.178 9.413 1.236 8.147C1.294 6.892 1.536 6.177 1.791 5.622C2.084 4.98 2.477 4.478 2.979 3.976C3.481 3.474 3.983 3.081 4.625 2.788C5.18 2.533 5.895 2.291 7.15 2.233C8.416 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C5.774 0.131 4.905 0.333 4.14 0.63C3.347 0.945 2.698 1.349 2.05 1.997C1.401 2.645 0.997 3.294 0.682 4.087C0.385 4.852 0.183 5.721 0.124 7C0.066 8.28 0.052 8.688 0.052 11.947C0.052 15.206 0.066 15.614 0.124 16.894C0.183 18.173 0.385 19.042 0.682 19.807C0.997 20.6 1.401 21.249 2.05 21.897C2.698 22.545 3.347 22.949 4.14 23.264C4.905 23.561 5.774 23.763 7.053 23.822C8.333 23.88 8.741 23.894 12 23.894C15.259 23.894 15.667 23.88 16.947 23.822C18.226 23.763 19.095 23.561 19.86 23.264C20.653 22.949 21.302 22.545 21.95 21.897C22.599 21.249 23.003 20.6 23.318 19.807C23.615 19.042 23.817 18.173 23.876 16.894C23.934 15.614 23.948 15.206 23.948 11.947C23.948 8.688 23.934 8.28 23.876 7C23.817 5.721 23.615 4.852 23.318 4.087C23.003 3.294 22.599 2.645 21.95 1.997C21.302 1.349 20.653 0.945 19.86 0.63C19.095 0.333 18.226 0.131 16.947 0.072C15.667 0.014 15.259 0 12 0ZM12 5.838C9.007 5.838 6.572 8.273 6.572 11.266C6.572 14.259 9.007 16.694 12 16.694C14.993 16.694 17.428 14.259 17.428 11.266C17.428 8.273 14.993 5.838 12 5.838ZM12 14.526C10.376 14.526 9.064 13.214 9.064 11.59C9.064 9.966 10.376 8.654 12 8.654C13.624 8.654 14.936 9.966 14.936 11.59C14.936 13.214 13.624 14.526 12 14.526ZM19.846 5.595C19.846 6.39 19.204 7.032 18.409 7.032C17.614 7.032 16.972 6.39 16.972 5.595C16.972 4.8 17.614 4.158 18.409 4.158C19.204 4.158 19.846 4.8 19.846 5.595Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul className="footer-links">
              <li><a href="#inicio">Início</a></li>
              <li><a href="#sobre-nos">Sobre nós</a></li>
              <li><a href="#unidades">Unidades</a></li>
              <li><a href="#industria">Indústria</a></li>
              <li><a href="#comercio">Comércio</a></li>
              <li><a href="#atuacao">Atuação</a></li>
              <li><a href="#faca-parte">Faça parte</a></li>
            </ul>
          </div>

          {/* Unidades */}
          <div className="footer-section">
            <h4>Nossas Unidades</h4>
            <ul className="footer-unidades">
              {unidades.map((unidade, index) => (
                <li key={index}>
                  <span className="unidade-nome">{unidade.nome}</span>
                  <span className="unidade-telefone">{unidade.telefone}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="footer-section">
            <h4>Contato</h4>
            <div className="footer-contato">
              <div className="contato-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#e74c3c"/>
                </svg>
                <span>(34) 3851-6500</span>
              </div>
              <div className="contato-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM20 6L12 11L4 6H20ZM20 18V8L12 13L4 8V18H20Z" fill="#e74c3c"/>
                </svg>
                <span>contato@sevimol.com.br</span>
              </div>
              <div className="contato-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" fill="#e74c3c"/>
                </svg>
                <span>Carmo do Paranaíba - MG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 SEVIMOL - Ferro e Aço. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

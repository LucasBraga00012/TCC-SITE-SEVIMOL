import React, { useState, useEffect } from 'react';
import './Header.css';
import logoSevimol from '../img/logoWide.png';

const Header = ({ onNavigate, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre-nos', label: 'Sobre nós' },
    { id: 'unidades', label: 'Unidades' },
    { id: 'industria', label: 'Indústria' },
    { id: 'comercio', label: 'Comércio' },
    { id: 'atuacao', label: 'Atuação' },
    { id: 'faca-parte', label: 'Faça parte' }
  ];

  const handleMenuClick = (sectionId) => {
    setIsMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo" onClick={() => handleMenuClick('inicio')}>
            <img src={logoSevimol} alt="SEVIMOL" className="logo-img" />
          </div>

          {/* Desktop Menu */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {menuItems.map(item => (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            {menuItems.map(item => (
              <li key={item.id} className="mobile-nav-item">
                <button
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleMenuClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

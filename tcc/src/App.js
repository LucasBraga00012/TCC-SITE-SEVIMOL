import React, { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';
import Hero from './components/Hero';
import SobreNos from './components/SobreNos';
import Unidades from './components/Unidades';
import Industria from './components/Industria';
import Comercio from './components/Comercio';
import Atuacao from './components/Atuacao';
import FacaParte from './components/FacaParte';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('site');
  const [activeSection, setActiveSection] = useState('inicio');
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Verificar se há admin logado
    const adminToken = localStorage.getItem('adminToken');
    const adminDataStored = localStorage.getItem('adminData');
    
    if (adminToken && adminDataStored) {
      try {
        const admin = JSON.parse(adminDataStored);
        setAdminData(admin);
        setCurrentView('admin');
      } catch (error) {
        console.error('Erro ao carregar dados do admin:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
      }
    }
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminLogin = (admin) => {
    setAdminData(admin);
    setCurrentView('admin');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdminData(null);
    setCurrentView('site');
  };

  const handleViewSite = () => {
    setCurrentView('site');
  };

  // Renderizar Admin
  if (currentView === 'admin') {
    return (
      <AdminPanel 
        adminData={adminData} 
        onLogout={handleAdminLogout}
        onViewSite={handleViewSite}
      />
    );
  }

  // Renderizar Login do Admin
  if (currentView === 'login') {
    return (
      <AdminLogin 
        onLoginSuccess={handleAdminLogin}
        onBackToSite={() => setCurrentView('site')}
      />
    );
  }

  // Renderizar Site Público
  return (
    <div className="App">
      <Header onNavigate={scrollToSection} activeSection={activeSection} />
      
      <main>
        <Hero id="inicio" />
        <SobreNos id="sobre-nos" />
        <Unidades id="unidades" />
        <Industria id="industria" />
        <Comercio id="comercio" />
        <Atuacao id="atuacao" />
        <FacaParte id="faca-parte" />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
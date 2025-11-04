import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import { supabase } from '../lib/supabase';

const AdminPanel = ({ adminData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadingImages, setUploadingImages] = useState({});
  const [loading, setLoading] = useState(true);

  // Carregar conteúdo do banco de dados
  useEffect(() => {
    loadSiteContent();
  }, []);

  const loadSiteContent = async () => {
    try {
      setLoading(true);
      
      // Carregar Hero
      const { data: heroData } = await supabase
        .from('hero_content')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true })
        .limit(1);

      // Carregar Sobre Nós
      const { data: sobreData } = await supabase
        .from('sobre_nos')
        .select('*')
        .limit(1);

      // Carregar Valores
      const { data: valoresData } = await supabase
        .from('valores')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true });

      // Carregar Unidades
      const { data: unidadesData } = await supabase
        .from('unidades')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true });

      // Remover duplicações das unidades
      const unidadesUnicas = unidadesData?.filter((unidade, index, self) => 
        index === self.findIndex(u => u.nome === unidade.nome)
      ) || [];

      // Carregar Produtos
      const { data: produtosData } = await supabase
        .from('produtos')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true });

      // Remover duplicações dos produtos
      const produtosUnicos = produtosData?.filter((produto, index, self) => 
        index === self.findIndex(p => p.nome === produto.nome)
      ) || [];

      // Carregar Serviços
      const { data: servicosData } = await supabase
        .from('servicos')
        .select('*')
        .eq('ativo', true)
        .order('ordem', { ascending: true });

      // Remover duplicações dos serviços
      const servicosUnicos = servicosData?.filter((servico, index, self) => 
        index === self.findIndex(s => s.nome === servico.nome)
      ) || [];

      // Carregar Configurações
      const { data: configuracoesData } = await supabase
        .from('configuracoes')
        .select('*');

      // Atualizar estado com dados do banco (preservando dados existentes)
      setSiteContent(prev => ({
        hero: heroData?.[0] ? {
          title: heroData[0].titulo,
          subtitle: heroData[0].subtitulo,
          description: heroData[0].descricao,
          buttonText: heroData[0].texto_botao,
          backgroundImage: heroData[0].imagem_fundo
        } : prev.hero,
        sobre: sobreData?.[0] ? {
          title: sobreData[0].titulo,
          description: sobreData[0].historia,
          founders: sobreData[0].texto_fundadores,
          current: sobreData[0].missao,
          missao: sobreData[0].missao,
          visao: sobreData[0].visao,
          imagem: sobreData[0].imagem,
          valores: valoresData?.map(v => v.descricao) || prev.sobre.valores
        } : prev.sobre,
        unidades: unidadesUnicas.map(u => {
          const unidadeAnterior = prev.unidades.find(pu => pu.nome === u.nome || pu.id === u.id);
          // Preservar imagem se for uma URL válida do banco ou se for uma imagem base64 temporária
          const imagemValida = u.imagem || unidadeAnterior?.imagem || '';
          return {
            id: u.id,
            nome: u.nome,
            endereco: u.endereco,
            cidade: u.cidade,
            cep: u.cep,
            telefone: u.telefone,
            tipo: u.tipo,
            ativo: u.ativo,
            imagem: imagemValida
          };
        }) || prev.unidades,
        produtos: produtosUnicos.map(p => {
          const produtoAnterior = prev.produtos.find(pp => pp.nome === p.nome || pp.id === p.id);
          // Preservar imagem se for uma URL válida do banco ou se for uma imagem base64 temporária
          const imagemValida = p.imagem || produtoAnterior?.imagem || '';
          return {
            id: p.id,
            nome: p.nome,
            descricao: p.descricao,
            categoria: p.categoria,
            imagem: imagemValida,
            ativo: p.ativo
          };
        }) || prev.produtos,
        servicos: servicosUnicos.map(s => {
          const servicoAnterior = prev.servicos.find(ps => ps.nome === s.nome || ps.id === s.id);
          // Preservar imagem se for uma URL válida do banco ou se for uma imagem base64 temporária
          const imagemValida = s.imagem || servicoAnterior?.imagem || '';
          return {
            id: s.id,
            nome: s.nome,
            descricao: s.descricao,
            imagem: imagemValida,
            ativo: s.ativo
          };
        }) || prev.servicos,
        configuracoes: configuracoesData?.reduce((acc, config) => {
          acc[config.chave] = config.valor;
          return acc;
        }, {}) || prev.configuracoes
      }));

    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
    } finally {
      setLoading(false);
    }
  };
  const [siteContent, setSiteContent] = useState({
    hero: {
      title: 'SEVIMOL',
      subtitle: 'Ferro e Aço',
      description: 'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981',
      buttonText: 'Nossa História',
      backgroundImage: '/hero-bg-1.jpg'
    },
    sobre: {
      title: 'NOSSA HISTÓRIA',
      description: 'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981 como SERRALHERIA E VIDRAÇARIA MOREIRA LTDA – SEVIMOL',
      founders: 'Formada pelos três irmãos, sócios e diretores: Baltazar, João Batista e Paulo.',
      current: 'Hoje a SEVIMOL atua como indústria e distribuidora de aço, fornecendo material de primeira qualidade para diversos setores.',
      missao: 'Fabricar, beneficiar e fornecer produtos de aço com alta qualidade. Contribuir nas diversas linhas de atendimento: comércio, indústria, agronegócio e prestadores de serviço, fomentando a ascensão nas diversas áreas produtivas, gerando empregos e contribuindo com impostos e tributos.',
      visao: 'Ser reconhecidos como a melhor empresa de aço da região, através da qualidade dos nossos produtos e por relacionamentos perenes que geram confiança, satisfação e orgulho aos nossos clientes, colaboradores e parceiros.',
      imagem: '',
      valores: [
        'Satisfação do nosso cliente o qual é a razão da nossa existência.',
        'Valorização e respeito aos colaboradores, pois são eles o grande diferencial para tornar tudo possível.',
        'Credibilidade no mercado.',
        'Processos eficientes com foco nos resultados.',
        'Trabalho com responsabilidade socioambiental.',
        'Construir amizade sincera, forte como ferro e aço.'
      ]
    },
    unidades: [
      {
        id: 1,
        nome: 'Carmo do Paranaíba (Matriz)',
        endereco: 'Rua Eduardo Braz de Queiroz, 852, Amazonas',
        cidade: 'Carmo do Paranaíba-MG',
        cep: '38.840-000',
        telefone: '(34) 3851-6500',
        tipo: 'matriz',
        ativo: true,
        imagem: ''
      },
      {
        id: 2,
        nome: 'Carmo do Paranaíba (Lagoa Seca)',
        endereco: 'Filial (Lagoa Seca) Rodovia Ageu Garcia De Deus, 120 B. Amazonas',
        cidade: 'Carmo do Paranaíba-MG',
        cep: '38.840-000',
        telefone: '(34) 3851-6500',
        tipo: 'filial',
        ativo: true,
        imagem: ''
      },
      {
        id: 3,
        nome: 'Patos de Minas',
        endereco: 'Av. Juscelino Kubitschek de Oliveira, 4200, Planalto',
        cidade: 'Patos de Minas-MG',
        cep: '38.706-001',
        telefone: '(34) 3826-2000',
        tipo: 'filial',
        ativo: true,
        imagem: ''
      },
      {
        id: 4,
        nome: 'Patrocínio',
        endereco: 'Av Dom Jose Andrade, Av. Dom José André Coimbra, 1691 - São Cristovao',
        cidade: 'Patrocínio-MG',
        cep: '38742-212',
        telefone: '(34) 3515-7100',
        tipo: 'filial',
        ativo: true,
        imagem: ''
      },
      {
        id: 5,
        nome: 'Uberaba',
        endereco: 'Av. Tonico dos Santos, 477, Jardim Induberaba',
        cidade: 'Uberaba-MG',
        cep: '38.040-000',
        telefone: '(34) 3315-8000',
        tipo: 'filial',
        ativo: true,
        imagem: ''
      },
      {
        id: 6,
        nome: 'Paracatu',
        endereco: 'Rodovia Presidente Juscelino Kubitschek, Av. Alto Córrego, 160',
        cidade: 'Paracatu-MG',
        cep: '38606-000',
        telefone: '(38) 3365-1990',
        tipo: 'filial',
        ativo: true,
        imagem: ''
      },
      {
        id: 7,
        nome: 'São Gotardo',
        endereco: 'Rodovia MG 205 Km 83, n° 1690 - Zona Rural',
        cidade: 'São Gotardo-MG',
        cep: '38.800-000',
        telefone: '(34) 3615-4400',
        tipo: 'filial',
        ativo: true,
        imagem: ''
      }
    ],
    produtos: [
      {
        id: 1,
        nome: 'Arame Recozido',
        descricao: 'Arame de aço carbono recozido para diversos usos industriais e comerciais.',
        categoria: 'Arame',
        imagem: '/arame-recozido.jpg',
        ativo: true
      },
      {
        id: 2,
        nome: 'Arruela',
        descricao: 'Arruelas de aço em diversos diâmetros e espessuras para fixação.',
        categoria: 'Fixação',
        imagem: '/arruela.jpg',
        ativo: true
      },
      {
        id: 3,
        nome: 'Barra Chata',
        descricao: 'Barras chatas de aço carbono em diversas medidas e espessuras.',
        categoria: 'Barra',
        imagem: '/barra-chata.jpg',
        ativo: true
      },
      {
        id: 4,
        nome: 'Barra Quadrada',
        descricao: 'Barras quadradas de aço carbono para aplicações estruturais.',
        categoria: 'Barra',
        imagem: '/barra-quadrada.jpg',
        ativo: true
      },
      {
        id: 5,
        nome: 'Barra Redonda',
        descricao: 'Barras redondas de aço carbono em diversos diâmetros.',
        categoria: 'Barra',
        imagem: '/barra-redonda.jpg',
        ativo: true
      },
      {
        id: 6,
        nome: 'Chapa de Aço',
        descricao: 'Chapas de aço carbono em diversas espessuras e dimensões.',
        categoria: 'Chapa',
        imagem: '/chapa-aco.jpg',
        ativo: true
      }
    ],
    servicos: [
      {
        id: 1,
        nome: 'Corte e Dobra',
        descricao: 'Serviços especializados de corte e dobra de aço com precisão e qualidade.',
        imagem: '/corte-dobra.jpg',
        ativo: true
      },
      {
        id: 2,
        nome: 'Fabricação de Telhas',
        descricao: 'Fabricação de telhas galvanizadas e trapezoidais para diversos segmentos.',
        imagem: '/fabricacao-telhas.jpg',
        ativo: true
      },
      {
        id: 3,
        nome: 'Corte Laser e Plasma',
        descricao: 'Tecnologia de ponta para corte a laser e plasma com máxima precisão.',
        imagem: '/corte-laser.jpg',
        ativo: true
      }
    ],
    configuracoes: {
      logo_url: '/logo-sevimol.png',
      tecnologia_image: '/tecnologia-industria.jpg',
      qualidade_image: '/qualidade-produtos.jpg',
      atuacao_image: '/atuacao-sevimol.jpg',
      experiencia_image: '/experiencia-40-anos.jpg'
    }
  });

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Salvar Hero
      if (activeTab === 'hero') {
        const { error: heroError } = await supabase
          .from('hero_content')
          .upsert({
            titulo: siteContent.hero.title,
            subtitulo: siteContent.hero.subtitle,
            descricao: siteContent.hero.description,
            texto_botao: siteContent.hero.buttonText,
            imagem_fundo: siteContent.hero.backgroundImage,
            ativo: true,
            ordem: 1,
            updated_at: new Date().toISOString()
          });

        if (heroError) throw heroError;
      }

      // Salvar Sobre Nós
      if (activeTab === 'sobre') {
        const { error: sobreError } = await supabase
          .from('sobre_nos')
          .upsert({
            titulo: siteContent.sobre.title,
            historia: siteContent.sobre.description,
            texto_fundadores: siteContent.sobre.founders,
            missao: siteContent.sobre.missao,
            visao: siteContent.sobre.visao,
            imagem: siteContent.sobre.imagem,
            updated_at: new Date().toISOString()
          });

        if (sobreError) throw sobreError;

        // Salvar Valores
        for (let i = 0; i < siteContent.sobre.valores.length; i++) {
          const valor = siteContent.sobre.valores[i];
          if (valor.trim()) {
            const { error: valorError } = await supabase
              .from('valores')
              .upsert({
                titulo: `Valor ${i + 1}`,
                descricao: valor,
                ordem: i + 1,
                ativo: true,
                updated_at: new Date().toISOString()
              });

            if (valorError) throw valorError;
          }
        }
      }

      // Salvar Unidades
      if (activeTab === 'unidades') {
        for (const unidade of siteContent.unidades) {
          const { error: unidadeError } = await supabase
            .from('unidades')
            .upsert({
              id: unidade.id,
              nome: unidade.nome,
              endereco: unidade.endereco,
              cidade: unidade.cidade,
              estado: 'MG',
              cep: unidade.cep,
              telefone: unidade.telefone,
              tipo: unidade.tipo,
              ativo: unidade.ativo,
              imagem: unidade.imagem,
              updated_at: new Date().toISOString()
            });

          if (unidadeError) throw unidadeError;
        }
      }

      // Salvar Produtos
      if (activeTab === 'produtos') {
        for (const produto of siteContent.produtos) {
          const { error: produtoError } = await supabase
            .from('produtos')
            .upsert({
              id: produto.id,
              nome: produto.nome,
              descricao: produto.descricao,
              categoria: produto.categoria,
              imagem: produto.imagem,
              ativo: produto.ativo,
              updated_at: new Date().toISOString()
            });

          if (produtoError) throw produtoError;
        }
      }

      // Salvar Serviços
      if (activeTab === 'servicos') {
        for (const servico of siteContent.servicos) {
          const { error: servicoError } = await supabase
            .from('servicos')
            .upsert({
              id: servico.id,
              nome: servico.nome,
              descricao: servico.descricao,
              imagem: servico.imagem,
              ativo: servico.ativo,
              updated_at: new Date().toISOString()
            });

          if (servicoError) throw servicoError;
        }
      }

      // Salvar Configurações
      if (activeTab === 'imagens') {
        for (const [chave, valor] of Object.entries(siteContent.configuracoes)) {
          const { error: configError } = await supabase
            .from('configuracoes')
            .upsert({
              chave: chave,
              valor: valor,
              tipo: 'image',
              updated_at: new Date().toISOString()
            });

          if (configError) throw configError;
        }
      }

      alert('Conteúdo salvo com sucesso!');
      
      // Recarregar conteúdo do banco para mostrar as atualizações
      await loadSiteContent();
      
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar conteúdo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      })
    }));
  };

  const handleConfigChange = (field, value) => {
    setSiteContent(prev => ({
      ...prev,
      configuracoes: {
        ...prev.configuracoes,
        [field]: value
      }
    }));
  };

  // Função para upload de imagem
  const handleImageUpload = async (section, index, field, file) => {
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de arquivo não permitido. Use apenas JPG, PNG, GIF ou WebP.');
      return;
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('Arquivo muito grande. Tamanho máximo permitido: 5MB.');
      return;
    }

    const uploadKey = `${section}-${index}-${field}`;
    
    try {
      setUploadingImages(prev => ({ ...prev, [uploadKey]: true }));

      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${section}/${fileName}`;

      // Upload para Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        throw uploadError;
      }

      // Obter URL pública da imagem
      const { data: urlData } = supabase.storage
        .from('site-images')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      
      // Atualizar o conteúdo com URL pública
      if (section === 'hero') {
        handleInputChange(section, field, publicUrl);
      } else if (section === 'configuracoes') {
        handleConfigChange(field, publicUrl);
      } else {
        handleArrayItemChange(section, index, field, publicUrl);
      }
      
      console.log(`Imagem ${file.name} carregada com sucesso!`);
      
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      alert('Erro ao fazer upload da imagem: ' + (error.message || 'Tente novamente.'));
    } finally {
      setUploadingImages(prev => {
        const newState = { ...prev };
        delete newState[uploadKey];
        return newState;
      });
    }
  };

  // Componente de upload de imagem
  const ImageUpload = ({ section, index, field, currentImage, label }) => {
    const uploadKey = `${section}-${index}-${field}`;
    const isUploading = uploadingImages[uploadKey];

    return (
      <div key={uploadKey} className="form-group image-upload-group">
        <label>{label}</label>
        
        {/* Preview da imagem atual */}
        {currentImage && currentImage.trim() !== '' && (
          <div className="image-preview">
            <img 
              src={currentImage} 
              alt="Preview" 
              className="preview-image"
              onError={(e) => {
                if (e.target && e.target.parentNode) {
                  e.target.parentNode.style.display = 'none';
                }
              }}
              onLoad={(e) => {
                if (e.target && e.target.parentNode) {
                  e.target.parentNode.style.display = 'block';
                }
              }}
            />
          </div>
        )}
        
        {/* Input de upload */}
        <div className="image-upload-container">
          <input
            type="file"
            id={`upload-${uploadKey}`}
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleImageUpload(section, index, field, file);
              }
            }}
            disabled={isUploading}
            className="image-upload-input"
          />
          
          <label 
            htmlFor={`upload-${uploadKey}`} 
            className={`image-upload-button ${isUploading ? 'uploading' : ''}`}
          >
            {isUploading ? (
              <>
                <div className="upload-spinner"></div>
                Carregando...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Escolher Imagem
              </>
            )}
          </label>
          
          {/* Input de texto para URL manual */}
          <div className="image-url-input">
            <input
              type="text"
              placeholder="Ou cole a URL da imagem"
              value={currentImage || ''}
              onChange={(e) => {
                if (section === 'hero') {
                  handleInputChange(section, field, e.target.value);
                } else if (section === 'configuracoes') {
                  handleConfigChange(field, e.target.value);
                } else {
                  handleArrayItemChange(section, index, field, e.target.value);
                }
              }}
              disabled={isUploading}
            />
          </div>
        </div>
        
        <div className="upload-info">
          <small>Formatos aceitos: JPG, PNG, GIF, WebP | Tamanho máximo: 5MB</small>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h2>Dashboard</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Unidades</h3>
                <p>{siteContent.unidades.length}</p>
              </div>
              <div className="stat-card">
                <h3>Produtos</h3>
                <p>{siteContent.produtos.length}</p>
              </div>
              <div className="stat-card">
                <h3>Serviços</h3>
                <p>{siteContent.servicos.length}</p>
              </div>
              <div className="stat-card">
                <h3>Status</h3>
                <p>Online</p>
              </div>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="section-editor">
            <h2>Seção Hero (Página Inicial)</h2>
            <div className="form-group">
              <label>Título Principal</label>
              <input
                type="text"
                value={siteContent.hero.title}
                onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subtítulo</label>
              <input
                type="text"
                value={siteContent.hero.subtitle}
                onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={siteContent.hero.description}
                onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Texto do Botão</label>
              <input
                type="text"
                value={siteContent.hero.buttonText}
                onChange={(e) => handleInputChange('hero', 'buttonText', e.target.value)}
              />
            </div>
            <ImageUpload
              section="hero"
              index={0}
              field="backgroundImage"
              currentImage={siteContent.hero.backgroundImage}
              label="Imagem de Fundo"
            />
          </div>
        );

      case 'sobre':
        return (
          <div className="section-editor">
            <h2>Seção Sobre Nós</h2>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                value={siteContent.sobre.title}
                onChange={(e) => handleInputChange('sobre', 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Descrição Principal</label>
              <textarea
                value={siteContent.sobre.description}
                onChange={(e) => handleInputChange('sobre', 'description', e.target.value)}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Texto dos Fundadores</label>
              <textarea
                value={siteContent.sobre.founders}
                onChange={(e) => handleInputChange('sobre', 'founders', e.target.value)}
                rows="2"
              />
            </div>
            <div className="form-group">
              <label>Texto Atual</label>
              <textarea
                value={siteContent.sobre.current}
                onChange={(e) => handleInputChange('sobre', 'current', e.target.value)}
                rows="2"
              />
            </div>
            <div className="form-group">
              <label>Missão</label>
              <textarea
                value={siteContent.sobre.missao}
                onChange={(e) => handleInputChange('sobre', 'missao', e.target.value)}
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Visão</label>
              <textarea
                value={siteContent.sobre.visao}
                onChange={(e) => handleInputChange('sobre', 'visao', e.target.value)}
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Valores</label>
              {siteContent.sobre.valores.map((valor, index) => (
                <input
                  key={index}
                  type="text"
                  value={valor}
                  onChange={(e) => {
                    const newValores = [...siteContent.sobre.valores];
                    newValores[index] = e.target.value;
                    handleInputChange('sobre', 'valores', newValores);
                  }}
                  placeholder={`Valor ${index + 1}`}
                />
              ))}
            </div>

            <ImageUpload
              section="sobre"
              index={0}
              field="imagem"
              currentImage={siteContent.sobre.imagem}
              label="Imagem da Seção Sobre Nós"
            />
          </div>
        );

      case 'unidades':
        return (
          <div className="section-editor">
            <h2>Gerenciar Unidades</h2>
            <div className="items-list">
              {siteContent.unidades.map((unidade, index) => (
                <div key={unidade.id || `unidade-${index}`} className="item-card">
                  <div className="form-group">
                    <label>Nome</label>
                    <input
                      type="text"
                      value={unidade.nome}
                      onChange={(e) => handleArrayItemChange('unidades', index, 'nome', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Endereço</label>
                    <input
                      type="text"
                      value={unidade.endereco}
                      onChange={(e) => handleArrayItemChange('unidades', index, 'endereco', e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Cidade</label>
                      <input
                        type="text"
                        value={unidade.cidade}
                        onChange={(e) => handleArrayItemChange('unidades', index, 'cidade', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>CEP</label>
                      <input
                        type="text"
                        value={unidade.cep}
                        onChange={(e) => handleArrayItemChange('unidades', index, 'cep', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Telefone</label>
                      <input
                        type="text"
                        value={unidade.telefone}
                        onChange={(e) => handleArrayItemChange('unidades', index, 'telefone', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Tipo</label>
                      <select
                        value={unidade.tipo}
                        onChange={(e) => handleArrayItemChange('unidades', index, 'tipo', e.target.value)}
                      >
                        <option value="matriz">Matriz</option>
                        <option value="filial">Filial</option>
                      </select>
                    </div>
                  </div>

                  <ImageUpload
                    section="unidades"
                    index={index}
                    field="imagem"
                    currentImage={unidade.imagem}
                    label="Imagem da Unidade"
                  />

                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={unidade.ativo}
                        onChange={(e) => handleArrayItemChange('unidades', index, 'ativo', e.target.checked)}
                      />
                      Unidade Ativa
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'produtos':
        return (
          <div className="section-editor">
            <h2>Gerenciar Produtos</h2>
            <div className="items-list">
              {siteContent.produtos.map((produto, index) => (
                <div key={produto.id || `produto-${index}`} className="item-card">
                  <div className="form-group">
                    <label>Nome do Produto</label>
                    <input
                      type="text"
                      value={produto.nome}
                      onChange={(e) => handleArrayItemChange('produtos', index, 'nome', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                      value={produto.descricao}
                      onChange={(e) => handleArrayItemChange('produtos', index, 'descricao', e.target.value)}
                      rows="2"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Categoria</label>
                      <input
                        type="text"
                        value={produto.categoria}
                        onChange={(e) => handleArrayItemChange('produtos', index, 'categoria', e.target.value)}
                      />
                    </div>
                  </div>
                  <ImageUpload
                    section="produtos"
                    index={index}
                    field="imagem"
                    currentImage={produto.imagem}
                    label="Imagem do Produto"
                  />
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={produto.ativo}
                        onChange={(e) => handleArrayItemChange('produtos', index, 'ativo', e.target.checked)}
                      />
                      Produto Ativo
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'servicos':
        return (
          <div className="section-editor">
            <h2>Gerenciar Serviços</h2>
            <div className="items-list">
              {siteContent.servicos.map((servico, index) => (
                <div key={servico.id || `servico-${index}`} className="item-card">
                  <div className="form-group">
                    <label>Nome do Serviço</label>
                    <input
                      type="text"
                      value={servico.nome}
                      onChange={(e) => handleArrayItemChange('servicos', index, 'nome', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                      value={servico.descricao}
                      onChange={(e) => handleArrayItemChange('servicos', index, 'descricao', e.target.value)}
                      rows="2"
                    />
                  </div>
                  <ImageUpload
                    section="servicos"
                    index={index}
                    field="imagem"
                    currentImage={servico.imagem}
                    label="Imagem do Serviço"
                  />
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={servico.ativo}
                        onChange={(e) => handleArrayItemChange('servicos', index, 'ativo', e.target.checked)}
                      />
                      Serviço Ativo
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'imagens':
        return (
          <div className="section-editor">
            <h2>Gerenciar Imagens das Seções</h2>
            
            <div className="form-group">
              <label>Logo da Empresa</label>
              <ImageUpload
                section="configuracoes"
                index={0}
                field="logo_url"
                currentImage={siteContent.configuracoes?.logo_url || '/logo-sevimol.png'}
                label="Logo da Empresa"
              />
            </div>

            <div className="form-group">
              <label>Imagem - Tecnologia de Ponta</label>
              <ImageUpload
                section="configuracoes"
                index={1}
                field="tecnologia_image"
                currentImage={siteContent.configuracoes?.tecnologia_image || '/tecnologia-industria.jpg'}
                label="Imagem da Seção Tecnologia"
              />
            </div>

            <div className="form-group">
              <label>Imagem - Qualidade Garantida</label>
              <ImageUpload
                section="configuracoes"
                index={2}
                field="qualidade_image"
                currentImage={siteContent.configuracoes?.qualidade_image || '/qualidade-produtos.jpg'}
                label="Imagem da Seção Qualidade"
              />
            </div>

            <div className="form-group">
              <label>Imagem - Nossa Atuação</label>
              <ImageUpload
                section="configuracoes"
                index={3}
                field="atuacao_image"
                currentImage={siteContent.configuracoes?.atuacao_image || '/atuacao-sevimol.jpg'}
                label="Imagem da Seção Atuação"
              />
            </div>

            <div className="form-group">
              <label>Imagem - Mais de 40 Anos de Experiência</label>
              <ImageUpload
                section="configuracoes"
                index={4}
                field="experiencia_image"
                currentImage={siteContent.configuracoes?.experiencia_image || '/experiencia-40-anos.jpg'}
                label="Imagem da Seção Experiência"
              />
            </div>
          </div>
        );

      default:
        return <div>Seção não encontrada</div>;
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="header-content">
          <div className="logo">
            <img src="/logo-sevimol.png" alt="SEVIMOL" />
            <div className="logo-text">
              <h1>SEVIMOL</h1>
              <span>Painel Administrativo</span>
            </div>
          </div>
          <div className="admin-info">
            <span>Bem-vindo, {adminData.name}</span>
            <button onClick={onLogout} className="logout-btn">Sair</button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        <nav className="admin-nav">
          <button
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-btn ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            🏠 Página Inicial
          </button>
          <button
            className={`nav-btn ${activeTab === 'sobre' ? 'active' : ''}`}
            onClick={() => setActiveTab('sobre')}
          >
            📖 Sobre Nós
          </button>
          <button
            className={`nav-btn ${activeTab === 'unidades' ? 'active' : ''}`}
            onClick={() => setActiveTab('unidades')}
          >
            🏢 Unidades
          </button>
          <button
            className={`nav-btn ${activeTab === 'produtos' ? 'active' : ''}`}
            onClick={() => setActiveTab('produtos')}
          >
            🛒 Produtos
          </button>
          <button
            className={`nav-btn ${activeTab === 'servicos' ? 'active' : ''}`}
            onClick={() => setActiveTab('servicos')}
          >
            🏭 Serviços
          </button>
          <button
            className={`nav-btn ${activeTab === 'imagens' ? 'active' : ''}`}
            onClick={() => setActiveTab('imagens')}
          >
            🖼️ Imagens
          </button>
        </nav>

        <main className="admin-main">
          {renderTabContent()}
          
          {activeTab !== 'dashboard' && (
            <div className="admin-actions">
              <button 
                className={`save-btn ${loading ? 'loading' : ''}`} 
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="save-spinner"></div>
                    Salvando...
                  </>
                ) : (
                  '💾 Salvar Alterações'
                )}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

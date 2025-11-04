-- =====================================================
-- SISTEMA CMS SEVIMOL - ESTRUTURA DE BANCO DE DADOS
-- =====================================================
-- Banco: sevimol_cms
-- Descrição: Sistema de gerenciamento de conteúdo para o site da SEVIMOL
-- Versão: 1.0
-- Data: 2024

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS sevimol_cms 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE sevimol_cms;

-- =====================================================
-- TABELA DE ADMINISTRADORES
-- =====================================================
CREATE TABLE administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'editor',
    ativo BOOLEAN DEFAULT TRUE,
    ultimo_login DATETIME NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE CONFIGURAÇÕES GERAIS DO SITE
-- =====================================================
CREATE TABLE configuracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    descricao VARCHAR(255),
    tipo ENUM('texto', 'numero', 'boolean', 'json', 'imagem') DEFAULT 'texto',
    secao VARCHAR(50) DEFAULT 'geral',
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE CONTEÚDO DA SEÇÃO HERO
-- =====================================================
CREATE TABLE hero_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    subtitulo VARCHAR(255),
    descricao TEXT,
    texto_botao VARCHAR(100),
    imagem_fundo VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE,
    ordem INT DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE CONTEÚDO SOBRE NÓS
-- =====================================================
CREATE TABLE sobre_nos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    texto_fundadores TEXT,
    texto_atual TEXT,
    missao TEXT,
    visao TEXT,
    imagem VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE VALORES DA EMPRESA
-- =====================================================
CREATE TABLE valores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor TEXT NOT NULL,
    ordem INT DEFAULT 1,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE UNIDADES DA EMPRESA
-- =====================================================
CREATE TABLE unidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    telefone VARCHAR(20),
    email VARCHAR(255),
    tipo ENUM('matriz', 'filial', 'deposito') DEFAULT 'filial',
    responsavel VARCHAR(255),
    capacidade_estoque INT,
    servicos JSON,
    ativo BOOLEAN DEFAULT TRUE,
    ordem INT DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE PRODUTOS
-- =====================================================
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    especificacoes JSON,
    preco DECIMAL(10,2),
    unidade VARCHAR(20),
    imagem VARCHAR(255),
    galeria JSON,
    tags VARCHAR(500),
    ativo BOOLEAN DEFAULT TRUE,
    destaque BOOLEAN DEFAULT FALSE,
    ordem INT DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE SERVIÇOS
-- =====================================================
CREATE TABLE servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    especificacoes JSON,
    imagem VARCHAR(255),
    galeria JSON,
    ativo BOOLEAN DEFAULT TRUE,
    destaque BOOLEAN DEFAULT FALSE,
    ordem INT DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE SEGMENTOS DE ATUAÇÃO
-- =====================================================
CREATE TABLE segmentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255),
    produtos_relacionados JSON,
    ativo BOOLEAN DEFAULT TRUE,
    ordem INT DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE VAGAS E OPORTUNIDADES
-- =====================================================
CREATE TABLE vagas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    requisitos TEXT,
    beneficios TEXT,
    localizacao VARCHAR(255),
    tipo ENUM('clt', 'pj', 'estagio', 'freelancer') DEFAULT 'clt',
    salario VARCHAR(100),
    ativo BOOLEAN DEFAULT TRUE,
    data_publicacao DATE,
    data_expiracao DATE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE CANDIDATOS
-- =====================================================
CREATE TABLE candidatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    vaga_id INT,
    curriculo_path VARCHAR(255),
    observacoes TEXT,
    status ENUM('novo', 'em_analise', 'aprovado', 'rejeitado') DEFAULT 'novo',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vaga_id) REFERENCES vagas(id) ON DELETE SET NULL
);

-- =====================================================
-- TABELA DE CONTATOS RECEBIDOS
-- =====================================================
CREATE TABLE contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    empresa VARCHAR(255),
    assunto VARCHAR(255),
    mensagem TEXT,
    tipo ENUM('orcamento', 'duvida', 'sugestao', 'outros') DEFAULT 'duvida',
    status ENUM('novo', 'lido', 'respondido', 'arquivado') DEFAULT 'novo',
    unidade_interesse VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE LOGS DO SISTEMA
-- =====================================================
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    administrador_id INT,
    acao VARCHAR(100) NOT NULL,
    tabela VARCHAR(50),
    registro_id INT,
    dados_anteriores JSON,
    dados_novos JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (administrador_id) REFERENCES administradores(id) ON DELETE SET NULL
);

-- =====================================================
-- INSERIR DADOS INICIAIS
-- =====================================================

-- Inserir administrador padrão (senha: admin123)
INSERT INTO administradores (nome, email, senha, role) VALUES 
('Administrador SEVIMOL', 'admin@sevimol.com.br', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Inserir configurações padrão
INSERT INTO configuracoes (chave, valor, descricao, tipo, secao) VALUES 
('site_titulo', 'SEVIMOL - Ferro e Aço', 'Título principal do site', 'texto', 'geral'),
('site_descricao', 'Indústria e distribuidora de aço com mais de 40 anos de experiência', 'Descrição do site', 'texto', 'geral'),
('site_keywords', 'aço, ferro, indústria, construção civil, SEVIMOL', 'Palavras-chave do site', 'texto', 'seo'),
('contato_email', 'contato@sevimol.com.br', 'Email principal de contato', 'texto', 'contato'),
('contato_telefone', '(34) 3851-6500', 'Telefone principal de contato', 'texto', 'contato'),
('endereco_matriz', 'Rua Eduardo Braz de Queiroz, 852, Amazonas, Carmo do Paranaíba-MG', 'Endereço da matriz', 'texto', 'contato'),
('redes_sociais', '{"facebook": "", "instagram": "", "linkedin": ""}', 'Links das redes sociais', 'json', 'social');

-- Inserir conteúdo do hero
INSERT INTO hero_content (titulo, subtitulo, descricao, texto_botao, imagem_fundo) VALUES 
('SEVIMOL', 'Ferro e Aço', 'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981', 'Nossa História', '/hero-bg-1.jpg');

-- Inserir conteúdo sobre nós
INSERT INTO sobre_nos (titulo, descricao, texto_fundadores, texto_atual, missao, visao) VALUES 
('NOSSA HISTÓRIA', 
'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981 como SERRALHERIA E VIDRAÇARIA MOREIRA LTDA – SEVIMOL',
'Formada pelos três irmãos, sócios e diretores: Baltazar, João Batista e Paulo.',
'Hoje a SEVIMOL atua como indústria e distribuidora de aço, fornecendo material de primeira qualidade para diversos setores.',
'Fabricar, beneficiar e fornecer produtos de aço com alta qualidade. Contribuir nas diversas linhas de atendimento: comércio, indústria, agronegócio e prestadores de serviço, fomentando a ascensão nas diversas áreas produtivas, gerando empregos e contribuindo com impostos e tributos.',
'Ser reconhecidos como a melhor empresa de aço da região, através da qualidade dos nossos produtos e por relacionamentos perenes que geram confiança, satisfação e orgulho aos nossos clientes, colaboradores e parceiros.');

-- Inserir valores da empresa
INSERT INTO valores (valor, ordem) VALUES 
('Satisfação do nosso cliente o qual é a razão da nossa existência.', 1),
('Valorização e respeito aos colaboradores, pois são eles o grande diferencial para tornar tudo possível.', 2),
('Credibilidade no mercado.', 3),
('Processos eficientes com foco nos resultados.', 4),
('Trabalho com responsabilidade socioambiental.', 5),
('Construir amizade sincera, forte como ferro e aço.', 6);

-- Inserir unidades
INSERT INTO unidades (nome, endereco, cidade, estado, cep, telefone, tipo, ordem) VALUES 
('Carmo do Paranaíba (Matriz)', 'Rua Eduardo Braz de Queiroz, 852, Amazonas', 'Carmo do Paranaíba', 'MG', '38840-000', '(34) 3851-6500', 'matriz', 1),
('Carmo do Paranaíba (Lagoa Seca)', 'Filial (Lagoa Seca) Rodovia Ageu Garcia De Deus, 120 B. Amazonas', 'Carmo do Paranaíba', 'MG', '38840-000', '(34) 3851-6500', 'filial', 2),
('Patos de Minas', 'Av. Juscelino Kubitschek de Oliveira, 4200, Planalto', 'Patos de Minas', 'MG', '38706-001', '(34) 3826-2000', 'filial', 3),
('Patrocínio', 'Av Dom Jose Andrade, Av. Dom José André Coimbra, 1691 - São Cristovao', 'Patrocínio', 'MG', '38742-212', '(34) 3515-7100', 'filial', 4),
('Uberaba', 'Av. Tonico dos Santos, 477, Jardim Induberaba', 'Uberaba', 'MG', '38040-000', '(34) 3315-8000', 'filial', 5),
('Paracatu', 'Rodovia Presidente Juscelino Kubitschek, Av. Alto Córrego, 160', 'Paracatu', 'MG', '38606-000', '(38) 3365-1990', 'filial', 6),
('São Gotardo', 'Rodovia MG 205 Km 83, n° 1690 - Zona Rural', 'São Gotardo', 'MG', '38800-000', '(34) 3615-4400', 'filial', 7);

-- Inserir produtos
INSERT INTO produtos (nome, descricao, categoria, imagem, ativo, ordem) VALUES 
('Arame Recozido', 'Arame de aço carbono recozido para diversos usos industriais e comerciais.', 'Arame', '/arame-recozido.jpg', TRUE, 1),
('Arruela', 'Arruelas de aço em diversos diâmetros e espessuras para fixação.', 'Fixação', '/arruela.jpg', TRUE, 2),
('Barra Chata', 'Barras chatas de aço carbono em diversas medidas e espessuras.', 'Barra', '/barra-chata.jpg', TRUE, 3),
('Barra Quadrada', 'Barras quadradas de aço carbono para aplicações estruturais.', 'Barra', '/barra-quadrada.jpg', TRUE, 4),
('Barra Redonda', 'Barras redondas de aço carbono em diversos diâmetros.', 'Barra', '/barra-redonda.jpg', TRUE, 5),
('Chapa de Aço', 'Chapas de aço carbono em diversas espessuras e dimensões.', 'Chapa', '/chapa-aco.jpg', TRUE, 6);

-- Inserir serviços
INSERT INTO servicos (nome, descricao, imagem, ativo, ordem) VALUES 
('Corte e Dobra', 'Serviços especializados de corte e dobra de aço com precisão e qualidade.', '/corte-dobra.jpg', TRUE, 1),
('Fabricação de Telhas', 'Fabricação de telhas galvanizadas e trapezoidais para diversos segmentos.', '/fabricacao-telhas.jpg', TRUE, 2),
('Corte Laser e Plasma', 'Tecnologia de ponta para corte a laser e plasma com máxima precisão.', '/corte-laser.jpg', TRUE, 3);

-- Inserir segmentos
INSERT INTO segmentos (nome, descricao, imagem, ativo, ordem) VALUES 
('Construção Civil', 'Fornecemos materiais de aço para obras residenciais, comerciais e industriais.', '/construcao-civil.jpg', TRUE, 1),
('Indústria', 'Soluções em aço para o setor industrial com qualidade e precisão.', '/industria-setor.jpg', TRUE, 2),
('Agronegócio', 'Produtos específicos para o campo, como arame, telas e estruturas rurais.', '/agronegocio.jpg', TRUE, 3),
('Prestadores de Serviço', 'Suporte completo para serralheiros, soldadores e profissionais da área.', '/prestadores-servico.jpg', TRUE, 4);

-- Inserir vagas de exemplo
INSERT INTO vagas (titulo, descricao, requisitos, beneficios, localizacao, tipo, ativo, data_publicacao) VALUES 
('Vendedor Externo', 'Buscamos profissional experiente para atuar com vendas externas no setor de aço.', 'Experiência em vendas B2B\nConhecimento em produtos de aço\nCNH categoria B\nDisponibilidade para viagens', 'Plano de saúde\nVale refeição\nParticipação nos lucros', 'Carmo do Paranaíba - MG', 'clt', TRUE, CURDATE()),
('Operador de Máquinas', 'Operação de máquinas de corte e dobra de aço com experiência em indústria.', 'Experiência com máquinas industriais\nConhecimento em leitura de desenho\nDisponibilidade para turnos\nEnsino médio completo', 'Plano de saúde\nVale refeição\nParticipação nos lucros', 'Patos de Minas - MG', 'clt', TRUE, CURDATE());

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para tabela administradores
CREATE INDEX idx_admin_email ON administradores(email);
CREATE INDEX idx_admin_ativo ON administradores(ativo);

-- Índices para tabela configuracoes
CREATE INDEX idx_config_chave ON configuracoes(chave);
CREATE INDEX idx_config_secao ON configuracoes(secao);

-- Índices para tabela unidades
CREATE INDEX idx_unidades_tipo ON unidades(tipo);
CREATE INDEX idx_unidades_ativo ON unidades(ativo);
CREATE INDEX idx_unidades_estado ON unidades(estado);

-- Índices para tabela produtos
CREATE INDEX idx_produtos_categoria ON produtos(categoria);
CREATE INDEX idx_produtos_ativo ON produtos(ativo);
CREATE INDEX idx_produtos_destaque ON produtos(destaque);

-- Índices para tabela servicos
CREATE INDEX idx_servicos_categoria ON servicos(categoria);
CREATE INDEX idx_servicos_ativo ON servicos(ativo);

-- Índices para tabela vagas
CREATE INDEX idx_vagas_ativo ON vagas(ativo);
CREATE INDEX idx_vagas_tipo ON vagas(tipo);
CREATE INDEX idx_vagas_data_publicacao ON vagas(data_publicacao);

-- Índices para tabela contatos
CREATE INDEX idx_contatos_status ON contatos(status);
CREATE INDEX idx_contatos_tipo ON contatos(tipo);
CREATE INDEX idx_contatos_data_criacao ON contatos(data_criacao);

-- =====================================================
-- TRIGGERS PARA LOGS AUTOMÁTICOS
-- =====================================================

-- Trigger para logs em administradores
DELIMITER //
CREATE TRIGGER tr_admin_update_log AFTER UPDATE ON administradores
FOR EACH ROW
BEGIN
    INSERT INTO logs (administrador_id, acao, tabela, registro_id, dados_anteriores, dados_novos)
    VALUES (
        NEW.id,
        'UPDATE',
        'administradores',
        NEW.id,
        JSON_OBJECT('nome', OLD.nome, 'email', OLD.email, 'role', OLD.role, 'ativo', OLD.ativo),
        JSON_OBJECT('nome', NEW.nome, 'email', NEW.email, 'role', NEW.role, 'ativo', NEW.ativo)
    );
END//
DELIMITER ;

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View para estatísticas do sistema
CREATE VIEW vw_estatisticas AS
SELECT 
    (SELECT COUNT(*) FROM administradores WHERE ativo = TRUE) as total_admins,
    (SELECT COUNT(*) FROM unidades WHERE ativo = TRUE) as total_unidades,
    (SELECT COUNT(*) FROM produtos WHERE ativo = TRUE) as total_produtos,
    (SELECT COUNT(*) FROM servicos WHERE ativo = TRUE) as total_servicos,
    (SELECT COUNT(*) FROM vagas WHERE ativo = TRUE) as total_vagas,
    (SELECT COUNT(*) FROM contatos WHERE status = 'novo') as contatos_novos,
    (SELECT COUNT(*) FROM candidatos WHERE status = 'novo') as candidatos_novos;

-- View para conteúdo completo do site
CREATE VIEW vw_site_content AS
SELECT 
    'hero' as secao,
    JSON_OBJECT('titulo', hc.titulo, 'subtitulo', hc.subtitulo, 'descricao', hc.descricao, 'texto_botao', hc.texto_botao, 'imagem_fundo', hc.imagem_fundo) as conteudo
FROM hero_content hc WHERE hc.ativo = TRUE AND hc.id = 1
UNION ALL
SELECT 
    'sobre' as secao,
    JSON_OBJECT('titulo', sn.titulo, 'descricao', sn.descricao, 'texto_fundadores', sn.texto_fundadores, 'texto_atual', sn.texto_atual, 'missao', sn.missao, 'visao', sn.visao) as conteudo
FROM sobre_nos sn WHERE sn.ativo = TRUE AND sn.id = 1
UNION ALL
SELECT 
    'valores' as secao,
    JSON_ARRAYAGG(JSON_OBJECT('valor', v.valor, 'ordem', v.ordem)) as conteudo
FROM valores v WHERE v.ativo = TRUE ORDER BY v.ordem;

-- =====================================================
-- PROCEDURES ÚTEIS
-- =====================================================

-- Procedure para atualizar estatísticas
DELIMITER //
CREATE PROCEDURE sp_atualizar_estatisticas()
BEGIN
    SELECT * FROM vw_estatisticas;
END//
DELIMITER ;

-- Procedure para backup de configurações
DELIMITER //
CREATE PROCEDURE sp_backup_configuracoes()
BEGIN
    SELECT * FROM configuracoes ORDER BY secao, chave;
END//
DELIMITER ;

-- =====================================================
-- FIM DO SCRIPT
-- =====================================================

-- Mensagem de sucesso
SELECT 'Sistema CMS SEVIMOL instalado com sucesso!' as status;
SELECT 'Administrador padrão: admin@sevimol.com.br | Senha: admin123' as credenciais;
SELECT 'Banco de dados: sevimol_cms' as database;

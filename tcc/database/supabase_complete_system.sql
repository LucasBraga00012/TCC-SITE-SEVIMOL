-- =====================================================
-- SEVIMOL CMS - SCRIPT COMPLETO ATUALIZADO
-- Execute este script no Supabase SQL Editor
-- Inclui todas as correções e novas funcionalidades
-- =====================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. TABELA DE ADMINISTRADORES
-- =====================================================
CREATE TABLE IF NOT EXISTS administradores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    cargo VARCHAR(50) DEFAULT 'Administrador',
    ativo BOOLEAN DEFAULT true,
    ultimo_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. TABELA DE CONFIGURAÇÕES GERAIS
-- =====================================================
CREATE TABLE IF NOT EXISTS configuracoes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    chave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    tipo VARCHAR(20) DEFAULT 'text',
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. TABELA DE CONTEÚDO HERO (PÁGINA INICIAL)
-- =====================================================
CREATE TABLE IF NOT EXISTS hero_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    subtitulo VARCHAR(255),
    descricao TEXT,
    texto_botao VARCHAR(100),
    link_botao VARCHAR(255),
    imagem_fundo VARCHAR(500),
    ordem INTEGER DEFAULT 1,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. TABELA SOBRE NÓS
-- =====================================================
CREATE TABLE IF NOT EXISTS sobre_nos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    historia TEXT,
    texto_fundadores TEXT,
    missao TEXT,
    visao TEXT,
    imagem VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. TABELA DE VALORES DA EMPRESA
-- =====================================================
CREATE TABLE IF NOT EXISTS valores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    icone VARCHAR(100),
    ordem INTEGER DEFAULT 1,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. TABELA DE UNIDADES (FILIAIS)
-- =====================================================
CREATE TABLE IF NOT EXISTS unidades (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(255),
    tipo VARCHAR(20) DEFAULT 'filial', -- matriz ou filial
    ativo BOOLEAN DEFAULT true,
    ordem INTEGER DEFAULT 1,
    imagem VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 7. TABELA DE PRODUTOS
-- =====================================================
CREATE TABLE IF NOT EXISTS produtos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    imagem VARCHAR(500),
    preco DECIMAL(10,2),
    unidade VARCHAR(20),
    estoque INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    ordem INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 8. TABELA DE SERVIÇOS
-- =====================================================
CREATE TABLE IF NOT EXISTS servicos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(500),
    preco DECIMAL(10,2),
    unidade VARCHAR(20),
    ativo BOOLEAN DEFAULT true,
    ordem INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. TABELA DE SEGMENTOS DE ATUAÇÃO
-- =====================================================
CREATE TABLE IF NOT EXISTS segmentos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(500),
    produtos TEXT[], -- Array de produtos relacionados
    ativo BOOLEAN DEFAULT true,
    ordem INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 10. TABELA DE VAGAS DE EMPREGO
-- =====================================================
CREATE TABLE IF NOT EXISTS vagas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    requisitos TEXT,
    beneficios TEXT,
    salario VARCHAR(100),
    tipo_contrato VARCHAR(50),
    localizacao VARCHAR(100),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 11. TABELA DE CANDIDATOS
-- =====================================================
CREATE TABLE IF NOT EXISTS candidatos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vaga_id UUID REFERENCES vagas(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    curriculo VARCHAR(500), -- URL do arquivo
    experiencia TEXT,
    formacao TEXT,
    status VARCHAR(20) DEFAULT 'pendente', -- pendente, aprovado, rejeitado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 12. TABELA DE MENSAGENS DE CONTATO
-- =====================================================
CREATE TABLE IF NOT EXISTS contatos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    assunto VARCHAR(255),
    mensagem TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'novo', -- novo, lido, respondido
    resposta TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 13. TABELA DE LOGS DE AUDITORIA
-- =====================================================
CREATE TABLE IF NOT EXISTS logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID REFERENCES administradores(id),
    acao VARCHAR(100) NOT NULL,
    tabela VARCHAR(100),
    registro_id UUID,
    dados_anteriores JSONB,
    dados_novos JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ADICIONAR CAMPOS DE IMAGEM SE NÃO EXISTIREM
-- =====================================================

-- Adicionar campo de imagem na tabela sobre_nos se não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'sobre_nos' AND column_name = 'imagem') THEN
        ALTER TABLE sobre_nos ADD COLUMN imagem VARCHAR(500);
    END IF;
END $$;

-- Adicionar campo de imagem na tabela unidades se não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'unidades' AND column_name = 'imagem') THEN
        ALTER TABLE unidades ADD COLUMN imagem VARCHAR(500);
    END IF;
END $$;

-- =====================================================
-- FUNÇÕES PARA AUTENTICAÇÃO
-- =====================================================

-- Função para verificar login do administrador
CREATE OR REPLACE FUNCTION verificar_login_admin(
    email_param VARCHAR,
    senha_param VARCHAR
)
RETURNS TABLE (
    id UUID,
    nome VARCHAR,
    email VARCHAR,
    cargo VARCHAR,
    telefone VARCHAR,
    ativo BOOLEAN,
    ultimo_login TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.nome,
        a.email,
        a.cargo,
        a.telefone,
        a.ativo,
        a.ultimo_login
    FROM administradores a
    WHERE a.email = email_param
    AND a.senha = crypt(senha_param, a.senha)
    AND a.ativo = true;
END;
$$;

-- Função para atualizar último login
CREATE OR REPLACE FUNCTION atualizar_ultimo_login(
    admin_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE administradores 
    SET ultimo_login = NOW(),
        updated_at = NOW()
    WHERE id = admin_id;
END;
$$;

-- =====================================================
-- TRIGGERS PARA ATUALIZAÇÃO AUTOMÁTICA DE TIMESTAMPS
-- =====================================================

-- Função genérica para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para todas as tabelas (criar apenas se não existirem)
DO $$
BEGIN
    -- Trigger para administradores
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_administradores_updated_at') THEN
        CREATE TRIGGER update_administradores_updated_at BEFORE UPDATE ON administradores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para configuracoes
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_configuracoes_updated_at') THEN
        CREATE TRIGGER update_configuracoes_updated_at BEFORE UPDATE ON configuracoes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para hero_content
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_hero_content_updated_at') THEN
        CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para sobre_nos
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_sobre_nos_updated_at') THEN
        CREATE TRIGGER update_sobre_nos_updated_at BEFORE UPDATE ON sobre_nos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para valores
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_valores_updated_at') THEN
        CREATE TRIGGER update_valores_updated_at BEFORE UPDATE ON valores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para unidades
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_unidades_updated_at') THEN
        CREATE TRIGGER update_unidades_updated_at BEFORE UPDATE ON unidades FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para produtos
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_produtos_updated_at') THEN
        CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON produtos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para servicos
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_servicos_updated_at') THEN
        CREATE TRIGGER update_servicos_updated_at BEFORE UPDATE ON servicos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para segmentos
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_segmentos_updated_at') THEN
        CREATE TRIGGER update_segmentos_updated_at BEFORE UPDATE ON segmentos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para vagas
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_vagas_updated_at') THEN
        CREATE TRIGGER update_vagas_updated_at BEFORE UPDATE ON vagas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para candidatos
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_candidatos_updated_at') THEN
        CREATE TRIGGER update_candidatos_updated_at BEFORE UPDATE ON candidatos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Trigger para contatos
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_contatos_updated_at') THEN
        CREATE TRIGGER update_contatos_updated_at BEFORE UPDATE ON contatos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- =====================================================
-- TRIGGER PARA CRIPTOGRAFIA DE SENHAS
-- =====================================================

-- Função para criptografar senha
CREATE OR REPLACE FUNCTION hash_admin_password()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.senha IS NOT NULL AND (OLD IS NULL OR NEW.senha <> OLD.senha) THEN
        NEW.senha = crypt(NEW.senha, gen_salt('bf'));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para criptografar senha (criar apenas se não existir)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_hash_admin_password') THEN
        CREATE TRIGGER trg_hash_admin_password
            BEFORE INSERT OR UPDATE ON administradores
            FOR EACH ROW
            EXECUTE FUNCTION hash_admin_password();
    END IF;
END $$;

-- =====================================================
-- DADOS INICIAIS
-- =====================================================

-- Inserir administrador padrão
INSERT INTO administradores (nome, email, senha, cargo, ativo)
VALUES ('Administrador Padrão', 'admin@sevimol.com.br', 'admin123', 'Super Administrador', TRUE)
ON CONFLICT (email) DO UPDATE SET
    nome = EXCLUDED.nome,
    senha = EXCLUDED.senha,
    cargo = EXCLUDED.cargo,
    ativo = EXCLUDED.ativo,
    updated_at = NOW();

-- Inserir conteúdo Hero padrão
INSERT INTO hero_content (titulo, subtitulo, descricao, texto_botao, imagem_fundo, ordem, ativo)
VALUES (
    'SEVIMOL',
    'Ferro e Aço',
    'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981',
    'Nossa História',
    '/hero-bg-1.jpg',
    1,
    TRUE
)
ON CONFLICT DO NOTHING;

-- Inserir conteúdo Sobre Nós padrão
INSERT INTO sobre_nos (titulo, historia, texto_fundadores, missao, visao, imagem)
VALUES (
    'NOSSA HISTÓRIA',
    'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981 como SERRALHERIA E VIDRAÇARIA MOREIRA LTDA – SEVIMOL',
    'Formada pelos três irmãos, sócios e diretores: Baltazar, João Batista e Paulo.',
    'Fabricar, beneficiar e fornecer produtos de aço com alta qualidade. Contribuir nas diversas linhas de atendimento: comércio, indústria, agronegócio e prestadores de serviço, fomentando a ascensão nas diversas áreas produtivas, gerando empregos e contribuindo com impostos e tributos.',
    'Ser reconhecidos como a melhor empresa de aço da região, através da qualidade dos nossos produtos e por relacionamentos perenes que geram confiança, satisfação e orgulho aos nossos clientes, colaboradores e parceiros.',
    ''
)
ON CONFLICT DO NOTHING;

-- Inserir valores padrão
INSERT INTO valores (titulo, descricao, ordem, ativo) VALUES
('Satisfação do Cliente', 'Satisfação do nosso cliente o qual é a razão da nossa existência.', 1, TRUE),
('Valorização dos Colaboradores', 'Valorização e respeito aos colaboradores, pois são eles o grande diferencial para tornar tudo possível.', 2, TRUE),
('Credibilidade', 'Credibilidade no mercado.', 3, TRUE),
('Processos Eficientes', 'Processos eficientes com foco nos resultados.', 4, TRUE),
('Responsabilidade Socioambiental', 'Trabalho com responsabilidade socioambiental.', 5, TRUE),
('Amizade Sincera', 'Construir amizade sincera, forte como ferro e aço.', 6, TRUE)
ON CONFLICT DO NOTHING;

-- Inserir unidades padrão
INSERT INTO unidades (nome, endereco, cidade, estado, cep, telefone, tipo, ativo, ordem, imagem) VALUES
('Carmo do Paranaíba (Matriz)', 'Rua Eduardo Braz de Queiroz, 852, Amazonas', 'Carmo do Paranaíba', 'MG', '38.840-000', '(34) 3851-6500', 'matriz', TRUE, 1, ''),
('Carmo do Paranaíba (Lagoa Seca)', 'Filial (Lagoa Seca) Rodovia Ageu Garcia De Deus, 120 B. Amazonas', 'Carmo do Paranaíba', 'MG', '38.840-000', '(34) 3851-6500', 'filial', TRUE, 2, ''),
('Patos de Minas', 'Av. Juscelino Kubitschek de Oliveira, 4200, Planalto', 'Patos de Minas', 'MG', '38.706-001', '(34) 3826-2000', 'filial', TRUE, 3, ''),
('Patrocínio', 'Av Dom Jose Andrade, Av. Dom José André Coimbra, 1691 - São Cristovao', 'Patrocínio', 'MG', '38742-212', '(34) 3515-7100', 'filial', TRUE, 4, ''),
('Uberaba', 'Av. Tonico dos Santos, 477, Jardim Induberaba', 'Uberaba', 'MG', '38.040-000', '(34) 3315-8000', 'filial', TRUE, 5, ''),
('Paracatu', 'Rodovia Presidente Juscelino Kubitschek, Av. Alto Córrego, 160', 'Paracatu', 'MG', '38606-000', '(38) 3365-1990', 'filial', TRUE, 6, ''),
('São Gotardo', 'Rodovia MG 205 Km 83, n° 1690 - Zona Rural', 'São Gotardo', 'MG', '38.800-000', '(34) 3615-4400', 'filial', TRUE, 7, '')
ON CONFLICT DO NOTHING;

-- Inserir produtos padrão
INSERT INTO produtos (nome, descricao, categoria, imagem, ativo, ordem) VALUES
('Arame Recozido', 'Arame de aço carbono recozido para diversos usos industriais e comerciais.', 'Arame', '/arame-recozido.jpg', TRUE, 1),
('Arruela', 'Arruelas de aço em diversos diâmetros e espessuras para fixação.', 'Fixação', '/arruela.jpg', TRUE, 2),
('Barra Chata', 'Barras chatas de aço carbono em diversas medidas e espessuras.', 'Barra', '/barra-chata.jpg', TRUE, 3),
('Barra Quadrada', 'Barras quadradas de aço carbono para aplicações estruturais.', 'Barra', '/barra-quadrada.jpg', TRUE, 4),
('Barra Redonda', 'Barras redondas de aço carbono em diversos diâmetros.', 'Barra', '/barra-redonda.jpg', TRUE, 5),
('Chapa de Aço', 'Chapas de aço carbono em diversas espessuras e dimensões.', 'Chapa', '/chapa-aco.jpg', TRUE, 6)
ON CONFLICT DO NOTHING;

-- Inserir serviços padrão
INSERT INTO servicos (nome, descricao, imagem, ativo, ordem) VALUES
('Corte e Dobra', 'Serviços especializados de corte e dobra de aço com precisão e qualidade.', '/corte-dobra.jpg', TRUE, 1),
('Fabricação de Telhas', 'Fabricação de telhas galvanizadas e trapezoidais para diversos segmentos.', '/fabricacao-telhas.jpg', TRUE, 2),
('Corte Laser e Plasma', 'Tecnologia de ponta para corte a laser e plasma com máxima precisão.', '/corte-laser.jpg', TRUE, 3)
ON CONFLICT DO NOTHING;

-- Inserir configurações padrão
INSERT INTO configuracoes (chave, valor, tipo, descricao) VALUES
('logo_url', '/logo-sevimol.png', 'image', 'URL da logo da empresa'),
('tecnologia_image', '/tecnologia-industria.jpg', 'image', 'Imagem da seção Tecnologia de Ponta'),
('qualidade_image', '/qualidade-produtos.jpg', 'image', 'Imagem da seção Qualidade Garantida'),
('atuacao_image', '/atuacao-sevimol.jpg', 'image', 'Imagem da seção Nossa Atuação'),
('experiencia_image', '/experiencia-40-anos.jpg', 'image', 'Imagem da seção Mais de 40 Anos de Experiência')
ON CONFLICT (chave) DO UPDATE SET
    valor = EXCLUDED.valor,
    updated_at = NOW();

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para tabelas principais
CREATE INDEX IF NOT EXISTS idx_administradores_email ON administradores(email);
CREATE INDEX IF NOT EXISTS idx_administradores_ativo ON administradores(ativo);
CREATE INDEX IF NOT EXISTS idx_hero_content_ativo ON hero_content(ativo);
CREATE INDEX IF NOT EXISTS idx_hero_content_ordem ON hero_content(ordem);
CREATE INDEX IF NOT EXISTS idx_produtos_ativo ON produtos(ativo);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_ordem ON produtos(ordem);
CREATE INDEX IF NOT EXISTS idx_servicos_ativo ON servicos(ativo);
CREATE INDEX IF NOT EXISTS idx_servicos_ordem ON servicos(ordem);
CREATE INDEX IF NOT EXISTS idx_unidades_ativo ON unidades(ativo);
CREATE INDEX IF NOT EXISTS idx_unidades_tipo ON unidades(tipo);
CREATE INDEX IF NOT EXISTS idx_valores_ativo ON valores(ativo);
CREATE INDEX IF NOT EXISTS idx_valores_ordem ON valores(ordem);
CREATE INDEX IF NOT EXISTS idx_configuracoes_chave ON configuracoes(chave);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE administradores ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE sobre_nos ENABLE ROW LEVEL SECURITY;
ALTER TABLE valores ENABLE ROW LEVEL SECURITY;
ALTER TABLE unidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE segmentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houverem
DROP POLICY IF EXISTS "Permitir leitura pública de hero_content" ON hero_content;
DROP POLICY IF EXISTS "Permitir leitura pública de sobre_nos" ON sobre_nos;
DROP POLICY IF EXISTS "Permitir leitura pública de valores" ON valores;
DROP POLICY IF EXISTS "Permitir leitura pública de unidades" ON unidades;
DROP POLICY IF EXISTS "Permitir leitura pública de produtos" ON produtos;
DROP POLICY IF EXISTS "Permitir leitura pública de servicos" ON servicos;
DROP POLICY IF EXISTS "Permitir leitura pública de segmentos" ON segmentos;
DROP POLICY IF EXISTS "Permitir leitura pública de vagas" ON vagas;
DROP POLICY IF EXISTS "Permitir leitura pública de configuracoes" ON configuracoes;

-- Políticas para leitura pública (site público)
CREATE POLICY "Permitir leitura pública de hero_content" ON hero_content FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública de sobre_nos" ON sobre_nos FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de valores" ON valores FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública de unidades" ON unidades FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública de produtos" ON produtos FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública de servicos" ON servicos FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública de segmentos" ON segmentos FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública de vagas" ON vagas FOR SELECT USING (ativo = true);
CREATE POLICY "Permitir leitura pública de configuracoes" ON configuracoes FOR SELECT USING (true);

-- Remover políticas de administradores existentes se houverem
DROP POLICY IF EXISTS "Administradores podem gerenciar hero_content" ON hero_content;
DROP POLICY IF EXISTS "Administradores podem gerenciar sobre_nos" ON sobre_nos;
DROP POLICY IF EXISTS "Administradores podem gerenciar valores" ON valores;
DROP POLICY IF EXISTS "Administradores podem gerenciar unidades" ON unidades;
DROP POLICY IF EXISTS "Administradores podem gerenciar produtos" ON produtos;
DROP POLICY IF EXISTS "Administradores podem gerenciar servicos" ON servicos;
DROP POLICY IF EXISTS "Administradores podem gerenciar segmentos" ON segmentos;
DROP POLICY IF EXISTS "Administradores podem gerenciar vagas" ON vagas;
DROP POLICY IF EXISTS "Administradores podem gerenciar candidatos" ON candidatos;
DROP POLICY IF EXISTS "Administradores podem gerenciar contatos" ON contatos;
DROP POLICY IF EXISTS "Administradores podem gerenciar logs" ON logs;
DROP POLICY IF EXISTS "Administradores podem gerenciar configuracoes" ON configuracoes;
DROP POLICY IF EXISTS "Administradores podem ler próprios dados" ON administradores;
DROP POLICY IF EXISTS "Administradores podem atualizar próprios dados" ON administradores;

-- Políticas para administradores (todas as operações)
CREATE POLICY "Administradores podem gerenciar hero_content" ON hero_content FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar sobre_nos" ON sobre_nos FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar valores" ON valores FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar unidades" ON unidades FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar produtos" ON produtos FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar servicos" ON servicos FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar segmentos" ON segmentos FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar vagas" ON vagas FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar candidatos" ON candidatos FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar contatos" ON contatos FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar logs" ON logs FOR ALL USING (true);
CREATE POLICY "Administradores podem gerenciar configuracoes" ON configuracoes FOR ALL USING (true);

-- Políticas para administradores (apenas leitura própria)
CREATE POLICY "Administradores podem ler próprios dados" ON administradores FOR SELECT USING (true);
CREATE POLICY "Administradores podem atualizar próprios dados" ON administradores FOR UPDATE USING (true);

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View para estatísticas do dashboard
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM unidades WHERE ativo = true) as total_unidades,
    (SELECT COUNT(*) FROM produtos WHERE ativo = true) as total_produtos,
    (SELECT COUNT(*) FROM servicos WHERE ativo = true) as total_servicos,
    (SELECT COUNT(*) FROM vagas WHERE ativo = true) as total_vagas,
    (SELECT COUNT(*) FROM contatos WHERE status = 'novo') as contatos_novos,
    (SELECT COUNT(*) FROM candidatos WHERE status = 'pendente') as candidatos_pendentes;

-- =====================================================
-- FUNÇÕES AUXILIARES
-- =====================================================

-- Função para obter estatísticas
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE (
    total_unidades BIGINT,
    total_produtos BIGINT,
    total_servicos BIGINT,
    total_vagas BIGINT,
    contatos_novos BIGINT,
    candidatos_pendentes BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM unidades WHERE ativo = true),
        (SELECT COUNT(*) FROM produtos WHERE ativo = true),
        (SELECT COUNT(*) FROM servicos WHERE ativo = true),
        (SELECT COUNT(*) FROM vagas WHERE ativo = true),
        (SELECT COUNT(*) FROM contatos WHERE status = 'novo'),
        (SELECT COUNT(*) FROM candidatos WHERE status = 'pendente');
END;
$$;

-- =====================================================
-- MENSAGEM DE SUCESSO
-- =====================================================

SELECT 'Script executado com sucesso! Sistema completo de upload de imagens configurado.' AS status;

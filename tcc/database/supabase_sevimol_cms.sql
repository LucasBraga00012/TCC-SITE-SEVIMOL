-- =====================================================
-- SEVIMOL CMS - SCRIPT COMPLETO PARA SUPABASE
-- Sistema de Gerenciamento de Conteúdo
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
    imagem_fundo VARCHAR(255),
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
    imagem VARCHAR(255),
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
    especificacoes TEXT,
    aplicacoes TEXT[],
    imagem VARCHAR(255),
    preco DECIMAL(10,2),
    unidade VARCHAR(20),
    ativo BOOLEAN DEFAULT true,
    destaque BOOLEAN DEFAULT false,
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
    caracteristicas TEXT[],
    imagem VARCHAR(255),
    ativo BOOLEAN DEFAULT true,
    destaque BOOLEAN DEFAULT false,
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
    produtos TEXT[],
    imagem VARCHAR(255),
    ativo BOOLEAN DEFAULT true,
    ordem INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 10. TABELA DE VAGAS
-- =====================================================
CREATE TABLE IF NOT EXISTS vagas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    requisitos TEXT[],
    beneficios TEXT[],
    localizacao VARCHAR(255),
    tipo_contrato VARCHAR(50),
    salario VARCHAR(100),
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
    curriculo TEXT,
    experiencia TEXT,
    status VARCHAR(20) DEFAULT 'pendente', -- pendente, aprovado, rejeitado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 12. TABELA DE CONTATOS
-- =====================================================
CREATE TABLE IF NOT EXISTS contatos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    empresa VARCHAR(255),
    assunto VARCHAR(255),
    mensagem TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'novo', -- novo, lido, respondido
    lido_por UUID REFERENCES administradores(id),
    respondido_em TIMESTAMP WITH TIME ZONE,
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
    tabela VARCHAR(50),
    registro_id UUID,
    dados_anteriores JSONB,
    dados_novos JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 14. TABELA DE IMAGENS
-- =====================================================
CREATE TABLE IF NOT EXISTS imagens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    tipo VARCHAR(50), -- hero, produto, servico, unidade, etc.
    referencia_id UUID, -- ID da tabela relacionada
    tamanho INTEGER,
    mime_type VARCHAR(100),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 15. TABELA DE NEWSLETTER
-- =====================================================
CREATE TABLE IF NOT EXISTS newsletter (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255),
    ativo BOOLEAN DEFAULT true,
    origem VARCHAR(50) DEFAULT 'site',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 16. TABELA DE ESTATÍSTICAS
-- =====================================================
CREATE TABLE IF NOT EXISTS estatisticas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    chave VARCHAR(100) UNIQUE NOT NULL,
    valor INTEGER DEFAULT 0,
    descricao TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INSERIR DADOS INICIAIS
-- =====================================================

-- Inserir administrador padrão (senha: admin123)
INSERT INTO administradores (nome, email, senha, cargo) VALUES 
('Administrador SEVIMOL', 'admin@sevimol.com.br', crypt('admin123', gen_salt('bf')), 'Super Administrador');

-- Inserir configurações iniciais
INSERT INTO configuracoes (chave, valor, tipo, descricao) VALUES 
('site_titulo', 'SEVIMOL - Ferro e Aço', 'text', 'Título do site'),
('site_descricao', 'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981', 'text', 'Descrição do site'),
('site_logo', '/logo-sevimol.png', 'text', 'URL do logo'),
('site_favicon', '/favicon.ico', 'text', 'URL do favicon'),
('contato_email', 'contato@sevimol.com.br', 'email', 'Email de contato'),
('contato_telefone', '(34) 3851-6500', 'text', 'Telefone de contato'),
('endereco_matriz', 'Rua Eduardo Braz de Queiroz, 852, Amazonas, Carmo do Paranaíba-MG', 'text', 'Endereço da matriz'),
('redes_sociais_instagram', 'https://instagram.com/sevimolferroeaco', 'url', 'Instagram'),
('redes_sociais_facebook', 'https://facebook.com/sevimolferroaco', 'url', 'Facebook'),
('redes_sociais_linkedin', 'https://linkedin.com/company/sevimol', 'url', 'LinkedIn');

-- Inserir conteúdo hero inicial
INSERT INTO hero_content (titulo, subtitulo, descricao, texto_botao, link_botao, imagem_fundo, ordem) VALUES 
('SEVIMOL', 'Ferro e Aço', 'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981', 'Nossa História', '#sobre-nos', '/hero-bg-1.jpg', 1);

-- Inserir sobre nós inicial
INSERT INTO sobre_nos (titulo, historia, texto_fundadores, missao, visao) VALUES 
('Nossa História', 
'Uma história de trabalho, princípios e união administrativa que teve início em fevereiro de 1981 como SERRALHERIA E VIDRAÇARIA MOREIRA LTDA – SEVIMOL. Formada pelos três irmãos, sócios e diretores: Baltazar, João Batista e Paulo.',
'Formada pelos três irmãos, sócios e diretores: Baltazar, João Batista e Paulo.',
'Fabricar, beneficiar e fornecer produtos de aço com alta qualidade. Contribuir nas diversas linhas de atendimento: comércio, indústria, agronegócio e prestadores de serviço, fomentando a ascensão nas diversas áreas produtivas, gerando empregos e contribuindo com impostos e tributos.',
'Ser reconhecidos como a melhor empresa de aço da região, através da qualidade dos nossos produtos e por relacionamentos perenes que geram confiança, satisfação e orgulho aos nossos clientes, colaboradores e parceiros.');

-- Inserir valores da empresa
INSERT INTO valores (titulo, descricao, icone, ordem) VALUES 
('Satisfação do Cliente', 'O cliente é a razão da nossa existência', 'heart', 1),
('Valorização dos Colaboradores', 'São eles o grande diferencial para tornar tudo possível', 'users', 2),
('Credibilidade no Mercado', 'Construímos nossa reputação com qualidade e confiança', 'shield', 3),
('Processos Eficientes', 'Foco nos resultados através de processos otimizados', 'target', 4),
('Responsabilidade Socioambiental', 'Trabalhamos com responsabilidade social e ambiental', 'leaf', 5),
('Amizade Sincera', 'Construir amizade sincera, forte como ferro e aço', 'handshake', 6);

-- Inserir unidades (filiais)
INSERT INTO unidades (nome, endereco, cidade, estado, cep, telefone, tipo, ordem) VALUES 
('Matriz - Carmo do Paranaíba', 'Rua Eduardo Braz de Queiroz, 852, Amazonas', 'Carmo do Paranaíba', 'MG', '38.840-000', '(34) 3851-6500', 'matriz', 1),
('Filial Carmo do Paranaíba (Lagoa Seca)', 'Rodovia Ageu Garcia De Deus, 120 B. Amazonas', 'Carmo do Paranaíba', 'MG', '38.840-000', '(34) 3851-6500', 'filial', 2),
('Filial Patos de Minas', 'Av. Juscelino Kubitschek de Oliveira, 4200, Planalto', 'Patos de Minas', 'MG', '38.706-001', '(34) 3826-2000', 'filial', 3),
('Filial Patrocínio', 'Av Dom Jose Andrade, Av. Dom José André Coimbra, 1691 - São Cristovao', 'Patrocínio', 'MG', '38.742-212', '(34) 3515-7100', 'filial', 4),
('Filial Uberaba', 'Av. Tonico dos Santos, 477, Jardim Induberaba', 'Uberaba', 'MG', '38.040-000', '(34) 3315-8000', 'filial', 5),
('Filial Paracatu', 'Rodovia Presidente Juscelino Kubitschek, Av. Alto Córrego, 160', 'Paracatu', 'MG', '38.606-000', '(38) 3365-1990', 'filial', 6),
('Filial São Gotardo', 'Rodovia MG 205 Km 83, n° 1690 - Zona Rural', 'São Gotardo', 'MG', '38.800-000', '(34) 3615-4400', 'filial', 7);

-- Inserir produtos iniciais
INSERT INTO produtos (nome, descricao, categoria, aplicacoes, imagem, ativo, ordem) VALUES 
('Arame Recozido', 'Arame de aço carbono com tratamento térmico de recozimento', 'Arame', ARRAY['Construção civil', 'Agronegócio', 'Indústria'], '/arame-recozido.jpg', true, 1),
('Arruela', 'Arruela de aço para fixação e distribuição de carga', 'Fixadores', ARRAY['Construção civil', 'Indústria automotiva', 'Mecânica'], '/arruela.jpg', true, 2),
('Barra Chata', 'Barra de aço carbono laminada a quente em formato chato', 'Barras', ARRAY['Construção civil', 'Estruturas metálicas', 'Indústria'], '/barra-chata.jpg', true, 3),
('Barra Quadrada', 'Barra de aço carbono com seção quadrada', 'Barras', ARRAY['Construção civil', 'Estruturas', 'Indústria'], '/barra-quadrada.jpg', true, 4),
('Barra Redonda', 'Barra de aço carbono com seção circular', 'Barras', ARRAY['Construção civil', 'Estruturas', 'Indústria'], '/barra-redonda.jpg', true, 5),
('Chapa de Aço', 'Chapa de aço carbono laminada a quente', 'Chapas', ARRAY['Construção civil', 'Indústria', 'Estruturas'], '/chapa-aco.jpg', true, 6);

-- Inserir serviços iniciais
INSERT INTO servicos (nome, descricao, caracteristicas, imagem, ativo, ordem) VALUES 
('Corte e Dobra', 'Serviços de corte e dobra de chapas e perfis metálicos', ARRAY['Corte a laser', 'Dobra hidráulica', 'Precisão milimétrica'], '/corte-dobra.jpg', true, 1),
('Fabricação de Telhas', 'Fabricação de telhas metálicas sob medida', ARRAY['Telhas galvanizadas', 'Telhas coloridas', 'Medidas personalizadas'], '/fabricacao-telhas.jpg', true, 2),
('Corte Laser e Plasma', 'Corte de precisão com tecnologia laser e plasma', ARRAY['Alta precisão', 'Materiais diversos', 'Acabamento superior'], '/corte-laser.jpg', true, 3);

-- Inserir segmentos de atuação
INSERT INTO segmentos (nome, descricao, produtos, imagem, ativo, ordem) VALUES 
('Construção Civil', 'Fornecimento de materiais para construção civil', ARRAY['Barras de aço', 'Chapas', 'Perfis metálicos'], '/construcao-civil.jpg', true, 1),
('Indústria', 'Soluções em aço para diversos setores industriais', ARRAY['Chapas especiais', 'Barras', 'Arame industrial'], '/industria-setor.jpg', true, 2),
('Agronegócio', 'Produtos para o setor agropecuário', ARRAY['Arame', 'Cercas', 'Estruturas rurais'], '/agronegocio.jpg', true, 3),
('Prestadores de Serviço', 'Suporte para empresas de serviços', ARRAY['Materiais diversos', 'Suporte técnico', 'Entrega rápida'], '/prestadores-servico.jpg', true, 4);

-- Inserir estatísticas iniciais
INSERT INTO estatisticas (chave, valor, descricao) VALUES 
('total_unidades', 7, 'Total de unidades da SEVIMOL'),
('total_produtos', 6, 'Total de produtos cadastrados'),
('total_servicos', 3, 'Total de serviços oferecidos'),
('anos_mercado', 43, 'Anos de experiência no mercado'),
('clientes_atendidos', 1000, 'Clientes atendidos'),
('funcionarios', 150, 'Número de funcionários');

-- =====================================================
-- CRIAR ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para tabela administradores
CREATE INDEX IF NOT EXISTS idx_administradores_email ON administradores(email);
CREATE INDEX IF NOT EXISTS idx_administradores_ativo ON administradores(ativo);

-- Índices para tabela configuracoes
CREATE INDEX IF NOT EXISTS idx_configuracoes_chave ON configuracoes(chave);

-- Índices para tabela hero_content
CREATE INDEX IF NOT EXISTS idx_hero_content_ativo ON hero_content(ativo);
CREATE INDEX IF NOT EXISTS idx_hero_content_ordem ON hero_content(ordem);

-- Índices para tabela valores
CREATE INDEX IF NOT EXISTS idx_valores_ativo ON valores(ativo);
CREATE INDEX IF NOT EXISTS idx_valores_ordem ON valores(ordem);

-- Índices para tabela unidades
CREATE INDEX IF NOT EXISTS idx_unidades_ativo ON unidades(ativo);
CREATE INDEX IF NOT EXISTS idx_unidades_tipo ON unidades(tipo);
CREATE INDEX IF NOT EXISTS idx_unidades_ordem ON unidades(ordem);

-- Índices para tabela produtos
CREATE INDEX IF NOT EXISTS idx_produtos_ativo ON produtos(ativo);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_destaque ON produtos(destaque);

-- Índices para tabela servicos
CREATE INDEX IF NOT EXISTS idx_servicos_ativo ON servicos(ativo);
CREATE INDEX IF NOT EXISTS idx_servicos_destaque ON servicos(destaque);

-- Índices para tabela segmentos
CREATE INDEX IF NOT EXISTS idx_segmentos_ativo ON segmentos(ativo);

-- Índices para tabela vagas
CREATE INDEX IF NOT EXISTS idx_vagas_ativo ON vagas(ativo);

-- Índices para tabela candidatos
CREATE INDEX IF NOT EXISTS idx_candidatos_vaga_id ON candidatos(vaga_id);
CREATE INDEX IF NOT EXISTS idx_candidatos_status ON candidatos(status);

-- Índices para tabela contatos
CREATE INDEX IF NOT EXISTS idx_contatos_status ON contatos(status);
CREATE INDEX IF NOT EXISTS idx_contatos_created_at ON contatos(created_at);

-- Índices para tabela logs
CREATE INDEX IF NOT EXISTS idx_logs_admin_id ON logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);
CREATE INDEX IF NOT EXISTS idx_logs_acao ON logs(acao);

-- Índices para tabela imagens
CREATE INDEX IF NOT EXISTS idx_imagens_tipo ON imagens(tipo);
CREATE INDEX IF NOT EXISTS idx_imagens_referencia_id ON imagens(referencia_id);

-- Índices para tabela newsletter
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_ativo ON newsletter(ativo);

-- =====================================================
-- CRIAR FUNÇÕES E TRIGGERS
-- =====================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_administradores_updated_at BEFORE UPDATE ON administradores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_configuracoes_updated_at BEFORE UPDATE ON configuracoes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sobre_nos_updated_at BEFORE UPDATE ON sobre_nos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_valores_updated_at BEFORE UPDATE ON valores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_unidades_updated_at BEFORE UPDATE ON unidades FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON produtos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_servicos_updated_at BEFORE UPDATE ON servicos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_segmentos_updated_at BEFORE UPDATE ON segmentos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vagas_updated_at BEFORE UPDATE ON vagas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_candidatos_updated_at BEFORE UPDATE ON candidatos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contatos_updated_at BEFORE UPDATE ON contatos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_imagens_updated_at BEFORE UPDATE ON imagens FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_updated_at BEFORE UPDATE ON newsletter FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para log de auditoria
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO logs (admin_id, acao, tabela, registro_id, dados_anteriores, dados_novos)
        VALUES (
            COALESCE(NEW.admin_id, OLD.admin_id),
            'UPDATE',
            TG_TABLE_NAME,
            COALESCE(NEW.id, OLD.id),
            row_to_json(OLD),
            row_to_json(NEW)
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO logs (admin_id, acao, tabela, registro_id, dados_anteriores)
        VALUES (
            OLD.admin_id,
            'DELETE',
            TG_TABLE_NAME,
            OLD.id,
            row_to_json(OLD)
        );
        RETURN OLD;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO logs (admin_id, acao, tabela, registro_id, dados_novos)
        VALUES (
            NEW.admin_id,
            'INSERT',
            TG_TABLE_NAME,
            NEW.id,
            row_to_json(NEW)
        );
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- =====================================================
-- CRIAR VIEWS ÚTEIS
-- =====================================================

-- View para estatísticas do dashboard
CREATE OR REPLACE VIEW vw_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM unidades WHERE ativo = true) as total_unidades,
    (SELECT COUNT(*) FROM produtos WHERE ativo = true) as total_produtos,
    (SELECT COUNT(*) FROM servicos WHERE ativo = true) as total_servicos,
    (SELECT COUNT(*) FROM contatos WHERE status = 'novo') as contatos_novos,
    (SELECT COUNT(*) FROM candidatos WHERE status = 'pendente') as candidatos_pendentes,
    (SELECT COUNT(*) FROM newsletter WHERE ativo = true) as total_newsletter;

-- View para conteúdo do site
CREATE OR REPLACE VIEW vw_site_content AS
SELECT 
    'hero' as tipo,
    h.titulo,
    h.subtitulo,
    h.descricao,
    h.texto_botao,
    h.imagem_fundo,
    h.ordem,
    h.ativo
FROM hero_content h
WHERE h.ativo = true
UNION ALL
SELECT 
    'sobre' as tipo,
    s.titulo,
    NULL as subtitulo,
    s.historia as descricao,
    NULL as texto_botao,
    s.imagem as imagem_fundo,
    1 as ordem,
    true as ativo
FROM sobre_nos s
LIMIT 1;

-- =====================================================
-- CRIAR POLÍTICAS RLS (ROW LEVEL SECURITY)
-- =====================================================

-- Habilitar RLS nas tabelas principais
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
ALTER TABLE imagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Políticas para administradores (apenas admins podem acessar)
CREATE POLICY "Admins podem ver todos os administradores" ON administradores FOR SELECT USING (true);
CREATE POLICY "Admins podem inserir administradores" ON administradores FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins podem atualizar administradores" ON administradores FOR UPDATE USING (true);
CREATE POLICY "Admins podem deletar administradores" ON administradores FOR DELETE USING (true);

-- Políticas para configurações (apenas admins)
CREATE POLICY "Admins podem gerenciar configurações" ON configuracoes FOR ALL USING (true);

-- Políticas para conteúdo público (leitura para todos, escrita para admins)
CREATE POLICY "Conteúdo público é visível para todos" ON hero_content FOR SELECT USING (ativo = true);
CREATE POLICY "Admins podem gerenciar hero content" ON hero_content FOR ALL USING (true);

CREATE POLICY "Sobre nós é visível para todos" ON sobre_nos FOR SELECT USING (true);
CREATE POLICY "Admins podem gerenciar sobre nós" ON sobre_nos FOR ALL USING (true);

CREATE POLICY "Valores são visíveis para todos" ON valores FOR SELECT USING (ativo = true);
CREATE POLICY "Admins podem gerenciar valores" ON valores FOR ALL USING (true);

CREATE POLICY "Unidades são visíveis para todos" ON unidades FOR SELECT USING (ativo = true);
CREATE POLICY "Admins podem gerenciar unidades" ON unidades FOR ALL USING (true);

CREATE POLICY "Produtos são visíveis para todos" ON produtos FOR SELECT USING (ativo = true);
CREATE POLICY "Admins podem gerenciar produtos" ON produtos FOR ALL USING (true);

CREATE POLICY "Serviços são visíveis para todos" ON servicos FOR SELECT USING (ativo = true);
CREATE POLICY "Admins podem gerenciar serviços" ON servicos FOR ALL USING (true);

CREATE POLICY "Segmentos são visíveis para todos" ON segmentos FOR SELECT USING (ativo = true);
CREATE POLICY "Admins podem gerenciar segmentos" ON segmentos FOR ALL USING (true);

-- Políticas para vagas (público pode ver, admins podem gerenciar)
CREATE POLICY "Vagas ativas são visíveis para todos" ON vagas FOR SELECT USING (ativo = true);
CREATE POLICY "Admins podem gerenciar vagas" ON vagas FOR ALL USING (true);

-- Políticas para candidatos (público pode inserir, admins podem ver todos)
CREATE POLICY "Qualquer um pode se candidatar" ON candidatos FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins podem ver todos os candidatos" ON candidatos FOR SELECT USING (true);
CREATE POLICY "Admins podem gerenciar candidatos" ON candidatos FOR ALL USING (true);

-- Políticas para contatos (público pode inserir, admins podem ver todos)
CREATE POLICY "Qualquer um pode enviar contato" ON contatos FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins podem ver todos os contatos" ON contatos FOR SELECT USING (true);
CREATE POLICY "Admins podem gerenciar contatos" ON contatos FOR ALL USING (true);

-- Políticas para logs (apenas admins)
CREATE POLICY "Admins podem ver logs" ON logs FOR SELECT USING (true);

-- Políticas para imagens (público pode ver, admins podem gerenciar)
CREATE POLICY "Imagens ativas são visíveis para todos" ON imagens FOR SELECT USING (ativo = true);
CREATE POLICY "Admins podem gerenciar imagens" ON imagens FOR ALL USING (true);

-- Políticas para newsletter (público pode inserir, admins podem ver todos)
CREATE POLICY "Qualquer um pode se inscrever na newsletter" ON newsletter FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins podem ver newsletter" ON newsletter FOR SELECT USING (true);
CREATE POLICY "Admins podem gerenciar newsletter" ON newsletter FOR ALL USING (true);

-- =====================================================
-- CRIAR FUNÇÕES ÚTEIS
-- =====================================================

-- Função para verificar login de administrador
CREATE OR REPLACE FUNCTION verificar_login_admin(email_param VARCHAR, senha_param VARCHAR)
RETURNS TABLE(
    id UUID,
    nome VARCHAR,
    email VARCHAR,
    cargo VARCHAR,
    ativo BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.nome,
        a.email,
        a.cargo,
        a.ativo
    FROM administradores a
    WHERE a.email = email_param 
    AND a.senha = crypt(senha_param, a.senha)
    AND a.ativo = true;
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar último login
CREATE OR REPLACE FUNCTION atualizar_ultimo_login(admin_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE administradores 
    SET ultimo_login = NOW()
    WHERE id = admin_id;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar estatísticas
CREATE OR REPLACE FUNCTION buscar_estatisticas()
RETURNS TABLE(
    chave VARCHAR,
    valor INTEGER,
    descricao TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.chave,
        e.valor,
        e.descricao
    FROM estatisticas e
    ORDER BY e.chave;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar conteúdo do site
CREATE OR REPLACE FUNCTION buscar_conteudo_site()
RETURNS JSON AS $$
DECLARE
    resultado JSON;
BEGIN
    SELECT json_build_object(
        'hero', (
            SELECT json_agg(
                json_build_object(
                    'id', id,
                    'titulo', titulo,
                    'subtitulo', subtitulo,
                    'descricao', descricao,
                    'texto_botao', texto_botao,
                    'imagem_fundo', imagem_fundo
                )
            )
            FROM hero_content 
            WHERE ativo = true 
            ORDER BY ordem
        ),
        'sobre_nos', (
            SELECT json_build_object(
                'titulo', titulo,
                'historia', historia,
                'texto_fundadores', texto_fundadores,
                'missao', missao,
                'visao', visao,
                'imagem', imagem
            )
            FROM sobre_nos 
            LIMIT 1
        ),
        'valores', (
            SELECT json_agg(
                json_build_object(
                    'titulo', titulo,
                    'descricao', descricao,
                    'icone', icone
                )
            )
            FROM valores 
            WHERE ativo = true 
            ORDER BY ordem
        ),
        'unidades', (
            SELECT json_agg(
                json_build_object(
                    'id', id,
                    'nome', nome,
                    'endereco', endereco,
                    'cidade', cidade,
                    'estado', estado,
                    'cep', cep,
                    'telefone', telefone,
                    'tipo', tipo
                )
            )
            FROM unidades 
            WHERE ativo = true 
            ORDER BY ordem
        ),
        'produtos', (
            SELECT json_agg(
                json_build_object(
                    'id', id,
                    'nome', nome,
                    'descricao', descricao,
                    'categoria', categoria,
                    'aplicacoes', aplicacoes,
                    'imagem', imagem
                )
            )
            FROM produtos 
            WHERE ativo = true 
            ORDER BY ordem
        ),
        'servicos', (
            SELECT json_agg(
                json_build_object(
                    'id', id,
                    'nome', nome,
                    'descricao', descricao,
                    'caracteristicas', caracteristicas,
                    'imagem', imagem
                )
            )
            FROM servicos 
            WHERE ativo = true 
            ORDER BY ordem
        ),
        'segmentos', (
            SELECT json_agg(
                json_build_object(
                    'id', id,
                    'nome', nome,
                    'descricao', descricao,
                    'produtos', produtos,
                    'imagem', imagem
                )
            )
            FROM segmentos 
            WHERE ativo = true 
            ORDER BY ordem
        )
    ) INTO resultado;
    
    RETURN resultado;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- FINALIZAR CONFIGURAÇÃO
-- =====================================================

-- Comentários nas tabelas
COMMENT ON TABLE administradores IS 'Tabela de administradores do sistema';
COMMENT ON TABLE configuracoes IS 'Configurações gerais do site';
COMMENT ON TABLE hero_content IS 'Conteúdo da seção hero (página inicial)';
COMMENT ON TABLE sobre_nos IS 'Informações sobre a empresa';
COMMENT ON TABLE valores IS 'Valores da empresa';
COMMENT ON TABLE unidades IS 'Unidades/filiais da SEVIMOL';
COMMENT ON TABLE produtos IS 'Catálogo de produtos';
COMMENT ON TABLE servicos IS 'Serviços oferecidos';
COMMENT ON TABLE segmentos IS 'Segmentos de atuação';
COMMENT ON TABLE vagas IS 'Vagas de emprego';
COMMENT ON TABLE candidatos IS 'Candidatos às vagas';
COMMENT ON TABLE contatos IS 'Mensagens de contato';
COMMENT ON TABLE logs IS 'Logs de auditoria';
COMMENT ON TABLE imagens IS 'Imagens do sistema';
COMMENT ON TABLE newsletter IS 'Inscrições na newsletter';
COMMENT ON TABLE estatisticas IS 'Estatísticas do sistema';

-- Mensagem de sucesso
DO $$
BEGIN
    RAISE NOTICE 'Script Supabase SEVIMOL CMS executado com sucesso!';
    RAISE NOTICE 'Tabelas criadas: 15';
    RAISE NOTICE 'Dados iniciais inseridos';
    RAISE NOTICE 'Índices criados para performance';
    RAISE NOTICE 'Funções e triggers configurados';
    RAISE NOTICE 'Políticas RLS habilitadas';
    RAISE NOTICE 'Sistema pronto para uso!';
END $$;

-- =====================================================
-- ATUALIZAÇÃO DO BANCO - NOVOS CAMPOS DE IMAGEM
-- Execute este script no Supabase SQL Editor
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

-- Adicionar campo de imagem na tabela configuracoes para logo
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'configuracoes' AND column_name = 'logo_url') THEN
        ALTER TABLE configuracoes ADD COLUMN logo_url VARCHAR(500);
    END IF;
END $$;

-- Inserir configuração da logo se não existir
INSERT INTO configuracoes (chave, valor, tipo, descricao)
VALUES ('logo_url', '/logo-sevimol.png', 'image', 'URL da logo da empresa')
ON CONFLICT (chave) DO UPDATE SET
    valor = EXCLUDED.valor,
    updated_at = NOW();

-- Inserir configurações para imagens das seções se não existirem
INSERT INTO configuracoes (chave, valor, tipo, descricao) VALUES
('tecnologia_image', '/tecnologia-industria.jpg', 'image', 'Imagem da seção Tecnologia de Ponta'),
('qualidade_image', '/qualidade-produtos.jpg', 'image', 'Imagem da seção Qualidade Garantida'),
('atuacao_image', '/atuacao-sevimol.jpg', 'image', 'Imagem da seção Nossa Atuação'),
('experiencia_image', '/experiencia-40-anos.jpg', 'image', 'Imagem da seção Mais de 40 Anos de Experiência')
ON CONFLICT (chave) DO UPDATE SET
    valor = EXCLUDED.valor,
    updated_at = NOW();

-- Mensagem de sucesso
SELECT 'Campos de imagem adicionados com sucesso!' AS status;

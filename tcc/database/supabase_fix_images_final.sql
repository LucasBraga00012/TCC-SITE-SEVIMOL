-- =====================================================
-- Script FINAL para corrigir armazenamento de imagens
-- Este script remove temporariamente a view, altera as colunas e depois recria
-- =====================================================

-- ETAPA 1: Remover a view temporariamente (VOCÊ PODE RECRIAR DEPOIS)
DROP VIEW IF EXISTS vw_site_content CASCADE;

-- ETAPA 2: Alterar o tipo das colunas de imagem
-- Servicos
ALTER TABLE servicos ADD COLUMN IF NOT EXISTS imagem_new TEXT;
UPDATE servicos SET imagem_new = imagem;
ALTER TABLE servicos DROP COLUMN IF EXISTS imagem CASCADE;
ALTER TABLE servicos RENAME COLUMN imagem_new TO imagem;

-- Produtos
ALTER TABLE produtos ADD COLUMN IF NOT EXISTS imagem_new TEXT;
UPDATE produtos SET imagem_new = imagem;
ALTER TABLE produtos DROP COLUMN IF EXISTS imagem CASCADE;
ALTER TABLE produtos RENAME COLUMN imagem_new TO imagem;

-- Unidades
ALTER TABLE unidades ADD COLUMN IF NOT EXISTS imagem_new TEXT;
UPDATE unidades SET imagem_new = imagem;
ALTER TABLE unidades DROP COLUMN IF EXISTS imagem CASCADE;
ALTER TABLE unidades RENAME COLUMN imagem_new TO imagem;

-- Sobre Nos
ALTER TABLE sobre_nos ADD COLUMN IF NOT EXISTS imagem_new TEXT;
UPDATE sobre_nos SET imagem_new = imagem;
ALTER TABLE sobre_nos DROP COLUMN IF EXISTS imagem CASCADE;
ALTER TABLE sobre_nos RENAME COLUMN imagem_new TO imagem;

-- Hero Content
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS imagem_fundo_new TEXT;
UPDATE hero_content SET imagem_fundo_new = imagem_fundo;
ALTER TABLE hero_content DROP COLUMN IF EXISTS imagem_fundo CASCADE;
ALTER TABLE hero_content RENAME COLUMN imagem_fundo_new TO imagem_fundo;

-- ETAPA 3 (OPCIONAL): Recriar a view se você precisar dela
-- Descomente e ajuste conforme sua estrutura:

/*
CREATE OR REPLACE VIEW vw_site_content AS
SELECT 
    'hero' as tipo,
    to_jsonb((SELECT row(h.*) FROM hero_content h WHERE h.ativo = true LIMIT 1)) as conteudo
UNION ALL
SELECT 
    'sobre' as tipo,
    to_jsonb((SELECT row(s.*) FROM sobre_nos s LIMIT 1)) as conteudo
UNION ALL
SELECT 
    'unidades' as tipo,
    jsonb_agg(to_jsonb(u.*)) as conteudo
FROM unidades u WHERE u.ativo = true
UNION ALL
SELECT 
    'produtos' as tipo,
    jsonb_agg(to_jsonb(p.*)) as conteudo
FROM produtos p WHERE p.ativo = true
UNION ALL
SELECT 
    'servicos' as tipo,
    jsonb_agg(to_jsonb(s.*)) as conteudo
FROM servicos s WHERE s.ativo = true;
*/

-- ETAPA 4: Criar bucket de storage (se não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- ETAPA 5: Configurar políticas de acesso
-- Adicione estas políticas no Dashboard > Storage > Policies
-- Ou descomente e ajuste os comandos abaixo:

/*
-- Política de leitura pública
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');

-- Política de upload para autenticados
CREATE POLICY "Authenticated Uploads" ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-images' AND auth.role() = 'authenticated');

-- Política de atualização para autenticados
CREATE POLICY "Authenticated Updates" ON storage.objects FOR UPDATE
USING (bucket_id = 'site-images' AND auth.role() = 'authenticated');

-- Política de exclusão para autenticados
CREATE POLICY "Authenticated Deletes" ON storage.objects FOR DELETE
USING (bucket_id = 'site-images' AND auth.role() = 'authenticated');
*/


-- =====================================================
-- Script para corrigir armazenamento de imagens
-- =====================================================

-- 1. Remover view que depende das colunas (se existir)
DROP VIEW IF EXISTS vw_site_content CASCADE;

-- 2. Alterar tipo das colunas de imagem de VARCHAR para TEXT
ALTER TABLE IF EXISTS servicos ALTER COLUMN imagem TYPE TEXT;
ALTER TABLE IF EXISTS produtos ALTER COLUMN imagem TYPE TEXT;
ALTER TABLE IF EXISTS unidades ALTER COLUMN imagem TYPE TEXT;
ALTER TABLE IF EXISTS sobre_nos ALTER COLUMN imagem TYPE TEXT;
ALTER TABLE IF EXISTS hero_content ALTER COLUMN imagem_fundo TYPE TEXT;

-- 2. Criar bucket de storage (se não existir)
-- Nota: Execute este comando no Supabase Dashboard > Storage
-- Ou via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Configurar política de acesso público para leitura
-- Nota: Configure as políticas no Dashboard ou via SQL:
-- Storage > Policies > site-images
-- Adicionar Policy: "Allow public read access"
-- Policy: SELECT FOR storage.objects
-- USING: bucket_id = 'site-images'

-- 4. Configurar política de acesso para upload
-- Nota: Configure no Dashboard ou via SQL:
-- Policy: "Allow authenticated uploads"
-- Policy: INSERT FOR storage.objects
-- WITH CHECK: bucket_id = 'site-images' AND auth.role() = 'authenticated'


-- =====================================================
-- Script para criar políticas de segurança do Storage - MODO DESENVOLVIMENTO
-- Execute este script no Supabase SQL Editor
-- =====================================================

-- 1. Criar bucket se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Remover TODAS as políticas antigas
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow Authenticated Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Updates" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Deletes" ON storage.objects;

-- 3. Criar políticas PERMISSIVAS (desenvolvimento)
-- QUALQUER UM pode ler imagens
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');

-- QUALQUER UM pode fazer upload
CREATE POLICY "Allow All Uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-images');

-- QUALQUER UM pode atualizar
CREATE POLICY "Allow All Updates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-images')
WITH CHECK (bucket_id = 'site-images');

-- QUALQUER UM pode deletar
CREATE POLICY "Allow All Deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'site-images');

-- ✅ Pronto! Agora teste o upload no seu admin panel.


-- =====================================================
-- Script para criar políticas de segurança do Storage
-- Execute este script no Supabase SQL Editor
-- =====================================================

-- 1. Criar bucket se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Remover políticas antigas (se existir)
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow Authenticated Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Updates" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Deletes" ON storage.objects;

-- 3. Criar política de LEITURA PÚBLICA (qualquer um pode ver as imagens)
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');

-- 4. Criar política de UPLOAD para usuários autenticados
CREATE POLICY "Allow Authenticated Uploads"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'site-images' 
  AND auth.role() = 'authenticated'
);

-- 5. Criar política de UPDATE para usuários autenticados
CREATE POLICY "Allow Authenticated Updates"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'site-images' 
  AND auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'site-images' 
  AND auth.role() = 'authenticated'
);

-- 6. Criar política de DELETE para usuários autenticados
CREATE POLICY "Allow Authenticated Deletes"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'site-images' 
  AND auth.role() = 'authenticated'
);

-- 7. Se você não está autenticado (modo público), use estas políticas mais permissivas:
-- DESCOMENTE as linhas abaixo APENAS SE os passos acima não funcionarem:

/*
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow Authenticated Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Updates" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Deletes" ON storage.objects;

-- Políticas permissivas (desenvolvimento apenas)
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Allow All Uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Allow All Updates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-images')
WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Allow All Deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'site-images');
*/


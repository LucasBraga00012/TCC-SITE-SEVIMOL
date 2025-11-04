-- =====================================================
-- Script Alternativo para corrigir armazenamento de imagens
-- SEM remover a view
-- =====================================================

-- Se o script anterior não funcionar, use este que:
-- 1. Adiciona uma nova coluna TEXT
-- 2. Copia os dados
-- 3. Remove a coluna antiga e renomeia a nova

-- Para servicos
ALTER TABLE servicos ADD COLUMN IF NOT EXISTS imagem_nova TEXT;
UPDATE servicos SET imagem_nova = imagem;
ALTER TABLE servicos DROP COLUMN IF EXISTS imagem;
ALTER TABLE servicos RENAME COLUMN imagem_nova TO imagem;

-- Para produtos
ALTER TABLE produtos ADD COLUMN IF NOT EXISTS imagem_nova TEXT;
UPDATE produtos SET imagem_nova = imagem;
ALTER TABLE produtos DROP COLUMN IF EXISTS imagem;
ALTER TABLE produtos RENAME COLUMN imagem_nova TO imagem;

-- Para unidades
ALTER TABLE unidades ADD COLUMN IF NOT EXISTS imagem_nova TEXT;
UPDATE unidades SET imagem_nova = imagem;
ALTER TABLE unidades DROP COLUMN IF EXISTS imagem;
ALTER TABLE unidades RENAME COLUMN imagem_nova TO imagem;

-- Para sobre_nos
ALTER TABLE sobre_nos ADD COLUMN IF NOT EXISTS imagem_nova TEXT;
UPDATE sobre_nos SET imagem_nova = imagem;
ALTER TABLE sobre_nos DROP COLUMN IF EXISTS imagem;
ALTER TABLE sobre_nos RENAME COLUMN imagem_nova TO imagem;

-- Para hero_content
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS imagem_fundo_nova TEXT;
UPDATE hero_content SET imagem_fundo_nova = imagem_fundo;
ALTER TABLE hero_content DROP COLUMN IF EXISTS imagem_fundo;
ALTER TABLE hero_content RENAME COLUMN imagem_fundo_nova TO imagem_fundo;


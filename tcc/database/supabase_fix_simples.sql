-- =====================================================
-- SOLUÇÃO SIMPLES - Alterar tamanho das colunas
-- =====================================================

-- Apenas altere o tamanho para 2000 caracteres (suficiente para URLs)
ALTER TABLE servicos ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE produtos ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE unidades ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE sobre_nos ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE hero_content ALTER COLUMN imagem_fundo TYPE VARCHAR(2000);

-- Isso não remove a view e resolve o problema!


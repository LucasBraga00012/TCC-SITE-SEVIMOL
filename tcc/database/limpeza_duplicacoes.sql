-- =====================================================
-- SCRIPT DE LIMPEZA E CORREÇÃO DE DUPLICAÇÕES
-- Execute este script no Supabase SQL Editor
-- =====================================================

-- Limpar dados duplicados das tabelas
-- =====================================================

-- 1. LIMPAR PRODUTOS DUPLICADOS
-- =====================================================
-- Remover produtos duplicados mantendo apenas o primeiro de cada nome
DELETE FROM produtos 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM produtos 
    GROUP BY nome
);

-- 2. LIMPAR SERVIÇOS DUPLICADOS
-- =====================================================
-- Remover serviços duplicados mantendo apenas o primeiro de cada nome
DELETE FROM servicos 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM servicos 
    GROUP BY nome
);

-- 3. LIMPAR UNIDADES DUPLICADAS
-- =====================================================
-- Remover unidades duplicadas mantendo apenas o primeiro de cada nome
DELETE FROM unidades 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM unidades 
    GROUP BY nome
);

-- 4. LIMPAR VALORES DUPLICADOS
-- =====================================================
-- Remover valores duplicados mantendo apenas o primeiro de cada descrição
DELETE FROM valores 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM valores 
    GROUP BY descricao
);

-- 5. LIMPAR CONFIGURAÇÕES DUPLICADAS
-- =====================================================
-- Remover configurações duplicadas mantendo apenas o primeiro de cada chave
DELETE FROM configuracoes 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM configuracoes 
    GROUP BY chave
);

-- 6. LIMPAR HERO_CONTENT DUPLICADO
-- =====================================================
-- Remover hero_content duplicado mantendo apenas o primeiro
DELETE FROM hero_content 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM hero_content 
    GROUP BY titulo
);

-- 7. LIMPAR SOBRE_NOS DUPLICADO
-- =====================================================
-- Remover sobre_nos duplicado mantendo apenas o primeiro
DELETE FROM sobre_nos 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM sobre_nos 
    GROUP BY titulo
);

-- =====================================================
-- REORGANIZAR ORDEM DOS ITENS
-- =====================================================

-- Reorganizar ordem dos produtos
UPDATE produtos 
SET ordem = subquery.new_order
FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY nome) as new_order
    FROM produtos
) as subquery
WHERE produtos.id = subquery.id;

-- Reorganizar ordem dos serviços
UPDATE servicos 
SET ordem = subquery.new_order
FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY nome) as new_order
    FROM servicos
) as subquery
WHERE servicos.id = subquery.id;

-- Reorganizar ordem das unidades
UPDATE unidades 
SET ordem = subquery.new_order
FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY nome) as new_order
    FROM unidades
) as subquery
WHERE unidades.id = subquery.id;

-- Reorganizar ordem dos valores
UPDATE valores 
SET ordem = subquery.new_order
FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY titulo) as new_order
    FROM valores
) as subquery
WHERE valores.id = subquery.id;

-- =====================================================
-- VERIFICAR RESULTADOS
-- =====================================================

-- Contar itens após limpeza
SELECT 
    'produtos' as tabela, 
    COUNT(*) as total 
FROM produtos
UNION ALL
SELECT 
    'servicos' as tabela, 
    COUNT(*) as total 
FROM servicos
UNION ALL
SELECT 
    'unidades' as tabela, 
    COUNT(*) as total 
FROM unidades
UNION ALL
SELECT 
    'valores' as tabela, 
    COUNT(*) as total 
FROM valores
UNION ALL
SELECT 
    'configuracoes' as tabela, 
    COUNT(*) as total 
FROM configuracoes
UNION ALL
SELECT 
    'hero_content' as tabela, 
    COUNT(*) as total 
FROM hero_content
UNION ALL
SELECT 
    'sobre_nos' as tabela, 
    COUNT(*) as total 
FROM sobre_nos;

-- =====================================================
-- MENSAGEM DE SUCESSO
-- =====================================================

SELECT 'Limpeza de duplicações concluída com sucesso!' AS status;

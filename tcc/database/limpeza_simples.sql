-- =====================================================
-- SCRIPT SIMPLES DE LIMPEZA DE DUPLICAÇÕES
-- Execute este script no Supabase SQL Editor
-- =====================================================

-- Limpar produtos duplicados
DELETE FROM produtos 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM produtos 
    GROUP BY nome
);

-- Limpar serviços duplicados
DELETE FROM servicos 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM servicos 
    GROUP BY nome
);

-- Limpar unidades duplicadas
DELETE FROM unidades 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM unidades 
    GROUP BY nome
);

-- Limpar valores duplicados
DELETE FROM valores 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM valores 
    GROUP BY descricao
);

-- Limpar configurações duplicadas
DELETE FROM configuracoes 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM configuracoes 
    GROUP BY chave
);

-- Limpar hero_content duplicado
DELETE FROM hero_content 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM hero_content 
    GROUP BY titulo
);

-- Limpar sobre_nos duplicado
DELETE FROM sobre_nos 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM sobre_nos 
    GROUP BY titulo
);

-- Verificar resultados
SELECT 'produtos' as tabela, COUNT(*) as total FROM produtos
UNION ALL
SELECT 'servicos' as tabela, COUNT(*) as total FROM servicos
UNION ALL
SELECT 'unidades' as tabela, COUNT(*) as total FROM unidades
UNION ALL
SELECT 'valores' as tabela, COUNT(*) as total FROM valores
UNION ALL
SELECT 'configuracoes' as tabela, COUNT(*) as total FROM configuracoes
UNION ALL
SELECT 'hero_content' as tabela, COUNT(*) as total FROM hero_content
UNION ALL
SELECT 'sobre_nos' as tabela, COUNT(*) as total FROM sobre_nos;

SELECT 'Limpeza concluída!' AS status;

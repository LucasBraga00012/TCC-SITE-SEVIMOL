-- =====================================================
-- CORREÇÃO - REMOVER FUNÇÃO EXISTENTE E RECRIAR
-- Execute este script ANTES do script principal
-- =====================================================

-- Remover função existente se ela existir
DROP FUNCTION IF EXISTS verificar_login_admin(character varying, character varying);
DROP FUNCTION IF EXISTS verificar_login_admin(VARCHAR, VARCHAR);

-- Remover função de atualizar último login se existir
DROP FUNCTION IF EXISTS atualizar_ultimo_login(UUID);

-- Remover trigger de hash de senha se existir
DROP TRIGGER IF EXISTS trg_hash_admin_password ON administradores;
DROP FUNCTION IF EXISTS hash_admin_password();

-- Remover triggers de updated_at se existirem
DROP TRIGGER IF EXISTS update_administradores_updated_at ON administradores;
DROP TRIGGER IF EXISTS update_configuracoes_updated_at ON configuracoes;
DROP TRIGGER IF EXISTS update_hero_content_updated_at ON hero_content;
DROP TRIGGER IF EXISTS update_sobre_nos_updated_at ON sobre_nos;
DROP TRIGGER IF EXISTS update_valores_updated_at ON valores;
DROP TRIGGER IF EXISTS update_unidades_updated_at ON unidades;
DROP TRIGGER IF EXISTS update_produtos_updated_at ON produtos;
DROP TRIGGER IF EXISTS update_servicos_updated_at ON servicos;
DROP TRIGGER IF EXISTS update_segmentos_updated_at ON segmentos;
DROP TRIGGER IF EXISTS update_vagas_updated_at ON vagas;
DROP TRIGGER IF EXISTS update_candidatos_updated_at ON candidatos;
DROP TRIGGER IF EXISTS update_contatos_updated_at ON contatos;

-- Remover função genérica de updated_at se existir
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Remover view se existir
DROP VIEW IF EXISTS dashboard_stats;

-- Remover função de estatísticas se existir
DROP FUNCTION IF EXISTS get_dashboard_stats();

-- Mensagem de confirmação
SELECT 'Funções e triggers removidos com sucesso! Agora execute o script principal.' AS status;

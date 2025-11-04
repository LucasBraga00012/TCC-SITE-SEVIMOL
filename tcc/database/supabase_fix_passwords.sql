-- =====================================================
-- SEVIMOL CMS - CORREÇÃO DE SENHAS SUPABASE
-- Script para criptografar senhas automaticamente
-- =====================================================

-- Função para criptografar senha automaticamente
CREATE OR REPLACE FUNCTION criptografar_senha()
RETURNS TRIGGER AS $$
BEGIN
    -- Se a senha não estiver vazia e não começar com $2 (hash bcrypt)
    IF NEW.senha IS NOT NULL AND NEW.senha != '' AND NOT NEW.senha LIKE '$2%' THEN
        NEW.senha := crypt(NEW.senha, gen_salt('bf'));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para criptografar senha na inserção
DROP TRIGGER IF EXISTS trigger_criptografar_senha_insert ON administradores;
CREATE TRIGGER trigger_criptografar_senha_insert
    BEFORE INSERT ON administradores
    FOR EACH ROW
    EXECUTE FUNCTION criptografar_senha();

-- Trigger para criptografar senha na atualização
DROP TRIGGER IF EXISTS trigger_criptografar_senha_update ON administradores;
CREATE TRIGGER trigger_criptografar_senha_update
    BEFORE UPDATE ON administradores
    FOR EACH ROW
    WHEN (OLD.senha IS DISTINCT FROM NEW.senha)
    EXECUTE FUNCTION criptografar_senha();

-- Atualizar senha do admin padrão para usar criptografia
UPDATE administradores 
SET senha = crypt('admin123', gen_salt('bf'))
WHERE email = 'admin@sevimol.com.br';

-- Verificar se o admin padrão existe e criar se não existir
INSERT INTO administradores (nome, email, senha, cargo, ativo)
SELECT 
    'Administrador SEVIMOL',
    'admin@sevimol.com.br',
    crypt('admin123', gen_salt('bf')),
    'Super Administrador',
    true
WHERE NOT EXISTS (
    SELECT 1 FROM administradores WHERE email = 'admin@sevimol.com.br'
);

-- Mensagem de sucesso
SELECT 'Senhas criptografadas com sucesso! Admin padrão: admin@sevimol.com.br / admin123' as resultado;

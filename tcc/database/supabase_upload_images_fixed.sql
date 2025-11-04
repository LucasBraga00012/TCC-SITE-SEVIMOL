-- Função para verificar login do administrador
CREATE FUNCTION verificar_login_admin(
    email_param VARCHAR,
    senha_param VARCHAR
)
RETURNS TABLE (
    id UUID,
    nome VARCHAR,
    email VARCHAR,
    cargo VARCHAR,
    telefone VARCHAR,
    ativo BOOLEAN,
    ultimo_login TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.nome,
        a.email,
        a.cargo,
        a.telefone,
        a.ativo,
        a.ultimo_login
    FROM administradores a
    WHERE a.email = email_param
      AND a.senha = crypt(senha_param, a.senha)
      AND a.ativo = true;
END;
$$;

-- (opcional) manter como CREATE OR REPLACE se preferir derrubar sempre acima
-- Função para atualizar último login (sem conflito de retorno)
CREATE OR REPLACE FUNCTION atualizar_ultimo_login(admin_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE administradores 
    SET ultimo_login = NOW(),
        updated_at   = NOW()
    WHERE id = admin_id;
END;
$$;

-- View e função de stats (derrubamos antes, acima)
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM unidades  WHERE ativo = true) AS total_unidades,
    (SELECT COUNT(*) FROM produtos  WHERE ativo = true) AS total_produtos,
    (SELECT COUNT(*) FROM servicos  WHERE ativo = true) AS total_servicos,
    (SELECT COUNT(*) FROM vagas     WHERE ativo = true) AS total_vagas,
    (SELECT COUNT(*) FROM contatos  WHERE status = 'novo') AS contatos_novos,
    (SELECT COUNT(*) FROM candidatos WHERE status = 'pendente') AS candidatos_pendentes;

CREATE FUNCTION get_dashboard_stats()
RETURNS TABLE (
    total_unidades BIGINT,
    total_produtos BIGINT,
    total_servicos BIGINT,
    total_vagas BIGINT,
    contatos_novos BIGINT,
    candidatos_pendentes BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM unidades  WHERE ativo = true),
        (SELECT COUNT(*) FROM produtos  WHERE ativo = true),
        (SELECT COUNT(*) FROM servicos  WHERE ativo = true),
        (SELECT COUNT(*) FROM vagas     WHERE ativo = true),
        (SELECT COUNT(*) FROM contatos  WHERE status = 'novo'),
        (SELECT COUNT(*) FROM candidatos WHERE status = 'pendente');
END;
$$;

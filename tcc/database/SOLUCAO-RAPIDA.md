# Solução Rápida para o Erro de Imagens

## Problema
A view `vw_site_content` está bloqueando a alteração das colunas de imagem.

## Solução

### Opção 1: Usar CASCADE (Recomendado)

Execute este comando que força a remoção da view e todas as dependências:

```sql
DROP VIEW vw_site_content CASCADE;
```

Depois execute o script `supabase_fix_images_alternative.sql` completo.

**Você pode recriar a view depois se necessário.**

### Opção 2: Alterar as colunas sem afetar a view

Se você NÃO quer perder a view, apenas altere o tamanho das colunas existentes para 2000 caracteres:

```sql
-- Alterar para VARCHAR(2000) em vez de TEXT
ALTER TABLE servicos ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE produtos ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE unidades ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE sobre_nos ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE hero_content ALTER COLUMN imagem_fundo TYPE VARCHAR(2000);
```

**Esta é a solução MAIS SIMPLES! Use o tipo VARCHAR(2000) em vez de TEXT.**

### Opção 3: Ver a estrutura da view antes de remover

Execute para ver a definição da view:
```sql
SELECT view_definition 
FROM information_schema.views 
WHERE table_name = 'vw_site_content';
```

Copie o resultado, remova a view, altere as colunas, e depois recrie a view usando o resultado copiado.

## Recomendação Final

**Use a Opção 2** - é mais simples e não remove nada:

```sql
ALTER TABLE servicos ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE produtos ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE unidades ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE sobre_nos ALTER COLUMN imagem TYPE VARCHAR(2000);
ALTER TABLE hero_content ALTER COLUMN imagem_fundo TYPE VARCHAR(2000);
```

Isso é suficiente para URLs do Supabase Storage funcionarem!


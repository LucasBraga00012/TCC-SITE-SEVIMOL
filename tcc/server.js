const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sevimol_cms',
  charset: 'utf8mb4'
};

// Pool de conexões
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso necessário' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'sevimol_secret_key', (err, admin) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.admin = admin;
    next();
  });
};

// =====================================================
// ROTAS DE AUTENTICAÇÃO
// =====================================================

// Login do administrador
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const [rows] = await pool.execute(
      'SELECT * FROM administradores WHERE email = ? AND ativo = TRUE',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const admin = rows[0];
    const isValidPassword = await bcrypt.compare(password, admin.senha);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Atualizar último login
    await pool.execute(
      'UPDATE administradores SET ultimo_login = NOW() WHERE id = ?',
      [admin.id]
    );

    // Gerar token JWT
    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email, 
        role: admin.role 
      },
      process.env.JWT_SECRET || 'sevimol_secret_key',
      { expiresIn: '24h' }
    );

    // Retornar dados do admin (sem senha)
    const { senha, ...adminData } = admin;

    res.json({
      token,
      admin: adminData
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Verificar token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ admin: req.admin });
});

// =====================================================
// ROTAS DE CONFIGURAÇÕES
// =====================================================

// Buscar todas as configurações
app.get('/api/configuracoes', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM configuracoes ORDER BY secao, chave'
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar configuração
app.put('/api/configuracoes/:chave', authenticateToken, async (req, res) => {
  try {
    const { chave } = req.params;
    const { valor } = req.body;

    await pool.execute(
      'UPDATE configuracoes SET valor = ? WHERE chave = ?',
      [valor, chave]
    );

    res.json({ message: 'Configuração atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =====================================================
// ROTAS DE CONTEÚDO HERO
// =====================================================

// Buscar conteúdo do hero
app.get('/api/hero', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM hero_content WHERE ativo = TRUE ORDER BY ordem'
    );
    res.json(rows[0] || null);
  } catch (error) {
    console.error('Erro ao buscar hero:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar conteúdo do hero
app.put('/api/hero/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, subtitulo, descricao, texto_botao, imagem_fundo } = req.body;

    await pool.execute(
      `UPDATE hero_content SET 
       titulo = ?, subtitulo = ?, descricao = ?, 
       texto_botao = ?, imagem_fundo = ? 
       WHERE id = ?`,
      [titulo, subtitulo, descricao, texto_botao, imagem_fundo, id]
    );

    res.json({ message: 'Hero atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar hero:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =====================================================
// ROTAS DE SOBRE NÓS
// =====================================================

// Buscar conteúdo sobre nós
app.get('/api/sobre', async (req, res) => {
  try {
    const [sobreRows] = await pool.execute(
      'SELECT * FROM sobre_nos WHERE ativo = TRUE LIMIT 1'
    );
    
    const [valoresRows] = await pool.execute(
      'SELECT * FROM valores WHERE ativo = TRUE ORDER BY ordem'
    );

    const sobre = sobreRows[0] || null;
    if (sobre) {
      sobre.valores = valoresRows;
    }

    res.json(sobre);
  } catch (error) {
    console.error('Erro ao buscar sobre nós:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar conteúdo sobre nós
app.put('/api/sobre/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, texto_fundadores, texto_atual, missao, visao } = req.body;

    await pool.execute(
      `UPDATE sobre_nos SET 
       titulo = ?, descricao = ?, texto_fundadores = ?, 
       texto_atual = ?, missao = ?, visao = ?
       WHERE id = ?`,
      [titulo, descricao, texto_fundadores, texto_atual, missao, visao, id]
    );

    res.json({ message: 'Sobre nós atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar sobre nós:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =====================================================
// ROTAS DE UNIDADES
// =====================================================

// Buscar todas as unidades
app.get('/api/unidades', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM unidades WHERE ativo = TRUE ORDER BY ordem'
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar unidades:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar unidade
app.put('/api/unidades/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, endereco, cidade, estado, cep, telefone, tipo, ativo } = req.body;

    await pool.execute(
      `UPDATE unidades SET 
       nome = ?, endereco = ?, cidade = ?, estado = ?, 
       cep = ?, telefone = ?, tipo = ?, ativo = ?
       WHERE id = ?`,
      [nome, endereco, cidade, estado, cep, telefone, tipo, ativo, id]
    );

    res.json({ message: 'Unidade atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar unidade:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =====================================================
// ROTAS DE PRODUTOS
// =====================================================

// Buscar todos os produtos
app.get('/api/produtos', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM produtos WHERE ativo = TRUE ORDER BY ordem'
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar produto
app.put('/api/produtos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, categoria, imagem, ativo } = req.body;

    await pool.execute(
      `UPDATE produtos SET 
       nome = ?, descricao = ?, categoria = ?, 
       imagem = ?, ativo = ?
       WHERE id = ?`,
      [nome, descricao, categoria, imagem, ativo, id]
    );

    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =====================================================
// ROTAS DE SERVIÇOS
// =====================================================

// Buscar todos os serviços
app.get('/api/servicos', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM servicos WHERE ativo = TRUE ORDER BY ordem'
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar serviço
app.put('/api/servicos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, imagem, ativo } = req.body;

    await pool.execute(
      `UPDATE servicos SET 
       nome = ?, descricao = ?, imagem = ?, ativo = ?
       WHERE id = ?`,
      [nome, descricao, imagem, ativo, id]
    );

    res.json({ message: 'Serviço atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =====================================================
// ROTAS DE CONTATOS
// =====================================================

// Enviar contato (público)
app.post('/api/contatos', async (req, res) => {
  try {
    const { nome, email, telefone, empresa, assunto, mensagem, tipo, unidade_interesse } = req.body;

    if (!nome || !email || !mensagem) {
      return res.status(400).json({ error: 'Nome, email e mensagem são obrigatórios' });
    }

    await pool.execute(
      `INSERT INTO contatos 
       (nome, email, telefone, empresa, assunto, mensagem, tipo, unidade_interesse)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, telefone, empresa, assunto, mensagem, tipo, unidade_interesse]
    );

    res.json({ message: 'Contato enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar contato:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar contatos (admin)
app.get('/api/contatos', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM contatos ORDER BY data_criacao DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =====================================================
// ROTAS DE ESTATÍSTICAS
// =====================================================

// Buscar estatísticas
app.get('/api/estatisticas', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM vw_estatisticas');
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// =====================================================
// ROTA DE TESTE
// =====================================================

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API SEVIMOL CMS funcionando!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// =====================================================
// MIDDLEWARE DE ERRO
// =====================================================

app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// =====================================================
// INICIAR SERVIDOR
// =====================================================

app.listen(PORT, () => {
  console.log(`🚀 Servidor SEVIMOL CMS rodando na porta ${PORT}`);
  console.log(`📊 API disponível em: http://localhost:${PORT}/api`);
  console.log(`🔧 Teste: http://localhost:${PORT}/api/test`);
});

module.exports = app;

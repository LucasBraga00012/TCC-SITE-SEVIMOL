# 🌐 Sistema CMS SEVIMOL - Site Gerenciável

Sistema completo de gerenciamento de conteúdo (CMS) para o site da SEVIMOL, permitindo que administradores atualizem o conteúdo do site através de um painel administrativo intuitivo.

## 📋 Índice

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Credenciais Padrão](#credenciais-padrão)

## ✨ Características

### 🎯 Sistema Completo de Gerenciamento
- ✅ **Painel Administrativo** - Interface intuitiva para gerenciar todo o conteúdo
- ✅ **Autenticação Segura** - Login com JWT e bcrypt
- ✅ **Gestão de Conteúdo** - Editar textos, imagens e configurações
- ✅ **Gerenciar Unidades** - Controle completo das 7 filiais
- ✅ **Gerenciar Produtos** - CRUD de produtos de aço
- ✅ **Gerenciar Serviços** - Administrar serviços oferecidos
- ✅ **Dashboard Executivo** - Visão geral do sistema
- ✅ **Banco de Dados MySQL** - Estrutura completa e otimizada

### 🎨 Site de Apresentação
- ✅ Design profissional baseado no site oficial da SEVIMOL
- ✅ Totalmente responsivo (mobile, tablet, desktop)
- ✅ Navegação suave entre seções
- ✅ Animações e efeitos modernos
- ✅ SEO otimizado

## 📦 Requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior) - [Download](https://nodejs.org/)
- **MySQL** (versão 5.7 ou superior) - [Download](https://dev.mysql.com/downloads/)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (opcional, para controle de versão)

## 🚀 Instalação

### 1. Clone ou extraia o projeto

```bash
cd TCC-SITE-SEVIMOL/tcc
```

### 2. Instale as dependências

```bash
npm install
```

Isso instalará todas as dependências necessárias:
- React 19
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- Bcrypt
- Axios
- Cors
- Helmet
- Morgan
- Dotenv
- Concurrently

## 🗄️ Configuração do Banco de Dados

### 1. Crie o banco de dados MySQL

Abra o MySQL Workbench ou seu cliente MySQL preferido e execute:

```bash
mysql -u root -p
```

### 2. Execute o script SQL

O arquivo `database/sevimol_cms.sql` contém toda a estrutura do banco de dados. Execute:

**Opção A - Via linha de comando:**
```bash
mysql -u root -p < database/sevimol_cms.sql
```

**Opção B - Via MySQL Workbench:**
1. Abra o MySQL Workbench
2. Conecte-se ao servidor
3. Vá em File > Open SQL Script
4. Selecione `database/sevimol_cms.sql`
5. Clique em Execute (⚡)

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `tcc` baseado no `env.example`:

```env
# Servidor
PORT=5000
NODE_ENV=development

# Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=sevimol_cms

# Segurança
JWT_SECRET=sevimol_secret_key_change_in_production
```

**⚠️ IMPORTANTE:** Altere o `DB_PASSWORD` para a senha do seu MySQL!

## 🎮 Como Usar

### Opção 1: Rodar Frontend e Backend Separadamente

**Terminal 1 - Frontend (React):**
```bash
npm start
```
O site abrirá em: http://localhost:3000

**Terminal 2 - Backend (API):**
```bash
npm run server
```
A API estará disponível em: http://localhost:5000

### Opção 2: Rodar Tudo Junto (Recomendado)

```bash
npm run dev
```

Isso iniciará o frontend e backend simultaneamente usando `concurrently`.

## 🔐 Credenciais Padrão

Para acessar o painel administrativo:

**Email:** `admin@sevimol.com.br`  
**Senha:** `admin123`

⚠️ **Importante:** Altere estas credenciais em produção!

## 🎯 Acessando o Sistema

### Site Público
- **URL:** http://localhost:3000
- Acesse todas as seções do site
- Clique no botão "🔧 Admin" no canto superior direito para acessar o login

### Painel Administrativo
1. Clique em "🔧 Admin" no site
2. Faça login com as credenciais padrão
3. Gerencie todo o conteúdo do site

### Seções Gerenciáveis

#### 📊 Dashboard
- Visão geral do sistema
- Estatísticas de unidades, produtos e serviços

#### 🏠 Página Inicial (Hero)
- Título principal
- Subtítulo
- Descrição
- Texto do botão
- Imagem de fundo

#### 📖 Sobre Nós
- História da empresa
- Texto dos fundadores
- Missão, visão e valores
- Descrição atual

#### 🏢 Unidades
- Nome, endereço, telefone
- Tipo (matriz/filial)
- Status (ativo/inativo)
- CEP e cidade

#### 🛒 Produtos
- Nome e descrição
- Categoria
- Imagem
- Status ativo/inativo

#### 🏭 Serviços
- Nome e descrição
- Imagem
- Status ativo/inativo

## 📁 Estrutura do Projeto

```
tcc/
├── database/
│   └── sevimol_cms.sql          # Script SQL completo
├── public/
│   ├── index.html
│   └── [imagens]                # Adicione suas imagens aqui
├── src/
│   ├── components/
│   │   ├── AdminLogin.js        # Tela de login admin
│   │   ├── AdminLogin.css
│   │   ├── AdminPanel.js        # Painel administrativo
│   │   ├── AdminPanel.css
│   │   ├── Header.js            # Cabeçalho do site
│   │   ├── Hero.js              # Seção inicial
│   │   ├── SobreNos.js          # Seção sobre nós
│   │   ├── Unidades.js          # Seção unidades
│   │   ├── Industria.js         # Seção indústria
│   │   ├── Comercio.js          # Seção comércio
│   │   ├── Atuacao.js           # Seção atuação
│   │   ├── FacaParte.js         # Seção faça parte
│   │   └── Footer.js            # Rodapé
│   ├── App.js                   # Componente principal
│   ├── App.css
│   └── index.js
├── server.js                    # Backend API (Express)
├── package.json
├── env.example                  # Exemplo de configuração
└── README.md                    # Este arquivo
```

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login do administrador
- `GET /api/auth/verify` - Verificar token

### Conteúdo
- `GET /api/hero` - Buscar conteúdo hero
- `PUT /api/hero/:id` - Atualizar hero
- `GET /api/sobre` - Buscar sobre nós
- `PUT /api/sobre/:id` - Atualizar sobre nós

### Unidades
- `GET /api/unidades` - Listar unidades
- `PUT /api/unidades/:id` - Atualizar unidade

### Produtos
- `GET /api/produtos` - Listar produtos
- `PUT /api/produtos/:id` - Atualizar produto

### Serviços
- `GET /api/servicos` - Listar serviços
- `PUT /api/servicos/:id` - Atualizar serviço

### Contatos
- `POST /api/contatos` - Enviar contato (público)
- `GET /api/contatos` - Listar contatos (admin)

### Estatísticas
- `GET /api/estatisticas` - Dashboard stats (admin)

## 🗃️ Estrutura do Banco de Dados

O sistema utiliza as seguintes tabelas:

- **administradores** - Usuários do painel admin
- **configuracoes** - Configurações gerais do site
- **hero_content** - Conteúdo da página inicial
- **sobre_nos** - Informações da empresa
- **valores** - Valores da empresa
- **unidades** - Filiais da SEVIMOL
- **produtos** - Catálogo de produtos
- **servicos** - Serviços oferecidos
- **segmentos** - Segmentos de atuação
- **vagas** - Vagas disponíveis
- **candidatos** - Candidatos às vagas
- **contatos** - Mensagens recebidas
- **logs** - Histórico de alterações

## 🎨 Adicionando Imagens

Coloque suas imagens na pasta `public/` com os seguintes nomes:

### Obrigatórias:
- `logo-sevimol.png` - Logo da empresa
- `hero-bg-1.jpg` - Fundo da página inicial
- `sobre-nos.jpg` - Imagem sobre nós

### Produtos:
- `arame-recozido.jpg`
- `arruela.jpg`
- `barra-chata.jpg`
- `barra-quadrada.jpg`
- `barra-redonda.jpg`
- `chapa-aco.jpg`

### Serviços:
- `corte-dobra.jpg`
- `fabricacao-telhas.jpg`
- `corte-laser.jpg`

### Segmentos:
- `construcao-civil.jpg`
- `industria-setor.jpg`
- `agronegocio.jpg`
- `prestadores-servico.jpg`

## 🔒 Segurança

O sistema implementa várias camadas de segurança:

- ✅ **Senhas criptografadas** com bcrypt
- ✅ **JWT** para autenticação
- ✅ **Helmet** para proteção de headers HTTP
- ✅ **CORS** configurado
- ✅ **Validação** de dados em todos os endpoints
- ✅ **Logs** de auditoria no banco de dados

## 🚀 Deploy em Produção

### Pré-requisitos:
1. Servidor com Node.js e MySQL
2. Domínio configurado
3. Certificado SSL (HTTPS)

### Passos:
1. Configure o arquivo `.env` com dados de produção
2. Compile o frontend: `npm run build`
3. Configure o servidor web (Nginx/Apache)
4. Configure PM2 para manter o backend rodando
5. Configure backup automático do banco de dados

## 🐛 Resolução de Problemas

### Erro de conexão com banco de dados
- Verifique se o MySQL está rodando
- Confirme as credenciais no arquivo `.env`
- Verifique se o banco `sevimol_cms` foi criado

### Porta já em uso
- Frontend (3000): Altere em `package.json` ou mate o processo
- Backend (5000): Altere no arquivo `.env` ou mata o processo

### Erros de dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 Email: contato@sevimol.com.br
- ☎️ Telefone: (34) 3851-6500

## 📄 Licença

Este projeto é propriedade da SEVIMOL - Ferro e Aço.

---

**Desenvolvido por:** AQUA Interativa  
**Versão:** 1.0.0  
**Data:** 2024
# 🐘 PostgreSQL Setup

Guia completo para configurar PostgreSQL local e migrar dados do DuckDB.

## 🚀 Quick Start

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar PostgreSQL com Docker
docker-compose up -d

# 3. Inicializar banco de dados
npm run db:init

# 4. (Opcional) Migrar dados do DuckDB
npm run db:migrate

# 5. Iniciar aplicação
npm run dev
```

## 📦 Estrutura de Arquivos

```
db/
├── schema.sql              # Schema do banco de dados
├── init.mjs                # Script de inicialização
└── migrate-to-postgres.mjs # Script de migração DuckDB → PostgreSQL
```

## 🔧 Scripts Disponíveis

### `npm run db:init`
Inicializa o banco de dados PostgreSQL:
- Cria tabela `sessions`
- Cria índices para performance
- Cria trigger para auto-update de `updated_at`

### `npm run db:migrate`
Migra dados existentes do DuckDB para PostgreSQL:
- Lê todos os registros de `study-sessions.db`
- Insere no PostgreSQL
- Usa `ON CONFLICT` para evitar duplicatas

### `npm run db:setup`
Executa `db:init` + `db:migrate` automaticamente

## 🐳 Docker Compose

O arquivo `docker-compose.yml` inclui:

### PostgreSQL
- **Porta**: 5432
- **User**: postgres
- **Password**: postgres
- **Database**: flashcards

### PgAdmin (Interface Web)
- **URL**: http://localhost:5050
- **Email**: admin@admin.com
- **Password**: admin

### Gerenciar containers:

```bash
# Iniciar
docker-compose up -d

# Parar
docker-compose down

# Ver logs
docker-compose logs -f postgres

# Remover volumes (limpar dados)
docker-compose down -v

# Reiniciar
docker-compose restart
```

## 🔌 Configuração

### 1. Variáveis de Ambiente

Adicione ao `.env.local`:

```env
# PostgreSQL (local)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/flashcards

# Ou PostgreSQL (Neon/Supabase)
# DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# OpenAI (obrigatório)
OPENAI_API_KEY=sk-sua-chave-aqui
OPENAI_MODEL=gpt-4o
```

### 2. Conectar ao Banco

**Via psql (CLI):**
```bash
# Usar Docker
docker exec -it flashcard-postgres psql -U postgres -d flashcards

# Ou local
psql -U postgres -d flashcards
```

**Via PgAdmin (Web):**
1. Acesse: http://localhost:5050
2. Login: admin@admin.com / admin
3. Add Server:
   - Name: Flashcards
   - Host: postgres (ou localhost se não usar Docker)
   - Port: 5432
   - Database: flashcards
   - Username: postgres
   - Password: postgres

## 📊 Schema do Banco

```sql
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  file_name VARCHAR(500) NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  extracted_text TEXT NOT NULL,
  flashcards JSONB DEFAULT '[]'::jsonb,
  quiz JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_sessions_updated_at ON sessions(updated_at DESC);
CREATE INDEX idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX idx_sessions_file_name ON sessions(file_name);

-- Trigger para auto-update de updated_at
CREATE TRIGGER update_sessions_updated_at 
  BEFORE UPDATE ON sessions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

## 🔄 Migração DuckDB → PostgreSQL

Se você já tem dados no DuckDB:

```bash
# 1. Garantir que study-sessions.db existe
ls study-sessions.db

# 2. Inicializar PostgreSQL
npm run db:init

# 3. Migrar dados
npm run db:migrate

# Output esperado:
# 🔄 Migração DuckDB → PostgreSQL
# 
# 📂 Fonte: study-sessions.db
# 🎯 Destino: postgresql://postgres:****@localhost:5432/flashcards
# 
# 📖 Lendo dados do DuckDB...
# ✅ 5 registros lidos
# 
# 🔌 Conectando ao PostgreSQL...
# ✅ Conectado!
# 
# 💾 Inserindo registros...
#   ✅ Inseridos: 5/5
# 
# 📊 Resumo:
#   ✅ Inseridos: 5
#   ⚠️  Ignorados: 0
#   📈 Total no PostgreSQL: 5
# 
# 🎉 Migração concluída com sucesso!
```

## 🧪 Testes

### Verificar conexão:
```bash
# Via script de inicialização
npm run db:init

# Via psql
docker exec -it flashcard-postgres psql -U postgres -d flashcards -c "SELECT COUNT(*) FROM sessions;"
```

### Consultas úteis:
```sql
-- Ver todas as sessões
SELECT id, file_name, created_at, updated_at FROM sessions ORDER BY updated_at DESC;

-- Contar flashcards e quizzes
SELECT 
  file_name,
  jsonb_array_length(flashcards) as num_flashcards,
  jsonb_array_length(quiz) as num_quizzes
FROM sessions;

-- Buscar por nome de arquivo
SELECT * FROM sessions WHERE file_name LIKE '%Context%';

-- Limpar tabela (cuidado!)
TRUNCATE sessions;
```

## 🚨 Troubleshooting

### Erro: "Connection refused"
```bash
# Verificar se PostgreSQL está rodando
docker-compose ps

# Iniciar se não estiver
docker-compose up -d

# Ver logs
docker-compose logs postgres
```

### Erro: "password authentication failed"
```bash
# Verificar .env.local
cat .env.local | grep DATABASE_URL

# Deve ser:
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/flashcards
```

### Erro: "database does not exist"
```bash
# Conectar ao PostgreSQL e criar database
docker exec -it flashcard-postgres psql -U postgres -c "CREATE DATABASE flashcards;"

# Ou recriar container
docker-compose down -v
docker-compose up -d
```

### Erro: "relation sessions does not exist"
```bash
# Executar script de inicialização
npm run db:init
```

### Resetar tudo:
```bash
# Remover containers e volumes
docker-compose down -v

# Reiniciar
docker-compose up -d

# Recriar schema
npm run db:init

# (Opcional) Migrar dados
npm run db:migrate
```

## 🌐 Deploy em Produção

Para produção, use PostgreSQL gerenciado:

### Neon.tech (Recomendado)
```bash
# 1. Criar conta: https://neon.tech
# 2. Criar projeto
# 3. Copiar connection string
# 4. Adicionar ao Netlify:
#    - Site settings → Environment variables
#    - DATABASE_URL = postgresql://user:password@host.neon.tech/database?sslmode=require
```

### Supabase
```bash
# 1. Criar conta: https://supabase.com
# 2. Criar projeto
# 3. Settings → Database → Connection string
# 4. Adicionar ao Netlify
```

### Executar migrações em produção:
```bash
# Opção 1: Via script local (apontando para prod)
DATABASE_URL="postgresql://prod-url" npm run db:init

# Opção 2: Via interface do provedor
# - Neon: Console → SQL Editor
# - Supabase: SQL Editor
# - Copiar conteúdo de db/schema.sql e executar
```

## 📚 Recursos

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PgAdmin Documentation](https://www.pgadmin.org/docs/)
- [Node.js pg driver](https://node-postgres.com/)
- [Neon Serverless](https://neon.tech/docs)
- [Supabase](https://supabase.com/docs/guides/database)

## ✅ Checklist de Setup

- [ ] Docker e Docker Compose instalados
- [ ] `docker-compose up -d` executado
- [ ] PostgreSQL rodando na porta 5432
- [ ] `npm install` executado (instala `pg`)
- [ ] `DATABASE_URL` configurado no `.env.local`
- [ ] `npm run db:init` executado
- [ ] `npm run db:migrate` executado (se tiver dados DuckDB)
- [ ] `npm run dev` funciona
- [ ] Consegue criar/ler sessões
- [ ] PgAdmin acessível (opcional)

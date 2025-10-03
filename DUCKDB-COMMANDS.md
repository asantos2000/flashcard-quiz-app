# 🚀 Comandos Úteis - DuckDB

## Desenvolvimento

### Iniciar aplicação
```bash
npm run dev
```

### Testar DuckDB
```bash
npm run test:db
```

### Build para produção
```bash
npm run build
npm start
```

## Gerenciamento do Banco

### Verificar se banco existe
```bash
ls -lh study-sessions.db
```

### Tamanho do banco
```bash
du -h study-sessions.db
```

### Backup do banco
```bash
# Backup simples
cp study-sessions.db study-sessions-backup-$(date +%Y%m%d-%H%M%S).db

# Backup comprimido
tar -czf study-sessions-backup-$(date +%Y%m%d-%H%M%S).tar.gz study-sessions.db
```

### Restaurar backup
```bash
# Parar a aplicação primeiro!
cp study-sessions-backup-20250103-143000.db study-sessions.db
```

### Deletar banco (reset completo)
```bash
# ⚠️ ATENÇÃO: Isso apaga TODOS os dados!
rm study-sessions.db
```

## Consultas Diretas (DuckDB CLI)

### Instalar CLI do DuckDB
```bash
# macOS
brew install duckdb

# Linux
wget https://github.com/duckdb/duckdb/releases/download/v1.4.0/duckdb_cli-linux-amd64.zip
unzip duckdb_cli-linux-amd64.zip
sudo mv duckdb /usr/local/bin/
```

### Abrir banco
```bash
duckdb study-sessions.db
```

### Consultas úteis
```sql
-- Ver todas as sessões
SELECT 
  id, 
  file_name, 
  created_at, 
  updated_at,
  json_array_length(flashcards) as num_flashcards,
  json_array_length(quiz) as num_quiz
FROM sessions 
ORDER BY updated_at DESC;

-- Contar sessões
SELECT COUNT(*) as total_sessions FROM sessions;

-- Sessões por dia
SELECT 
  DATE(created_at) as date,
  COUNT(*) as sessions
FROM sessions 
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Total de flashcards e quizzes
SELECT 
  SUM(json_array_length(flashcards)) as total_flashcards,
  SUM(json_array_length(quiz)) as total_quizzes
FROM sessions;

-- Sessões maiores
SELECT 
  file_name,
  LENGTH(extracted_text) as text_size,
  json_array_length(flashcards) as flashcards,
  json_array_length(quiz) as quizzes
FROM sessions
ORDER BY text_size DESC
LIMIT 10;

-- Buscar sessão por nome
SELECT * FROM sessions 
WHERE file_name LIKE '%Context%';

-- Ver conteúdo de flashcards
SELECT 
  file_name,
  json_extract(flashcards, '$[0].front') as first_question
FROM sessions
LIMIT 5;

-- Deletar sessão específica
DELETE FROM sessions WHERE id = 'session-123456789';

-- Deletar todas as sessões (CUIDADO!)
DELETE FROM sessions;

-- Sair
.quit
```

## Debugging

### Ver logs da aplicação
```bash
# Terminal onde você rodou npm run dev
# Procure por:
# ✅ DuckDB initialized successfully
```

### Testar API diretamente
```bash
# Listar sessões
curl http://localhost:3000/api/sessions

# Criar sessão (exemplo)
curl -X POST http://localhost:3000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-123",
    "fileName": "test.pdf",
    "fileType": "application/pdf",
    "extractedText": "Test content",
    "flashcards": [],
    "quiz": [],
    "createdAt": "2025-01-03T14:30:00.000Z",
    "updatedAt": "2025-01-03T14:30:00.000Z"
  }'

# Deletar sessão
curl -X DELETE "http://localhost:3000/api/sessions?id=test-123"
```

### Ver erros do Next.js
```bash
# Terminal da aplicação mostrará erros de:
# - Inicialização do banco
# - Queries SQL
# - Erros de API
```

## Performance

### Adicionar índices (melhorar consultas)
```sql
-- No DuckDB CLI
CREATE INDEX idx_sessions_updated_at ON sessions(updated_at);
CREATE INDEX idx_sessions_created_at ON sessions(created_at);
CREATE INDEX idx_sessions_file_name ON sessions(file_name);
```

### Vacuum (compactar banco)
```sql
VACUUM;
```

### Estatísticas do banco
```sql
PRAGMA database_size;
PRAGMA table_info(sessions);
```

## Migração

### Exportar para JSON
```bash
duckdb study-sessions.db -c "COPY (SELECT * FROM sessions) TO 'sessions-export.json' (FORMAT JSON, ARRAY true)"
```

### Exportar para CSV
```bash
duckdb study-sessions.db -c "COPY sessions TO 'sessions-export.csv' (HEADER, DELIMITER ',')"
```

### Importar de JSON
```bash
duckdb study-sessions.db -c "COPY sessions FROM 'sessions-export.json' (FORMAT JSON)"
```

## Produção

### Deploy com filesystem persistente (Railway, Render)
```bash
# 1. Build da aplicação
npm run build

# 2. Iniciar
npm start

# 3. O banco será criado automaticamente em:
# ./study-sessions.db
```

### Deploy serverless (Vercel, Netlify) ⚠️
```
NOTA: DuckDB precisa de filesystem persistente.
Para serverless, use:
- PostgreSQL (Neon, Supabase)
- MySQL (PlanetScale)
- MongoDB
- Vercel Postgres
```

### Variáveis de ambiente (para PostgreSQL)
```bash
# Se migrar para PostgreSQL no futuro
DATABASE_URL=postgresql://user:password@host:5432/database
```

## Troubleshooting

### "Error: Database is locked"
```bash
# Parar todos os processos Node
killall node
# Ou
pkill -9 node

# Reiniciar
npm run dev
```

### "Cannot create database"
```bash
# Verificar permissões
ls -la study-sessions.db
chmod 644 study-sessions.db
```

### "Module not found: duckdb"
```bash
npm install duckdb
```

### Banco corrompido
```bash
# 1. Parar aplicação
# 2. Tentar reparar
duckdb study-sessions.db "PRAGMA integrity_check;"

# 3. Se não funcionar, restaurar backup
rm study-sessions.db
cp study-sessions-backup-latest.db study-sessions.db
```

## Monitoramento

### Ver tamanho ao longo do tempo
```bash
# Adicionar ao crontab para monitorar
echo "$(date): $(du -h study-sessions.db)" >> db-size.log
```

### Alertas de tamanho
```bash
# Script de alerta
SIZE=$(du -m study-sessions.db | cut -f1)
if [ $SIZE -gt 100 ]; then
  echo "⚠️ Database is over 100MB!"
fi
```

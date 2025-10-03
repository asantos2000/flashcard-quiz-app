# 🦆 Migração para DuckDB

## O que mudou?

A aplicação agora usa **DuckDB** ao invés de localStorage para persistir as sessões de estudo.

## Vantagens

✅ **Persistência no servidor** - Dados não ficam limitados ao navegador
✅ **Sem limite de tamanho** - localStorage tem limite de 5-10MB
✅ **Performance superior** - DuckDB é otimizado para analytics
✅ **Suporte a JSON nativo** - Ideal para nossos dados estruturados
✅ **Backup fácil** - Basta copiar o arquivo `study-sessions.db`

## Estrutura do Banco

```sql
CREATE TABLE sessions (
  id VARCHAR PRIMARY KEY,
  file_name VARCHAR NOT NULL,
  file_type VARCHAR NOT NULL,
  extracted_text TEXT NOT NULL,
  flashcards JSON,
  quiz JSON,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
)
```

## Arquivos Criados

- `lib/db.js` - Funções de acesso ao DuckDB
- `app/api/sessions/route.js` - API REST para CRUD de sessões

## APIs Disponíveis

### GET /api/sessions
Retorna todas as sessões ordenadas por data de atualização.

```javascript
const response = await fetch('/api/sessions');
const { sessions } = await response.json();
```

### POST /api/sessions
Cria ou atualiza uma sessão.

```javascript
await fetch('/api/sessions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(sessionData)
});
```

### DELETE /api/sessions?id={id}
Deleta uma sessão específica.

```javascript
await fetch(`/api/sessions?id=${sessionId}`, {
  method: 'DELETE'
});
```

## Localização do Banco

O arquivo do banco de dados fica em:
```
/home/adsantos/Projects/copilotkit/flashcard-quiz-app/study-sessions.db
```

## Backup

Para fazer backup das suas sessões:
```bash
cp study-sessions.db study-sessions-backup-$(date +%Y%m%d).db
```

## Migração de Dados Antigos

Se você tinha dados no localStorage, eles não serão automaticamente migrados. Para migrar manualmente:

1. Abra o console do navegador
2. Execute: `localStorage.getItem('flashcard-sessions')`
3. Copie os dados
4. Use a API POST para inserir cada sessão

## Deploy

No deploy (Vercel, Railway, etc.), certifique-se de que:
- O arquivo `study-sessions.db` tem permissão de escrita
- Ou use um volume persistente para o banco de dados

Para produção, considere usar PostgreSQL ou MySQL ao invés de DuckDB.

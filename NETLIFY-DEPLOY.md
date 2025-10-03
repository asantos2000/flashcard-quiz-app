# 🌐 Deploy na Netlify

## ⚠️ Aviso Importante: DuckDB e Netlify

A **Netlify é uma plataforma serverless** sem filesystem persistente. Isso significa:

❌ **O que NÃO funciona:**
- Persistência de sessões com DuckDB entre deploys
- Salvamento permanente de dados no arquivo `study-sessions.db`

✅ **O que FUNCIONA perfeitamente:**
- Upload de documentos
- Geração de flashcards com IA
- Geração de quiz com IA
- Todas as funcionalidades interativas
- As sessões funcionam **durante a sessão atual** (armazenadas em memória)

## 🚀 Deploy Rápido na Netlify

### Via Interface Web (Recomendado)

1. **Acesse**: https://app.netlify.com/
2. **Faça login** com sua conta GitHub
3. **Clique em**: "Add new site" → "Import an existing project"
4. **Escolha**: "Deploy with GitHub"
5. **Selecione**: `asantos2000/flashcard-quiz-app`
6. **Configure**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Environment variables**: 
     - `OPENAI_API_KEY`: sua chave OpenAI
     - `OPENAI_MODEL`: `gpt-4o`
7. **Deploy!**

### Via Netlify CLI

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Inicializar (na raiz do projeto)
netlify init

# 4. Configurar variáveis de ambiente
netlify env:set OPENAI_API_KEY "sk-sua-chave-aqui"
netlify env:set OPENAI_MODEL "gpt-4o"

# 5. Deploy
netlify deploy --prod
```

## 🔧 Variáveis de Ambiente Necessárias

No dashboard da Netlify (Site settings → Environment variables):

```env
OPENAI_API_KEY=sk-sua-chave-openai-aqui
OPENAI_MODEL=gpt-4o
```

## 📝 Checklist de Deploy

- [ ] Criar conta na Netlify
- [ ] Conectar repositório GitHub
- [ ] Configurar `OPENAI_API_KEY`
- [ ] Configurar `OPENAI_MODEL`
- [ ] Fazer deploy
- [ ] Testar a aplicação

## 💾 Para Persistência de Dados (Produção)

Se você precisa de persistência de sessões, considere estas alternativas:

### Opção A: Supabase (PostgreSQL)
- ✅ Free tier generoso
- ✅ 500MB de database
- ✅ Fácil integração
- 📚 [Guia Supabase](https://supabase.com/docs)

### Opção B: Neon (PostgreSQL Serverless)
- ✅ Free tier
- ✅ Serverless
- ✅ Escalável
- 📚 [Guia Neon](https://neon.tech/docs)

### Opção C: Railway/Render (com DuckDB)
- ✅ Filesystem persistente
- ✅ Mantém DuckDB funcionando
- 💰 ~$5/mês
- 📚 Ver [DEPLOY-GUIDE.md](./DEPLOY-GUIDE.md)

## 🔄 Migrar de DuckDB para PostgreSQL

Se você quiser migrar para PostgreSQL no futuro, precisará:

1. Instalar driver PostgreSQL:
   ```bash
   npm install pg
   ```

2. Atualizar `lib/db.js` para usar PostgreSQL
3. Criar schema equivalente no PostgreSQL
4. Migrar dados existentes

## 🐛 Troubleshooting

### Erro: "duckdb module not found"
**Solução**: Normal na Netlify serverless. As sessões funcionarão em memória durante a execução.

### Erro: "OPENAI_API_KEY is not set"
**Solução**: 
1. Vá em Site settings → Environment variables
2. Adicione `OPENAI_API_KEY` com sua chave

### Build falha
**Solução**:
```bash
# Testar build localmente
npm run build

# Se funcionar local, verificar logs da Netlify
netlify logs
```

## 📊 Custos

- **Netlify**: Free tier (100GB bandwidth, 300 build minutes)
- **OpenAI API**: Pay-as-you-go
  - GPT-4o: ~$0.01 por sessão de uso
  - GPT-3.5-turbo: ~$0.001 por sessão

## 🔗 Links Úteis

- [Netlify Dashboard](https://app.netlify.com/)
- [Netlify Docs - Next.js](https://docs.netlify.com/frameworks/next-js/overview/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Deploy Guide Completo](./DEPLOY-GUIDE.md)

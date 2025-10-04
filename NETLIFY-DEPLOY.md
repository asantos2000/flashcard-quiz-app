# 🌐 Deploy na Netlify

## ⚠️ Aviso Importante: PostgreSQL Necessário

A **Netlify é uma plataforma serverless** sem filesystem persistente. Isso significa:

❌ **O que NÃO funciona:**
- Banco de dados local (PostgreSQL via Docker)
- Persistência de sessões sem banco externo

✅ **Solução:**
- Use PostgreSQL externo (Neon, Supabase, Railway)
- Configure `DATABASE_URL` nas variáveis de ambiente

✅ **O que FUNCIONA perfeitamente:**
- Upload de documentos
- Geração de flashcards com IA
- Geração de quiz com IA
- Todas as funcionalidades interativas
- Persistência de sessões (com PostgreSQL externo)

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
     - `DATABASE_URL`: sua connection string PostgreSQL (veja abaixo)
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
netlify env:set DATABASE_URL "postgresql://user:pass@host/database"

# 5. Deploy
netlify deploy --prod
```

## 🔧 Variáveis de Ambiente Necessárias

No dashboard da Netlify (Site settings → Environment variables):

```env
OPENAI_API_KEY=sk-sua-chave-openai-aqui
OPENAI_MODEL=gpt-4o
DATABASE_URL=postgresql://user:password@host:port/database
```

## 💾 Configurar PostgreSQL para Produção (OBRIGATÓRIO)

Escolha uma das opções abaixo para ter persistência de dados:

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

## 🐛 Troubleshooting

### Erro: "Failed to connect to database"
**Solução**: 
1. Verifique se `DATABASE_URL` está configurada corretamente
2. Teste a conexão localmente: `DATABASE_URL="..." npm run db:init`
3. Verifique se o banco está acessível publicamente

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
- **PostgreSQL (Neon/Supabase)**: Free tier (500MB database)
- **OpenAI API**: Pay-as-you-go
  - GPT-4o: ~$0.01 por sessão de uso
  - GPT-3.5-turbo: ~$0.001 por sessão

## 🔗 Links Úteis

- [Netlify Dashboard](https://app.netlify.com/)
- [Netlify Docs - Next.js](https://docs.netlify.com/frameworks/next-js/overview/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Deploy Guide Completo](./DEPLOY-GUIDE.md)

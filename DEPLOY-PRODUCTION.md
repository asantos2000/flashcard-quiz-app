# 🚀 Guia Rápido de Deploy em Produção

## 📋 Pré-requisitos

- ✅ Aplicação testada localmente
- ✅ Conta GitHub
- ✅ Chave OpenAI API
- ✅ 15 minutos

---

## 🗄️ Passo 1: Criar Banco PostgreSQL (5 min)

### Opção Recomendada: Neon ⭐

1. Acesse: https://neon.tech
2. Crie uma conta (GitHub login)
3. **New Project**:
   - Name: `insightly-app`
   - Region: escolha o mais próximo
4. **Copie a Connection String**:
   ```
   postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb
   ```

### Inicializar o Schema

```bash
# Na sua máquina local
DATABASE_URL="sua-connection-string-aqui" npm run db:init
```

Você deve ver:
```
✅ Database initialized successfully!
📊 Table structure created
🔍 Indexes created
```

---

## 🌐 Passo 2: Deploy na Netlify (10 min)

### Via Interface Web

1. Acesse: https://app.netlify.com
2. Login com GitHub
3. **Add new site** → **Import an existing project**
4. **Deploy with GitHub**
5. Selecione: `asantos2000/flashcard-quiz-app`
6. **Configure o site**:

```
Build settings:
  Build command: npm run build
  Publish directory: .next
  
Site name (opcional): insightly-app
```

7. **Adicione as variáveis de ambiente** antes de fazer deploy:
   - Clique em "Add environment variables"
   - Adicione uma por uma:

```env
OPENAI_API_KEY=sk-sua-chave-openai-aqui
OPENAI_MODEL=gpt-4o
DATABASE_URL=postgresql://user:pass@host/database
```

8. **Deploy site**

---

## ✅ Passo 3: Verificar Deploy

### Build concluído com sucesso?

✅ Se sim, acesse: `https://seu-site.netlify.app`

❌ Se falhou:
1. Clique em "Deploy log" para ver o erro
2. Verifique se as variáveis estão corretas
3. Retry deploy

### Testar Funcionalidades

- [ ] Site carrega corretamente
- [ ] Upload de PDF/DOCX/TXT funciona
- [ ] Gerar flashcards funciona
- [ ] Gerar quiz funciona
- [ ] Sessões são salvas (aparecem na sidebar)
- [ ] Sessões podem ser carregadas
- [ ] Nova sessão funciona
- [ ] Deletar sessão funciona

---

## 🔧 Passo 4: Configurações Opcionais

### Custom Domain

1. No Netlify: **Site settings** → **Domain management**
2. **Add custom domain**
3. Siga as instruções de DNS

### Configurar Deploy Automático

Já configurado! Cada push para `main` faz deploy automático.

### Configurar Branch Previews

1. **Site settings** → **Build & deploy** → **Deploy contexts**
2. **Branch deploys**: All
3. Cada branch terá preview automático

---

## 📊 Monitoramento

### Logs da Aplicação

```bash
netlify logs
```

### Logs de Deploy

No dashboard: **Deploys** → Clique no deploy → **Deploy log**

### Analytics (Opcional)

No dashboard: **Analytics** → Habilitar Netlify Analytics (~$9/mês)

---

## 🐛 Troubleshooting Rápido

### "Failed to connect to database"
```bash
# Teste a conexão localmente
DATABASE_URL="sua-url" npm run db:init
```

### "OPENAI_API_KEY is not set"
1. **Site settings** → **Environment variables**
2. Verifique se `OPENAI_API_KEY` está lá
3. **Deploys** → **Trigger deploy** → **Clear cache and deploy**

### Build muito lento
- Primeira build: ~5-10 minutos (normal)
- Builds seguintes: ~2-3 minutos (cache)

### Sessões não salvam
1. Verifique `DATABASE_URL` no Netlify
2. Teste conexão: `DATABASE_URL="..." npm run db:init`
3. Verifique logs: `netlify logs`

---

## 💰 Custos Estimados

| Serviço | Plano | Custo |
|---------|-------|-------|
| Netlify | Free | $0 |
| Neon PostgreSQL | Free | $0 |
| OpenAI API | Pay-as-you-go | ~$0.01/sessão |

**Total mensal** (uso moderado): ~$5-10

---

## 🔒 Segurança

### Variáveis de Ambiente

✅ Nunca commite `.env.local` no Git
✅ Use variáveis de ambiente no Netlify
✅ Rotacione chaves API periodicamente

### CORS

Já configurado! CopilotKit Runtime aceita requests do mesmo domínio.

### Rate Limiting

Considere adicionar rate limiting se o site ficar público.

---

## 🎉 Pronto!

Sua aplicação está no ar em: **https://seu-site.netlify.app**

### Próximos Passos

- [ ] Compartilhe o link
- [ ] Configure custom domain (opcional)
- [ ] Monitore uso da OpenAI API
- [ ] Adicione analytics (opcional)

### Recursos

- 📖 [NETLIFY-DEPLOY.md](./NETLIFY-DEPLOY.md) - Guia completo
- 💾 [db/README.md](./db/README.md) - Guia do banco de dados
- 🐛 [GitHub Issues](https://github.com/asantos2000/flashcard-quiz-app/issues)

---

**Dúvidas?** Abra uma issue no GitHub! 🚀

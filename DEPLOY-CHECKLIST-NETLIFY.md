# ✅ Checklist de Deploy - Netlify

Use este checklist para garantir que tudo está configurado corretamente antes e depois do deploy.

---

## 🔧 Pré-Deploy

### Desenvolvimento Local

- [ ] Aplicação funciona localmente (`npm run dev`)
- [ ] PostgreSQL local funcionando (`docker compose ps`)
- [ ] Database inicializado (`npm run db:init`)
- [ ] Todas as funcionalidades testadas:
  - [ ] Upload de documentos (PDF, DOCX, TXT)
  - [ ] Geração de flashcards
  - [ ] Geração de quiz
  - [ ] Salvar sessões
  - [ ] Carregar sessões
  - [ ] Deletar sessões
  - [ ] Nova sessão
  - [ ] Chat com IA

### Build Local

- [ ] Build funciona sem erros: `npm run build`
- [ ] Preview do build funciona: `npm start`

### Código

- [ ] Código commitado no GitHub
- [ ] Branch `main` atualizada
- [ ] Sem arquivos sensíveis no repositório (`.env.local` no `.gitignore`)

---

## 🗄️ Banco de Dados PostgreSQL

### Escolher Provedor

- [ ] **Neon** (recomendado - serverless, free tier)
- [ ] **Supabase** (alternativa - free tier com UI)
- [ ] **Railway** (alternativa - $5 crédito)

### Configurar Banco

- [ ] Conta criada no provedor escolhido
- [ ] Projeto/database criado
- [ ] Connection string copiada
- [ ] Schema inicializado: `DATABASE_URL="..." npm run db:init`
- [ ] Verificar tabelas criadas:
  ```bash
  # Via psql ou interface web do provedor
  # Deve ter tabela "sessions" com colunas:
  # id, file_name, file_type, extracted_text, flashcards, quiz, created_at, updated_at
  ```

---

## 🌐 Netlify Setup

### Conta e Site

- [ ] Conta Netlify criada
- [ ] Conectada com GitHub
- [ ] Site criado (linked ao repositório)
- [ ] Nome do site definido (ex: `insightly-app`)

### Build Settings

```
Build command: npm run build
Publish directory: .next
Node version: 20.x (automático)
```

- [ ] Build command configurado
- [ ] Publish directory configurado

### Environment Variables

No Netlify: **Site settings → Environment variables**

- [ ] `OPENAI_API_KEY` = `sk-proj-...`
- [ ] `OPENAI_MODEL` = `gpt-4o`
- [ ] `DATABASE_URL` = `postgresql://user:pass@host/database`

**⚠️ Importante:** Certifique-se de que não há espaços extras nas variáveis!

---

## 🚀 Deploy

### Primeiro Deploy

- [ ] **Deploy site** clicado
- [ ] Build iniciado
- [ ] Build concluído sem erros (verifique os logs)
- [ ] Site publicado

### Deploy Automático (CI/CD)

- [ ] Deploy automático configurado (branch `main`)
- [ ] Teste: fazer push para `main` → deploy automático

---

## ✅ Pós-Deploy - Testes

### Acesso e Funcionalidade Básica

- [ ] Site carrega: `https://seu-site.netlify.app`
- [ ] Interface renderiza corretamente
- [ ] Sem erros no console do navegador (F12)

### Teste Completo de Funcionalidades

1. **Upload de Documento**
   - [ ] PDF funciona
   - [ ] DOCX funciona
   - [ ] TXT funciona
   - [ ] Preview do texto extraído aparece

2. **Geração de Flashcards**
   - [ ] Botão "Gerar Flashcards" funciona
   - [ ] IA gera flashcards
   - [ ] Cards podem ser navegados (anterior/próximo)
   - [ ] Cards podem ser virados (frente/verso)

3. **Geração de Quiz**
   - [ ] Botão "Gerar Quiz" funciona
   - [ ] IA gera questões
   - [ ] Questões aparecem com 4 opções
   - [ ] Respostas podem ser selecionadas
   - [ ] Resultado é calculado corretamente

4. **Persistência (PostgreSQL)**
   - [ ] Sessão é salva automaticamente
   - [ ] Aparece na sidebar com nome do arquivo
   - [ ] Recarregar página: sessões continuam na sidebar
   - [ ] Clicar na sessão: carrega flashcards e quiz
   - [ ] Deletar sessão funciona
   - [ ] Botão "Nova Sessão" limpa e recomeça

5. **Chat IA (CopilotKit)**
   - [ ] Chat abre/fecha
   - [ ] Consegue enviar mensagens
   - [ ] IA responde com contexto do documento
   - [ ] Pode pedir para gerar mais flashcards/quiz

---

## 📊 Monitoramento

### Logs

- [ ] Verificar logs de deploy: **Netlify Dashboard → Deploys → [latest] → Deploy log**
- [ ] Verificar logs de runtime: `netlify logs` (via CLI)

### Banco de Dados

- [ ] Acessar interface web do banco (Neon/Supabase)
- [ ] Verificar se tabela `sessions` tem dados
- [ ] Verificar se timestamps estão corretos

### OpenAI API

- [ ] Acessar: https://platform.openai.com/usage
- [ ] Verificar requests e custos
- [ ] Configurar limites (opcional)

---

## 🐛 Troubleshooting

### Build Falhou

- [ ] Ler logs de build no Netlify
- [ ] Testar `npm run build` localmente
- [ ] Verificar versões do Node.js
- [ ] Verificar dependências instaladas

### Site Carrega mas Funcionalidades Falham

- [ ] Abrir console do navegador (F12)
- [ ] Verificar erros de JavaScript
- [ ] Verificar chamadas de API (Network tab)
- [ ] Verificar variáveis de ambiente no Netlify

### "Failed to connect to database"

- [ ] `DATABASE_URL` está configurada no Netlify?
- [ ] Connection string está correta?
- [ ] Banco PostgreSQL está acessível publicamente?
- [ ] Testar conexão localmente: `DATABASE_URL="..." npm run db:init`

### "OPENAI_API_KEY is not set"

- [ ] Variável está no Netlify?
- [ ] Nome está correto (sem espaços)?
- [ ] Redeploy depois de adicionar: **Trigger deploy → Clear cache and deploy**

### Sessões não Salvam

- [ ] Verificar logs no Netlify: `netlify logs`
- [ ] Verificar console do navegador (F12)
- [ ] Testar API diretamente: `https://seu-site.netlify.app/api/sessions`
- [ ] Verificar se `DATABASE_URL` está correta

---

## 🎉 Deploy Concluído com Sucesso!

Quando todos os itens estiverem marcados:

✅ **Aplicação está no ar e funcional**
✅ **Banco de dados conectado e salvando dados**
✅ **OpenAI API funcionando**
✅ **Todas as funcionalidades testadas**

### Compartilhe!

🔗 URL da aplicação: `https://seu-site.netlify.app`

---

## 📝 Manutenção Contínua

### Mensal

- [ ] Verificar custos da OpenAI API
- [ ] Verificar uso do banco de dados
- [ ] Verificar largura de banda da Netlify

### Updates

- [ ] Dependências: `npm outdated` e `npm update`
- [ ] Testar localmente antes de fazer deploy
- [ ] Push para `main` → deploy automático

### Backups

- [ ] Neon/Supabase fazem backup automático
- [ ] Para backup manual: export da tabela `sessions`

---

**Data da última verificação:** _______________
**Responsável:** _______________
**Status:** ⭕ Pendente | 🟡 Em progresso | ✅ Concluído

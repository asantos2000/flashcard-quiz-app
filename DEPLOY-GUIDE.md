# 🚀 Guia Completo de Deploy - Flashcard Quiz App

## 📋 Índice
- [Preparação](#preparação)
- [Deploy na Vercel (Recomendado)](#deploy-na-vercel-recomendado)
- [Deploy na Netlify](#deploy-na-netlify)
- [Deploy no Railway](#deploy-no-railway)
- [Deploy no Render](#deploy-no-render)
- [Troubleshooting](#troubleshooting)

---

## ✅ Preparação

Antes de fazer deploy, certifique-se de que você tem:

- [ ] Código funcionando localmente (`npm run dev`)
- [ ] Conta no GitHub (gratuita)
- [ ] Chave da API OpenAI ([obter aqui](https://platform.openai.com/api-keys))
- [ ] Repositório Git criado

### 📝 Criar Repositório no GitHub

Se ainda não tem um repositório:

```bash
# 1. No seu projeto local, inicialize o git
git init
git add .
git commit -m "Initial commit - Flashcard Quiz App"

# 2. Crie um repositório no GitHub
# Acesse: https://github.com/new
# Nome: flashcard-quiz-app
# Visibilidade: Público ou Privado (ambos funcionam)

# 3. Conecte e faça push
git remote add origin https://github.com/SEU-USUARIO/flashcard-quiz-app.git
git branch -M main
git push -u origin main
```

✅ Pronto! Agora você pode fazer deploy.

---

## 🌟 Deploy na Vercel (Recomendado)

**Tempo estimado: 5 minutos**

### Por que Vercel?
- ✅ Criada especificamente para Next.js
- ✅ Deploy mais rápido e confiável
- ✅ 100% gratuito para hobby projects
- ✅ SSL automático
- ✅ Deploy automático a cada push

### Método 1: Via Interface Web (Mais Fácil)

#### Passo 1: Criar Conta na Vercel
1. Acesse [vercel.com](https://vercel.com/)
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize a Vercel a acessar seus repositórios

#### Passo 2: Importar Projeto
1. No dashboard, clique em **"Add New..."** → **"Project"**
2. Você verá uma lista dos seus repositórios do GitHub
3. Encontre `flashcard-quiz-app` e clique em **"Import"**

#### Passo 3: Configurar Projeto
Na tela de configuração:

```
Project Name: flashcard-quiz-app
Framework Preset: Next.js (detectado automaticamente)
Root Directory: ./
Build Command: npm run build (já configurado)
Output Directory: .next (já configurado)
Install Command: npm install (já configurado)
```

#### Passo 4: Adicionar Variáveis de Ambiente
1. Role até a seção **"Environment Variables"**
2. Adicione:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `sk-proj-...` (sua chave da OpenAI)
   - Selecione: **Production**, **Preview**, **Development**
3. Clique em **"Add"**
4. Opcionalmente, adicione:
   - **Key**: `OPENAI_MODEL`
   - **Value**: `gpt-4o`

#### Passo 5: Deploy!
1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos enquanto a Vercel:
   - Instala as dependências
   - Faz o build do projeto
   - Otimiza os assets
   - Publica na CDN global

#### Passo 6: Testar
1. Quando terminar, você verá 🎉 **"Congratulations!"**
2. Clique em **"Visit"** ou no link que aparece
3. Sua aplicação estará em: `https://flashcard-quiz-app-xxxx.vercel.app`

#### Passo 7: Testar Funcionalidades
- [ ] Upload de PDF funciona?
- [ ] Geração de flashcards funciona?
- [ ] Geração de quiz funciona?
- [ ] Chat CopilotKit funciona?
- [ ] Salvar sessão funciona?

✅ **Se tudo funcionar, parabéns! Sua aplicação está no ar!** 🎉

---

### Método 2: Via CLI (Mais Rápido)

Para desenvolvedores que preferem terminal:

```bash
# 1. Instale a Vercel CLI
npm install -g vercel

# 2. Login
vercel login
# Abre o navegador para autenticação

# 3. Deploy para produção
vercel --prod

# Responda as perguntas:
# ? Set up and deploy? Yes
# ? Which scope? [Sua conta]
# ? Link to existing project? No
# ? What's your project's name? flashcard-quiz-app
# ? In which directory is your code located? ./
```

Durante o processo, a CLI vai perguntar sobre variáveis de ambiente:

```bash
? Add environment variables? Yes
? What's the name of the variable? OPENAI_API_KEY
? What's the value? sk-proj-...
? Add more? No
```

✅ Deploy completo! URL será exibida no terminal.

---

### 🔄 Configurar Deploy Automático

Após o primeiro deploy, **todo push no branch `main` fará deploy automático**!

```bash
# Faça uma mudança qualquer
echo "# Update" >> README.md
git add .
git commit -m "Update README"
git push

# Vercel detecta automaticamente e faz novo deploy!
# Acompanhe em: https://vercel.com/dashboard
```

---

## 🎯 Deploy na Netlify

**Tempo estimado: 7 minutos**

### Método 1: Via Interface Web

#### Passo 1: Criar Conta
1. Acesse [netlify.com](https://www.netlify.com/)
2. Clique em **"Sign up"**
3. Escolha **"GitHub"**

#### Passo 2: Novo Site
1. Clique em **"Add new site"** → **"Import an existing project"**
2. Escolha **"Deploy with GitHub"**
3. Autorize a Netlify
4. Selecione o repositório `flashcard-quiz-app`

#### Passo 3: Configurações de Build
```
Build command: npm run build
Publish directory: .next
```

#### Passo 4: Variáveis de Ambiente
1. Clique em **"Show advanced"**
2. Clique em **"New variable"**
3. Adicione:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-proj-...`

#### Passo 5: Deploy
1. Clique em **"Deploy site"**
2. Aguarde 3-5 minutos
3. Site estará em: `https://nome-aleatorio.netlify.app`

#### Passo 6: Renomear Site (Opcional)
1. Vá em **Site settings** → **Site details**
2. Clique em **"Change site name"**
3. Digite: `flashcard-quiz-app`
4. Salve → agora é `https://flashcard-quiz-app.netlify.app`

---

### Método 2: Via CLI

```bash
# 1. Instalar CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Inicializar
netlify init

# Escolha: "Create & configure a new site"
# Team: [Sua conta]
# Site name: flashcard-quiz-app

# 4. Configurar build
# Build command: npm run build
# Directory to deploy: .next

# 5. Deploy
netlify deploy --prod
```

---

## 🚂 Deploy no Railway

**Tempo estimado: 5 minutos**

Railway oferece $5 de crédito gratuito por mês (renova automaticamente).

#### Passo 1: Criar Conta
1. Acesse [railway.app](https://railway.app/)
2. Clique em **"Login with GitHub"**
3. Autorize o Railway

#### Passo 2: Novo Projeto
1. Clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Selecione `flashcard-quiz-app`
4. Railway detecta Next.js automaticamente ✨

#### Passo 3: Adicionar Variável de Ambiente
1. Na página do projeto, clique na aba **"Variables"**
2. Clique em **"+ New Variable"**
3. Adicione:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-proj-...`
4. Pressione Enter para salvar

#### Passo 4: Aguardar Deploy
1. Railway faz build automaticamente
2. Aguarde 3-4 minutos
3. Clique em **"View Logs"** para acompanhar

#### Passo 5: Obter URL
1. Na aba **"Settings"**
2. Seção **"Domains"**
3. Clique em **"Generate Domain"**
4. URL será: `https://flashcard-quiz-app-production.up.railway.app`

---

## 🎨 Deploy no Render

**Tempo estimado: 8 minutos**

⚠️ **Atenção**: No plano gratuito, aplicação "hiberna" após 15 min de inatividade.

#### Passo 1: Criar Conta
1. Acesse [render.com](https://render.com/)
2. Clique em **"Get Started for Free"**
3. Escolha **"GitHub"**

#### Passo 2: Novo Web Service
1. No dashboard, clique em **"New +"**
2. Escolha **"Web Service"**
3. Conecte sua conta GitHub (se ainda não conectou)
4. Selecione `flashcard-quiz-app`

#### Passo 3: Configurar Serviço
```
Name: flashcard-quiz-app
Region: Oregon (US West) ou escolha mais próximo
Branch: main
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

#### Passo 4: Plano Gratuito
1. Role até **"Instance Type"**
2. Selecione **"Free"**
3. ⚠️ Leia o aviso sobre hibernação

#### Passo 5: Variáveis de Ambiente
1. Clique em **"Advanced"**
2. Adicione:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-proj-...`

#### Passo 6: Deploy
1. Clique em **"Create Web Service"**
2. Aguarde 5-10 minutos (primeira build é mais lenta)
3. URL será: `https://flashcard-quiz-app.onrender.com`

---

## 🔧 Troubleshooting

### ❌ Erro: "Module not found"

**Causa**: Dependências não foram instaladas corretamente.

**Solução**:
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build

# Se funcionar localmente, faça commit e push
git add .
git commit -m "Fix dependencies"
git push
```

---

### ❌ Erro: "OPENAI_API_KEY is not defined"

**Causa**: Variável de ambiente não configurada.

**Solução**:
1. Vá no dashboard da plataforma
2. Settings → Environment Variables
3. Adicione `OPENAI_API_KEY`
4. **Importante**: Selecione todos os ambientes (Production, Preview, Development)
5. Salve e faça redeploy

---

### ❌ Erro 500 ao gerar flashcards

**Causa**: API OpenAI com problemas ou chave inválida.

**Solução**:
1. Verifique sua chave em [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Confirme que tem créditos disponíveis
3. Teste a chave localmente primeiro
4. Reconfigure a variável de ambiente no deploy

---

### ❌ Build demora muito

**Causa**: Build de Next.js pode demorar em planos gratuitos.

**Solução**:
- Vercel/Netlify: 2-3 minutos (normal)
- Railway: 3-5 minutos (normal)
- Render: 5-10 minutos (normal no plano free)
- Se demorar mais de 15 min, cancele e tente novamente

---

### ❌ Site lento ou não carrega

**Render (Plano Free)**:
- Aplicação hiberna após 15 min
- Primeira requisição demora ~30 segundos
- **Solução**: Upgrade para plano pago ($7/mês) ou use Vercel

**Outras Plataformas**:
- Verifique os logs da aplicação
- Confirme que não há erros de build
- Teste a URL em navegador anônimo

---

### ❌ SSL/HTTPS não funciona

**Causa**: Propagação de DNS ou configuração.

**Solução**:
- Aguarde até 48h para propagação completa
- Todas as plataformas mencionadas oferecem SSL automático
- Se usar domínio customizado, configure CNAME/A records corretamente

---

## 📊 Monitoramento Pós-Deploy

### OpenAI Usage

Monitore seu uso da API OpenAI:
1. Acesse [platform.openai.com/usage](https://platform.openai.com/usage)
2. Configure alertas de gastos
3. Para POC, recomendo limite de $10-20/mês

### Logs da Aplicação

**Vercel**: Dashboard → Projeto → Functions → Ver logs
**Netlify**: Dashboard → Projeto → Functions → Logs
**Railway**: Dashboard → Projeto → View Logs
**Render**: Dashboard → Projeto → Logs (aba superior)

---

## 🎉 Checklist Final

Após fazer deploy, verifique:

- [ ] ✅ Aplicação carrega sem erros
- [ ] ✅ Upload de PDF funciona
- [ ] ✅ Geração de flashcards funciona
- [ ] ✅ Geração de quiz funciona
- [ ] ✅ Chat CopilotKit responde
- [ ] ✅ Sessões são salvas no localStorage
- [ ] ✅ HTTPS/SSL ativo (cadeado verde no navegador)
- [ ] ✅ Responsivo (testa no celular)
- [ ] ✅ Compartilhe o link! 🚀

---

## 🌐 Domínio Customizado (Opcional)

Se quiser `meuapp.com` em vez de `meuapp.vercel.app`:

### Vercel
1. Compre um domínio (Namecheap, Google Domains, Registro.br)
2. Vercel Dashboard → Settings → Domains → Add
3. Digite seu domínio
4. Configure DNS conforme instruções da Vercel
5. Aguarde propagação (até 48h)

**Custo**:
- Domínio: ~R$ 40-60/ano
- Hospedagem: R$ 0 (grátis!)

---

## 💡 Dicas Extras

### 1. Preview Deploys (Vercel/Netlify)
Ao fazer push em branches diferentes de `main`, um preview deploy é criado automaticamente!

```bash
git checkout -b feature/nova-funcionalidade
# faça suas mudanças
git push origin feature/nova-funcionalidade
# Vercel cria preview automaticamente!
```

### 2. Reverter Deploy
Se algo der errado:

**Vercel**: Dashboard → Deployments → Clique no deploy anterior → Promote to Production
**Netlify**: Site → Deploys → Clique no deploy anterior → Publish deploy

### 3. CI/CD Avançado
Adicione testes antes do deploy criando `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
```

---

## 🆘 Precisa de Ajuda?

- 📧 Issues no GitHub: [github.com/seu-usuario/flashcard-quiz-app/issues](https://github.com/seu-usuario/flashcard-quiz-app/issues)
- 📖 Documentação Vercel: [vercel.com/docs](https://vercel.com/docs)
- 📖 Documentação Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- 💬 Discord Vercel: [vercel.com/discord](https://vercel.com/discord)

---

**Feito com ❤️ usando Next.js, CopilotKit e OpenAI**

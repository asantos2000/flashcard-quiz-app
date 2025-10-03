# ⚡ Deploy Rápido - 5 Minutos

**Quer sua aplicação online AGORA?** Siga este guia ultra-rápido.

---

## 🎯 Pré-requisito Único

- [ ] Código no GitHub (se não tiver, veja [abaixo](#não-tenho-github))

---

## 🚀 3 Passos para Deploy (Vercel)

### 1️⃣ Instale a CLI
```bash
npm i -g vercel
```

### 2️⃣ Faça Login
```bash
vercel login
```
(Abre o navegador, clique em "Confirm")

### 3️⃣ Deploy!
```bash
vercel --prod
```

**Responda as perguntas:**
```
? Set up and deploy? Y
? Which scope? [Escolha sua conta]
? Link to existing project? N
? What's your project's name? flashcard-quiz-app
? In which directory is your code located? ./
```

**Configure a chave OpenAI:**
```
? Add environment variables? Y
? What's the name? OPENAI_API_KEY
? What's the value? sk-proj-[SUA-CHAVE]
? Add another? N
```

---

## ✅ Pronto!

Sua aplicação estará em:
```
https://flashcard-quiz-app-[random].vercel.app
```

**Tempo total:** ~3-5 minutos ⏱️

---

## 🌐 Alternativa: Deploy via Web (SEM CLI)

Se não quer instalar CLI:

### 1️⃣ Acesse Vercel
[https://vercel.com/new](https://vercel.com/new)

### 2️⃣ Login com GitHub
Clique em "Continue with GitHub"

### 3️⃣ Importe Repositório
- Encontre `flashcard-quiz-app`
- Clique em "Import"

### 4️⃣ Configure Variável
Na seção "Environment Variables":
- **Key**: `OPENAI_API_KEY`
- **Value**: `sk-proj-[SUA-CHAVE]`
- Selecione todos os ambientes

### 5️⃣ Deploy
Clique em "Deploy"

**Tempo total:** ~5 minutos ⏱️

---

## ❓ FAQ Rápido

### Não tenho GitHub?

```bash
# 1. Crie conta: https://github.com/signup

# 2. No seu projeto:
git init
git add .
git commit -m "Initial commit"

# 3. Crie repositório no GitHub (interface web)
# Nome: flashcard-quiz-app

# 4. Conecte e faça push:
git remote add origin https://github.com/SEU-USUARIO/flashcard-quiz-app.git
git branch -M main
git push -u origin main
```

Agora volte ao [passo 1](#-3-passos-para-deploy-vercel).

---

### Onde pego a chave OpenAI?

1. Acesse: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Clique em "Create new secret key"
3. Copie a chave (começa com `sk-proj-...`)
4. ⚠️ **IMPORTANTE**: Guarde em local seguro (só aparece uma vez!)

---

### Deu erro no deploy

**Erro mais comum**: `OPENAI_API_KEY is not defined`

**Solução**:
1. Vá em [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no seu projeto
3. Settings → Environment Variables
4. Adicione `OPENAI_API_KEY`
5. Clique nos 3 pontinhos → Redeploy

---

### Como atualizar depois?

**Opção 1: Automático**
```bash
git add .
git commit -m "Update"
git push
# Vercel faz deploy automático! ✨
```

**Opção 2: Manual**
```bash
vercel --prod
```

---

### Quanto custa?

| Item | Custo |
|------|-------|
| Vercel (hospedagem) | R$ 0 |
| SSL/HTTPS | R$ 0 |
| Domínio .vercel.app | R$ 0 |
| OpenAI API | ~R$ 5-10/mês* |
| **TOTAL** | **~R$ 5-10/mês** |

\* Depende do uso. Para POC com poucos usuários, pode ser menos.

---

### Posso usar domínio próprio?

**Sim!** Mas não é necessário para POC.

Se quiser:
1. Compre domínio (Registro.br, Namecheap, etc)
2. Vercel → Settings → Domains → Add
3. Configure DNS
4. Aguarde 24-48h

**Custo**: ~R$ 40-60/ano

---

## 🎯 Próximos Passos

Depois do deploy:

1. **Teste tudo**
   - [ ] Upload de PDF
   - [ ] Gerar flashcards
   - [ ] Gerar quiz
   - [ ] Salvar sessão

2. **Configure alertas OpenAI**
   - Acesse: [platform.openai.com/account/limits](https://platform.openai.com/account/limits)
   - Configure limite de gastos ($10-20/mês)

3. **Compartilhe!**
   - 📱 Teste no celular
   - 🔗 Compartilhe o link
   - 💬 Peça feedback

---

## 📚 Quer Mais Detalhes?

- 📖 [Guia Completo de Deploy](./DEPLOY-GUIDE.md)
- ⚖️ [Comparação de Plataformas](./PLATFORM-COMPARISON.md)
- 📘 [README Principal](./README.md)

---

## 🆘 Precisa de Ajuda?

Algo deu errado?

1. Verifique a [seção de troubleshooting](./DEPLOY-GUIDE.md#troubleshooting) no guia completo
2. Confira os logs no dashboard da Vercel
3. Abra uma issue no GitHub

---

## 🎉 Sucesso!

Se chegou até aqui, sua aplicação está online! 🚀

**URL**: `https://flashcard-quiz-app.vercel.app`

Agora você pode:
- ✅ Compartilhar com amigos
- ✅ Usar no celular
- ✅ Incluir no portfólio
- ✅ Demonstrar em entrevistas

**Parabéns!** 🎊

---

**Tempo total de deploy**: 3-5 minutos ⏱️  
**Custo**: R$ 0 (Vercel) + uso da OpenAI  
**Dificuldade**: ⭐ Muito Fácil

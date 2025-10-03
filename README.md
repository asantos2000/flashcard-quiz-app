# 🎓 Gerador de Flashcards e Quiz com IA

Uma aplicação web moderna que utiliza Inteligência Artificial para transformar documentos em material de estudo interativo, in# 4. Inicie o servidor
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) e comece a usar! 🚀

---

## 🌐 Deploy Rápido (5 minutos)

Quer colocar sua aplicação **online agora**? Siga este guia super rápido:

### 🚀 Deploy em 3 Comandos (Vercel)

```bash
# 1. Instale a CLI da Vercel
npm i -g vercel

# 2. Faça login (abre o navegador)
vercel login

# 3. Deploy!
vercel --prod
```

Durante o deploy, quando perguntado:
- ❓ **"Set up and deploy?"** → `Y`
- ❓ **"Which scope?"** → Escolha sua conta
- ❓ **"Link to existing project?"** → `N`
- ❓ **"What's your project's name?"** → `flashcard-quiz-app`
- ❓ **"In which directory is your code located?"** → `./`

Depois configure a chave OpenAI no dashboar## 🛠️ Desenvolvido Com

Esta aplicação foi desenvolvida utilizando as seguintes ferramentas e assistentes de IA:

- **[Visual Studio Code](https://code.visualstudio.com/)** - Editor de código
- **[GitHub Copilot](https://github.com/features/copilot)** - Assistente de código com IA
- **[Claude Sonnet 4.5 (Preview)](https://www.anthropic.com/claude/sonnet)** - Assistente de IA da Anthropic

> 💡 **Nota**: O rodapé da aplicação exibe as tecnologias de IA utilizadas (CopilotKit + GPT-4o) e as ferramentas de desenvolvimento para reconhecer tudo que tornou o desenvolvimento mais eficiente.

## 📝 Licençacom/dashboard](https://vercel.com/dashboard)

✅ **Pronto!** Sua aplicação estará em `https://flashcard-quiz-app.vercel.app`

> 📘 **Precisa de mais detalhes?** Veja:
> - [Seção completa de Deploy](#-deploy) abaixo
> - [Guia visual passo a passo](./DEPLOY-GUIDE.md) com screenshots e troubleshooting

---

## 📦 Instalação e Configuração

### Passo 1: Clonar o Repositóriolashcards e quizzes de múltipla escolha.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)
![CopilotKit](https://img.shields.io/badge/CopilotKit-Self--Hosted-purple?style=flat-square)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat-square&logo=openai)

## 🌟 Destaques

- ✅ **100% Self-Hosted** - Sem necessidade de licença CopilotKit
- 🤖 **IA Poderosa** - Integração com GPT-4o, GPT-4 e GPT-3.5
- 📄 **Múltiplos Formatos** - Suporte para PDF, DOCX e TXT
- 💾 **Auto-Save** - Salva automaticamente todas as sessões no navegador
- 📂 **Gerenciamento de Sessões** - Acesse e gerencie seus estudos anteriores
- 🎨 **Interface Moderna** - Design responsivo com Tailwind CSS v4
- 💬 **Chat Inteligente** - Assistente IA em português
- 💰 **Custo Controlável** - Você paga apenas pelo uso da OpenAI API

## 📋 Índice

- [Destaques](#destaques)
- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Início Rápido](#início-rápido)
- [Deploy Rápido (5 minutos)](#-deploy-rápido-5-minutos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Usar](#como-usar)
- [Perguntas Frequentes (FAQ)](#perguntas-frequentes-faq)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Deploy (Guia Completo)](#-deploy)
  - [📘 Guia Visual Passo a Passo](./DEPLOY-GUIDE.md)
- [Segurança](#segurança)
- [Solução de Problemas](#solução-de-problemas)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🚀 Sobre o Projeto

Esta aplicação permite que estudantes e profissionais transformem seus documentos de estudo (PDF, DOCX, TXT) em conteúdo educativo interativo usando o poder da Inteligência Artificial. Com integração do **CopilotKit (self-hosted)** e **OpenAI**, a aplicação gera automaticamente:

- **Flashcards** - Perguntas e respostas baseadas no conteúdo do documento
- **Quizzes** - Questões de múltipla escolha para testar conhecimento

### 🏗️ Arquitetura

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Browser   │────────▶│   Next.js App    │────────▶│  OpenAI API │
│  (Frontend) │         │  (Self-Hosted)   │         │  (GPT-4o)   │
└─────────────┘         └──────────────────┘         └─────────────┘
                                │
                                ├─ CopilotKit Runtime
                                ├─ API Routes (/api/copilotkit)
                                └─ React Components
```

**Sem servidores externos**: Tudo roda na sua máquina ou servidor, usando apenas a API OpenAI para processamento de IA.

## ✨ Funcionalidades

### 📤 Upload de Documentos
- Suporte para múltiplos formatos: `.pdf`, `.docx`, `.txt`
- Tamanho máximo: 10MB
- Extração automática de texto de PDFs com `pdf-parse`
- Preview do conteúdo extraído

### 🃏 Geração de Flashcards
- Criação automática de flashcards usando IA
- Interface interativa com frente e verso
- Navegação entre cards
- Sistema de revisão
- **Auto-save**: Flashcards são salvos automaticamente

### 🧠 Geração de Quizzes
- Questões de múltipla escolha geradas por IA
- 4 opções de resposta por questão
- Sistema de pontuação
- Feedback imediato
- **Auto-save**: Quizzes são salvos automaticamente

### 💾 Sessões Salvas
- **Salvamento automático** de todos os flashcards e quizzes gerados
- **Persistência com DuckDB** - Banco de dados embutido, rápido e eficiente
- **Sidebar com histórico** mostrando todas as sessões salvas
- **Carregamento rápido** de sessões anteriores com um clique
- **Gestão de sessões**: Visualize e delete sessões antigas
- **Sem limite de tamanho** - Diferente do localStorage (5-10MB)
- Informações exibidas:
  - Nome do arquivo original
  - Número de flashcards e quizzes
  - Data de criação e última atualização
  - Ordenação por data mais recente

### 🤖 Assistente IA Integrado
- Chat interativo com CopilotKit (self-hosted)
- Compreensão do contexto do documento
- Comandos em linguagem natural
- Interface amigável em português
- **Sem necessidade de licença CopilotKit** - 100% self-hosted

### ❓ Sistema de Ajuda Integrado
- **Botão de ajuda** com ícone de interrogação no cabeçalho
- **Modal explicativo** com instruções detalhadas
- Guia passo a passo de todas as funcionalidades
- Dicas úteis para melhor aproveitamento da aplicação
- Interface intuitiva com ícones e exemplos visuais
- **Fechar com ESC** - Pressione a tecla ESC para fechar o modal rapidamente
- **Fechar clicando fora** - Clique no overlay (fundo escuro) para fechar
- Previne scroll da página quando o modal está aberto

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[Next.js 15.5.4](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para UI
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Mammoth.js](https://github.com/mwilliamson/mammoth.js)** - Extração de texto de arquivos .docx
- **[pdf-parse](https://www.npmjs.com/package/pdf-parse)** - Extração de texto de arquivos PDF

### IA e Backend
- **[CopilotKit](https://www.copilotkit.ai/)** - Framework para integração de IA (self-hosted)
  - `@copilotkit/react-core` - Core do CopilotKit
  - `@copilotkit/react-ui` - Componentes de UI
  - `@copilotkit/runtime` - Runtime para API
- **[OpenAI API](https://openai.com/)** - Modelos de linguagem (GPT-4o, GPT-4, GPT-3.5)
- **[DuckDB](https://duckdb.org/)** - Banco de dados analítico embutido para persistência

> 💡 **Nota**: Esta aplicação usa CopilotKit em modo **self-hosted**, o que significa que você não precisa de uma licença ou conta CopilotKit. Apenas sua chave de API OpenAI é necessária!

### Persistência e Armazenamento
- **DuckDB** - Banco de dados embutido, rápido e eficiente
- **API Routes** - Endpoints REST para gerenciar sessões (`/api/sessions`)
- **Auto-save** - Sistema automático de salvamento de flashcards e quizzes
- **Backup simples** - Arquivo único `study-sessions.db`

> 📘 **Migração do localStorage**: Se você estava usando a versão anterior, veja [DUCKDB-MIGRATION.md](./DUCKDB-MIGRATION.md) para detalhes sobre a mudança.

### Ferramentas de Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linter para JavaScript
- **[PostCSS](https://postcss.org/)** - Processador CSS
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - Prefixos CSS automáticos

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- **Node.js** (versão 18.x ou superior)
- **npm** (versão 9.x ou superior) ou **yarn**
- **Conta OpenAI** com acesso à API
- **Chave de API OpenAI** ([obtenha aqui](https://platform.openai.com/api-keys))

> ℹ️ **Você NÃO precisa de**:
> - Licença CopilotKit Cloud
> - Conta CopilotKit
> - Qualquer outra chave de API além da OpenAI

## ⚡ Início Rápido

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/flashcard-quiz-app.git
cd flashcard-quiz-app

# 2. Instale as dependências
npm install

# 3. Configure a chave OpenAI
echo "OPENAI_API_KEY=sk-sua-chave-aqui" > .env.local
echo "OPENAI_MODEL=gpt-4o" >> .env.local

# 4. Inicie o servidor
npm run dev
```

🎉 Acesse [http://localhost:3000](http://localhost:3000) e comece a usar!

## 🔧 Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/flashcard-quiz-app.git
cd flashcard-quiz-app
```

### 2. Instale as Dependências

```bash
npm install
```

Ou se estiver usando yarn:

```bash
yarn install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
touch .env.local
```

Adicione sua chave de API da OpenAI:

```env
# OpenAI API Key (obrigatório)
OPENAI_API_KEY=sk-seu-token-openai-aqui

# Modelo a ser usado (opcional, padrão: gpt-4o)
# Opções: gpt-4o, gpt-4, gpt-3.5-turbo
OPENAI_MODEL=gpt-4o
```

> ⚠️ **Importante**: 
> - Nunca compartilhe ou faça commit do arquivo `.env.local` em repositórios públicos!
> - Obtenha sua chave de API em: https://platform.openai.com/api-keys
> - Esta aplicação usa **self-hosted CopilotKit**, você só precisa da chave OpenAI (sem necessidade de licença CopilotKit)

#### 💰 Modelos e Custos OpenAI

| Modelo | Entrada (1M tokens) | Saída (1M tokens) | Recomendação |
|--------|---------------------|-------------------|--------------|
| `gpt-4o` | $2.50 | $10.00 | ⭐ **Recomendado** - Rápido e eficiente |
| `gpt-4` | $30.00 | $60.00 | Mais poderoso, mais caro |
| `gpt-3.5-turbo` | $0.50 | $1.50 | Econômico, menos preciso |

Para desenvolvimento/testes, use `gpt-3.5-turbo`. Para produção, use `gpt-4o`.

### 4. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

## 💡 Como Usar

### Passo 1: Carregar Documento

1. Na página inicial, clique em **"Selecionar Arquivo"**
2. Escolha um documento (.pdf, .docx ou .txt) com até 10MB
3. Aguarde o processamento do arquivo (você verá um spinner de "Processando documento...")
4. O conteúdo extraído será exibido na prévia

### Passo 2: Gerar Conteúdo com IA

Após carregar o documento, você tem três opções:

#### Opção A: Usando os Botões (Recomendado)
- Clique em **"Gerar Flashcards"** - A IA criará automaticamente 8-12 flashcards
- Clique em **"Gerar Quiz"** - A IA criará automaticamente 5-8 questões
- Os flashcards e quizzes são **salvos automaticamente** ✨

#### Opção B: Usando o Assistente IA no Chat
1. Clique no **ícone de chat** no canto inferior direito
2. Digite comandos como:
   - *"Gere 10 flashcards deste documento"*
   - *"Crie um quiz de 5 questões sobre este conteúdo"*
   - *"Analise o documento e faça flashcards dos conceitos principais"*

#### Opção C: Carregar Sessão Salva
- Na **sidebar esquerda**, veja todas as suas sessões salvas
- Clique em qualquer sessão para carregar instantaneamente os flashcards e quizzes

### Passo 3: Estudar com Flashcards

- Clique no card para ver a resposta (verso)
- Use os botões **"Anterior"** e **"Próximo"** para navegar
- Acompanhe o progresso (ex: "Card 1 de 10")
- Os flashcards ficam salvos na sidebar para acesso futuro 📂

### Passo 4: Fazer o Quiz

- Selecione uma resposta para cada questão
- Clique em **"Enviar Respostas"** ao terminar
- Veja sua pontuação e respostas corretas
- O quiz fica salvo na sidebar para refazer depois 🎯

### Passo 5: Gerenciar Sessões

#### Ver Sessões Salvas
- Todas as sessões aparecem na **sidebar esquerda**
- Cada sessão mostra:
  - Nome do arquivo original
  - Número de flashcards e quizzes
  - Data da última atualização

#### Carregar Sessão
- Clique em qualquer sessão na sidebar
- O documento, flashcards e quizzes serão carregados instantaneamente
- A sessão ativa fica destacada em roxo

#### Excluir Sessão
- Clique em **"Excluir"** abaixo de cada sessão
- Confirme a exclusão
- A sessão será removida permanentemente

### Passo 6: Obter Ajuda

- Clique no **botão de ajuda** (ícone de interrogação) no canto superior direito
- Um modal explicativo será aberto com:
  - Instruções passo a passo de como usar a aplicação
  - Explicação de cada funcionalidade (upload, geração, flashcards, quiz, sessões)
  - Dicas úteis para melhor aproveitamento
- Para fechar o modal, você pode:
  - Clicar no **X** no canto superior direito
  - Pressionar a tecla **ESC** do teclado
  - Clicar fora do modal (no fundo escuro)

### Passo 7: Recomeçar

- Clique no botão **"Recomeçar"** (ícone de lixeira) no topo
- Limpa o estado atual e permite carregar um novo documento
- As sessões salvas permanecem disponíveis na sidebar

## ❓ Perguntas Frequentes (FAQ)

### Preciso de uma licença CopilotKit?

**Não!** Este projeto usa CopilotKit em modo **self-hosted**, o que significa que toda a inteligência artificial é processada através da sua própria chave OpenAI. Você não precisa de:
- Licença CopilotKit Cloud
- Conta CopilotKit
- Qualquer pagamento adicional além do uso da API OpenAI

### Quanto custa usar esta aplicação?

Você paga apenas pelo uso da API OpenAI. Custos aproximados:

| Ação | Tokens (aprox.) | Custo (gpt-4o) | Custo (gpt-3.5-turbo) |
|------|-----------------|----------------|----------------------|
| Gerar 10 flashcards | 2,000 tokens | $0.02 | $0.001 |
| Gerar quiz de 5 questões | 1,500 tokens | $0.015 | $0.0008 |

Para testes, comece com `gpt-3.5-turbo` (muito mais barato).

### Qual modelo OpenAI devo usar?

| Uso | Modelo Recomendado | Motivo |
|-----|-------------------|---------|
| **Desenvolvimento/Testes** | `gpt-3.5-turbo` | Econômico, rápido |
| **Produção** | `gpt-4o` | Melhor qualidade, preço justo |
| **Máxima Qualidade** | `gpt-4` | Mais preciso, mais caro |

### Como posso monitorar meus custos?

1. Acesse o [Dashboard OpenAI](https://platform.openai.com/usage)
2. Configure alertas de limite de gastos
3. Defina um limite mensal para sua chave de API

### Posso usar outros modelos de IA (Claude, Gemini, etc)?

Atualmente, apenas OpenAI é suportado. Para adicionar outros provedores, você precisaria:
1. Instalar o adaptador correspondente do CopilotKit
2. Modificar `app/api/copilotkit/route.js`
3. Adicionar as credenciais no `.env.local`

### Onde meus dados são salvos?

- **localStorage do navegador**: Todas as sessões (flashcards, quizzes, texto extraído) são salvas localmente no seu navegador
- **Não há servidor**: Nenhum dado é enviado para servidores externos (exceto para a API OpenAI durante a geração)
- **Privacidade**: Seus documentos e dados permanecem no seu dispositivo
- **Persistência**: Os dados permanecem mesmo após fechar o navegador
- **Limpeza**: Limpar o cache/dados do navegador removerá as sessões salvas

### Posso acessar minhas sessões em outro dispositivo?

Não. Como os dados são salvos no localStorage do navegador, eles são específicos para:
- **Mesmo navegador** no **mesmo dispositivo**
- **Mesmo domínio** (localhost:3000 ou seu domínio de produção)

Para acesso multi-dispositivo, seria necessário implementar um backend com banco de dados.

### Quanto espaço ocupam as sessões salvas?

- Cada sessão inclui: texto do documento + flashcards + quizzes
- Tamanho típico: 50-200 KB por sessão
- localStorage tem limite de ~5-10 MB por domínio
- Recomendado: manter 20-50 sessões ativas

## 📁 Estrutura do Projeto

```
flashcard-quiz-app/
├── app/
│   ├── api/
│   │   ├── copilotkit/
│   │   │   └── route.js          # Endpoint da API CopilotKit
│   │   ├── extract-pdf/
│   │   │   └── route.js          # Extração de texto de PDFs
│   │   ├── generate-flashcards/
│   │   │   └── route.js          # Geração de flashcards com IA
│   │   └── generate-quiz/
│   │       └── route.js          # Geração de quizzes com IA
│   ├── components/
│   │   └── FlashcardApp.jsx      # Componente principal com gestão de sessões
│   ├── favicon.ico
│   ├── globals.css               # Estilos globais + Tailwind
│   ├── layout.js                 # Layout raiz do Next.js
│   └── page.jsx                  # Página inicial com CopilotKit provider
├── public/                       # Arquivos estáticos
├── .env.local                    # Variáveis de ambiente (não commitar!)
├── .gitignore
├── eslint.config.mjs             # Configuração do ESLint
├── jsconfig.json                 # Configuração do JavaScript
├── next.config.mjs               # Configuração do Next.js
├── package.json                  # Dependências e scripts
├── postcss.config.mjs            # Configuração do PostCSS
├── README.md                     # Este arquivo
└── tailwind.config.js            # Configuração do Tailwind CSS (v4)
```

### 🔑 Arquivos Principais

- **`FlashcardApp.jsx`**: Componente principal com toda a lógica de UI, salvamento automático e gestão de sessões
- **`/api/extract-pdf`**: Endpoint para extrair texto de PDFs usando `pdf-parse`
- **`/api/generate-flashcards`**: Endpoint que usa OpenAI para gerar flashcards
- **`/api/generate-quiz`**: Endpoint que usa OpenAI para gerar quizzes
- **`/api/copilotkit`**: Endpoint do runtime do CopilotKit para o chat assistente

## 📜 Scripts Disponíveis

### `npm run dev`
Inicia o servidor de desenvolvimento na porta 3000.

```bash
npm run dev
```

### `npm run build`
Cria uma versão otimizada para produção.

```bash
npm run build
```

### `npm start`
Inicia o servidor de produção (requer build anterior).

```bash
npm run build
npm start
```

### `npm run lint`
Executa o linter para verificar problemas no código.

```bash
npm run lint
```

## 🚢 Deploy

Esta seção apresenta as melhores opções **gratuitas** para fazer deploy da sua aplicação e deixá-la acessível na internet. Todas as opções abaixo oferecem planos gratuitos adequados para provas de conceito.

> 📚 **Recursos Complementares**:
> - ⚡ [Deploy Rápido (5 minutos)](./QUICKSTART-DEPLOY.md) - Guia ultra-rápido para colocar online agora
> - 📖 [Guia Visual de Deploy Passo a Passo](./DEPLOY-GUIDE.md) - Tutorial completo com troubleshooting
> - ⚖️ [Comparação Detalhada de Plataformas](./PLATFORM-COMPARISON.md) - Tabela comparativa e recomendações
> - ✅ [Checklist de Deploy](./DEPLOY-CHECKLIST.md) - Lista de verificação completa para deploy perfeito

---

### 🎯 Qual guia seguir?

| Seu Perfil | Guia Recomendado | Tempo |
|------------|------------------|-------|
| 🏃 Tenho pressa! | [Deploy Rápido](./QUICKSTART-DEPLOY.md) | 5 min |
| 🎓 Primeira vez | [Guia Visual Passo a Passo](./DEPLOY-GUIDE.md) | 10 min |
| 🤔 Qual plataforma escolher? | [Comparação de Plataformas](./PLATFORM-COMPARISON.md) | Leitura |
| ✅ Quero garantir tudo | [Checklist Completa](./DEPLOY-CHECKLIST.md) | 15-30 min |
| 💻 Já sei o que fazer | Continue abaixo ↓ | - |

---

## 🌟 Opção 1: Vercel (Recomendado - 100% Gratuito)

**⭐ Melhor escolha para aplicações Next.js!**

A [Vercel](https://vercel.com/) é a plataforma criada pelos desenvolvedores do Next.js e oferece:

### ✨ Benefícios do Plano Gratuito (Hobby)
- ✅ **Deploy ilimitado** de projetos Next.js
- ✅ **SSL/HTTPS automático** (certificado grátis)
- ✅ **Domínio gratuito**: `seu-projeto.vercel.app`
- ✅ **100GB de largura de banda/mês**
- ✅ **Deploy automático** a cada push no GitHub
- ✅ **Preview de branches** (ideal para testar antes de publicar)
- ✅ **Variáveis de ambiente** protegidas
- ✅ **Serverless Functions** incluídas (suas API routes funcionam perfeitamente)
- ✅ **Edge Network global** (CDN rápido em todo o mundo)

### 📋 Passo a Passo para Deploy na Vercel

#### 1️⃣ Prepare o Repositório
```bash
# Se ainda não fez, inicialize o git
git init
git add .
git commit -m "Initial commit"

# Crie um repositório no GitHub e faça push
git remote add origin https://github.com/seu-usuario/flashcard-quiz-app.git
git branch -M main
git push -u origin main
```

#### 2️⃣ Deploy na Vercel

**Opção A: Via Interface Web (Mais Fácil)**
1. Acesse [vercel.com](https://vercel.com/) e faça login com GitHub
2. Clique em **"Add New Project"**
3. Selecione seu repositório `flashcard-quiz-app`
4. Configure as variáveis de ambiente:
   - Clique em **"Environment Variables"**
   - Adicione `OPENAI_API_KEY` com sua chave da OpenAI
   - Opcionalmente adicione `OPENAI_MODEL` (padrão: `gpt-4o`)
5. Clique em **"Deploy"**
6. Aguarde 2-3 minutos ⏱️
7. 🎉 **Pronto!** Sua aplicação estará em `https://seu-projeto.vercel.app`

**Opção B: Via CLI (Mais Rápido)**
```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy (primeira vez)
vercel

# Siga as instruções e configure as variáveis de ambiente
# quando solicitado

# Depois que configurar, para novos deploys:
vercel --prod
```

#### 3️⃣ Configurar Variáveis de Ambiente na Vercel

No dashboard da Vercel:
1. Vá em **Settings** → **Environment Variables**
2. Adicione:
   - `OPENAI_API_KEY`: Sua chave da OpenAI
   - `OPENAI_MODEL`: `gpt-4o` (opcional, já tem padrão)
3. Selecione todos os ambientes: **Production**, **Preview**, **Development**
4. Clique em **"Save"**

#### 4️⃣ Deploy Automático
A partir de agora, cada push para o branch `main` fará deploy automático! 🚀

### 🔗 Deploy com Um Clique
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/flashcard-quiz-app)

---

## 🎯 Opção 2: Netlify (100% Gratuito)

[Netlify](https://www.netlify.com/) é outra excelente opção gratuita.

### ✨ Benefícios do Plano Gratuito
- ✅ **100GB de largura de banda/mês**
- ✅ **300 minutos de build/mês**
- ✅ **Deploy ilimitado**
- ✅ **SSL/HTTPS automático**
- ✅ **Domínio gratuito**: `seu-projeto.netlify.app`

### 📋 Passo a Passo para Deploy na Netlify

```bash
# 1. Instale a CLI da Netlify
npm install -g netlify-cli

# 2. Faça login
netlify login

# 3. Inicialize o projeto
netlify init

# 4. Configure:
# - Build command: npm run build
# - Publish directory: .next
# - Functions directory: (deixe vazio)

# 5. Deploy
netlify deploy --prod
```

**Ou via Interface Web:**
1. Acesse [app.netlify.com](https://app.netlify.com/)
2. Conecte seu repositório GitHub
3. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. Adicione variável de ambiente `OPENAI_API_KEY` em **Site settings** → **Environment variables**
5. Deploy! 🚀

---

## 🚂 Opção 3: Railway (Grátis com $5 de crédito/mês)

[Railway](https://railway.app/) oferece $5 de crédito gratuito por mês, suficiente para pequenos projetos.

### ✨ Benefícios
- ✅ **$5 de crédito/mês** (renova automaticamente)
- ✅ **Deploy direto do GitHub**
- ✅ **Suporte nativo a Next.js**
- ✅ **SSL automático**
- ✅ **Variáveis de ambiente protegidas**

### 📋 Passo a Passo

1. Acesse [railway.app](https://railway.app/)
2. Faça login com GitHub
3. Clique em **"New Project"** → **"Deploy from GitHub repo"**
4. Selecione seu repositório
5. Railway detecta automaticamente Next.js
6. Adicione variável de ambiente:
   - Vá em **Variables**
   - Adicione `OPENAI_API_KEY`
7. Deploy automático! 🎉

---

## 🎨 Opção 4: Render (Gratuito com Limitações)

[Render](https://render.com/) oferece um plano gratuito com algumas limitações.

### ✨ Benefícios do Plano Gratuito
- ✅ **Hospedagem gratuita** de aplicações web
- ✅ **SSL automático**
- ✅ **Deploy automático do GitHub**
- ⚠️ **Limitação**: Aplicação "hiberna" após 15 min de inatividade (demora ~30s para "acordar")

### 📋 Passo a Passo

1. Acesse [render.com](https://render.com/)
2. Conecte com GitHub
3. Clique em **"New +"** → **"Web Service"**
4. Selecione seu repositório
5. Configure:
   - **Name**: flashcard-quiz-app
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Adicione variável de ambiente `OPENAI_API_KEY`
7. Selecione o plano **Free**
8. Clique em **"Create Web Service"**

> ⚠️ **Nota**: No plano gratuito, a primeira requisição após período de inatividade pode demorar ~30 segundos.

---

## 📱 Opção 5: GitHub Pages (NÃO Recomendado para este projeto)

⚠️ **Não funciona bem com Next.js** porque:
- GitHub Pages é para sites estáticos
- Next.js precisa de API routes (serverless functions)
- Suas rotas `/api/*` não funcionarão

**Use apenas se**: Converter para Static Site Generation (SSG) e mover API para outro serviço.

---

## 🏆 Comparação das Plataformas Gratuitas

| Plataforma | Custo | Largura de Banda | Deploy Auto | SSL | Melhor Para |
|------------|-------|------------------|-------------|-----|-------------|
| **Vercel** ⭐ | R$ 0 | 100GB/mês | ✅ | ✅ | Next.js (Recomendado) |
| **Netlify** | R$ 0 | 100GB/mês | ✅ | ✅ | Alternativa sólida |
| **Railway** | R$ 0 ($5 crédito) | Incluso no crédito | ✅ | ✅ | Projetos pequenos |
| **Render** | R$ 0 | Sem limite* | ✅ | ✅ | OK (mas hiberna) |

\* Com limitação de hibernação após inatividade

---

## 🎯 Recomendação Final

### Para sua Prova de Conceito:

**🥇 1ª Escolha: Vercel**
- Perfeita para Next.js
- Mais rápida e confiável
- 100% gratuito sem limitações significativas
- Deploy em minutos

**🥈 2ª Escolha: Netlify**
- Ótima alternativa à Vercel
- Também 100% gratuito
- Interface amigável

**🥉 3ª Escolha: Railway**
- Boa para testes
- $5/mês gratuito é suficiente para POC
- Renovação automática do crédito

---

## 🔧 Configurações Importantes para Produção

Independente da plataforma escolhida:

### ✅ Variáveis de Ambiente Obrigatórias
```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
OPENAI_MODEL=gpt-4o  # Opcional, padrão já definido
```

### ✅ Checklist Pré-Deploy
- [ ] `.env.local` está no `.gitignore` (não suba sua chave!)
- [ ] Teste localmente com `npm run build && npm start`
- [ ] Confirme que `/api/copilotkit` funciona localmente
- [ ] Verifique se o PDF upload funciona
- [ ] Confirme que as variáveis de ambiente estão configuradas na plataforma

### ✅ Após o Deploy
1. Teste o upload de um PDF
2. Teste a geração de flashcards
3. Teste a geração de quiz
4. Verifique o chat do CopilotKit
5. Teste salvar/carregar sessões

### ⚠️ Monitoramento de Custos OpenAI

Após o deploy, monitore seu uso da API OpenAI:
1. Acesse [platform.openai.com/usage](https://platform.openai.com/usage)
2. Configure alertas de limite de gastos
3. Para POC, recomendo limite de $10-20/mês

**Estimativa de custo** (GPT-4o):
- Cada flashcard gerado: ~$0.01-0.02
- Cada quiz gerado: ~$0.01-0.02
- Para 100 gerações: ~$1-2
- Para POC com poucos usuários: **< $5/mês**

---

## 🎉 Deploy Concluído!

Depois de seguir os passos acima, sua aplicação estará disponível publicamente em:
- Vercel: `https://seu-projeto.vercel.app`
- Netlify: `https://seu-projeto.netlify.app`
- Railway: `https://seu-projeto.up.railway.app`
- Render: `https://seu-projeto.onrender.com`

Compartilhe o link e deixe as pessoas testarem sua aplicação de flashcards com IA! 🚀

---

## 🌐 Domínio Customizado (Opcional)

Se quiser usar seu próprio domínio:

### Vercel
1. Compre um domínio (sugestões: Namecheap, Google Domains, Registro.br)
2. Na Vercel: **Settings** → **Domains** → **Add**
3. Adicione seu domínio (ex: `meuapp.com`)
4. Configure os DNS records conforme instruções
5. Aguarde propagação (até 48h)

### Custo
- Domínio `.com`: ~R$ 40-60/ano
- Domínio `.com.br`: ~R$ 40/ano (Registro.br)
- **Hospedagem**: R$ 0 (grátis na Vercel/Netlify)

> 💡 **Dica**: Para POC, use o domínio gratuito fornecido pela plataforma. Só compre domínio customizado se for apresentar para clientes ou usar em produção real.

## 🔒 Segurança

- ✅ Nunca compartilhe sua `OPENAI_API_KEY`
- ✅ Use `.env.local` para desenvolvimento local
- ✅ Configure variáveis de ambiente na plataforma de deploy
- ✅ O arquivo `.env.local` está no `.gitignore`
- ✅ Implemente rate limiting em produção
- ✅ Monitore uso da API OpenAI para evitar custos inesperados

## 🐛 Solução de Problemas

### Popup "CopilotKit License Key Required"

Se você vir um popup pedindo uma licença CopilotKit:

**Solução**: Este projeto usa CopilotKit em modo self-hosted e não requer licença!

1. Verifique se o arquivo `app/page.jsx` tem `showDevConsole={false}`
2. Certifique-se de que a variável `OPENAI_API_KEY` está configurada em `.env.local`
3. Reinicie o servidor: `Ctrl+C` e depois `npm run dev`
4. Limpe o cache se necessário: `rm -rf .next && npm run dev`

> 💡 Você só precisa da chave OpenAI, não precisa de conta ou licença CopilotKit!

### Erro: "Cannot find module 'autoprefixer'"
```bash
npm install autoprefixer
```

### Erro: "OpenAI API key not found"
Verifique se o arquivo `.env.local` existe e contém a chave válida.

```bash
# Crie o arquivo se não existir
touch .env.local

# Adicione sua chave
echo "OPENAI_API_KEY=sk-sua-chave-aqui" >> .env.local
echo "OPENAI_MODEL=gpt-4o" >> .env.local
```

### Erro: Tailwind CSS não está funcionando
```bash
# Verifique se o PostCSS está configurado
npm install @tailwindcss/postcss autoprefixer
# Reinicie o servidor
npm run dev
```

### Hydration Error
Já resolvido com `suppressHydrationWarning` no layout. Se persistir, limpe o cache:
```bash
rm -rf .next
npm run dev
```

### Erro: "Model 'gpt-5' does not exist"
O modelo especificado não existe. Atualize seu `.env.local`:
```env
OPENAI_MODEL=gpt-4o
```

Modelos disponíveis: `gpt-4o`, `gpt-4`, `gpt-4-turbo`, `gpt-3.5-turbo`

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## �️ Desenvolvido Com

Esta aplicação foi desenvolvida utilizando as seguintes ferramentas e assistentes de IA:

- **[Visual Studio Code](https://code.visualstudio.com/)** - Editor de código
- **[GitHub Copilot](https://github.com/features/copilot)** - Assistente de código com IA
- **[Claude 3.5 Sonnet](https://www.anthropic.com/claude)** - Assistente de IA da Anthropic

> 💡 **Nota**: O rodapé da aplicação exibe estes créditos para reconhecer as ferramentas que tornaram o desenvolvimento mais eficiente.

## �📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework incrível
- [CopilotKit](https://www.copilotkit.ai/) - Integração de IA simplificada
- [OpenAI](https://openai.com/) - Modelos de linguagem poderosos
- [Tailwind CSS](https://tailwindcss.com/) - Estilização eficiente
- [Lucide Icons](https://lucide.dev/) - Ícones lindos

## 📧 Contato

Seu Nome - [@seutwitter](https://twitter.com/seutwitter)

Link do Projeto: [https://github.com/seu-usuario/flashcard-quiz-app](https://github.com/seu-usuario/flashcard-quiz-app)

---

⭐️ Se este projeto te ajudou, considere dar uma estrela no GitHub!

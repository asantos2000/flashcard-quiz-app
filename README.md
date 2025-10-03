# 🎓 Gerador de Flashcards e Quiz com IA

Uma aplicação web moderna que utiliza Inteligência Artificial para transformar documentos em material de estudo interativo, incluindo flashcards e quizzes de múltipla escolha.

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
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Usar](#como-usar)
- [Perguntas Frequentes (FAQ)](#perguntas-frequentes-faq)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Deploy](#deploy)
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
- **Sidebar com histórico** mostrando todas as sessões salvas
- **Persistência de dados** usando localStorage (dados não são perdidos ao fechar o navegador)
- **Carregamento rápido** de sessões anteriores com um clique
- **Gestão de sessões**: Visualize e delete sessões antigas
- Informações exibidas:
  - Nome do arquivo original
  - Número de flashcards e quizzes
  - Data da última atualização

### 🤖 Assistente IA Integrado
- Chat interativo com CopilotKit (self-hosted)
- Compreensão do contexto do documento
- Comandos em linguagem natural
- Interface amigável em português
- **Sem necessidade de licença CopilotKit** - 100% self-hosted

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

> 💡 **Nota**: Esta aplicação usa CopilotKit em modo **self-hosted**, o que significa que você não precisa de uma licença ou conta CopilotKit. Apenas sua chave de API OpenAI é necessária!

### Persistência e Armazenamento
- **localStorage** - Salvamento local de sessões no navegador
- **Auto-save** - Sistema automático de salvamento de flashcards e quizzes

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

#### Deletar Sessão
- Clique em **"Deletar"** abaixo de cada sessão
- Confirme a exclusão
- A sessão será removida permanentemente

### Passo 6: Recomeçar

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

### Vercel (Recomendado)

A forma mais fácil de fazer deploy é usando a [Vercel](https://vercel.com/):

1. Faça push do código para GitHub/GitLab/Bitbucket
2. Importe o projeto na Vercel
3. Configure a variável de ambiente `OPENAI_API_KEY`
4. Deploy automático!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/flashcard-quiz-app)

### Outras Plataformas

- **Netlify**: Configure o comando de build como `npm run build` e o diretório como `.next`
- **Railway**: Adicione as variáveis de ambiente e faça deploy direto do GitHub
- **AWS / DigitalOcean**: Use Docker ou deploy manual com PM2

> ⚠️ **Lembre-se**: Configure as variáveis de ambiente em todas as plataformas!

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

## 📝 Licença

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

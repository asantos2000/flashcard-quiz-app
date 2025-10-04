# 📦 Resumo do Projeto - Insightly App

## 🎯 Aplicação

**Nome:** Insightly App (Gerador de Flashcards e Quiz com IA)  
**URL Produção:** https://insightly-app.netlify.app  
**Repositório:** https://github.com/asantos2000/flashcard-quiz-app

## 🏗️ Stack Tecnológica

### Frontend
- **Next.js 15.5.4** - Framework React com App Router
- **React 19** - Biblioteca JavaScript para UI
- **Tailwind CSS v4** - Framework CSS utility-first
- **CopilotKit** - Framework para integração de IA (self-hosted)

### Backend
- **OpenAI API** - GPT-4o para geração de conteúdo
- **PostgreSQL 16** - Banco de dados relacional
- **Next.js API Routes** - Backend serverless

### Infraestrutura
- **Netlify** - Hospedagem e CI/CD
- **Neon/Supabase** - PostgreSQL serverless (produção)
- **Docker Compose** - PostgreSQL local (desenvolvimento)

## 📂 Estrutura de Arquivos

```
flashcard-quiz-app/
├── app/
│   ├── api/                      # API Routes
│   │   ├── copilotkit/          # CopilotKit runtime
│   │   ├── sessions/            # CRUD de sessões
│   │   ├── generate-flashcards/ # Geração de flashcards
│   │   ├── generate-quiz/       # Geração de quiz
│   │   └── extract-pdf/         # Extração de texto
│   ├── components/
│   │   └── FlashcardApp.jsx     # Componente principal
│   ├── layout.js                # Layout root
│   ├── page.jsx                 # Página principal
│   └── globals.css              # Estilos globais
├── lib/
│   └── db.js                    # PostgreSQL client
├── db/
│   ├── schema.sql               # Schema PostgreSQL
│   ├── init.mjs                 # Script de inicialização
│   ├── migrate-to-postgres.mjs  # Migração de dados
│   └── README.md                # Guia do banco
├── public/                      # Assets estáticos
├── docker-compose.yml           # PostgreSQL local
├── package.json                 # Dependências
├── .env.local                   # Variáveis de ambiente (local)
└── netlify.toml                 # Configuração Netlify
```

## 🔑 Variáveis de Ambiente

### Desenvolvimento Local (.env.local)
```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/study_sessions
```

### Produção (Netlify)
```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o
DATABASE_URL=postgresql://user:pass@host.neon.tech/database
```

## 🚀 Comandos Principais

### Desenvolvimento
```bash
# Iniciar PostgreSQL
docker compose up -d

# Inicializar database
npm run db:init

# Desenvolvimento
npm run dev              # http://localhost:3000
```

### Produção
```bash
# Build
npm run build

# Inicializar DB remoto
DATABASE_URL="..." npm run db:init

# Deploy (automático via GitHub → Netlify)
git push origin main
```

## 📊 Funcionalidades

### Upload e Processamento
- ✅ Upload de PDF, DOCX, TXT (máx 10MB)
- ✅ Extração automática de texto
- ✅ Preview do conteúdo

### Geração com IA
- ✅ Flashcards (frente/verso)
- ✅ Quiz (múltipla escolha, 4 opções)
- ✅ Chat assistente contextual

### Gestão de Sessões
- ✅ Salvamento automático no PostgreSQL
- ✅ Listagem de sessões anteriores
- ✅ Carregamento de sessões
- ✅ Exclusão de sessões
- ✅ **Nova Sessão** - Limpar e recomeçar

## 🗄️ Banco de Dados

### Schema PostgreSQL

```sql
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    file_name VARCHAR(500),
    file_type VARCHAR(50),
    extracted_text TEXT,
    flashcards JSONB,
    quiz JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_sessions_updated_at ON sessions(updated_at DESC);
CREATE INDEX idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX idx_sessions_file_name ON sessions(file_name);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sessions_updated_at 
    BEFORE UPDATE ON sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 📋 Deploy Checklist

### Pré-Deploy
- [x] Aplicação testada localmente
- [x] Build funciona: `npm run build`
- [x] Código no GitHub

### Banco de Dados
- [ ] PostgreSQL criado (Neon/Supabase/Railway)
- [ ] Schema inicializado: `DATABASE_URL="..." npm run db:init`
- [ ] Connection string copiada

### Netlify
- [ ] Site criado e linked ao GitHub
- [ ] Variáveis configuradas:
  - [ ] `OPENAI_API_KEY`
  - [ ] `OPENAI_MODEL`
  - [ ] `DATABASE_URL`
- [ ] Deploy concluído com sucesso

### Testes Pós-Deploy
- [ ] Site carrega
- [ ] Upload funciona
- [ ] Flashcards gerados
- [ ] Quiz gerado
- [ ] Sessões salvam e carregam
- [ ] Nova sessão funciona

## 💰 Custos

| Serviço | Plano | Custo Mensal |
|---------|-------|--------------|
| Netlify | Free | $0 |
| Neon PostgreSQL | Free | $0 |
| OpenAI API | Pay-as-you-go | ~$5-10* |

*Baseado em uso moderado (~500 sessões/mês com GPT-4o)

## 🔗 Links Úteis

### Documentação do Projeto
- 📖 [README.md](./README.md) - Documentação completa
- 🚀 [DEPLOY-PRODUCTION.md](./DEPLOY-PRODUCTION.md) - Guia de deploy
- ✅ [DEPLOY-CHECKLIST-NETLIFY.md](./DEPLOY-CHECKLIST-NETLIFY.md) - Checklist
- 💾 [db/README.md](./db/README.md) - Guia do banco

### Serviços Externos
- 🌐 [Netlify Dashboard](https://app.netlify.com/sites/insightly-app)
- 🗄️ [Neon Dashboard](https://console.neon.tech)
- 🤖 [OpenAI Platform](https://platform.openai.com)
- 🐙 [GitHub Repo](https://github.com/asantos2000/flashcard-quiz-app)

### Documentação Técnica
- [Next.js 15](https://nextjs.org/docs)
- [CopilotKit](https://docs.copilotkit.ai)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Neon](https://neon.tech/docs)
- [Netlify](https://docs.netlify.com)

## 🐛 Troubleshooting Comum

### "Failed to connect to database"
```bash
# Verificar DATABASE_URL
echo $DATABASE_URL  # local
netlify env:list    # produção

# Testar conexão
DATABASE_URL="..." npm run db:init
```

### "OPENAI_API_KEY is not set"
```bash
# Verificar no Netlify
netlify env:get OPENAI_API_KEY

# Se não estiver, adicionar
netlify env:set OPENAI_API_KEY "sk-..."
```

### Sessões não salvam
1. Verificar `DATABASE_URL` no Netlify
2. Verificar logs: `netlify logs`
3. Verificar tabela existe: acessar interface do Neon/Supabase

## 📞 Suporte

- 🐛 [Abrir Issue](https://github.com/asantos2000/flashcard-quiz-app/issues)
- 📧 Email: [seu-email]
- 💬 Discussões: [GitHub Discussions]

## 📝 Notas da Versão Atual

### v1.0.0 (Atual)

**Tecnologias:**
- ✅ Next.js 15 + React 19
- ✅ PostgreSQL com Neon
- ✅ CopilotKit self-hosted
- ✅ Tailwind CSS v4

**Funcionalidades:**
- ✅ Upload de documentos
- ✅ Geração de flashcards e quiz com IA
- ✅ Persistência com PostgreSQL
- ✅ **NOVO:** Botão "Nova Sessão"
- ✅ Chat assistente contextual

**Deploy:**
- ✅ Netlify
- ✅ PostgreSQL externo (Neon/Supabase/Railway)
- ✅ CI/CD automático

---

**Última atualização:** Outubro 2025  
**Versão:** 1.0.0  
**Status:** ✅ Produção

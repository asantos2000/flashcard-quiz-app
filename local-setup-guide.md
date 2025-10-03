# Guia de Configuração Local - VS Code + WSL

## 📋 Pré-requisitos

### 1. Node.js no WSL
```bash
# Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# Instalar Node.js via NVM (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reiniciar terminal ou executar:
source ~/.bashrc

# Instalar Node.js LTS
nvm install --lts
nvm use --lts

# Verificar instalação
node --version
npm --version
```

### 2. VS Code com Extensão

1. Instale a extensão **ES7+ React/Redux/React-Native snippets**

---

## 🚀 Configuração do Projeto

### Passo 1: Criar o Projeto Next.js

```bash
# No terminal WSL, navegue até sua pasta de projetos
cd ~
mkdir projects
cd projects

# Criar aplicação Next.js
npx create-next-app@latest flashcard-quiz-app

# Durante a instalação, escolha:
# ✅ TypeScript? No
# ✅ ESLint? Yes
# ✅ Tailwind CSS? Yes
# ✅ `src/` directory? No
# ✅ App Router? Yes
# ✅ Import alias? No

# Entrar na pasta do projeto
cd flashcard-quiz-app
```

### Passo 2: Abrir no VS Code

```bash
# Abrir o projeto no VS Code através do WSL
code .
```

O VS Code abrirá conectado ao WSL automaticamente.

### Passo 3: Instalar Dependências

```bash
# No terminal integrado do VS Code (Ctrl + `)
nvm use --lts

npm install lucide-react mammoth
```

### Passo 4: Criar a Estrutura de Arquivos

```bash
# Criar pasta de componentes
mkdir -p app/components

# Remover arquivos padrão que não usaremos
rm app/page.js
```

---

## 📁 Estrutura do Projeto

```
flashcard-quiz-app/
├── app/
│   ├── components/
│   │   └── FlashcardApp.jsx
│   ├── layout.js
│   ├── page.jsx
│   └── globals.css
├── public/
├── package.json
└── next.config.js
```

---

## 💻 Código dos Arquivos

### 1. `app/page.jsx`

```jsx
import FlashcardApp from './components/FlashcardApp';

export default function Home() {
  return (
    <main>
      <FlashcardApp />
    </main>
  );
}
```

### 2. `app/components/FlashcardApp.jsx`
Cole o código completo da aplicação que criei anteriormente aqui.
**Importante:** Adicione `"use client";` no topo do arquivo!

```jsx
"use client";

import React, { useState } from 'react';
import { Upload, BookOpen, Brain, Trash2, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import * as mammoth from 'mammoth';

// ... resto do código
```

### 3. `app/layout.js`
```jsx
import './globals.css'

export const metadata = {
  title: 'Gerador de Flashcards e Quiz com IA',
  description: 'Aplicação de estudo com IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
```

### 4. `app/globals.css`
Mantenha o arquivo padrão do Tailwind, apenas certifique-se de ter:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ▶️ Executar a Aplicação

### Modo Desenvolvimento

```bash
# No terminal do VS Code
npm run dev
```

A aplicação estará disponível em: **http://localhost:3000**

### Dicas de Desenvolvimento

1. **Hot Reload**: As alterações são aplicadas automaticamente
2. **Erros**: Aparecerão no navegador e no terminal
3. **Parar o servidor**: `Ctrl + C` no terminal

---

## 🔧 Troubleshooting

### Problema: "Module not found: Can't resolve 'mammoth'"
```bash
npm install mammoth --save
```

### Problema: Erro de permissão no WSL
```bash
sudo chown -R $USER:$USER ~/projects
```

### Problema: Porta 3000 já em uso
```bash
# Matar processo na porta 3000
npx kill-port 3000

# Ou usar outra porta
npm run dev -- -p 3001
```

### Problema: VS Code não conecta ao WSL
1. Abra Command Palette (`Ctrl + Shift + P`)
2. Digite: "WSL: Reopen Folder in WSL"
3. Selecione a pasta do projeto

---

## 📦 Build para Produção

```bash
# Criar build otimizado
npm run build

# Executar build de produção
npm start
```

---

## 🎨 Personalizações Sugeridas

### Adicionar Tema Escuro

Instale o plugin:
```bash
npm install next-themes
```

### Adicionar Persistência de Dados

```bash
npm install localforage
```

### Integrar API Real do CopilotKit

```bash
npm install @copilotkit/react-core @copilotkit/react-ui
```

---

## 📚 Recursos Úteis

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **CopilotKit**: https://docs.copilotkit.ai/
- **Lucide Icons**: https://lucide.dev/

---

## 🐛 Debug no VS Code

### Configurar Debugger

Crie `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

Agora você pode usar `F5` para iniciar o debug!

---

## ✅ Checklist Final

- [ ] WSL instalado e funcionando
- [ ] Node.js instalado no WSL
- [ ] VS Code com extensão WSL
- [ ] Projeto Next.js criado
- [ ] Dependências instaladas
- [ ] Código copiado para os arquivos
- [ ] `npm run dev` executando sem erros
- [ ] Aplicação acessível em localhost:3000
- [ ] Upload de arquivo funcionando
- [ ] Geração de flashcards funcionando
- [ ] Quiz funcionando

---

## 🎉 Pronto!

Sua aplicação está rodando localmente! Agora você pode:

1. Testar com diferentes tipos de documentos
2. Modificar o código e ver as mudanças em tempo real
3. Integrar com APIs reais quando estiver pronto
4. Adicionar novas funcionalidades

**Dica**: Use `Ctrl + Shift + P` no VS Code e digite "Reload Window" se algo não estiver funcionando corretamente.
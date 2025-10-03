# ✅ Checklist de Deploy

Use esta checklist para garantir um deploy perfeito do seu Flashcard Quiz App.

---

## 📋 Fase 1: Preparação (Antes do Deploy)

### Ambiente Local
- [ ] Aplicação funciona em `localhost:3000` (`npm run dev`)
- [ ] Build funciona localmente (`npm run build`)
- [ ] Start funciona localmente (`npm start`)
- [ ] Testei upload de PDF localmente
- [ ] Testei geração de flashcards localmente
- [ ] Testei geração de quiz localmente
- [ ] Chat CopilotKit funciona localmente

### Git e Repositório
- [ ] Projeto inicializado com git (`git init`)
- [ ] `.env.local` está no `.gitignore`
- [ ] Arquivos commitados (`git add . && git commit -m "..."`)
- [ ] Repositório criado no GitHub
- [ ] Código enviado para GitHub (`git push`)
- [ ] Repositório é público ou conectado à plataforma de deploy

### Chave OpenAI
- [ ] Tenho uma conta OpenAI
- [ ] Criei uma chave de API em [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- [ ] Copiei e guardei a chave em local seguro
- [ ] Chave funciona localmente (testei no `.env.local`)
- [ ] Tenho créditos suficientes na conta OpenAI
- [ ] Configurei alertas de gastos (recomendado: $10-20/mês)

### Documentação
- [ ] Li o [README.md](./README.md) principal
- [ ] Escolhi qual plataforma usar (Vercel recomendado)
- [ ] Li o guia de deploy da plataforma escolhida

---

## 📋 Fase 2: Deploy (Durante)

### Conta na Plataforma
- [ ] Criei conta na plataforma escolhida (Vercel/Netlify/Railway/Render)
- [ ] Conectei minha conta GitHub
- [ ] Autorizei acesso aos repositórios

### Configuração do Projeto
- [ ] Importei/conectei o repositório `flashcard-quiz-app`
- [ ] Framework detectado: Next.js ✅
- [ ] Build command configurado: `npm run build`
- [ ] Start command configurado: `npm start`
- [ ] Output directory configurado: `.next`

### Variáveis de Ambiente
- [ ] Adicionei `OPENAI_API_KEY` com o valor correto
- [ ] (Opcional) Adicionei `OPENAI_MODEL=gpt-4o`
- [ ] Selecionei todos os ambientes: Production, Preview, Development
- [ ] Salvei as configurações

### Iniciar Deploy
- [ ] Cliquei em "Deploy" ou executei `vercel --prod`
- [ ] Build iniciou sem erros
- [ ] Aguardei conclusão (2-10 minutos dependendo da plataforma)
- [ ] Deploy concluído com sucesso ✅
- [ ] Obtive a URL do projeto

---

## 📋 Fase 3: Validação (Após Deploy)

### Testes Básicos
- [ ] Site carrega sem erro 500
- [ ] HTTPS está ativo (cadeado verde no navegador)
- [ ] Interface aparece corretamente
- [ ] Não há erros no console do navegador (F12)

### Testes de Funcionalidades
- [ ] **Upload de Arquivo**
  - [ ] Consigo fazer upload de PDF
  - [ ] Consigo fazer upload de DOCX
  - [ ] Consigo fazer upload de TXT
  - [ ] Texto é extraído corretamente
  - [ ] Preview do texto aparece

- [ ] **Geração de Flashcards**
  - [ ] Botão "Gerar Flashcards" funciona
  - [ ] Loading spinner aparece
  - [ ] Flashcards são gerados (8-12 cards)
  - [ ] Consigo virar os cards (ver frente/verso)
  - [ ] Navegação (anterior/próximo) funciona
  - [ ] Contador de progresso aparece

- [ ] **Geração de Quiz**
  - [ ] Botão "Gerar Quiz" funciona
  - [ ] Loading spinner aparece
  - [ ] Quiz é gerado (5-8 questões)
  - [ ] Consigo selecionar respostas
  - [ ] Botão "Ver Resultados" aparece
  - [ ] Resultado final é calculado corretamente
  - [ ] Feedback (certo/errado) aparece

- [ ] **Chat CopilotKit**
  - [ ] Ícone do chat aparece no canto
  - [ ] Consigo abrir o chat
  - [ ] Consigo enviar mensagens
  - [ ] IA responde em português
  - [ ] IA entende o contexto do documento

- [ ] **Sessões Salvas**
  - [ ] Botão "Salvar Sessão" funciona
  - [ ] Sessão aparece na sidebar
  - [ ] Consigo carregar uma sessão salva
  - [ ] Data/hora aparecem corretamente
  - [ ] Consigo excluir uma sessão
  - [ ] Sessões persistem após reload (F5)

- [ ] **Modal de Ajuda**
  - [ ] Botão de ajuda (?) aparece no header
  - [ ] Modal abre ao clicar
  - [ ] Conteúdo explicativo está legível
  - [ ] Consigo fechar com X
  - [ ] Consigo fechar com ESC
  - [ ] Consigo fechar clicando fora

### Testes de Responsividade
- [ ] Testei no desktop (Chrome/Firefox/Safari)
- [ ] Testei no mobile (ou DevTools responsive mode)
- [ ] Layout se adapta bem em tela pequena
- [ ] Botões são clicáveis no mobile
- [ ] Sidebar funciona no mobile
- [ ] Upload funciona no mobile

### Performance
- [ ] Primeira carga é rápida (< 3s)
- [ ] Navegação entre abas é fluida
- [ ] Geração de flashcards/quiz demora < 10s
- [ ] Sem problemas de hibernação (se usando Render)

---

## 📋 Fase 4: Configurações Avançadas (Opcional)

### Segurança
- [ ] Configurei rate limiting (prevenir abuso)
- [ ] Variáveis de ambiente não estão expostas no código
- [ ] `.env.local` NÃO está no repositório
- [ ] Revisei logs para info sensível

### Monitoramento
- [ ] Configurei alertas de gastos OpenAI
- [ ] Anotei a URL do projeto em local seguro
- [ ] Configurei monitoramento de erros (opcional)
- [ ] Habilitei analytics (Vercel oferece grátis)

### Domínio Customizado (Se desejar)
- [ ] Comprei um domínio
- [ ] Adicionei domínio nas configurações da plataforma
- [ ] Configurei DNS (CNAME ou A record)
- [ ] Aguardei propagação (até 48h)
- [ ] SSL funciona no domínio customizado

### CI/CD
- [ ] Deploy automático a cada push funciona
- [ ] Preview deploys funcionam (branches)
- [ ] Configurei GitHub Actions (opcional)
- [ ] Configurei testes automatizados (opcional)

---

## 📋 Fase 5: Compartilhamento

### Documentação
- [ ] Atualizei README com a URL do projeto
- [ ] Documentei qualquer configuração especial
- [ ] Criei instruções para colaboradores (se aplicável)

### Divulgação
- [ ] Compartilhei link com amigos/colegas
- [ ] Testei que outras pessoas conseguem acessar
- [ ] Pedi feedback sobre usabilidade
- [ ] Respondi dúvidas/problemas reportados

### Portfólio
- [ ] Adicionei projeto ao GitHub README
- [ ] Adicionei ao LinkedIn
- [ ] Adicionei ao portfólio pessoal
- [ ] Preparei apresentação (se necessário)

---

## 🎯 Troubleshooting Rápido

### ❌ Site não carrega (erro 500)
- Verifique logs da plataforma
- Confirme que `OPENAI_API_KEY` está configurada
- Teste build localmente primeiro

### ❌ API não funciona
- Confirme variáveis de ambiente
- Verifique créditos OpenAI
- Veja logs das serverless functions

### ❌ Upload de arquivo não funciona
- Verifique limite de tamanho (10MB)
- Confirme que API routes estão funcionando
- Teste com arquivo menor primeiro

### ❌ Build falhou
- Veja logs completos do build
- Teste `npm run build` localmente
- Verifique se todas as dependências estão no `package.json`
- Limpe cache e tente novamente

### ❌ Deploy muito lento
- Vercel/Netlify: 2-5 min é normal
- Render (plano free): 5-10 min é normal
- Se > 15 min, cancele e tente novamente

---

## 📊 Métricas de Sucesso

Seu deploy foi bem-sucedido se:

- ✅ URL acessível publicamente
- ✅ HTTPS ativo
- ✅ Todas as funcionalidades testadas
- ✅ Responsivo (desktop + mobile)
- ✅ Performance aceitável (< 3s primeira carga)
- ✅ Sem erros no console
- ✅ Outras pessoas conseguem usar

---

## 🎉 Deploy Completo!

Se marcou todos os itens das Fases 1-3, parabéns! 🎊

Sua aplicação está:
- ✅ Online e acessível
- ✅ Segura (HTTPS)
- ✅ Funcionando perfeitamente
- ✅ Pronta para compartilhar

**Próximos passos**:
1. Monitore uso da API OpenAI
2. Colete feedback dos usuários
3. Faça melhorias iterativas
4. Divirta-se! 🚀

---

## 📚 Recursos Adicionais

- [README Principal](./README.md)
- [Deploy Rápido (5 min)](./QUICKSTART-DEPLOY.md)
- [Guia Visual Completo](./DEPLOY-GUIDE.md)
- [Comparação de Plataformas](./PLATFORM-COMPARISON.md)

---

**Última atualização**: Outubro 2025  
**Tempo estimado total**: 15-30 minutos  
**Dificuldade**: ⭐⭐ Fácil

# 📦 Sistema de Versionamento

Este projeto usa **CalVer (Calendar Versioning)** como esquema de versionamento.

## 📅 Formato da Versão

```
YYYY.MM.DD
```

Exemplo: `2025.10.03` (3 de outubro de 2025)

## 🔄 Como Atualizar a Versão

### Opção 1: Versão CalVer (Recomendado)
```bash
npm run version
```

Este comando atualiza automaticamente:
- `package.json` - versão do npm
- `version.json` - metadados completos
- `FlashcardApp.jsx` - rodapé (manual)

### Opção 2: Versão CalVer + Git Hash
```bash
npm run version:git
```

Gera versão como: `2025.10.03-abc1234`

## 📁 Arquivos de Versão

### `version.json`
Arquivo central com metadados da versão:
```json
{
  "version": "2025.10.03",
  "versioningScheme": "CalVer (YYYY.MM.DD)",
  "releaseDate": "2025-10-03",
  "description": "Flashcard and Quiz Generator with AI",
  "changelog": [...]
}
```

### `package.json`
Versão npm padrão (sincronizada):
```json
{
  "version": "2025.10.03"
}
```

## 🎯 Quando Atualizar a Versão?

- ✅ Antes de cada deploy em produção
- ✅ Após mudanças significativas
- ✅ No início de cada sprint/ciclo
- ✅ Quando adicionar novas features

## 📝 Changelog

Mantenha o changelog atualizado em `version.json`:

```json
{
  "changelog": [
    {
      "version": "2025.10.03",
      "date": "2025-10-03",
      "changes": [
        "Feature: Nova funcionalidade X",
        "Fix: Correção do bug Y",
        "Improvement: Melhoria na performance"
      ]
    }
  ]
}
```

## 🔍 Ver Versão Atual

### No código:
```javascript
import version from '../version.json';
console.log(version.version);
```

### No terminal:
```bash
node -p "require('./package.json').version"
```

### No navegador:
A versão aparece no **rodapé da aplicação**: `v2025.10.03 (CalVer)`

## 🌐 Versão em Produção

Após deploy, a versão fica visível:
- 📍 Rodapé do site
- 📍 `https://seu-site.com/version.json`
- 📍 Console do navegador (se implementado)

## 🤖 Automação (Futuro)

Para automatizar a atualização da versão:

### No `package.json`:
```json
{
  "scripts": {
    "prebuild": "npm run version",
    "predeploy": "npm run version"
  }
}
```

### No CI/CD (GitHub Actions):
```yaml
- name: Update version
  run: npm run version:git
```

## 📚 Mais sobre CalVer

- [calver.org](https://calver.org/)
- Usado por: Ubuntu, PyCharm, Wine, Bolt
- Benefícios: Transparência temporal, fácil de entender

---

**Nota**: Se preferir SemVer (Semantic Versioning), você pode usar `major.minor.patch` (ex: `1.2.3`), mas CalVer é mais simples para projetos com releases baseadas em tempo.

#!/usr/bin/env node

/**
 * Script para criar tag Git baseada na versão atual
 * Uso: node scripts/tag-release.mjs [mensagem opcional]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getCurrentVersion() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  return packageData.version;
}

function getChangelog() {
  const versionJsonPath = path.join(__dirname, '..', 'version.json');
  if (!fs.existsSync(versionJsonPath)) {
    return [];
  }
  
  const versionData = JSON.parse(fs.readFileSync(versionJsonPath, 'utf-8'));
  if (versionData.changelog && versionData.changelog.length > 0) {
    return versionData.changelog[0].changes || [];
  }
  return [];
}

function createTag() {
  const version = getCurrentVersion();
  const tagName = `v${version}`;
  
  // Verificar se a tag já existe
  try {
    execSync(`git rev-parse ${tagName}`, { stdio: 'ignore' });
    console.log(`⚠️  Tag ${tagName} já existe!`);
    console.log('💡 Dica: Atualize a versão com: npm run version');
    process.exit(1);
  } catch (error) {
    // Tag não existe, podemos continuar
  }
  
  // Verificar se há mudanças não commitadas
  try {
    const status = execSync('git status --porcelain').toString();
    if (status.trim()) {
      console.log('⚠️  Há mudanças não commitadas!');
      console.log('💡 Commit suas mudanças antes de criar a tag:');
      console.log('   git add .');
      console.log('   git commit -m "your message"');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erro ao verificar status do Git');
    process.exit(1);
  }
  
  // Obter mensagem customizada ou usar changelog
  const customMessage = process.argv.slice(2).join(' ');
  let tagMessage;
  
  if (customMessage) {
    tagMessage = `Release ${version}\n\n${customMessage}`;
  } else {
    const changes = getChangelog();
    if (changes.length > 0) {
      tagMessage = `Release ${version}\n\nChanges:\n${changes.map(c => `- ${c}`).join('\n')}`;
    } else {
      tagMessage = `Release ${version}`;
    }
  }
  
  console.log(`🏷️  Criando tag: ${tagName}`);
  console.log(`📝 Mensagem:\n${tagMessage}\n`);
  
  // Criar tag anotada
  try {
    execSync(`git tag -a ${tagName} -m "${tagMessage.replace(/"/g, '\\"')}"`);
    console.log(`✅ Tag ${tagName} criada localmente!`);
  } catch (error) {
    console.error('❌ Erro ao criar tag:', error.message);
    process.exit(1);
  }
  
  // Perguntar se quer fazer push
  console.log('\n📤 Para enviar a tag para o GitHub, execute:');
  console.log(`   git push origin ${tagName}`);
  console.log('\n📦 Ou envie todas as tags:');
  console.log('   git push --tags');
  console.log('\n💡 Dica: No GitHub, você pode criar um Release baseado nesta tag!');
}

createTag();

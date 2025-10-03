#!/usr/bin/env node

/**
 * Script para gerar versão baseada em CalVer ou Git commit
 * Uso: node scripts/version.mjs [--git]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const useGit = process.argv.includes('--git');

function getCalVerVersion() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function getGitVersion() {
  try {
    const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
    const commitDate = execSync('git log -1 --format=%cd --date=format:%Y.%m.%d').toString().trim();
    return `${commitDate}-${commitHash}`;
  } catch (error) {
    console.warn('⚠️  Git não disponível, usando CalVer');
    return getCalVerVersion();
  }
}

function updateVersion() {
  const version = useGit ? getGitVersion() : getCalVerVersion();
  
  console.log(`📦 Versão atual: ${version}`);
  console.log(`📅 Formato: ${useGit ? 'CalVer + Git Hash' : 'CalVer (YYYY.MM.DD)'}`);
  
  // Atualizar version.json
  const versionJsonPath = path.join(__dirname, '..', 'version.json');
  let versionData = {};
  
  if (fs.existsSync(versionJsonPath)) {
    versionData = JSON.parse(fs.readFileSync(versionJsonPath, 'utf-8'));
  }
  
  versionData.version = version;
  versionData.generatedAt = new Date().toISOString();
  
  fs.writeFileSync(versionJsonPath, JSON.stringify(versionData, null, 2));
  console.log('✅ version.json atualizado');
  
  // Atualizar package.json
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  packageData.version = version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2) + '\n');
  console.log('✅ package.json atualizado');
  
  console.log(`\n🎉 Versão ${version} configurada com sucesso!`);
}

updateVersion();

#!/usr/bin/env node

/**
 * Script para migrar dados de flashcards.db para study-sessions.db
 */

import duckdb from 'duckdb';
import fs from 'fs';
import path from 'path';

const oldDbPath = path.join(process.cwd(), 'flashcards.db');
const newDbPath = path.join(process.cwd(), 'study-sessions.db');

console.log('🔄 Migração de Banco de Dados\n');

// Verificar se banco antigo existe
if (!fs.existsSync(oldDbPath)) {
  console.log('✅ Nenhuma migração necessária.');
  console.log('   Banco antigo (flashcards.db) não encontrado.');
  process.exit(0);
}

// Verificar se banco novo já existe
if (fs.existsSync(newDbPath)) {
  console.log('⚠️  O banco novo (study-sessions.db) já existe.');
  console.log('   Deseja substituir? (y/N)');
  process.exit(1);
}

console.log('📂 Banco antigo encontrado:', oldDbPath);
console.log('📂 Criando banco novo:', newDbPath);
console.log();

// Copiar arquivo
try {
  fs.copyFileSync(oldDbPath, newDbPath);
  console.log('✅ Dados migrados com sucesso!');
  console.log();
  console.log('📊 Verificando dados...');
  
  // Verificar dados
  const db = new duckdb.Database(newDbPath, (err) => {
    if (err) {
      console.error('❌ Erro ao abrir banco novo:', err);
      process.exit(1);
    }
    
    const conn = db.connect();
    
    conn.all('SELECT COUNT(*) as total FROM sessions', (err, rows) => {
      if (err) {
        console.error('❌ Erro ao contar sessões:', err);
        process.exit(1);
      }
      
      console.log(`✅ ${rows[0].total} sessões migradas com sucesso!\n`);
      console.log('🗑️  Você pode agora deletar o banco antigo:');
      console.log('   rm flashcards.db flashcards.db.wal\n');
      
      conn.close();
      db.close();
    });
  });
  
} catch (error) {
  console.error('❌ Erro ao copiar banco:', error);
  process.exit(1);
}

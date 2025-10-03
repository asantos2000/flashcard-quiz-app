#!/usr/bin/env node

/**
 * Script para migrar dados do DuckDB para PostgreSQL
 */

import { Client } from 'pg';
import duckdb from 'duckdb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração
const DUCKDB_PATH = path.join(__dirname, '..', 'study-sessions.db');
const envPath = path.join(__dirname, '..', '.env.local');

let DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/study_sessions';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/DATABASE_URL=(.+)/);
  if (match) {
    DATABASE_URL = match[1].trim();
  }
}

console.log('🔄 Migração DuckDB → PostgreSQL\n');

async function migrate() {
  // Verificar se DuckDB existe
  if (!fs.existsSync(DUCKDB_PATH)) {
    console.log('⚠️  Arquivo DuckDB não encontrado:', DUCKDB_PATH);
    console.log('   Nada para migrar.\n');
    return;
  }

  console.log('📂 Fonte:', DUCKDB_PATH);
  console.log('🎯 Destino:', DATABASE_URL.replace(/:[^:@]+@/, ':****@'), '\n');

  // Ler dados do DuckDB
  const sessions = await readFromDuckDB();
  
  if (sessions.length === 0) {
    console.log('⚠️  Nenhum registro encontrado no DuckDB.\n');
    return;
  }

  console.log(`📊 Encontrados ${sessions.length} registros no DuckDB\n`);

  // Inserir no PostgreSQL
  await insertIntoPostgreSQL(sessions);

  console.log('\n🎉 Migração concluída com sucesso!\n');
}

function readFromDuckDB() {
  return new Promise((resolve, reject) => {
    console.log('📖 Lendo dados do DuckDB...');
    
    const db = new duckdb.Database(DUCKDB_PATH, (err) => {
      if (err) {
        reject(err);
        return;
      }

      const conn = db.connect();
      
      conn.all('SELECT * FROM sessions ORDER BY created_at', (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        const sessions = rows.map(row => ({
          id: row.id,
          fileName: row.file_name,
          fileType: row.file_type,
          extractedText: row.extracted_text,
          flashcards: typeof row.flashcards === 'string' ? JSON.parse(row.flashcards) : row.flashcards,
          quiz: typeof row.quiz === 'string' ? JSON.parse(row.quiz) : row.quiz,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }));

        console.log(`✅ ${sessions.length} registros lidos\n`);
        
        conn.close();
        db.close();
        resolve(sessions);
      });
    });
  });
}

async function insertIntoPostgreSQL(sessions) {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    console.log('🔌 Conectando ao PostgreSQL...');
    await client.connect();
    console.log('✅ Conectado!\n');

    console.log('💾 Inserindo registros...');
    
    let inserted = 0;
    let skipped = 0;

    for (const session of sessions) {
      try {
        await client.query(`
          INSERT INTO sessions (id, file_name, file_type, extracted_text, flashcards, quiz, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (id) DO UPDATE
          SET file_name = EXCLUDED.file_name,
              file_type = EXCLUDED.file_type,
              extracted_text = EXCLUDED.extracted_text,
              flashcards = EXCLUDED.flashcards,
              quiz = EXCLUDED.quiz,
              updated_at = EXCLUDED.updated_at
        `, [
          session.id,
          session.fileName,
          session.fileType,
          session.extractedText,
          JSON.stringify(session.flashcards),
          JSON.stringify(session.quiz),
          session.createdAt,
          session.updatedAt
        ]);
        inserted++;
        process.stdout.write(`\r  ✅ Inseridos: ${inserted}/${sessions.length}`);
      } catch (err) {
        console.error(`\n  ❌ Erro ao inserir ${session.id}:`, err.message);
        skipped++;
      }
    }

    console.log(`\n\n📊 Resumo:`);
    console.log(`  ✅ Inseridos: ${inserted}`);
    console.log(`  ⚠️  Ignorados: ${skipped}`);

    // Verificar total
    const result = await client.query('SELECT COUNT(*) FROM sessions');
    console.log(`  📈 Total no PostgreSQL: ${result.rows[0].count}`);

  } catch (error) {
    console.error('❌ Erro:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Executar
migrate().catch(console.error);

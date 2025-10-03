#!/usr/bin/env node

/**
 * Script para inicializar o banco de dados PostgreSQL
 */

import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ler DATABASE_URL do .env.local ou usar default
const envPath = path.join(__dirname, '..', '.env.local');
let DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/study_sessions';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  // Procura por DATABASE_URL que não está comentada (sem #)
  const lines = envContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('DATABASE_URL=') && !trimmed.startsWith('#')) {
      DATABASE_URL = trimmed.replace('DATABASE_URL=', '').trim();
      break;
    }
  }
}

console.log('🐘 Inicializando PostgreSQL...\n');
console.log('📍 Database URL:', DATABASE_URL.replace(/:[^:@]+@/, ':****@'), '\n');

async function initDatabase() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    // Conectar
    console.log('🔌 Conectando ao banco de dados...');
    await client.connect();
    console.log('✅ Conectado com sucesso!\n');

    // Ler schema SQL
    console.log('📖 Lendo schema SQL...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    console.log('✅ Schema carregado!\n');

    // Executar schema
    console.log('🔨 Criando tabelas e índices...');
    await client.query(schemaSql);
    console.log('✅ Tabelas criadas com sucesso!\n');

    // Verificar estrutura
    console.log('🔍 Verificando estrutura da tabela...');
    const tableInfo = await client.query(`
      SELECT 
        column_name, 
        data_type, 
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'sessions'
      ORDER BY ordinal_position;
    `);

    console.log('📊 Estrutura da tabela "sessions":');
    console.table(tableInfo.rows);

    // Verificar índices
    const indexInfo = await client.query(`
      SELECT indexname, indexdef
      FROM pg_indexes
      WHERE tablename = 'sessions';
    `);

    console.log('\n📇 Índices criados:');
    indexInfo.rows.forEach(idx => {
      console.log(`  ✅ ${idx.indexname}`);
    });

    // Contar registros
    const count = await client.query('SELECT COUNT(*) FROM sessions');
    console.log(`\n📈 Total de registros: ${count.rows[0].count}\n`);

    console.log('🎉 Banco de dados inicializado com sucesso!\n');
    console.log('📝 Próximos passos:');
    console.log('   1. Execute: npm run dev');
    console.log('   2. Acesse: http://localhost:3000');
    console.log('   3. Comece a criar flashcards!\n');

  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    console.error('\n💡 Dicas:');
    console.error('   - Verifique se o PostgreSQL está rodando');
    console.error('   - Verifique as credenciais no .env.local');
    console.error('   - Execute: docker-compose up -d\n');
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Executar
initDatabase().catch(console.error);

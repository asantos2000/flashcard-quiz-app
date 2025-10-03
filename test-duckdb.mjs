#!/usr/bin/env node

/**
 * Script de teste para verificar a instalação do DuckDB
 */

import duckdb from 'duckdb';

console.log('🦆 Testando DuckDB...\n');

const db = new duckdb.Database(':memory:', (err) => {
  if (err) {
    console.error('❌ Erro ao criar banco:', err);
    process.exit(1);
  }

  console.log('✅ Banco criado com sucesso!');
  
  const conn = db.connect();
  
  conn.all('SELECT version() as version', (err, rows) => {
    if (err) {
      console.error('❌ Erro ao consultar versão:', err);
      process.exit(1);
    }
    
    console.log('✅ DuckDB versão:', rows[0].version);
    
    // Testar criação de tabela com JSON
    conn.all(`
      CREATE TABLE test (
        id VARCHAR,
        data JSON
      )
    `, (err) => {
      if (err) {
        console.error('❌ Erro ao criar tabela:', err);
        process.exit(1);
      }
      
      console.log('✅ Tabela criada com suporte a JSON!');
      
      // Inserir dados
      conn.run(`
        INSERT INTO test VALUES ('test-1', '{"name": "Test", "count": 5}')
      `, (err) => {
        if (err) {
          console.error('❌ Erro ao inserir dados:', err);
          process.exit(1);
        }
        
        console.log('✅ Dados inseridos com sucesso!');
        
        // Consultar dados
        conn.all('SELECT * FROM test', (err, rows) => {
          if (err) {
            console.error('❌ Erro ao consultar dados:', err);
            process.exit(1);
          }
          
          console.log('✅ Dados recuperados:', rows);
          console.log('\n🎉 Todos os testes passaram! DuckDB está funcionando perfeitamente.\n');
          
          conn.close();
          db.close();
        });
      });
    });
  });
});

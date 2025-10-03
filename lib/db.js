import duckdb from 'duckdb';
import { promisify } from 'util';
import path from 'path';

let db = null;
let connection = null;

// Initialize DuckDB
export async function initDB() {
  if (db && connection) {
    return { db, connection };
  }

  return new Promise((resolve, reject) => {
    // Create database in the project root
    const dbPath = path.join(process.cwd(), 'study-sessions.db');
    
    db = new duckdb.Database(dbPath, (err) => {
      if (err) {
        console.error('Error creating database:', err);
        reject(err);
        return;
      }

      connection = db.connect();
      
      // Create sessions table if it doesn't exist
      connection.all(`
        CREATE TABLE IF NOT EXISTS sessions (
          id VARCHAR PRIMARY KEY,
          file_name VARCHAR NOT NULL,
          file_type VARCHAR NOT NULL,
          extracted_text TEXT NOT NULL,
          flashcards JSON,
          quiz JSON,
          created_at TIMESTAMP NOT NULL,
          updated_at TIMESTAMP NOT NULL
        )
      `, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          reject(err);
          return;
        }
        
        console.log('✅ DuckDB initialized successfully');
        resolve({ db, connection });
      });
    });
  });
}

// Get all sessions
export async function getAllSessions() {
  const { connection } = await initDB();
  
  return new Promise((resolve, reject) => {
    connection.all('SELECT * FROM sessions ORDER BY updated_at DESC', (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Parse JSON fields
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
      
      resolve(sessions);
    });
  });
}

// Get session by ID
export async function getSessionById(id) {
  const { connection } = await initDB();
  
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM sessions WHERE id = '${id}'`;
    connection.all(sql, (err, rows) => {
      if (err) {
        console.error('Error getting session by ID:', err);
        reject(err);
        return;
      }
      
      if (rows.length === 0) {
        resolve(null);
        return;
      }
      
      const row = rows[0];
      const session = {
        id: row.id,
        fileName: row.file_name,
        fileType: row.file_type,
        extractedText: row.extracted_text,
        flashcards: typeof row.flashcards === 'string' ? JSON.parse(row.flashcards) : row.flashcards,
        quiz: typeof row.quiz === 'string' ? JSON.parse(row.quiz) : row.quiz,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
      
      resolve(session);
    });
  });
}

// Create or update session
export async function upsertSession(sessionData) {
  const { connection } = await initDB();
  
  // Check if session exists
  const existing = await getSessionById(sessionData.id);
  
  return new Promise((resolve, reject) => {
    const flashcardsJson = JSON.stringify(sessionData.flashcards || []).replace(/'/g, "''");
    const quizJson = JSON.stringify(sessionData.quiz || []).replace(/'/g, "''");
    const extractedTextEscaped = (sessionData.extractedText || '').replace(/'/g, "''");
    
    if (existing) {
      // Update existing session
      const sql = `
        UPDATE sessions 
        SET file_name = '${sessionData.fileName.replace(/'/g, "''")}', 
            file_type = '${sessionData.fileType.replace(/'/g, "''")}', 
            extracted_text = '${extractedTextEscaped}', 
            flashcards = '${flashcardsJson}'::JSON, 
            quiz = '${quizJson}'::JSON, 
            updated_at = '${sessionData.updatedAt}'::TIMESTAMP
        WHERE id = '${sessionData.id}'
      `;
      
      connection.all(sql, (err) => {
        if (err) {
          console.error('Error updating session:', err);
          reject(err);
          return;
        }
        resolve({ ...sessionData, createdAt: existing.createdAt });
      });
    } else {
      // Insert new session
      const sql = `
        INSERT INTO sessions (id, file_name, file_type, extracted_text, flashcards, quiz, created_at, updated_at)
        VALUES (
          '${sessionData.id}',
          '${sessionData.fileName.replace(/'/g, "''")}',
          '${sessionData.fileType.replace(/'/g, "''")}',
          '${extractedTextEscaped}',
          '${flashcardsJson}'::JSON,
          '${quizJson}'::JSON,
          '${sessionData.createdAt}'::TIMESTAMP,
          '${sessionData.updatedAt}'::TIMESTAMP
        )
      `;
      
      connection.all(sql, (err) => {
        if (err) {
          console.error('Error inserting session:', err);
          reject(err);
          return;
        }
        resolve(sessionData);
      });
    }
  });
}

// Delete session
export async function deleteSession(id) {
  const { connection } = await initDB();
  
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM sessions WHERE id = '${id}'`;
    connection.all(sql, (err) => {
      if (err) {
        console.error('Error deleting session:', err);
        reject(err);
        return;
      }
      resolve({ success: true });
    });
  });
}

// Close database connection
export function closeDB() {
  if (connection) {
    connection.close();
    connection = null;
  }
  if (db) {
    db.close();
    db = null;
  }
}

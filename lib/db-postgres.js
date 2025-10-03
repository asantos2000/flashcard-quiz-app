import { Pool } from 'pg';

let pool = null;

// Initialize PostgreSQL connection pool
export async function initDB() {
  if (pool) {
    return pool;
  }

  const DATABASE_URL = process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in environment variables');
  }

  pool = new Pool({
    connectionString: DATABASE_URL,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  // Test connection
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL connected successfully');
    client.release();
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error);
    throw error;
  }

  return pool;
}

// Get all sessions
export async function getAllSessions() {
  const pool = await initDB();
  
  try {
    const result = await pool.query(
      'SELECT * FROM sessions ORDER BY updated_at DESC'
    );
    
    const sessions = result.rows.map(row => ({
      id: row.id,
      fileName: row.file_name,
      fileType: row.file_type,
      extractedText: row.extracted_text,
      flashcards: row.flashcards,
      quiz: row.quiz,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
    
    return sessions;
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
}

// Get session by ID
export async function getSessionById(id) {
  const pool = await initDB();
  
  try {
    const result = await pool.query(
      'SELECT * FROM sessions WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id,
      fileName: row.file_name,
      fileType: row.file_type,
      extractedText: row.extracted_text,
      flashcards: row.flashcards,
      quiz: row.quiz,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  } catch (error) {
    console.error('Error getting session by ID:', error);
    throw error;
  }
}

// Create or update session
export async function upsertSession(sessionData) {
  const pool = await initDB();
  
  try {
    const result = await pool.query(`
      INSERT INTO sessions (id, file_name, file_type, extracted_text, flashcards, quiz, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE
      SET file_name = EXCLUDED.file_name,
          file_type = EXCLUDED.file_type,
          extracted_text = EXCLUDED.extracted_text,
          flashcards = EXCLUDED.flashcards,
          quiz = EXCLUDED.quiz,
          updated_at = EXCLUDED.updated_at
      RETURNING *
    `, [
      sessionData.id,
      sessionData.fileName,
      sessionData.fileType,
      sessionData.extractedText,
      JSON.stringify(sessionData.flashcards || []),
      JSON.stringify(sessionData.quiz || []),
      sessionData.createdAt || new Date().toISOString(),
      sessionData.updatedAt || new Date().toISOString()
    ]);
    
    const row = result.rows[0];
    return {
      id: row.id,
      fileName: row.file_name,
      fileType: row.file_type,
      extractedText: row.extracted_text,
      flashcards: row.flashcards,
      quiz: row.quiz,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  } catch (error) {
    console.error('Error upserting session:', error);
    throw error;
  }
}

// Delete session
export async function deleteSession(id) {
  const pool = await initDB();
  
  try {
    await pool.query('DELETE FROM sessions WHERE id = $1', [id]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
}

// Close database connection pool
export async function closeDB() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('PostgreSQL connection pool closed');
  }
}

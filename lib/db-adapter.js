/**
 * Database adapter that automatically selects DuckDB or PostgreSQL
 * based on DATABASE_URL environment variable
 */

// Check which database to use
const usePostgres = !!process.env.DATABASE_URL;

let dbModule;

if (usePostgres) {
  console.log('🐘 Using PostgreSQL');
  dbModule = await import('./db-postgres.js');
} else {
  console.log('🦆 Using DuckDB');
  dbModule = await import('./db.js');
}

// Export all functions from the selected database module
export const {
  initDB,
  getAllSessions,
  getSessionById,
  upsertSession,
  deleteSession,
  closeDB
} = dbModule;

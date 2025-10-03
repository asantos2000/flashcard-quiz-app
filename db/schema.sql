-- ============================================
-- Flashcard Quiz App - PostgreSQL Schema
-- ============================================

-- Drop table if exists (cuidado em produção!)
DROP TABLE IF EXISTS sessions;

-- Create sessions table
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  file_name VARCHAR(500) NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  extracted_text TEXT NOT NULL,
  flashcards JSONB DEFAULT '[]'::jsonb,
  quiz JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_sessions_updated_at ON sessions(updated_at DESC);
CREATE INDEX idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX idx_sessions_file_name ON sessions(file_name);

-- Create a function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_sessions_updated_at 
  BEFORE UPDATE ON sessions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (se necessário)
-- GRANT ALL PRIVILEGES ON TABLE sessions TO flashcard_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO flashcard_user;

-- Insert sample data (opcional - remover em produção)
-- INSERT INTO sessions (id, file_name, file_type, extracted_text, flashcards, quiz, created_at, updated_at)
-- VALUES (
--   'sample-session-1',
--   'sample.pdf',
--   'application/pdf',
--   'Sample text content for testing',
--   '[{"front": "Question 1?", "back": "Answer 1"}]'::jsonb,
--   '[{"question": "What is 2+2?", "options": ["3", "4", "5", "6"], "correctAnswer": 1}]'::jsonb,
--   NOW(),
--   NOW()
-- );

-- Show table structure
\d sessions

-- Show indexes
\di

-- Count records
SELECT COUNT(*) FROM sessions;

COMMIT;

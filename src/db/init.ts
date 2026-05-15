import { db } from "./sqlite";

export const initDB = async () => {
  db.serialize(() => {
    /**
     * AI semantic embedding index
     *
     * SQLite:
     * 仅用于 AI retrieval
     */
    db.run(`
    CREATE TABLE IF NOT EXISTS semantic_embedding (
      id TEXT PRIMARY KEY,

      semantic_id TEXT,

      table_name TEXT,

      column_name TEXT,

      searchable_text TEXT,

      embedding TEXT
    )
    `)
  });
};

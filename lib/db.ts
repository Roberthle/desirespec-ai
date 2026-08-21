import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dbPath = path.join(process.cwd(), 'desirespec.db')
const db = new Database(dbPath)

// Enable WAL mode and foreign keys for high-performance concurrent reads
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS positions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    depth_rating INTEGER NOT NULL,
    clitoral_friction_rating INTEGER NOT NULL,
    intensity_level INTEGER NOT NULL,
    pelvic_tilt_deg INTEGER NOT NULL,
    thrust_vector TEXT NOT NULL,
    description TEXT NOT NULL,
    dirty_talk_cue TEXT NOT NULL,
    biomechanics TEXT NOT NULL,
    svg_variant TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS escalation_cards (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    phase TEXT NOT NULL,
    intensity INTEGER NOT NULL,
    action TEXT NOT NULL,
    sensory_cue TEXT NOT NULL,
    dirty_talk TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS nerve_zones (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    density_rating INTEGER NOT NULL,
    touch_type TEXT NOT NULL,
    description TEXT NOT NULL,
    arousal_boost INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS push_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    endpoint TEXT UNIQUE NOT NULL,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_positions_category ON positions(category);
  CREATE INDEX IF NOT EXISTS idx_cards_phase ON escalation_cards(phase);
`)

export default db

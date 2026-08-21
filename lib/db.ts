import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), 'data', 'desirespec.db')
const SEED_PATH = path.join(process.cwd(), 'seed.sql')

let _db: Database.Database | null = null

export function getDb(): Database.Database {
  if (_db) return _db

  // Ensure data directory exists
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const isNew = !fs.existsSync(DB_PATH)
  _db = new Database(DB_PATH)
  _db.pragma('journal_mode = WAL')
  _db.pragma('foreign_keys = ON')

  if (isNew && fs.existsSync(SEED_PATH)) {
    const seed = fs.readFileSync(SEED_PATH, 'utf-8')
    _db.exec(seed)
  }

  return _db
}

// ─── Typed query helpers ────────────────────────────────────────────

export interface Technique {
  id: number
  slug: string
  title: string
  category: string
  level: number
  summary: string
  detail: string
  nerve_zones: string
  tags: string
  created_at: string
}

export interface NerveZone {
  id: number
  slug: string
  name: string
  pathway: string
  body_region: string
  silhouette: string
  sensitivity: number
  svg_cx: number
  svg_cy: number
  description: string
  pressure_tips: string
}

export interface EscalationCard {
  id: number
  slug: string
  level: number
  level_name: string
  title: string
  subtitle: string
  body: string
  archetype: string
  pacing: string
  sort_order: number
}

export interface DesireArchetype {
  id: number
  slug: string
  name: string
  tagline: string
  description: string
  accelerators: string
  brakes: string
  suggestions: string
}

export function getTechniques(limit = 20, offset = 0): Technique[] {
  return getDb()
    .prepare('SELECT * FROM techniques ORDER BY level, id LIMIT ? OFFSET ?')
    .all(limit, offset) as Technique[]
}

export function searchTechniques(query: string): Technique[] {
  return getDb()
    .prepare(`
      SELECT t.* FROM techniques t
      JOIN techniques_fts fts ON t.id = fts.rowid
      WHERE techniques_fts MATCH ?
      ORDER BY rank
      LIMIT 20
    `)
    .all(query) as Technique[]
}

export function getNerveZones(silhouette = 'neutral'): NerveZone[] {
  return getDb()
    .prepare(
      "SELECT * FROM nerve_zones WHERE silhouette = ? OR silhouette = 'neutral' ORDER BY sensitivity DESC"
    )
    .all(silhouette) as NerveZone[]
}

export function getEscalationCards(level?: number): EscalationCard[] {
  if (level !== undefined) {
    return getDb()
      .prepare('SELECT * FROM escalation_cards WHERE level = ? ORDER BY sort_order')
      .all(level) as EscalationCard[]
  }
  return getDb()
    .prepare('SELECT * FROM escalation_cards ORDER BY level, sort_order')
    .all() as EscalationCard[]
}

export function getDesireArchetypes(): DesireArchetype[] {
  return getDb()
    .prepare('SELECT * FROM desire_archetypes ORDER BY id')
    .all() as DesireArchetype[]
}

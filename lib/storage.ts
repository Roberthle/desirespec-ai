import { openDB, IDBPDatabase } from 'idb'

const DB_NAME = 'desirespec'
const DB_VERSION = 1

interface DesireSpecDB {
  diagnostics: {
    key: string
    value: DiagnosticsResult
    indexes: { 'by-date': string }
  }
  saved_decks: {
    key: string
    value: SavedDeck
  }
  couples_sync: {
    key: string
    value: CouplesSyncData
  }
  mood_presets: {
    key: string
    value: MoodPreset
  }
}

export interface DiagnosticsResult {
  id: string
  date: string
  archetype: string
  scores: {
    novelty: number
    sensory: number
    emotional_safety: number
    pacing: number
    environmental: number
  }
  accelerators: string[]
  brakes: string[]
}

export interface SavedDeck {
  id: string
  name: string
  cards: string[] // card slugs
  level: number
  saved_at: string
}

export interface CouplesSyncData {
  id: string
  items: {
    id: string
    category: string
    label: string
    response: 'yes' | 'no' | 'maybe' | null
  }[]
  created_at: string
  partner_responses?: {
    id: string
    response: 'yes' | 'no' | 'maybe' | null
  }[]
}

export interface MoodPreset {
  id: string
  name: string
  lighting_temp: number
  lighting_intensity: number
  soundscape: string
  tactile_phase: number
  saved_at: string
}

let _db: IDBPDatabase<DesireSpecDB> | null = null

async function getStorage(): Promise<IDBPDatabase<DesireSpecDB>> {
  if (_db) return _db

  _db = await openDB<DesireSpecDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('diagnostics')) {
        const s = db.createObjectStore('diagnostics', { keyPath: 'id' })
        s.createIndex('by-date', 'date')
      }
      if (!db.objectStoreNames.contains('saved_decks')) {
        db.createObjectStore('saved_decks', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('couples_sync')) {
        db.createObjectStore('couples_sync', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('mood_presets')) {
        db.createObjectStore('mood_presets', { keyPath: 'id' })
      }
    },
  })

  return _db
}

// ─── Diagnostics ─────────────────────────────────────────────────────

export async function saveDiagnosticsResult(result: DiagnosticsResult): Promise<void> {
  const db = await getStorage()
  await db.put('diagnostics', result)
}

export async function getLatestDiagnosticsResult(): Promise<DiagnosticsResult | undefined> {
  const db = await getStorage()
  const all = await db.getAllFromIndex('diagnostics', 'by-date')
  return all.at(-1)
}

export async function getAllDiagnosticsResults(): Promise<DiagnosticsResult[]> {
  const db = await getStorage()
  return db.getAllFromIndex('diagnostics', 'by-date')
}

// ─── Couples Sync ─────────────────────────────────────────────────────

export async function saveCouplesSync(data: CouplesSyncData): Promise<void> {
  const db = await getStorage()
  await db.put('couples_sync', data)
}

export async function getCouplesSync(id: string): Promise<CouplesSyncData | undefined> {
  const db = await getStorage()
  return db.get('couples_sync', id)
}

export async function getAllCoupleSyncs(): Promise<CouplesSyncData[]> {
  const db = await getStorage()
  return db.getAll('couples_sync')
}

// ─── Mood Presets ─────────────────────────────────────────────────────

export async function saveMoodPreset(preset: MoodPreset): Promise<void> {
  const db = await getStorage()
  await db.put('mood_presets', preset)
}

export async function getMoodPresets(): Promise<MoodPreset[]> {
  const db = await getStorage()
  return db.getAll('mood_presets')
}

export async function deleteMoodPreset(id: string): Promise<void> {
  const db = await getStorage()
  await db.delete('mood_presets', id)
}

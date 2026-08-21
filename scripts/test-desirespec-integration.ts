import db from '../lib/db'
import { POSITIONS_DATA } from '../lib/positionsData'

console.log('🧪 Running DesireSpec AI Sister Site Integration Test Harness...')

// Test 1: Verify SQLite Database Persistence
const rowCount = db.prepare('SELECT COUNT(*) as count FROM positions').get() as { count: number }
if (rowCount.count < 26) {
  throw new Error(`❌ Database test failed: Expected >= 26 positions, got ${rowCount.count}`)
}
console.log(`✅ Test 1 (Database): Verified ${rowCount.count} positions indexed in desirespec.db.`)

// Test 2: Verify "👑 Her in Control" Category Parity
const herInControlPositions = db.prepare(`SELECT * FROM positions WHERE category = '👑 Her in Control'`).all()
if (herInControlPositions.length < 6) {
  throw new Error(`❌ 'Her in Control' category test failed: Expected >= 6 positions, got ${herInControlPositions.length}`)
}
console.log(`✅ Test 2 (Category Parity): Verified ${herInControlPositions.length} positions in '👑 Her in Control'.`)

// Test 3: Programmatic SEO Slugs
const allIds = POSITIONS_DATA.map((p) => p.id)
const duplicates = allIds.filter((id, index) => allIds.indexOf(id) !== index)
if (duplicates.length > 0) {
  throw new Error(`❌ Duplicate slug test failed: Found duplicates: ${duplicates.join(', ')}`)
}
console.log(`✅ Test 3 (pSEO Slugs): All ${allIds.length} position slugs are unique and valid for URL routing.`)

// Test 4: Kinematic Angle Boundaries
for (const p of POSITIONS_DATA) {
  if (p.pelvicTiltDeg < 0 || p.pelvicTiltDeg > 90) {
    throw new Error(`❌ Kinematic angle test failed on ${p.name}: Invalid tilt ${p.pelvicTiltDeg}°`)
  }
}
console.log(`✅ Test 4 (Biomechanical Vectors): All pelvic tilt degrees bounded between 0° and 90°.`)

console.log('\n🎉 ALL SISTER SUITE INTEGRATION TESTS PASSED 100%!')

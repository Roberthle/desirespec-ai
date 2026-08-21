import db from '../lib/db'
import { POSITIONS_DATA } from '../lib/positionsData'

console.log('⚡ Seeding DesireSpec AI SQLite Database (desirespec.db)...')

// Seed Positions matching PositionItem interface
const insertPosition = db.prepare(`
  INSERT OR REPLACE INTO positions (
    id, name, category, depth_rating, clitoral_friction_rating, 
    intensity_level, pelvic_tilt_deg, thrust_vector, description, 
    dirty_talk_cue, biomechanics, svg_variant
  ) VALUES (
    @id, @name, @category, @depthRating, @clitoralFrictionRating,
    @intensityLevel, @pelvicTiltDeg, @thrustVector, @tagline,
    @dirtyTalkCue, @eroticMechanics, @svgVariant
  )
`)

const insertManyPositions = db.transaction((positions) => {
  for (const pos of positions) {
    insertPosition.run(pos)
  }
})

insertManyPositions(POSITIONS_DATA)
console.log(`✅ Seeded ${POSITIONS_DATA.length} positions successfully.`)

// Verify query
const total = db.prepare('SELECT COUNT(*) as count FROM positions').get() as { count: number }
console.log(`🎯 Total positions in database: ${total.count}`)

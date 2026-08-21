-- DesireSpec AI — SQLite Schema & Seed Data
-- Run with: sqlite3 ./data/desirespec.db < seed.sql

PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;

-- ─────────────────────────────────────────────
-- TABLES
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS techniques (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  title       TEXT    NOT NULL,
  category    TEXT    NOT NULL,  -- 'touch', 'breath', 'vocal', 'gaze', 'movement'
  level       INTEGER NOT NULL DEFAULT 1, -- 1=beginner .. 5=advanced
  summary     TEXT    NOT NULL,
  detail      TEXT    NOT NULL,
  nerve_zones TEXT    NOT NULL DEFAULT '[]', -- JSON array of zone slugs
  tags        TEXT    NOT NULL DEFAULT '[]', -- JSON array of tags
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE VIRTUAL TABLE IF NOT EXISTS techniques_fts USING fts5(
  title, summary, detail, tags,
  content='techniques', content_rowid='id'
);

-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS nerve_zones (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  name        TEXT    NOT NULL,
  pathway     TEXT    NOT NULL, -- 'pudendal', 'vagus', 'sacral', 'trigeminal', 'ulnar'
  body_region TEXT    NOT NULL, -- 'face', 'neck', 'chest', 'abdomen', 'inner_thigh', 'lower_back', 'hands', 'feet'
  silhouette  TEXT    NOT NULL DEFAULT 'neutral', -- 'male', 'female', 'neutral'
  sensitivity INTEGER NOT NULL DEFAULT 5, -- 1-10 scale
  svg_cx      REAL    NOT NULL, -- SVG center X (0-100 viewBox)
  svg_cy      REAL    NOT NULL, -- SVG center Y (0-100 viewBox)
  description TEXT    NOT NULL,
  pressure_tips TEXT  NOT NULL DEFAULT '[]' -- JSON array
);

-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS escalation_cards (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  level       INTEGER NOT NULL, -- 1-5
  level_name  TEXT    NOT NULL,
  title       TEXT    NOT NULL,
  subtitle    TEXT    NOT NULL,
  body        TEXT    NOT NULL,
  archetype   TEXT    NOT NULL DEFAULT 'universal', -- which desire archetype this fits
  pacing      TEXT    NOT NULL DEFAULT 'slow_burn', -- 'slow_burn' | 'high_tension'
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS desire_archetypes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  name        TEXT    NOT NULL,
  tagline     TEXT    NOT NULL,
  description TEXT    NOT NULL,
  accelerators TEXT   NOT NULL DEFAULT '[]', -- JSON array
  brakes      TEXT    NOT NULL DEFAULT '[]', -- JSON array
  suggestions TEXT    NOT NULL DEFAULT '[]'  -- JSON array of weekly suggestions
);

-- ─────────────────────────────────────────────
-- SEED: nerve_zones
-- ─────────────────────────────────────────────

INSERT OR IGNORE INTO nerve_zones
  (slug, name, pathway, body_region, silhouette, sensitivity, svg_cx, svg_cy, description, pressure_tips)
VALUES
  ('nape','Nape of Neck','vagus','neck','neutral',9,50,18,
   'Dense concentration of vagus nerve branches. Gentle touch here triggers parasympathetic calm and heightened arousal simultaneously.',
   '["Light fingertip tracing from hairline downward","Warm breath held 2 inches from skin","Slow circular pressure with pad of thumb"]'),

  ('inner-wrist','Inner Wrist','ulnar','hands','neutral',7,18,54,
   'Rich network of ulnar nerve endings sensitive to temperature contrast and light tracing pressure.',
   '["Ice cube trace followed by warm breath","Feather-light fingertip drawing slow spirals","Light nail-drag along tendon line"]'),

  ('sacral','Sacral Plexus','sacral','lower_back','neutral',8,50,70,
   'The sacral plexus governs pelvic floor sensation. Deep warmth application here amplifies full-body arousal pathways.',
   '["Firm palm pressure held 10 seconds","Slow circular massage with moderate pressure","Warm compress then breath"]'),

  ('inner-elbow','Inner Elbow (Antecubital)','ulnar','hands','neutral',6,20,48,
   'Medial cutaneous nerve branches make this crease highly responsive to light stimulation.',
   '["Slow fingertip trace along the crease","Gentle lip contact","Temperature contrast: cool then warm"]'),

  ('scalp-temples','Temples & Scalp','trigeminal','face','neutral',8,50,10,
   'Trigeminal nerve branches across the scalp create whole-head sensation cascades from localized pressure.',
   '["Fingertip circular scalp massage","Gentle hair-root tugging","Warm palm cupped over temple"]'),

  ('inner-thigh','Inner Thigh','pudendal','inner_thigh','neutral',9,35,72,
   'Pudendal nerve proximity makes the inner thigh one of the most erotically charged non-genital zones.',
   '["Slow upward fingertip trace stopping before apex","Alternating warm breath and cool air","Firm gripping pressure moving inward"]'),

  ('lower-abdomen','Lower Abdomen','sacral','abdomen','neutral',7,50,60,
   'Hypogastric nerve network creates deep pressure sensitivity. Responds strongly to rhythm and temperature.',
   '["Slow circular palm pressure","Warm compress held 20 seconds","Fingertip tracing in figure-8 patterns"]'),

  ('behind-ear','Behind Ear (Mastoid)','vagus','face','neutral',8,72,16,
   'Auricular branch of the vagus nerve creates immediate parasympathetic activation with minimal stimulation.',
   '["Lips grazed lightly behind ear","Warm breath exhaled slowly","Light fingernail trace from ear to collarbone"]');

-- ─────────────────────────────────────────────
-- SEED: techniques
-- ─────────────────────────────────────────────

INSERT OR IGNORE INTO techniques
  (slug, title, category, level, summary, detail, nerve_zones, tags)
VALUES
  ('feather-trace','The Feather Trace','touch',1,
   'Barely-there fingertip contact that activates C-tactile afferent nerve fibers for maximum arousal with minimum pressure.',
   'Hold your hand 2mm above the skin surface—close enough that warmth radiates but contact is intermittent. Move at 3-5 cm/second. The nervous system''s C-tactile afferents respond maximally to this exact velocity range. Start at neutral zones (forearm, shoulder) and progressively move toward higher-sensitivity areas.',
   '["nape","inner-wrist","inner-elbow"]',
   '["beginner","C-tactile","slow","sensory"]'),

  ('vagus-breath','The Vagus Breath Sequence','breath',2,
   'Combining slow exhalation with proximal touch to the vagus nerve pathway to simultaneously calm and arouse.',
   'Place warm lips 1 inch from nape of neck. Exhale slowly for 4 seconds. Pause 2 seconds. The dual parasympathetic activation (breathing + vagus zone) creates a unique arousal state of deep calm simultaneous excitement—what somatic therapists call "ventral vagal arousal."',
   '["nape","behind-ear"]',
   '["breath","vagus","intermediate","calming"]'),

  ('sacral-warmth','Sacral Heat Anchor','touch',2,
   'Sustained warm palm pressure over the sacral plexus to trigger deep pelvic floor relaxation and arousal.',
   'Place a warm (not hot) palm flat over the sacrum—the triangular bone at the base of the spine. Apply firm, steady pressure for 30-60 seconds without movement. The sacral plexus governs pelvic floor tone; sustained warmth here creates involuntary relaxation cascades that deepen physical receptivity.',
   '["sacral","lower-abdomen"]',
   '["touch","sacral","warmth","parasympathetic"]'),

  ('tension-arc','The Tension Arc','touch',3,
   'Slow approach toward high-sensitivity zones with deliberate pauses creating anticipatory arousal.',
   'Begin touch at a distal neutral zone. Move slowly inward over 60-90 seconds, pausing for 5-10 seconds at each intermediate point. Never rush to the destination. The anticipatory nervous system response (dopaminergic anticipation) generates more arousal than contact itself in most individuals. Stop 2 inches short of the target zone for maximum effect.',
   '["inner-thigh","inner-wrist","lower-abdomen"]',
   '["advanced","dopamine","anticipation","pacing"]'),

  ('temperature-contrast','Temperature Contrast Protocol','touch',3,
   'Alternating thermal stimulation that dramatically amplifies nerve sensitivity and conscious attention.',
   'Use an ice cube lightly traced over the skin for 10 seconds, followed immediately by warm breath or warm palm contact for 10 seconds. Alternate 3-4 cycles. Thermoreceptors adapt rapidly—contrast resets adaptation and creates intense conscious sensation from areas that would otherwise become habituated.',
   '["inner-wrist","inner-elbow","inner-thigh"]',
   '["temperature","contrast","sensory","thermoreceptor"]'),

  ('scalp-activation','Full Scalp Activation','touch',1,
   'Comprehensive scalp massage targeting trigeminal nerve distribution for whole-head relaxation and connection.',
   'Use all fingertips simultaneously across the scalp. Begin at the temples with slow circular motions (5cm diameter), move backward to crown, then down to base of skull. Apply moderate pressure—enough to move the scalp skin rather than just surface touch. End with gentle hair-root tension holds.',
   '["scalp-temples"]',
   '["scalp","trigeminal","beginner","relaxation"]'),

  ('gaze-anchor','The 6-Second Gaze Anchor','gaze',2,
   'Sustained eye contact beyond social norms triggers oxytocin release and deepens emotional attunement.',
   'Maintain soft, unfocused eye contact for 6+ seconds during conversation or physical connection. Avoid hard staring—let your gaze soften so you''re "seeing" the whole face rather than fixating on one eye. Research shows 6 seconds is the threshold for oxytocin cascade initiation. Combine with slow breathing to prevent the gaze from feeling confrontational.',
   '[]',
   '["gaze","oxytocin","connection","emotional"]'),

  ('vocal-resonance','Low Vocal Resonance','vocal',2,
   'Deliberate lowering of vocal pitch during intimate conversation to activate subcortical arousal pathways.',
   'Speak from your chest rather than your throat—feel the vibration in your sternum. Drop your pitch 15-20% below conversational baseline. Slow your speaking pace by 30%. Low-frequency vocal vibration (80-200Hz) activates auditory and somatosensory pathways simultaneously and is universally processed as an intimacy signal across cultures.',
   '[]',
   '["vocal","pitch","arousal","communication"]'),

  ('micro-calibration','Micro-Calibration Reading','movement',1,
   'Training attention on micro-expressions and subtle body language for real-time desire feedback.',
   'During physical interaction, pause every 60-90 seconds and do a 3-point check: (1) breathing—has it deepened or quickened? (2) muscle tone—are they leaning in or subtly pulling back? (3) skin—flushing, goosebumps, or pallor? These involuntary signals are more accurate than verbal confirmation and allow real-time adjustment without breaking connection.',
   '[]',
   '["reading","calibration","communication","awareness"]'),

  ('progressive-undress','Progressive Disclosure Arc','movement',4,
   'Structured progressive removal of physical and psychological barriers to create sustained arousal escalation.',
   'Map physical and psychological "layers" and remove them in sequence with significant time between each layer. Physical layers: outer clothing → inner layers → specific zones. Psychological layers: humor → vulnerability → fantasy disclosure → active desire expression. The key is treating each layer as a destination, not a waypoint—fully inhabiting each stage before moving forward.',
   '["inner-thigh","sacral","nape"]',
   '["advanced","progressive","pacing","psychological"]');

-- FTS sync
INSERT INTO techniques_fts(rowid, title, summary, detail, tags)
SELECT id, title, summary, detail, tags FROM techniques;

-- ─────────────────────────────────────────────
-- SEED: escalation_cards
-- ─────────────────────────────────────────────

INSERT OR IGNORE INTO escalation_cards
  (slug, level, level_name, title, subtitle, body, archetype, pacing, sort_order)
VALUES
  -- Level 1: Witty Banter & Micro-Calibrations
  ('l1-eye-contact','1','Witty Banter','The 3-Second Hold','Eye Contact Calibration',
   'Hold eye contact 1 second longer than comfortable, then look away with a slight smile. The gap between "natural" and "intentional" is where tension begins.',
   'universal','slow_burn',1),

  ('l1-name-effect','1','Witty Banter','The Name Drop','Personalization Signal',
   'Use their first name once, mid-sentence, in an unexpected moment. "And honestly, [Name]—you''re the only person I''d debate this with." Names trigger a distinct neural response—attention sharpens involuntarily.',
   'universal','slow_burn',2),

  ('l1-mirroring','1','Witty Banter','Subtle Mirroring','Body Language Sync',
   'Slowly adopt their posture, gesture tempo, and breathing rate over 5-10 minutes. When mirroring is unconsciously detected, it creates profound feelings of being understood and seen.',
   'universal','slow_burn',3),

  ('l1-banter','1','Witty Banter','The Playful Challenge','Light Intellectual Tension',
   'Disagree with something minor and defend your position with amusement, not conviction. "I think you''re completely wrong about that—and I''m delighted by it." Tension + warmth = magnetic polarity.',
   'universal','slow_burn',4),

  -- Level 2: Sensory Awakening
  ('l2-touch-intro','2','Sensory Awakening','The First Touch Ritual','Intentional Contact',
   'Reach across to point at something and let your hand land on their forearm for 2 seconds longer than necessary. Gauge: do they pull away, stay neutral, or lean slightly in? Your entire next sequence depends on this data point.',
   'universal','slow_burn',1),

  ('l2-breath-sync','2','Sensory Awakening','Breath Synchrony','Parasympathetic Attunement',
   'During a quiet moment, consciously slow your own breathing. Within 60-90 seconds, their breathing will often entrain to yours. This creates a sub-conscious physiological bond without any words.',
   'universal','slow_burn',2),

  ('l2-scent','2','Sensory Awakening','The Scent Moment','Olfactory Priming',
   'Lean in close to say something—close enough that they register your scent, then pull back before the moment becomes uncomfortable. Olfaction is the only sense with direct limbic system access—it bypasses rational filtering entirely.',
   'universal','slow_burn',3),

  -- Level 3: Emotional Deepening
  ('l3-vulnerability','3','Emotional Deepening','Strategic Vulnerability','Authentic Disclosure',
   'Share something real that carries mild risk—a genuine fear, an unusual dream, a moment of past embarrassment. Vulnerability is contagious; authentic disclosure activates mirror neurons and creates rapid emotional reciprocity.',
   'universal','slow_burn',1),

  ('l3-fantasy-adjacent','3','Emotional Deepening','The Adjacent Fantasy','Imagination Activation',
   'Describe a scenario that is sensory and slightly provocative but grounded in plausibility: "I keep thinking about what it would be like to..." Let the sentence breathe before completing it. Imagination is the primary erogenous zone.',
   'universal','high_tension',2),

  -- Level 4: Physical Escalation
  ('l4-anticipation','4','Physical Escalation','The Pause Before','Anticipatory Arousal',
   'Move slowly toward contact—a hand, a face, a neck—and stop 2 inches short. Hold that position for 3-5 seconds. Let anticipation do the work. The dopaminergic anticipation state is neurologically more intense than arrival.',
   'universal','high_tension',1),

  ('l4-breath-on-skin','4','Physical Escalation','Breath on Skin','Thermal Nerve Activation',
   'Exhale slowly 1 inch from their nape or neck, without contact. The warm air activates vagus nerve thermoreceptors and creates an involuntary response that no amount of direct touch can replicate.',
   'universal','high_tension',2),

  -- Level 5: Deep Somatic Intimacy
  ('l5-nervous-system','5','Deep Somatic Intimacy','Full Nervous System Surrender','Parasympathetic Peak',
   'The goal is no longer pleasure-seeking but nervous-system merging. Synchronize breath, heartrate (wrist-to-chest contact), and movement tempo. When two nervous systems attune completely, touch becomes secondary—the field between bodies carries the sensation.',
   'universal','slow_burn',1),

  ('l5-bedroom-suspense','5','Deep Somatic Intimacy','Bedroom Suspense Architecture','Environment as Foreplay',
   'Design the physical environment before arrival: 2200K amber light at 15% intensity, ambient low-frequency sound (binaural 40Hz), minimal exposed surfaces. The nervous system begins arousal response to environmental cues 15-20 minutes before physical contact—environment IS foreplay.',
   'universal','slow_burn',2);

-- ─────────────────────────────────────────────
-- SEED: desire_archetypes
-- ─────────────────────────────────────────────

INSERT OR IGNORE INTO desire_archetypes
  (slug, name, tagline, description, accelerators, brakes, suggestions)
VALUES
  ('sensory-explorer','Sensory Explorer','I live in my body, fully.',
   'You are driven by rich physical sensation—texture, temperature, scent, and rhythm are your primary pathways to arousal and connection. Novelty in sensory input keeps you engaged.',
   '["New sensory environments","Temperature contrast play","Varied textures and fabrics","Music with strong rhythmic base","Tactile variety and surprise"]',
   '["Repetitive touch patterns","Sterile or clinical environments","Emotional disconnection during touch","Rushed sequences without sensory buildup"]',
   '["Design one new sensory environment this week (lighting, scent, texture)","Introduce temperature contrast into a single encounter","Explore a new touch technique from the techniques library"]'),

  ('emotional-attacher','Emotional Attacher','Connection unlocks everything.',
   'Emotional safety and genuine felt-connection are the prerequisite for your full physical opening. Feeling truly seen, understood, and chosen is your most powerful accelerator.',
   '["Deep conversation before physical contact","Explicit verbal appreciation","Eye contact and presence","Feeling emotionally prioritized","Shared vulnerability"]',
   '["Feeling rushed or like a body rather than a person","Unresolved conflict or emotional tension","Feeling like a task to be completed","Distraction or phone presence during intimacy"]',
   '["Schedule a 20-minute connection conversation before intimacy this week","Practice the 6-second gaze anchor once daily","Write and share one genuine appreciation to your partner"]'),

  ('novelty-seeker','Novelty Seeker','Surprise me—I''ll follow.',
   'Predictability is your primary brake. New locations, new sequences, new roleplay contexts, and unexpected initiations keep your desire system activated. Routine is the enemy.',
   '["Unexpected initiation times or contexts","New environments and locations","Novel roleplay frameworks","Surprise elements in familiar routines","Learning new techniques together"]',
   '["Predictable schedules or routines","Same location, same sequence","Long gaps without new input","Feeling like desire has become transactional"]',
   '["Plan one unexpected initiation context this week","Introduce one entirely new technique from a category you haven''t explored","Change one environmental variable: location, time of day, or lighting"]'),

  ('slow-burn-devotee','Slow Burn Devotee','The journey is the destination.',
   'Extended foreplay, gradual escalation, and luxurious pacing are central to your arousal architecture. Being rushed destroys the experience. You thrive with extended anticipation arcs.',
   '["Long, unhurried buildup sequences","Deliberate pacing and patience from partner","Extended sensory engagement without goal-orientation","Feeling no time pressure","Anticipatory touch and almost-contact moments"]',
   '["Goal-oriented or performance-focused encounters","Time pressure","Skipping straight to high intensity","Partner impatience or rushing cues"]',
   '["Set a 45-minute minimum for a single encounter this week with no stated endpoint","Practice the tension arc technique (slow approach with deliberate pauses)","Agree on a ''no rushing'' touchstone word with your partner"]'),

  ('cerebral-fantasist','Cerebral Fantasist','The mind is my erogenous zone.',
   'Imagination, narrative, and psychological engagement drive your desire more than physical input alone. You are aroused by context, story, and mental scenarios more than technique.',
   '["Verbal fantasy narratives","Reading or co-creating erotic fiction","Detailed scenario planning and imagination","Psychological tension and narrative suspense","Intellectual banter as foreplay"]',
   '["Pure physical focus without mental engagement","Silence during encounters when you prefer verbal connection","Feeling like a passive recipient of technique without narrative context"]',
   '["Co-write a short fantasy scenario with your partner this week","Try the adjacent fantasy technique from the escalation deck","Read one piece of literary erotica together aloud"]'),

  ('power-dynamic-navigator','Power Dynamic Navigator','I know what I want—and how I want to give it.',
   'You are energized by clear power dynamics—either taking loving control or surrendering it completely. The explicit acknowledgment and consensual navigation of these dynamics is deeply arousing.',
   '["Clear consensual power role agreements","Explicit verbal acknowledgment of dynamic","Physical control signals (holding, guiding)","Trust established through consistent reliability","Yes/No/Maybe checklist completion with partner"]',
   '["Ambiguity about roles or desires","Inconsistent follow-through from partner","Unexplored desires due to fear of judgment","Lack of explicit consent conversation beforehand"]',
   '["Complete the Couples Sync checklist together this week","Have one explicit desire conversation using I-statements only","Establish one clear consensual signal or word for dynamic navigation"]');

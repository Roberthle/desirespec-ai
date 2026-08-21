'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Peer as PeerType, DataConnection } from 'peerjs'

// ─── Types ────────────────────────────────────────────────────────────

type Vote = 'yes' | 'curious' | 'pass' | null
type Phase = 'lobby' | 'waiting' | 'game' | 'reveal' | 'playbook'
type Role = 'host' | 'joiner' | null

interface Card {
  id: number
  level: 1 | 2 | 3 | 4
  levelLabel: string
  title: string
  description: string
  technique: { step: string; detail: string }[]
}

interface SyncMessage {
  type: 'vote' | 'next' | 'ready' | 'ping'
  cardId?: number
  vote?: Vote
}

interface MatchResult {
  card: Card
  myVote: Vote
  partnerVote: Vote
}

// ─── Card deck — 20 cards, 4 levels ──────────────────────────────────

const DECK: Card[] = [
  // Level 1 — Flirtation (5)
  {
    id: 1, level: 1, levelLabel: 'Flirtation',
    title: 'The Lingering Look',
    description: 'Sustained eye contact held 2 seconds past what\'s comfortable — the moment where everything becomes charged.',
    technique: [
      { step: 'Eye contact threshold', detail: 'Maintain for 6 seconds. Break slowly — let your gaze drop to their mouth, then return.' },
      { step: 'Micro-expression read', detail: 'Watch for pupil dilation and a slight parting of lips — the parasympathetic signal.' },
      { step: 'The re-engage', detail: 'After 3 seconds, re-initiate contact with a small exhale — let your chest drop visibly.' },
    ],
  },
  {
    id: 2, level: 1, levelLabel: 'Flirtation',
    title: 'Breath on Skin',
    description: 'Speaking close enough that your breath grazes their neck or ear — no contact, only warmth and proximity.',
    technique: [
      { step: 'Distance calibration', detail: 'Position your mouth 3–5cm from their ear. Speak at half your normal volume.' },
      { step: 'Breath control', detail: 'Exhale slowly before you speak — the warmth primes the vagus nerve pathway.' },
      { step: 'Exit slowly', detail: 'Pull back at 1/3rd of the speed you approached. The gap creates the tension.' },
    ],
  },
  {
    id: 3, level: 1, levelLabel: 'Flirtation',
    title: 'The Name Drop',
    description: 'Saying their name mid-sentence, unexpectedly, in a lower register — the psychological snap to attention.',
    technique: [
      { step: 'Timing', detail: 'Use the name mid-thought — never at the start. The interruption amplifies the impact.' },
      { step: 'Register drop', detail: 'Lower your voice one full tone from your normal pitch. The chest voice carries authority.' },
      { step: 'Pause after', detail: 'Hold silence for 2 full seconds after the name. Let it land.' },
    ],
  },
  {
    id: 4, level: 1, levelLabel: 'Flirtation',
    title: 'Deliberate Proximity',
    description: 'Positioning yourself inside personal space (40cm) without explanation — letting the tension explain itself.',
    technique: [
      { step: 'Enter slowly', detail: 'Cross into their personal space over 4+ seconds. No sudden movements.' },
      { step: 'Anchor', detail: 'Find a reason to stay — gesture at something, lean against the same surface.' },
      { step: 'Don\'t acknowledge it', detail: 'Speak normally. The charged silence is the technique — don\'t name it.' },
    ],
  },
  {
    id: 5, level: 1, levelLabel: 'Flirtation',
    title: 'Touch Punctuation',
    description: 'Brief, deliberate hand contact at the end of a sentence — making touch a grammatical choice, not an accident.',
    technique: [
      { step: 'Location', detail: 'Forearm or upper back — never hand (too expected). 1.5 seconds maximum.' },
      { step: 'Pressure', detail: 'Firm enough to be intentional. Feather-light reads as nervous.' },
      { step: 'Retract completely', detail: 'Remove fully — no trailing fingertips. The clean exit is the signature.' },
    ],
  },
  // Level 2 — Sensory Touch (5)
  {
    id: 6, level: 2, levelLabel: 'Sensory Touch',
    title: 'Spine Tracing',
    description: 'A single continuous line drawn with one fingertip down the length of the spine — sacral plexus activation.',
    technique: [
      { step: 'Speed', detail: 'Cover the full spine in 6–8 seconds. Slower than you think. Let sensation register.' },
      { step: 'Pressure gradient', detail: 'Begin light at the nape, increase pressure at the thoracic curve, feather out at the sacrum.' },
      { step: 'Return differently', detail: 'Never retrace. Use the flat of your palm on the return — different receptor activation.' },
    ],
  },
  {
    id: 7, level: 2, levelLabel: 'Sensory Touch',
    title: 'Scalp Pressure Map',
    description: 'Distributed fingertip pressure across the scalp — triggers a cascade of parasympathetic release.',
    technique: [
      { step: 'Start at the temples', detail: 'Circular pressure, 2cm diameter circles. 5 full rotations before moving.' },
      { step: 'Migrate posteriorly', detail: 'Move toward the occipital base — the highest density of nerve endings on the scalp.' },
      { step: 'Still-point hold', detail: 'Two thumbs at the base of the skull — sustained upward pressure for 20 seconds. This induces observable full-body relaxation.' },
    ],
  },
  {
    id: 8, level: 2, levelLabel: 'Sensory Touch',
    title: 'Inner Wrist Trace',
    description: 'Following the visible vein pathways of the inner wrist with a single fingertip — ulnar nerve territory.',
    technique: [
      { step: 'Positioning', detail: 'Take their wrist gently — hold at the sides, not underneath. This keeps the inner surface exposed.' },
      { step: 'Speed of trace', detail: '2–3cm per second. Follow the visible pathway — don\'t invent a route.' },
      { step: 'End with pressure', detail: 'Finish at the pulse point. Hold your fingertip there for 5 seconds — they will feel their own heartbeat through your touch.' },
    ],
  },
  {
    id: 9, level: 2, levelLabel: 'Sensory Touch',
    title: 'Temperature Contrast',
    description: 'Alternating warm breath and cool touch on the same patch of skin — the contrast amplifies sensitivity 3×.',
    technique: [
      { step: 'Sequence', detail: 'Exhale warm breath on skin → 3 second pause → place cool fingertips on the exact same area.' },
      { step: 'Locations', detail: 'Inner arm, collarbone, inner thigh. High nerve density, low desensitization.' },
      { step: 'Repeat', detail: 'Three contrast cycles on one location before moving. Adaptation reduces after cycle 3.' },
    ],
  },
  {
    id: 10, level: 2, levelLabel: 'Sensory Touch',
    title: 'Nape Hold',
    description: 'A sustained, firm palm on the nape of the neck — activates the vagus nerve and induces deep safety response.',
    technique: [
      { step: 'Application', detail: 'Full palm contact — fingers pointing upward. The heel of the hand sits at the C7 vertebra.' },
      { step: 'Pressure', detail: 'Firm and consistent — 60% of your maximum grip. No movement. Just sustained heat and pressure.' },
      { step: 'Duration', detail: 'Minimum 30 seconds. The physiological response fully engages at 20–25 seconds.' },
    ],
  },
  // Level 3 — Bedroom Dynamics (5)
  {
    id: 11, level: 3, levelLabel: 'Bedroom Dynamics',
    title: 'The Controlled Pause',
    description: 'Stopping all action at peak intensity — holding completely still for 10 seconds — then resuming.',
    technique: [
      { step: 'Timing', detail: 'Initiate when their breathing accelerates. The contrast between motion and stillness doubles sensation.' },
      { step: 'Communication', detail: 'A single word: "Wait." Said quietly. Not a question.' },
      { step: 'Reentry', detail: 'Resume 20% slower than before the pause. The recalibration is the reward.' },
    ],
  },
  {
    id: 12, level: 3, levelLabel: 'Bedroom Dynamics',
    title: 'Positional Architecture',
    description: 'Deliberate arrangement of bodies relative to light, warmth, and angle — treating position as a design variable.',
    technique: [
      { step: 'Light source', detail: 'Place the light source behind one partner — the silhouette effect increases mystique and reduces self-consciousness.' },
      { step: 'Temperature gradient', detail: 'One side of the bed warmer — migrate toward warmth as arousal increases. The body tracks temperature instinctively.' },
      { step: 'Elevation', detail: 'Head elevated slightly (pillow under hips, 15°) — shifts blood flow and deepens sensation.' },
    ],
  },
  {
    id: 13, level: 3, levelLabel: 'Bedroom Dynamics',
    title: 'Breath Synchrony',
    description: 'Consciously matching breath rate with your partner — entrained nervous systems amplify shared sensation.',
    technique: [
      { step: 'Lead', detail: 'Begin slowing your breath deliberately — take 6 seconds to inhale. Don\'t announce it.' },
      { step: 'Observe', detail: 'Within 60–90 seconds, their breath will entrain to yours. This is involuntary.' },
      { step: 'Accelerate together', detail: 'Once synchronized, gradually increase rate over 2 minutes — shared arousal arc.' },
    ],
  },
  {
    id: 14, level: 3, levelLabel: 'Bedroom Dynamics',
    title: 'Verbal Specificity',
    description: 'Naming exactly what you want in precise, unhurried language — specificity is more intimate than volume.',
    technique: [
      { step: 'The single sentence', detail: 'One complete, specific sentence. Not a question. Delivered at resting heart-rate cadence.' },
      { step: 'Anatomical precision', detail: 'Name the location. The body responds to named areas — it directs attention neurologically.' },
      { step: 'Follow through immediately', detail: 'Begin the named action within 3 seconds of speaking it. The alignment between word and action is the technique.' },
    ],
  },
  {
    id: 15, level: 3, levelLabel: 'Bedroom Dynamics',
    title: 'Sustained Eye Contact',
    description: 'Maintaining eye contact through peak intensity — the most psychologically intimate act available.',
    technique: [
      { step: 'Barrier removal', detail: 'Most people close their eyes instinctively. The instruction: keep them open. The vulnerability is the point.' },
      { step: 'Soft gaze', detail: 'Not a hard stare — slightly unfocused, taking in the whole face. The difference is tension vs. softness.' },
      { step: 'The break', detail: 'When eye contact becomes unbearable, look away together — then return. The repeated re-choice is what deepens intimacy.' },
    ],
  },
  // Level 4 — Deep Fantasies (5)
  {
    id: 16, level: 4, levelLabel: 'Deep Fantasies',
    title: 'The Long-Build Scenario',
    description: 'A shared fantasy scripted in advance — written, not spoken — with deliberate reveal timing.',
    technique: [
      { step: 'Written format', detail: 'Each partner writes 3 sentences describing a scenario. Exchange simultaneously. Read in silence.' },
      { step: 'No immediate discussion', detail: 'Sit with it for 5 minutes. The private processing is part of the technique.' },
      { step: 'Single question only', detail: 'One partner asks: "What would change?" — this surfaces desire without pressure.' },
    ],
  },
  {
    id: 17, level: 4, levelLabel: 'Deep Fantasies',
    title: 'Role Reversal Architecture',
    description: 'Explicit agreement to swap dynamic roles for a defined time window — control exchange as intimacy tool.',
    technique: [
      { step: 'Define the container', detail: 'Agree on a time boundary (e.g., 20 minutes). Clear start and end — the container creates safety.' },
      { step: 'Establish one signal', detail: 'A pause word that restores normal dynamic immediately. One word, agreed in advance.' },
      { step: 'Debrief', detail: 'After: 3 sentences each — what was surprising, what felt good, one thing to keep.' },
    ],
  },
  {
    id: 18, level: 4, levelLabel: 'Deep Fantasies',
    title: 'The Narrated Fantasy',
    description: 'One partner speaks a fantasy aloud in real-time while the other listens — voice as primary intimacy medium.',
    technique: [
      { step: 'Speaker guidelines', detail: 'Present tense only. First person. Slow cadence — one sentence at a time with pauses.' },
      { step: 'Listener role', detail: 'Eyes closed. No commentary during. One physical signal (hand squeeze) to indicate resonance.' },
      { step: 'Closing', detail: 'Speaker ends with: "And then." Listener completes the sentence out loud. The shared ending is the intimacy peak.' },
    ],
  },
  {
    id: 19, level: 4, levelLabel: 'Deep Fantasies',
    title: 'Witnessed Vulnerability',
    description: 'Each partner shares one specific desire they have never spoken aloud — privacy removal as deepening technique.',
    technique: [
      { step: 'Framing', detail: 'Begin: "Something I\'ve wanted but never said..." — the opening clause removes judgment.' },
      { step: 'No immediate reciprocation pressure', detail: 'Partner listens without immediate obligation to share. The asymmetry is intentional.' },
      { step: 'Affirmation before response', detail: 'First response is always an affirmation of the share — never a redirect. Then reciprocate if ready.' },
    ],
  },
  {
    id: 20, level: 4, levelLabel: 'Deep Fantasies',
    title: 'The Designed Evening',
    description: 'One partner architects every element of an intimate evening in advance — environment, sequence, timing, sensation.',
    technique: [
      { step: 'Complete design', detail: 'Lighting, scent, music, entry ritual, and sequence of touch. Written as a brief. Executed without commentary.' },
      { step: 'Recipient\'s only task', detail: 'Arrive. Receive. Give feedback only at the designed closing moment.' },
      { step: 'Post-evening design swap', detail: 'The recipient designs the next one. The alternation builds iterative knowledge of each other.' },
    ],
  },
]

const LEVEL_COLORS: Record<number, string> = {
  1: '#6090c8',
  2: '#e8a020',
  3: '#d4601a',
  4: '#a030c0',
}

const VOTE_CONFIG = {
  yes:     { label: '🔥 Definite Yes', short: '🔥',  bg: 'rgba(212,96,26,0.15)', border: 'rgba(212,96,26,0.35)', text: '#d4601a' },
  curious: { label: '✨ Open / Curious', short: '✨', bg: 'rgba(232,160,32,0.12)', border: 'rgba(232,160,32,0.30)', text: '#e8a020' },
  pass:    { label: '⛔ Pass',           short: '⛔',  bg: 'rgba(245,232,200,0.04)', border: 'rgba(245,232,200,0.12)', text: 'rgba(245,232,200,0.35)' },
}

function isMatch(a: Vote, b: Vote): boolean {
  if (!a || !b) return false
  return (a === 'yes' || a === 'curious') && (b === 'yes' || b === 'curious')
}

// ─── QR generator (uses qrcode package via canvas) ───────────────────

function QRCanvas({ value }: { value: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!ref.current) return
    import('qrcode').then(QRCode => {
      QRCode.toCanvas(ref.current!, value, {
        width: 140,
        margin: 1,
        color: { dark: '#f5e8c8', light: '#0a0906' },
      })
    })
  }, [value])
  return <canvas ref={ref} className="rounded-xl" />
}

// ─── Main Component ───────────────────────────────────────────────────

export default function LiveCouplesGame() {
  const peerRef = useRef<PeerType | null>(null)
  const connRef = useRef<DataConnection | null>(null)

  const [phase, setPhase] = useState<Phase>('lobby')
  const [role, setRole] = useState<Role>(null)
  const [roomCode, setRoomCode] = useState('')
  const [inputCode, setInputCode] = useState('')
  const [connected, setConnected] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [error, setError] = useState('')

  const [cardIndex, setCardIndex] = useState(0)
  const [myVote, setMyVote] = useState<Vote>(null)
  const [partnerVoted, setPartnerVoted] = useState(false)
  const [partnerVote, setPartnerVote] = useState<Vote>(null)
  const [isMatch_, setIsMatch_] = useState(false)
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [partnerReady, setPartnerReady] = useState(false)

  const currentCard = DECK[cardIndex]

  // ─── Generate 4-digit room code ───────────────────────────────────

  function generateCode() {
    return String(Math.floor(1000 + Math.random() * 9000))
  }

  // ─── PeerJS init ─────────────────────────────────────────────────

  async function initPeer(peerId: string): Promise<void> {
    const { Peer } = await import('peerjs')
    const peer = new Peer(peerId, {
      host: '0.peerjs.com',
      port: 443,
      secure: true,
      path: '/',
    })
    peerRef.current = peer

    return new Promise((resolve, reject) => {
      peer.on('open', () => resolve())
      peer.on('error', (err: Error) => reject(err))
    })
  }

  // ─── Host flow ────────────────────────────────────────────────────

  async function hostRoom() {
    setError('')
    const code = generateCode()
    setRoomCode(code)
    setRole('host')
    const peerId = `desirespec-${code}`
    setStatusMsg('Opening room…')

    try {
      await initPeer(peerId)
      setStatusMsg(`Room ${code} open — waiting for partner…`)
      setPhase('waiting')

      peerRef.current!.on('connection', (conn) => {
        connRef.current = conn
        conn.on('open', () => {
          setConnected(true)
          setStatusMsg('Partner connected!')
          conn.send({ type: 'ready' } satisfies SyncMessage)
        })
        conn.on('data', (data) => handleMessage(data as SyncMessage))
        conn.on('close', () => { setConnected(false); setStatusMsg('Partner disconnected') })
      })
    } catch (err) {
      setError(`Connection error: ${err}`)
      setPhase('lobby')
    }
  }

  // ─── Joiner flow ─────────────────────────────────────────────────

  async function joinRoom() {
    setError('')
    if (inputCode.length !== 4) { setError('Enter a 4-digit room code'); return }
    const code = inputCode.trim()
    const localId = `desirespec-joiner-${code}-${Date.now()}`
    setRole('joiner')
    setRoomCode(code)
    setStatusMsg('Connecting…')
    setPhase('waiting')

    try {
      await initPeer(localId)
      const conn = peerRef.current!.connect(`desirespec-${code}`, { reliable: true })
      connRef.current = conn

      conn.on('open', () => {
        setConnected(true)
        setStatusMsg('Connected to partner!')
      })
      conn.on('data', (data) => handleMessage(data as SyncMessage))
      conn.on('close', () => { setConnected(false); setStatusMsg('Partner disconnected') })
      conn.on('error', (err: Error) => setError(String(err)))
    } catch (err) {
      setError(`Failed to connect: ${err}`)
      setPhase('lobby')
    }
  }

  // ─── Message handler ──────────────────────────────────────────────

  const handleMessage = useCallback((msg: SyncMessage) => {
    if (msg.type === 'ready') {
      setPhase('game')
      setStatusMsg('')
    }
    if (msg.type === 'vote' && msg.vote !== undefined) {
      setPartnerVote(msg.vote)
      setPartnerVoted(true)
    }
    if (msg.type === 'next') {
      setPartnerReady(true)
    }
  }, [])

  // ─── Send message ─────────────────────────────────────────────────

  function send(msg: SyncMessage) {
    connRef.current?.send(msg)
  }

  // ─── Game: submit vote ────────────────────────────────────────────

  function submitVote(vote: Vote) {
    if (myVote) return
    setMyVote(vote)
    send({ type: 'vote', cardId: currentCard.id, vote })
  }

  // Reveal once both voted
  useEffect(() => {
    if (!myVote || !partnerVoted || !partnerVote) return
    const matched = isMatch(myVote, partnerVote)
    setIsMatch_(matched)

    if (matched) {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 200, 50, 400])
      }
      setMatches(prev => [...prev, { card: currentCard, myVote, partnerVote }])
    }

    setPhase('reveal')
  }, [myVote, partnerVoted, partnerVote, currentCard])

  // ─── Advance to next card ─────────────────────────────────────────

  function readyNext() {
    send({ type: 'next' })
    setPartnerReady(false)

    if (!partnerReady) {
      setStatusMsg('Waiting for partner…')
      return
    }
    advanceCard()
  }

  useEffect(() => {
    if (partnerReady && phase === 'reveal' && myVote) {
      advanceCard()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerReady])

  function advanceCard() {
    setPartnerReady(false)
    setStatusMsg('')
    if (cardIndex + 1 >= DECK.length) {
      setPhase('playbook')
      return
    }
    setCardIndex(i => i + 1)
    setMyVote(null)
    setPartnerVote(null)
    setPartnerVoted(false)
    setPhase('game')
  }

  // Cleanup
  useEffect(() => {
    return () => {
      connRef.current?.close()
      peerRef.current?.destroy()
    }
  }, [])

  // Start game when both ready (host triggers)
  useEffect(() => {
    if (connected && role === 'host' && phase === 'waiting') {
      setTimeout(() => {
        send({ type: 'ready' })
        setPhase('game')
      }, 800)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, role])

  const levelColor = LEVEL_COLORS[currentCard?.level ?? 1]
  const joinUrl = typeof window !== 'undefined'
    ? `${window.location.origin}?join=${roomCode}`
    : `https://desirespec.ai?join=${roomCode}`

  // ─── Render ───────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="glass-panel p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#e8a020] text-xs uppercase tracking-[0.2em] mb-0.5">Real-Time P2P</p>
            <h2
              className="text-2xl font-light text-[#f5e8c8]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Live Couples Game
            </h2>
            <p className="text-[#f5e8c8]/35 text-sm mt-1">
              WebRTC · Private room · Match-only reveal · Synchronized haptics
            </p>
          </div>
          {/* Connection status pill */}
          {phase !== 'lobby' && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs shrink-0"
              style={{
                background: connected ? 'rgba(74,222,128,0.08)' : 'rgba(245,232,200,0.04)',
                border: connected ? '1px solid rgba(74,222,128,0.25)' : '1px solid rgba(245,232,200,0.1)',
                color: connected ? '#4ade80' : 'rgba(245,232,200,0.4)',
              }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`} />
              {connected ? 'Partner Connected' : 'Awaiting Partner'}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ── LOBBY ─────────────────────────────────────────────── */}
        {phase === 'lobby' && (
          <motion.div
            key="lobby"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Host card */}
            <div className="glass-panel p-6 flex flex-col gap-4">
              <div>
                <p className="text-[#e8a020] text-xs uppercase tracking-wider mb-1">Create Room</p>
                <h3
                  className="text-xl font-light text-[#f5e8c8]"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Host a Private Game
                </h3>
                <p className="text-xs text-[#f5e8c8]/30 mt-1">
                  Generate a 4-digit PIN. Share it with your partner. Zero data leaves the room.
                </p>
              </div>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={hostRoom}
                className="mt-auto py-3 rounded-2xl text-sm font-medium transition-all"
                style={{
                  background: 'rgba(232,160,32,0.15)',
                  border: '1px solid rgba(232,160,32,0.3)',
                  color: '#e8a020',
                }}
              >
                ◈ Generate Room
              </motion.button>
            </div>

            {/* Joiner card */}
            <div className="glass-panel p-6 flex flex-col gap-4">
              <div>
                <p className="text-[#e8a020] text-xs uppercase tracking-wider mb-1">Join Room</p>
                <h3
                  className="text-xl font-light text-[#f5e8c8]"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Enter Room PIN
                </h3>
                <p className="text-xs text-[#f5e8c8]/30 mt-1">
                  Enter the 4-digit code your partner shared.
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="tel"
                  maxLength={4}
                  placeholder="0000"
                  value={inputCode}
                  onChange={e => setInputCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="flex-1 bg-transparent text-center text-2xl tracking-[0.4em] text-[#f5e8c8] rounded-xl py-3 outline-none"
                  style={{ border: '1px solid rgba(245,232,200,0.12)' }}
                />
              </div>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={joinRoom}
                className="mt-auto py-3 rounded-2xl text-sm font-medium transition-all"
                style={{
                  background: 'rgba(245,232,200,0.04)',
                  border: '1px solid rgba(245,232,200,0.12)',
                  color: 'rgba(245,232,200,0.55)',
                }}
              >
                ◎ Join Room
              </motion.button>
            </div>

            {error && (
              <div className="md:col-span-2 p-3 rounded-xl text-xs text-red-400 text-center"
                style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                {error}
              </div>
            )}
          </motion.div>
        )}

        {/* ── WAITING ───────────────────────────────────────────── */}
        {phase === 'waiting' && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-8 flex flex-col items-center gap-6"
          >
            {role === 'host' && roomCode && (
              <>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#e8a020] mb-2">Room PIN</p>
                  <p
                    className="text-6xl font-light text-[#f5e8c8] tracking-[0.3em]"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {roomCode}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs text-[#f5e8c8]/30">Scan to join instantly</p>
                  <QRCanvas value={joinUrl} />
                </div>
              </>
            )}

            <div className="flex items-center gap-3 text-sm text-[#f5e8c8]/40">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ●
              </motion.span>
              {statusMsg || 'Connecting…'}
            </div>

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}
          </motion.div>
        )}

        {/* ── GAME ──────────────────────────────────────────────── */}
        {phase === 'game' && currentCard && (
          <motion.div
            key={`game-${cardIndex}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-5"
          >
            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${levelColor}66, ${levelColor})` }}
                  animate={{ width: `${((cardIndex + 1) / DECK.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-xs text-[#f5e8c8]/30 shrink-0">
                {cardIndex + 1} / {DECK.length}
              </span>
            </div>

            {/* Card */}
            <div className="glass-panel p-7" style={{ borderColor: `${levelColor}22` }}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs px-2.5 py-1 rounded-full uppercase tracking-wider"
                  style={{
                    background: `${levelColor}15`,
                    border: `1px solid ${levelColor}30`,
                    color: levelColor,
                  }}
                >
                  Level {currentCard.level} · {currentCard.levelLabel}
                </span>
              </div>
              <h3
                className="text-2xl font-light text-[#f5e8c8] mb-3"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {currentCard.title}
              </h3>
              <p className="text-[#f5e8c8]/55 leading-relaxed text-base">
                {currentCard.description}
              </p>
            </div>

            {/* Voting */}
            {!myVote ? (
              <div className="grid grid-cols-3 gap-3">
                {(['yes', 'curious', 'pass'] as Vote[]).map(v => {
                  const cfg = VOTE_CONFIG[v!]
                  return (
                    <motion.button
                      key={v}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => submitVote(v)}
                      className="py-4 rounded-2xl text-sm font-medium flex flex-col items-center gap-1.5 transition-all"
                      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text }}
                    >
                      <span className="text-xl">{cfg.short}</span>
                      <span className="text-xs text-center leading-tight">{cfg.label.replace(/^[^\s]+\s/, '')}</span>
                    </motion.button>
                  )
                })}
              </div>
            ) : (
              <div className="glass-panel p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{VOTE_CONFIG[myVote]?.short}</span>
                  <div>
                    <p className="text-sm text-[#f5e8c8]/60">{VOTE_CONFIG[myVote]?.label}</p>
                    <p className="text-xs text-[#f5e8c8]/25">Your vote locked</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#f5e8c8]/30">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    ●
                  </motion.span>
                  {partnerVoted ? 'Partner voted ✓' : 'Awaiting partner…'}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ── REVEAL ────────────────────────────────────────────── */}
        {phase === 'reveal' && currentCard && (
          <motion.div
            key={`reveal-${cardIndex}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-5"
          >
            {/* Match / No-match banner */}
            <motion.div
              className="glass-panel p-6 text-center overflow-hidden relative"
              animate={isMatch_ ? {
                boxShadow: ['0 0 0px rgba(232,160,32,0)', '0 0 60px rgba(232,160,32,0.4)', '0 0 30px rgba(232,160,32,0.2)'],
              } : {}}
              transition={{ duration: 1.2 }}
              style={{
                borderColor: isMatch_ ? 'rgba(232,160,32,0.4)' : 'rgba(245,232,200,0.08)',
              }}
            >
              {isMatch_ && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.15, 0.05] }}
                  transition={{ duration: 2 }}
                  style={{ background: 'radial-gradient(ellipse at center, rgba(232,160,32,0.3), transparent 70%)' }}
                />
              )}
              <div className="relative z-10">
                <p
                  className="text-4xl mb-2"
                  style={{ filter: isMatch_ ? 'drop-shadow(0 0 12px rgba(232,160,32,0.8))' : 'none' }}
                >
                  {isMatch_ ? '🔥' : '—'}
                </p>
                <h3
                  className="text-2xl font-light mb-2"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    color: isMatch_ ? '#e8a020' : 'rgba(245,232,200,0.4)',
                  }}
                >
                  {isMatch_ ? 'Mutual Match' : 'No Match This Round'}
                </h3>
                {/* Show both votes */}
                <div className="flex justify-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-[#f5e8c8]/25 mb-1">You</p>
                    <span>{VOTE_CONFIG[myVote!]?.short} {VOTE_CONFIG[myVote!]?.label.replace(/^[^\s]+\s/, '')}</span>
                  </div>
                  <div className="text-[#f5e8c8]/20 self-center">·</div>
                  <div className="text-center">
                    <p className="text-xs text-[#f5e8c8]/25 mb-1">Partner</p>
                    <span>{VOTE_CONFIG[partnerVote!]?.short} {VOTE_CONFIG[partnerVote!]?.label.replace(/^[^\s]+\s/, '')}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Technique breakdown (match only) */}
            {isMatch_ && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-panel p-6"
                style={{ borderColor: 'rgba(232,160,32,0.2)' }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#e8a020] mb-3">
                  Technique · {currentCard.title}
                </p>
                <div className="flex flex-col gap-4">
                  {currentCard.technique.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.15 }}
                      className="flex gap-4"
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5"
                        style={{ background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.25)', color: '#e8a020' }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-[#f5e8c8]/70 mb-0.5">{t.step}</p>
                        <p className="text-xs text-[#f5e8c8]/40 leading-relaxed">{t.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Next / Playbook */}
            <div className="flex gap-3">
              {cardIndex + 1 < DECK.length ? (
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={readyNext}
                  className="flex-1 py-3 rounded-2xl text-sm transition-all"
                  style={{
                    background: 'rgba(232,160,32,0.12)',
                    border: '1px solid rgba(232,160,32,0.25)',
                    color: '#e8a020',
                  }}
                >
                  {partnerReady || statusMsg === '' ? 'Next Card →' : statusMsg || 'Next Card →'}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ y: -2 }}
                  onClick={() => setPhase('playbook')}
                  className="flex-1 py-3 rounded-2xl text-sm transition-all"
                  style={{
                    background: 'rgba(232,160,32,0.15)',
                    border: '1px solid rgba(232,160,32,0.3)',
                    color: '#e8a020',
                  }}
                >
                  View Desire Playbook →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ── PLAYBOOK ──────────────────────────────────────────── */}
        {phase === 'playbook' && (
          <motion.div
            key="playbook"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5"
          >
            <div className="glass-panel p-6 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-[#e8a020] mb-2">Session Complete</p>
              <h3
                className="text-3xl font-light text-[#f5e8c8] mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Mutual Desire Playbook
              </h3>
              <p className="text-[#f5e8c8]/35 text-sm">
                {matches.length === 0
                  ? 'No mutual matches this session — try different levels next time.'
                  : `${matches.length} shared desires discovered across ${new Set(matches.map(m => m.card.level)).size} levels.`}
              </p>
            </div>

            {matches.length === 0 ? (
              <div className="glass-panel p-8 text-center text-[#f5e8c8]/25 text-sm">
                Replay and explore other levels — mutual matches build the guide.
              </div>
            ) : (
              matches.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-panel p-6"
                  style={{ borderColor: `${LEVEL_COLORS[m.card.level]}22` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full mr-2"
                        style={{
                          background: `${LEVEL_COLORS[m.card.level]}12`,
                          border: `1px solid ${LEVEL_COLORS[m.card.level]}25`,
                          color: LEVEL_COLORS[m.card.level],
                        }}
                      >
                        {m.card.levelLabel}
                      </span>
                      <h4
                        className="inline text-lg font-light text-[#f5e8c8]"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        {m.card.title}
                      </h4>
                    </div>
                    <div className="flex gap-1.5 shrink-0 ml-3">
                      <span>{VOTE_CONFIG[m.myVote!]?.short}</span>
                      <span>{VOTE_CONFIG[m.partnerVote!]?.short}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {m.card.technique.map((t, j) => (
                      <div key={j} className="flex gap-3">
                        <span
                          className="text-xs shrink-0 mt-0.5"
                          style={{ color: LEVEL_COLORS[m.card.level] }}
                        >
                          {j + 1}.
                        </span>
                        <div>
                          <span className="text-xs font-medium text-[#f5e8c8]/55">{t.step} — </span>
                          <span className="text-xs text-[#f5e8c8]/35">{t.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}

            {/* Restart */}
            <motion.button
              whileHover={{ y: -2 }}
              onClick={() => {
                setPhase('lobby')
                setRole(null)
                setRoomCode('')
                setInputCode('')
                setConnected(false)
                setCardIndex(0)
                setMyVote(null)
                setPartnerVote(null)
                setPartnerVoted(false)
                setMatches([])
                setError('')
                setStatusMsg('')
                connRef.current?.close()
                peerRef.current?.destroy()
                peerRef.current = null
                connRef.current = null
              }}
              className="py-3 rounded-2xl text-sm text-[#f5e8c8]/35 hover:text-[#f5e8c8]/55 transition-colors"
              style={{ border: '1px solid rgba(245,232,200,0.08)' }}
            >
              ↺ New Session
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

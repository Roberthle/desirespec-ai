export interface SolutionItem {
  id: string
  slug: string
  title: string
  shortTitle: string
  tagline: string
  metaDescription: string
  primaryKeywords: string[]
  recommendedPositionIds: string[]
  painPoints: string[]
  hacksAndAdjustments: {
    title: string
    description: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'back-pain',
    slug: 'positions-for-back-pain',
    title: 'Best Positions for Lower Back Pain & Bad Knees',
    shortTitle: 'Back Pain & Bad Knees',
    tagline: 'Zero-strain, spine-supported intimacy positions that eliminate lumbar pressure and knee fatigue.',
    metaDescription: 'Discover the best intimate positions for lower back pain, herniated discs, and bad knees. Ergonomic pillow hacks and supported positions for painless pleasure.',
    primaryKeywords: [
      'best sex positions for lower back pain',
      'sex positions for bad knees',
      'positions for herniated disc intimacy',
      'low effort comfortable sex positions',
      'how to have sex with back pain',
    ],
    recommendedPositionIds: ['lazy-sunday', 'tandem-horizon', 'velvet-hammock', 'sovereign-squat'],
    painPoints: [
      'Hyperextension of the lumbar spine during deep arching postures',
      'Prolonged knee bearing on firm mattresses causing joint inflammation',
      'Sudden jerking hip thrust movements compressing lower vertebrae (L4/L5)',
    ],
    hacksAndAdjustments: [
      {
        title: 'The Lateral Lumbar Neutral (Side-by-Side Spoone)',
        description: 'Laying on your side removes 100% of vertical spinal compression. Place a pillow between your knees to keep your pelvis aligned in a neutral anatomical axis.',
      },
      {
        title: 'Pelvic Wedge Cushion Under Sacrum',
        description: 'Placing a 20° memory foam wedge directly under the receiver\'s tailbone tilts the pelvis upward naturally, eliminating the need to arch or tense lower back muscles.',
      },
      {
        title: 'Mattress Edge & Standing Hybrid',
        description: 'Having one partner stand at the edge of the bed while the other rests their torso flat on the mattress allows full pelvic access with zero weight loaded on bad knees.',
      },
    ],
    faqs: [
      {
        question: 'What is the absolute best position for severe lower back pain?',
        answer: 'The Lazy Sunday (Side-by-Side Spooning) and Tandem Horizon. Side-lying positions keep the spine in a completely neutral alignment without requiring either partner to support bodyweight or arch their lumbar spine.',
      },
      {
        question: 'How do you avoid knee pain during kneeling positions?',
        answer: 'Avoid kneeling directly on hard beds. Switch to edge-of-bed standing positions, or place a high-density yoga cushion under the knees to distribute patellar pressure.',
      },
    ],
  },
  {
    id: 'height-difference',
    slug: 'positions-for-height-difference',
    title: 'Best Positions for Major Height Differences (Tall Guy & Short Girl)',
    shortTitle: 'Height Differences',
    tagline: 'Anatomically calibrated angles and elevation hacks for couples with 6+ inch height gaps.',
    metaDescription: 'The ultimate guide to intimacy positions for tall and short couples. How to align hips, avoid awkward angles, and achieve effortless connection regardless of height.',
    primaryKeywords: [
      'positions for tall guy short girl',
      'height difference sex positions',
      'how to have sex with huge height difference',
      'standing sex positions tall partner short partner',
    ],
    recommendedPositionIds: ['standing-helix', 'desk-commander', 'amazon-straddle', 'arch-anchor'],
    painPoints: [
      'Standing positions being physically impossible without lifting or straining',
      'Mismatched hip-joint heights when standing or hovering',
      'Partner A having to stoop forward, causing neck and upper shoulder fatigue',
    ],
    hacksAndAdjustments: [
      {
        title: 'The Bed Edge / High Surface Leveler',
        description: 'Have the shorter partner sit or lay at the edge of a bed, desk, or kitchen counter. This instantly raises their pelvic plane to match the taller partner’s standing hip height perfectly.',
      },
      {
        title: 'The Sovereign Squat / Female Straddle',
        description: 'When the taller partner lays flat and the shorter partner straddles from above, height differences are completely neutralized because both torsos operate independently.',
      },
      {
        title: 'Deep Knee Drop Cushioning',
        description: 'For kneeling positions, having the taller partner drop into a wider lateral knee spread lowers their hip pivot by 4 to 8 inches, creating direct horizontal line-of-sight.',
      },
    ],
    faqs: [
      {
        question: 'How do you do standing positions with a large height difference?',
        answer: 'Use a elevated surface like a desk, kitchen island, or sturdy table. When the shorter partner sits on the edge, their hips elevate to natural standing height, eliminating the need for lifting.',
      },
      {
        question: 'Why does missionary feel awkward with a tall partner?',
        answer: 'Taller torsos force Partner A to either put their head way past Partner B’s shoulder or compress down awkwardly. Elevating Partner B’s hips with a pillow allows Partner A to stay upright on their knees rather than leaning forward.',
      },
    ],
  },
  {
    id: 'make-her-finish',
    slug: 'positions-to-make-her-finish-fast',
    title: 'Top Positions to Make Her Climax Fast & Clitoral Alignment Hacks',
    shortTitle: 'Make Her Climax Fast',
    tagline: 'High-friction angles and dual-stimulation alignments designed specifically for reliable female orgasms.',
    metaDescription: 'Proven intimate positions engineered for female pleasure. Learn how constant clitoral friction, pelvic lock, and G-spot angles guarantee climax.',
    primaryKeywords: [
      'positions to make a woman climax fast',
      'positions guaranteed to make her finish',
      'best positions for female pleasure',
      'clitoral stimulation positions during intercourse',
      'how to make her orgasm from positions',
    ],
    recommendedPositionIds: ['sovereign-squat', 'lotus-commander', 'overdrive-cowgirl', 'obsidian-clamp'],
    painPoints: [
      'Standard thrusting providing zero external clitoral contact',
      'Angle of entry gliding past the anterior vaginal wall (G-spot)',
      'Fast, inconsistent rhythm causing sensory overload before arousal peaks',
    ],
    hacksAndAdjustments: [
      {
        title: 'The CAT Technique (Coital Alignment Principle)',
        description: 'Riding higher chest-to-chest so the base of the partner’s pubic bone maintains continuous, rhythmic gliding friction against the clitoris with every single stroke.',
      },
      {
        title: 'Rotational Grinding Over In-And-Out Plunging',
        description: 'Instead of deep withdrawal, maintain full pelvic contact and execute circular 360° hip grinds at 45–60 BPM. This continuously stimulates internal and external nerve pathways simultaneously.',
      },
      {
        title: 'The Female-Led Cadence Lock',
        description: 'In positions like The Sovereign Squat or Lotus Commander, the receiver dictates both the depth and micro-angle, allowing her to stay directly on her peak pleasure zone without interruption.',
      },
    ],
    faqs: [
      {
        question: 'Which position gives the most clitoral friction during intimacy?',
        answer: 'The Sovereign Squat, Overdrive Cowgirl, and The CAT (Coital Alignment Technique). In these positions, the pubic bones stay in constant firm contact, producing continuous external friction throughout every movement.',
      },
      {
        question: 'How does pelvic tilt help women climax?',
        answer: 'Tilting the pelvis upward by 20°–35° brings the anterior vaginal wall into direct alignment with the incoming angle, stimulating the G-Spot and Halban fascia while ensuring external contact.',
      },
    ],
  },
  {
    id: 'last-longer',
    slug: 'positions-to-last-longer-in-bed',
    title: 'Best Positions to Last Longer in Bed & Control Cadence',
    shortTitle: 'Last Longer & Control Cadence',
    tagline: 'Low-sensitivity angles and steady-cadence postures that eliminate premature finishing.',
    metaDescription: 'Techniques and positions to last longer in bed. Master low-friction pacing, shallow pelvic locks, and breath synchronization to double your endurance.',
    primaryKeywords: [
      'positions to last longer in bed',
      'how to stop finishing fast in bed',
      'positions for premature ejaculation control',
      'best positions for men to last longer',
      'slow burn intimacy positions',
    ],
    recommendedPositionIds: ['lotus-lock', 'scissors-interlock', 'tandem-horizon', 'twisted-mermaid'],
    painPoints: [
      'Overwhelming glans friction during deep, rapid piston thrusts',
      'Tension in pelvic floor muscles (kegel clenching) triggering early ejaculation',
      'Lack of breathing control and high adrenaline spikes',
    ],
    hacksAndAdjustments: [
      {
        title: 'The Shallow Micro-Flutter Phase',
        description: 'Keep the stroke within the first 1 to 2 inches of the entrance. This zone is rich in nerve endings for her, but reduces shaft friction for him, resetting arousal levels.',
      },
      {
        title: 'Pelvic Lock & Deep Breath Hold',
        description: 'When approaching the edge, stop thrusting completely, push hips flush together, and take 3 deep diaphragmatic breaths through the nose. This relaxes the pubococcygeus (PC) muscle instantly.',
      },
      {
        title: 'Seated Lotus Compression',
        description: 'Sitting upright chest-to-chest naturally slows the pace down to 25–40 BPM, shifting the focus from high-speed friction to deep emotional and skin-to-skin sensory warmth.',
      },
    ],
    faqs: [
      {
        question: 'What is the #1 position to last longer in bed?',
        answer: 'The Lotus Lock and Side-by-Side Scissors. These positions restrict high-speed piston thrusting and favor slow, rhythmic hip rotations, allowing maximum stamina control.',
      },
      {
        question: 'Why does thrusting slower help you last longer?',
        answer: 'Slowing down to 30–45 BPM prevents rapid friction spikes on the sensitive corona of the glans and gives your autonomic nervous system time to regulate before hitting the point of no return.',
      },
    ],
  },
  {
    id: 'quiet-apartment',
    slug: 'quiet-sex-positions-for-apartments',
    title: 'Quiet & Silent Positions for Apartments & Thin Walls',
    shortTitle: 'Quiet & Silent Positions',
    tagline: 'Zero-creak, low-movement positions for stealth intimacy when roommates, kids, or neighbors are nearby.',
    metaDescription: 'The best quiet intimacy positions for apartments with thin walls. No bed squeaking, silent rhythmic movements, and maximum close-contact sensation.',
    primaryKeywords: [
      'quiet sex positions for thin walls',
      'silent sex positions for apartments',
      'positions that dont make the bed squeak',
      'stealth intimacy positions for parents',
    ],
    recommendedPositionIds: ['lazy-sunday', 'lotus-lock', 'velvet-trap', 'obsidian-clamp'],
    painPoints: [
      'Bed frame headboards banging against drywalls during dynamic thrusting',
      'Mattress springs squeaking under vigorous up-and-down motion',
      'Accidental vocal outbursts during intense moments',
    ],
    hacksAndAdjustments: [
      {
        title: 'The Floor Rug / Pillow Nest',
        description: 'Moving off the elevated bed frame onto a thick rug or floor pillow stack eliminates 100% of frame squeaks and rhythmic headboard knocking.',
      },
      {
        title: 'Micro-Grind Wave Over Impact Thrusts',
        description: 'Eliminate impact slapping sounds by keeping hips glued together and oscillating with circular pelvic waves instead of reciprocating in-and-out strokes.',
      },
      {
        title: 'Chest-to-Chest Muffled Kisses',
        description: 'In the Seated Lotus or Lazy Sunday, kissing deeply or nuzzling into the neck naturally muffles vocal gasps and heavy breathing.',
      },
    ],
    faqs: [
      {
        question: 'How do you keep the bed from squeaking during intimacy?',
        answer: 'Switch to side-lying spooning (Lazy Sunday) or floor seated positions (Lotus Lock). These keep movement lateral rather than vertical, eliminating spring squeaks.',
      },
    ],
  },
  {
    id: 'plus-size',
    slug: 'best-positions-for-plus-size-couples',
    title: 'Best Positions for Plus-Size & Curvy Bodies',
    shortTitle: 'Plus-Size & Curvy Bodies',
    tagline: 'Comfortable, unrestricted angles designed for full-figured lovers and effortless deep connection.',
    metaDescription: 'Comfortable and pleasurable intimacy positions for curvy, plus-size, and full-figured couples. Pillow placement, ergonomic angles, and effortless access.',
    primaryKeywords: [
      'best sex positions for plus size',
      'positions for curvy women intimacy',
      'comfortable sex positions for big bodies',
      'plus size couple intimacy positions',
    ],
    recommendedPositionIds: ['desk-commander', 'arch-anchor', 'sovereign-squat', 'prone-guillotine'],
    painPoints: [
      'Thigh or abdomen volume restricting traditional entry angles',
      'Holding heavy body weight causing premature muscle fatigue',
      'Difficulty maintaining deep penetration in standard missionary',
    ],
    hacksAndAdjustments: [
      {
        title: 'The Elevated Bed-Edge Doggy (Prone Arch)',
        description: 'Having the receiver lay face down over the edge of the mattress with feet resting on the floor removes all strain on knees and hips while maximizing deep anterior access.',
      },
      {
        title: 'Double Pillow Elevation',
        description: 'Placing two firm pillows under the hips lifts the pelvis above abdomen curvature, creating a straight, unhindered pathway for effortless penetration.',
      },
      {
        title: 'The Standing Desk Commander',
        description: 'Using sturdy furniture for support allows partners of all body shapes to engage without having to hold each other’s full body weight.',
      },
    ],
    faqs: [
      {
        question: 'What is the most comfortable position for curvy couples?',
        answer: 'Edge-of-the-bed positions (like The Desk Commander or Prone Arch) and Side-lying spooning. These remove all bodyweight pressure and allow unrestricted hip movement.',
      },
    ],
  },
  {
    id: 'zero-pressure',
    slug: 'zero-pressure-intimacy-for-anxious-couples',
    title: 'Zero-Pressure Intimacy for Anxious Couples & Overcoming Blocks',
    shortTitle: 'Zero-Pressure Intimacy',
    tagline: 'Gentle, somatic connection methods for couples experiencing bedroom anxiety, emotional shutdown, or trauma blocks.',
    metaDescription: 'Step-by-step roadmap to overcome bedroom anxiety, emotional freeze responses, and pressure. Learn non-demanding touch and safe connection postures.',
    primaryKeywords: [
      'how to be intimate without pressure',
      'zero pressure intimacy exercises',
      'intimacy for couples with anxiety',
      'how to connect with partner when feeling blocked',
      'sensate focus exercises at home',
    ],
    recommendedPositionIds: ['lazy-sunday', 'lotus-lock', 'tandem-horizon'],
    painPoints: [
      'Nervous system locking up into freeze/dissociation during touch',
      'Feeling an obligation to achieve climax, turning intimacy into a chore',
      'Fear of disappointing your partner or feeling judged',
    ],
    hacksAndAdjustments: [
      {
        title: 'Banning Climax / Goal-Free Sessions',
        description: 'Explicitly agree beforehand that neither partner will seek a climax. This single rule instantly deactivates the brain’s amygdala threat response.',
      },
      {
        title: 'The 3-Minute Heart-to-Heart Hug',
        description: 'Before removing any clothing, embrace chest-to-chest standing or seated for 3 full minutes. Match your breathing to flood both nervous systems with calming oxytocin.',
      },
      {
        title: 'The Safe Word Protocol (Green / Yellow / Red)',
        description: 'Give both partners full authority to pause or redirect touch with zero guilt or hurt feelings.',
      },
    ],
    faqs: [
      {
        question: 'How do you reconnect intimately when one partner has anxiety?',
        answer: 'Start with non-demanding touch (Sensate Focus) without any expectation of intercourse. Focus on gentle hand, back, or neck massage, coupled with steady diaphragmatic breathing.',
      },
      {
        question: 'What are the best positions when feeling nervous or blocked?',
        answer: 'The Lazy Sunday (Side-by-Side Spooning) and Seated Lotus Lock. These positions emphasize warmth, eye contact, and emotional grounding without athletic pressure.',
      },
    ],
  },
]

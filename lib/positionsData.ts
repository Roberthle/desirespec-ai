export interface PositionItem {
  id: string
  name: string
  tagline: string
  category: 'Deep Intensity & Power' | 'Sensory Dominance' | 'Acrobatic Friction' | 'Intimate Meltdown'
  depthRating: number // 1 - 10
  clitoralFrictionRating: number // 1 - 10
  intensityLevel: number // 1 - 5 (🔥)
  pelvicTiltDeg: number // e.g. 35
  thrustVector: 'Deep Angled Plunge' | 'Rotational Grind' | 'Shallow High-Speed Flutter' | 'Slow Linear Piston'
  dirtyTalkCue: string
  eroticMechanics: string
  idealFor: string
  svgVariant: 'arch-anchor' | 'counter-press' | 'velvet-trap' | 'high-angle' | 'overdrive-cowgirl' | 'obsidian-lock' | 'wall-pin' | 'submission-bridge'
}

export const POSITIONS_DATA: PositionItem[] = [
  {
    id: 'arch-and-anchor',
    name: 'The Arch & Anchor',
    tagline: 'Maximum G/A-Spot depth with total body pinning',
    category: 'Deep Intensity & Power',
    depthRating: 10,
    clitoralFrictionRating: 4,
    intensityLevel: 5,
    pelvicTiltDeg: 35,
    thrustVector: 'Deep Angled Plunge',
    dirtyTalkCue: 'Stay right there... don\'t move an inch while I bury myself in you.',
    eroticMechanics: 'Legs pressed tightly together, hips elevated by a wedge/pillow, firm downward grip on the lower back or hips for deep, full-body friction and intense anterior wall compression.',
    idealFor: 'Intense anterior G-spot and A-spot stimulation under heavy physical dominance.',
    svgVariant: 'arch-anchor'
  },
  {
    id: 'standing-counter-press',
    name: 'The Standing Counter Press',
    tagline: 'Spontaneous, high-power standing leverage',
    category: 'Acrobatic Friction',
    depthRating: 9,
    clitoralFrictionRating: 6,
    intensityLevel: 5,
    pelvicTiltDeg: 20,
    thrustVector: 'Deep Angled Plunge',
    dirtyTalkCue: 'Wrap your legs tighter around my waist. Look right at me.',
    eroticMechanics: 'Lifted onto a sturdy counter or table edge, legs wrapped around partner\'s waist. Allows full downward bodyweight leverage with intense close-range eye contact and neck kissing.',
    idealFor: 'Spontaneous surges of adrenaline, primal intensity, and uninterrupted visual intimacy.',
    svgVariant: 'counter-press'
  },
  {
    id: 'velvet-trap',
    name: 'The Velvet Trap',
    tagline: 'Relentless, grinding clitoral and G-spot double stimulation',
    category: 'Intimate Meltdown',
    depthRating: 7,
    clitoralFrictionRating: 10,
    intensityLevel: 4,
    pelvicTiltDeg: 15,
    thrustVector: 'Rotational Grind',
    dirtyTalkCue: 'Feel that pressure right against you... let every slow roll take you over.',
    eroticMechanics: 'Inverted Coital Alignment Technique (CAT). Constant base-of-shaft pressure locked firmly against the clitoris with zero withdrawal, moving in slow, heavy circular pelvic rolls.',
    idealFor: 'Reliable, powerful blended orgasms through sustained constant friction.',
    svgVariant: 'velvet-trap'
  },
  {
    id: 'high-angle-suspension',
    name: 'The High-Angle Suspension',
    tagline: 'Deepest possible anatomical access with inverted gravity',
    category: 'Deep Intensity & Power',
    depthRating: 10,
    clitoralFrictionRating: 5,
    intensityLevel: 5,
    pelvicTiltDeg: 60,
    thrustVector: 'Deep Angled Plunge',
    dirtyTalkCue: 'Look down and watch how deep you take me.',
    eroticMechanics: 'Receiving partner on back with legs pressed up and over the penetrating partner\'s shoulders, allowing gravity and upper-body leverage to create deep, uninhibited vertical plunges.',
    idealFor: 'Exploratory cervical/cul-de-sac fullness and visual exhibitionism.',
    svgVariant: 'high-angle'
  },
  {
    id: 'overdrive-cowgirl',
    name: 'The Overdrive Cowgirl',
    tagline: 'Total partner control, visual dominance, and G-spot targeting',
    category: 'Sensory Dominance',
    depthRating: 8,
    clitoralFrictionRating: 8,
    intensityLevel: 4,
    pelvicTiltDeg: 45,
    thrustVector: 'Rotational Grind',
    dirtyTalkCue: 'You\'re completely at my mercy now... just lay back and take it.',
    eroticMechanics: 'Top partner straddles facing forward or backward, leaning back at a 45° angle to alter internal contact angles while maintaining full tempo, depth, and friction control.',
    idealFor: 'Female-led pacing dominance, full view of the body, and hands-free partner surrender.',
    svgVariant: 'overdrive-cowgirl'
  },
  {
    id: 'obsidian-lock',
    name: 'The Obsidian Lock',
    tagline: 'Slow, sweaty, prolonged endurance & multi-point touch',
    category: 'Intimate Meltdown',
    depthRating: 8,
    clitoralFrictionRating: 7,
    intensityLevel: 3,
    pelvicTiltDeg: 25,
    thrustVector: 'Slow Linear Piston',
    dirtyTalkCue: 'Breathe with me... we have all night for this.',
    eroticMechanics: 'Side-lying spooning variation entering from behind, top leg hooked high over the partner\'s hip. Leaves both partners\' hands completely free for breast, neck, and clitoral stimulation.',
    idealFor: 'Extended marathon sessions, lazy sensual connection, and over-stimulated sensory layering.',
    svgVariant: 'obsidian-lock'
  },
  {
    id: 'wall-pin',
    name: 'The Wall Pin',
    tagline: 'Pure animalistic intensity and physical dominance',
    category: 'Sensory Dominance',
    depthRating: 9,
    clitoralFrictionRating: 5,
    intensityLevel: 5,
    pelvicTiltDeg: 30,
    thrustVector: 'Shallow High-Speed Flutter',
    dirtyTalkCue: 'You aren\'t going anywhere until I say so.',
    eroticMechanics: 'Back braced firmly against the wall, one or both legs hoisted and locked over partner\'s hips. Creates intense, fast-cadence friction with full bodyweight leverage and primal breath intimacy.',
    idealFor: 'Spontaneous high-voltage dominance and uninhibited passion.',
    svgVariant: 'wall-pin'
  },
  {
    id: 'submission-bridge',
    name: 'The Submission Bridge',
    tagline: 'High sensory surrender, vulnerability, and anterior targeting',
    category: 'Sensory Dominance',
    depthRating: 9,
    clitoralFrictionRating: 6,
    intensityLevel: 4,
    pelvicTiltDeg: 50,
    thrustVector: 'Deep Angled Plunge',
    dirtyTalkCue: 'Keep that chest arched high for me... surrender everything.',
    eroticMechanics: 'Lower partner arches hips high off the mattress, wrists held or pinned lightly overhead. Exposes the anterior vaginal wall directly to upward-angled thrusting with maximum vulnerability.',
    idealFor: 'Erotic surrender, deep emotional release, and aesthetic visual tension.',
    svgVariant: 'submission-bridge'
  }
]

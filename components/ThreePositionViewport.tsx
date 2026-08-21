'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'
import { PositionItem } from '../lib/positionsData'

// ─── Procedural Organic Spline Lathe Geometry Generators ──────────────
// Generates high-subdivision (64 segments), perfectly smooth organic muscle geometries

function createOrganicTorsoGeometry(isPartnerA: boolean): THREE.BufferGeometry {
  // Define 2D silhouette points from neck/shoulders to lower pelvic bowl
  const points: THREE.Vector2[] = []
  if (isPartnerA) {
    // Muscular Initiator (Broad Chest, Athletic Taper, Pelvic Flare)
    points.push(new THREE.Vector2(0.08, 0.45))
    points.push(new THREE.Vector2(0.18, 0.42))
    points.push(new THREE.Vector2(0.30, 0.32)) // Deltoid / Clavicle
    points.push(new THREE.Vector2(0.32, 0.20)) // Upper Pec / Lats
    points.push(new THREE.Vector2(0.28, 0.05)) // Mid Ribcage
    points.push(new THREE.Vector2(0.22, -0.15)) // Athletic Waist Cinch
    points.push(new THREE.Vector2(0.26, -0.32)) // Iliac Crest / Pelvic Flare
    points.push(new THREE.Vector2(0.28, -0.45)) // Glute Mass
    points.push(new THREE.Vector2(0.12, -0.52))
  } else {
    // Curvaceous Receiver (Slender Neck, Elegant Ribcage, Deep Waist, Voluptuous Hips)
    points.push(new THREE.Vector2(0.06, 0.42))
    points.push(new THREE.Vector2(0.14, 0.38))
    points.push(new THREE.Vector2(0.23, 0.28)) // Clavicle / Upper Chest
    points.push(new THREE.Vector2(0.26, 0.16)) // Bust Line
    points.push(new THREE.Vector2(0.22, 0.02)) // Lower Ribcage
    points.push(new THREE.Vector2(0.16, -0.14)) // Deep Feminine Waist
    points.push(new THREE.Vector2(0.25, -0.28)) // Hip Curve Transition
    points.push(new THREE.Vector2(0.30, -0.42)) // Voluptuous Glute / Pelvis
    points.push(new THREE.Vector2(0.10, -0.50))
  }

  const curve = new THREE.SplineCurve(points)
  const sampledPoints = curve.getPoints(36)
  const geom = new THREE.LatheGeometry(sampledPoints, 64)
  geom.computeVertexNormals()
  return geom
}

function createMuscularThighGeometry(): THREE.BufferGeometry {
  // Thigh & Quadriceps: Hip swell -> Vastus Lateralis -> Suprapatellar Knee Pinch
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.18, 0.40),
    new THREE.Vector2(0.21, 0.30),
    new THREE.Vector2(0.235, 0.15), // Quad Peak Swell
    new THREE.Vector2(0.22, -0.05),
    new THREE.Vector2(0.18, -0.22),
    new THREE.Vector2(0.135, -0.38), // Knee Joint Pinch
  ]
  const curve = new THREE.SplineCurve(points)
  const geom = new THREE.LatheGeometry(curve.getPoints(28), 64)
  geom.computeVertexNormals()
  return geom
}

function createSculptedCalfGeometry(): THREE.BufferGeometry {
  // Calf & Shin: Knee base -> Gastrocnemius Muscle Swell -> Slender Ankle
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.135, 0.35),
    new THREE.Vector2(0.165, 0.22), // Calf Muscle Belly
    new THREE.Vector2(0.155, 0.08),
    new THREE.Vector2(0.115, -0.12),
    new THREE.Vector2(0.085, -0.28),
    new THREE.Vector2(0.075, -0.35), // Slender Ankle
  ]
  const curve = new THREE.SplineCurve(points)
  const geom = new THREE.LatheGeometry(curve.getPoints(28), 64)
  geom.computeVertexNormals()
  return geom
}

function createMuscularArmGeometry(): THREE.BufferGeometry {
  // Arm: Deltoid Cap -> Bicep/Tricep Swell -> Elbow Pinch -> Tapered Forearm
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.15, 0.38), // Deltoid Joint
    new THREE.Vector2(0.14, 0.25), // Bicep Peak
    new THREE.Vector2(0.125, 0.08),
    new THREE.Vector2(0.10, -0.05), // Elbow
    new THREE.Vector2(0.115, -0.18), // Forearm Swell
    new THREE.Vector2(0.08, -0.36), // Slender Wrist
  ]
  const curve = new THREE.SplineCurve(points)
  const geom = new THREE.LatheGeometry(curve.getPoints(28), 64)
  geom.computeVertexNormals()
  return geom
}

// ─── 3D Anatomical Body Pose Generator ────────────────────────────────
function ArticulatedAnatomyModel({
  positionData,
  bpm
}: {
  positionData: PositionItem
  bpm: number
}) {
  const rootGroupRef = useRef<THREE.Group>(null)
  const partnerARef = useRef<THREE.Group>(null)
  const partnerBRef = useRef<THREE.Group>(null)
  const hotspotRef = useRef<THREE.Mesh>(null)

  // Luxury Velvet & Platinum Shaders with Subsurface Clearcoat Highlights
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#E07A1E'),
        emissive: new THREE.Color('#3A1202'),
        emissiveIntensity: 0.28,
        roughness: 0.32,
        metalness: 0.10,
        clearcoat: 0.55,
        clearcoatRoughness: 0.25,
        flatShading: false,
      }),
    []
  )

  const roseMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FB7185'),
        emissive: new THREE.Color('#4C0519'),
        emissiveIntensity: 0.32,
        roughness: 0.26,
        metalness: 0.12,
        clearcoat: 0.70,
        clearcoatRoughness: 0.20,
        flatShading: false,
      }),
    []
  )

  // Memoized Organic Spline Geometries
  const partnerATorsoGeom = useMemo(() => createOrganicTorsoGeometry(true), [])
  const partnerBTorsoGeom = useMemo(() => createOrganicTorsoGeometry(false), [])
  const thighGeom = useMemo(() => createMuscularThighGeometry(), [])
  const calfGeom = useMemo(() => createSculptedCalfGeometry(), [])
  const armGeom = useMemo(() => createMuscularArmGeometry(), [])

  // Classify active pose archetype based on category / variant
  const poseArchetype = useMemo(() => {
    const v = positionData.svgVariant

    if (v === 'arch-anchor' || v === 'obsidian-clamp' || v === 'velvet-hammock' || v === 'prone-guillotine') {
      return 'PRONE_ARCH'
    }
    if (v === 'overdrive-cowgirl' || v === 'amazon-straddle' || v === 'sovereign-squat' || v === 'gspot-throne') {
      return 'STRADDLE_COWGIRL'
    }
    if (v === 'wall-pin' || v === 'counter-press' || v === 'standing-helix' || v === 'suspended-lotus' || v === 'desk-commander' || v === 'cross-axis') {
      return 'STANDING_LIFT'
    }
    if (v === 'lotus-lock' || v === 'scissors-interlock' || v === 'obsidian-lock' || v === 'tandem-horizon' || v === 'lazy-sunday' || v === 'twisted-mermaid') {
      return 'SEATED_LOTUS'
    }
    return 'POV_LEGS_WRAPPED'
  }, [positionData])

  // Real-time kinematic thrust & friction kinematics
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const freq = (bpm / 60) * Math.PI * 2
    const vector = positionData.thrustVector

    if (partnerARef.current && partnerBRef.current) {
      if (vector === 'Deep Angled Plunge') {
        const plunge = Math.pow(Math.sin(t * freq), 3) * 0.22
        partnerARef.current.position.z = plunge
        partnerARef.current.position.y = -Math.abs(plunge) * 0.12
      } else if (vector === 'Rotational Grind') {
        partnerARef.current.position.x = Math.sin(t * freq) * 0.09
        partnerARef.current.position.z = Math.cos(t * freq) * 0.09
        partnerBRef.current.rotation.z = Math.sin(t * freq * 0.5) * 0.06
      } else if (vector === 'Shallow High-Speed Flutter') {
        partnerARef.current.position.z = Math.sin(t * freq * 2) * 0.06
      } else {
        partnerARef.current.position.z = Math.sin(t * freq) * 0.15
      }
    }

    if (hotspotRef.current) {
      const pulse = 1 + Math.sin(t * 8) * 0.3
      hotspotRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  // Dynamic Pelvic Tilt Angle in Radians
  const tiltRad = (positionData.pelvicTiltDeg * Math.PI) / 180

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      {/* ─────────────────────────────────────────────────────────────────
          POSE 1: POV_LEGS_WRAPPED (High-Angle, Piledriver, Anvil, Bridge)
         ───────────────────────────────────────────────────────────────── */}
      {poseArchetype === 'POV_LEGS_WRAPPED' && (
        <>
          {/* Partner B (Receiver - Rose) Lying Back with Legs Elevated */}
          <group ref={partnerBRef} position={[0, 0.45, -0.3]} rotation={[tiltRad * 0.3, 0, 0]}>
            {/* Head */}
            <mesh position={[-0.85, 0.2, 0]} material={roseMaterial}>
              <sphereGeometry args={[0.22, 32, 32]} />
            </mesh>
            {/* Curvaceous Organic Torso */}
            <mesh position={[-0.22, 0.15, 0]} rotation={[0, 0, 1.55]} geometry={partnerBTorsoGeom} material={roseMaterial} />

            {/* Bust Contours */}
            <mesh position={[-0.35, 0.28, 0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[-0.35, 0.28, -0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>

            {/* Elevated Muscular Thighs Wrapping Around Initiator */}
            <mesh position={[0.42, 0.65, 0.32]} rotation={[0.3, 0.1, -0.85]} geometry={thighGeom} material={roseMaterial} />
            <mesh position={[0.42, 0.65, -0.32]} rotation={[-0.3, -0.1, -0.85]} geometry={thighGeom} material={roseMaterial} />
            {/* Sculpted Calves / Ankles */}
            <mesh position={[0.72, 1.05, 0.42]} rotation={[0.15, 0, -0.2]} geometry={calfGeom} material={roseMaterial} />
            <mesh position={[0.72, 1.05, -0.42]} rotation={[-0.15, 0, -0.2]} geometry={calfGeom} material={roseMaterial} />
          </group>

          {/* Partner A (Initiator - Gold) Kneeling Downward Plunge */}
          <group ref={partnerARef} position={[0.25, 0.85, 0.32]}>
            {/* Head */}
            <mesh position={[0.4, 0.95, 0]} material={goldMaterial}><sphereGeometry args={[0.25, 32, 32]} /></mesh>
            {/* Muscular Organic Torso */}
            <mesh position={[0.25, 0.55, 0]} rotation={[0, 0, -0.45]} geometry={partnerATorsoGeom} material={goldMaterial} />
            {/* Deltoids & Sculpted Arms */}
            <mesh position={[-0.05, 0.45, 0.42]} rotation={[0.4, 0.2, -0.8]} geometry={armGeom} material={goldMaterial} />
            <mesh position={[-0.05, 0.45, -0.42]} rotation={[-0.4, -0.2, -0.8]} geometry={armGeom} material={goldMaterial} />
            {/* Muscular Thighs */}
            <mesh position={[0.35, -0.25, 0.45]} rotation={[0.3, 0.2, 0.8]} geometry={thighGeom} material={goldMaterial} />
            <mesh position={[0.35, -0.25, -0.45]} rotation={[-0.3, -0.2, 0.8]} geometry={thighGeom} material={goldMaterial} />
          </group>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          POSE 2: PRONE_ARCH (Modified Prone Bone, Obsidian Clamp, Hammock)
         ───────────────────────────────────────────────────────────────── */}
      {poseArchetype === 'PRONE_ARCH' && (
        <>
          {/* Partner B (Receiver - Rose) Prone with Sculpted Arched Pelvis */}
          <group ref={partnerBRef} position={[0, 0.35, 0]}>
            <mesh position={[-0.95, 0.15, 0]} material={roseMaterial}><sphereGeometry args={[0.21, 32, 32]} /></mesh>
            {/* Arched Organic Torso */}
            <mesh position={[-0.35, 0.22, 0]} rotation={[0, 0, 1.4]} geometry={partnerBTorsoGeom} material={roseMaterial} />
            {/* Tightly Pressed Muscular Legs */}
            <mesh position={[0.45, 0.25, 0.12]} rotation={[0, 0, 1.45]} geometry={thighGeom} material={roseMaterial} />
            <mesh position={[0.45, 0.25, -0.12]} rotation={[0, 0, 1.45]} geometry={thighGeom} material={roseMaterial} />
            <mesh position={[1.05, 0.15, 0.12]} rotation={[0, 0, 1.55]} geometry={calfGeom} material={roseMaterial} />
            <mesh position={[1.05, 0.15, -0.12]} rotation={[0, 0, 1.55]} geometry={calfGeom} material={roseMaterial} />
          </group>

          {/* Partner A (Initiator - Gold) Mounted Dominant Over Pelvis */}
          <group ref={partnerARef} position={[-0.05, 0.7, 0.28]}>
            <mesh position={[-0.15, 0.85, 0]} material={goldMaterial}><sphereGeometry args={[0.24, 32, 32]} /></mesh>
            <mesh position={[-0.1, 0.45, 0]} rotation={[0, 0, -0.2]} geometry={partnerATorsoGeom} material={goldMaterial} />
            {/* Gripping Sculpted Arms */}
            <mesh position={[-0.25, 0.18, 0.35]} rotation={[0.4, 0.1, -0.6]} geometry={armGeom} material={goldMaterial} />
            <mesh position={[-0.25, 0.18, -0.35]} rotation={[-0.4, -0.1, -0.6]} geometry={armGeom} material={goldMaterial} />
            {/* Straddling Quads */}
            <mesh position={[0.25, -0.28, 0.42]} rotation={[0.4, 0.2, 0.9]} geometry={thighGeom} material={goldMaterial} />
            <mesh position={[0.25, -0.28, -0.42]} rotation={[-0.4, -0.2, 0.9]} geometry={thighGeom} material={goldMaterial} />
          </group>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          POSE 3: STRADDLE_COWGIRL (Overdrive, Amazon, Sovereign, G-Throne)
         ───────────────────────────────────────────────────────────────── */}
      {poseArchetype === 'STRADDLE_COWGIRL' && (
        <>
          {/* Partner A (Base Reclined - Gold) */}
          <group ref={partnerARef} position={[-0.3, 0.3, 0]}>
            <mesh position={[-0.75, 0.15, 0]} material={goldMaterial}><sphereGeometry args={[0.23, 32, 32]} /></mesh>
            <mesh position={[-0.1, 0.15, 0]} rotation={[0, 0, 1.55]} geometry={partnerATorsoGeom} material={goldMaterial} />
            <mesh position={[0.75, 0.15, 0.25]} rotation={[0, 0, 1.55]} geometry={thighGeom} material={goldMaterial} />
            <mesh position={[0.75, 0.15, -0.25]} rotation={[0, 0, 1.55]} geometry={thighGeom} material={goldMaterial} />
          </group>

          {/* Partner B (Top Straddling - Rose) Arched Lean-Back */}
          <group ref={partnerBRef} position={[0.12, 0.85, 0]}>
            <mesh position={[0.45, 0.85, 0]} material={roseMaterial}><sphereGeometry args={[0.22, 32, 32]} /></mesh>
            <mesh position={[0.22, 0.45, 0]} rotation={[0, 0, -0.45]} geometry={partnerBTorsoGeom} material={roseMaterial} />
            {/* Bust */}
            <mesh position={[0.2, 0.55, 0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[0.2, 0.55, -0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            {/* Supporting Arms */}
            <mesh position={[0.35, 0.15, 0.38]} rotation={[0.3, 0.1, 0.3]} geometry={armGeom} material={roseMaterial} />
            <mesh position={[0.35, 0.15, -0.38]} rotation={[-0.3, -0.1, 0.3]} geometry={armGeom} material={roseMaterial} />
            {/* Straddling Thighs */}
            <mesh position={[-0.15, -0.15, 0.42]} rotation={[0.4, 0.2, 1.1]} geometry={thighGeom} material={roseMaterial} />
            <mesh position={[-0.15, -0.15, -0.42]} rotation={[-0.4, -0.2, 1.1]} geometry={thighGeom} material={roseMaterial} />
          </group>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          POSE 4: STANDING_LIFT (Wall Pin, Counter Press, Standing Helix)
         ───────────────────────────────────────────────────────────────── */}
      {poseArchetype === 'STANDING_LIFT' && (
        <>
          {/* Vertical Wall Backing */}
          <mesh position={[-0.6, 1.1, 0]}>
            <boxGeometry args={[0.15, 2.4, 1.8]} />
            <meshStandardMaterial color="#120F09" roughness={0.9} />
          </mesh>

          {/* Partner B (Receiver - Rose) Pinned / Hoisted against Wall */}
          <group ref={partnerBRef} position={[-0.35, 1.1, 0]}>
            <mesh position={[-0.05, 0.75, 0]} material={roseMaterial}><sphereGeometry args={[0.22, 32, 32]} /></mesh>
            <mesh position={[-0.02, 0.35, 0]} rotation={[0, 0, 0.1]} geometry={partnerBTorsoGeom} material={roseMaterial} />
            <mesh position={[0.02, 0.45, 0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[0.02, 0.45, -0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            {/* Hoisted Wrapped Thighs */}
            <mesh position={[0.28, 0.15, 0.38]} rotation={[0.4, 0.2, -0.6]} geometry={thighGeom} material={roseMaterial} />
            <mesh position={[0.28, 0.15, -0.38]} rotation={[-0.4, -0.2, -0.6]} geometry={thighGeom} material={roseMaterial} />
          </group>

          {/* Partner A (Initiator - Gold) Standing Power Stance */}
          <group ref={partnerARef} position={[0.22, 0.95, 0.25]}>
            <mesh position={[0.18, 0.85, 0]} material={goldMaterial}><sphereGeometry args={[0.25, 32, 32]} /></mesh>
            <mesh position={[0.12, 0.45, 0]} rotation={[0, 0, -0.25]} geometry={partnerATorsoGeom} material={goldMaterial} />
            {/* Lifting Arms Under Thighs */}
            <mesh position={[-0.15, 0.2, 0.35]} rotation={[0.4, 0.2, -0.9]} geometry={armGeom} material={goldMaterial} />
            <mesh position={[-0.15, 0.2, -0.35]} rotation={[-0.4, -0.2, -0.9]} geometry={armGeom} material={goldMaterial} />
            {/* Standing Quads */}
            <mesh position={[0.18, -0.42, 0.25]} rotation={[0.1, 0, 0.1]} geometry={thighGeom} material={goldMaterial} />
            <mesh position={[0.18, -0.42, -0.25]} rotation={[-0.1, 0, 0.1]} geometry={thighGeom} material={goldMaterial} />
          </group>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          POSE 5: SEATED_LOTUS (Lotus Lock, Velvet Trap, Obsidian Spoon)
         ───────────────────────────────────────────────────────────────── */}
      {poseArchetype === 'SEATED_LOTUS' && (
        <>
          {/* Partner B (Receiver - Rose) Seated / Reclined Close */}
          <group ref={partnerBRef} position={[-0.2, 0.65, 0]}>
            <mesh position={[-0.15, 0.75, 0]} material={roseMaterial}><sphereGeometry args={[0.22, 32, 32]} /></mesh>
            <mesh position={[-0.08, 0.38, 0]} rotation={[0, 0, 0.15]} geometry={partnerBTorsoGeom} material={roseMaterial} />
            <mesh position={[-0.06, 0.46, 0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[-0.06, 0.46, -0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            {/* Interlaced Legs */}
            <mesh position={[0.28, 0.15, 0.35]} rotation={[0.4, 0.2, -0.7]} geometry={thighGeom} material={roseMaterial} />
            <mesh position={[0.28, 0.15, -0.35]} rotation={[-0.4, -0.2, -0.7]} geometry={thighGeom} material={roseMaterial} />
          </group>

          {/* Partner A (Initiator - Gold) Embracing Upright */}
          <group ref={partnerARef} position={[0.2, 0.7, 0.2]}>
            <mesh position={[0.12, 0.78, 0]} material={goldMaterial}><sphereGeometry args={[0.25, 32, 32]} /></mesh>
            <mesh position={[0.08, 0.42, 0]} rotation={[0, 0, -0.2]} geometry={partnerATorsoGeom} material={goldMaterial} />
            {/* Embracing Arms */}
            <mesh position={[-0.18, 0.35, 0.3]} rotation={[0.3, 0.1, -0.8]} geometry={armGeom} material={goldMaterial} />
            <mesh position={[-0.18, 0.35, -0.3]} rotation={[-0.3, -0.1, -0.8]} geometry={armGeom} material={goldMaterial} />
            {/* Seated Quads */}
            <mesh position={[0.2, -0.22, 0.38]} rotation={[0.3, 0.1, 0.9]} geometry={thighGeom} material={goldMaterial} />
            <mesh position={[0.2, -0.22, -0.38]} rotation={[-0.3, -0.1, 0.9]} geometry={thighGeom} material={goldMaterial} />
          </group>
        </>
      )}

      {/* ── Internal Target Hotspot Glow Orb ── */}
      <mesh ref={hotspotRef} position={[0.08, 0.52, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#F43F5E" transparent opacity={0.9} />
      </mesh>
      <pointLight position={[0.08, 0.52, 0]} color="#F43F5E" intensity={3.5} distance={1.8} />
    </group>
  )
}

// ─── Main Interactive WebGL Three.js Viewport ─────────────────────────
export default function ThreePositionViewport({
  positionData,
  bpm,
  povPreset
}: {
  positionData: PositionItem
  bpm: number
  povPreset: 'orbit' | 'povA' | 'povB' | 'pelvicZoom'
}) {
  // Camera angles mapped to POV Presets
  const cameraConfig = useMemo(() => {
    switch (povPreset) {
      case 'povA':
        // Partner A First-Person POV (Looking Downward along Torso to Partner B)
        return { position: [0.35, 1.85, 0.75] as [number, number, number], fov: 62 }
      case 'povB':
        // Partner B First-Person POV (Looking Upward at Partner A)
        return { position: [-1.15, 0.75, 0] as [number, number, number], fov: 58 }
      case 'pelvicZoom':
        // Close-up on pelvic alignment & penetration angle
        return { position: [0.55, 0.85, 0.4] as [number, number, number], fov: 38 }
      case 'orbit':
      default:
        // Studio 360 Orbit Perspective
        return { position: [2.3, 1.7, 2.3] as [number, number, number], fov: 46 }
    }
  }, [povPreset])

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-[#070604] border border-[rgba(232,160,32,0.3)] shadow-[inset_0_0_90px_rgba(0,0,0,0.9),0_15px_45px_rgba(0,0,0,0.85)]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#070604']} />

        <PerspectiveCamera makeDefault position={cameraConfig.position} fov={cameraConfig.fov} />
        <OrbitControls
          enablePan={false}
          minDistance={0.8}
          maxDistance={4.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          autoRotate={povPreset === 'orbit'}
          autoRotateSpeed={0.8}
        />

        {/* ── Studio Lighting Rig with Opposing 15° Glancing Rim Lights ── */}
        <ambientLight intensity={0.45} />
        <directionalLight position={[4.5, 4.5, 3.5]} intensity={2.0} color="#FDE047" castShadow />
        <directionalLight position={[-4.5, 3.2, -3.5]} intensity={1.7} color="#F43F5E" />
        <directionalLight position={[0.5, 4.8, -4.0]} intensity={1.2} color="#F59E0B" />
        <pointLight position={[0, 3, 0]} intensity={1.3} color="#F59E0B" distance={6} />
        <pointLight position={[0, -1, 0]} intensity={0.8} color="#BE185D" distance={4} />

        {/* ── 3D Anatomy Model Mesh ── */}
        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.15}>
          <ArticulatedAnatomyModel positionData={positionData} bpm={bpm} />
        </Float>

        {/* ── Floor Contact Shadow ── */}
        <ContactShadows
          position={[0, -0.05, 0]}
          opacity={0.75}
          scale={5}
          blur={2.5}
          far={3}
          color="#000000"
        />
      </Canvas>

      {/* Active Position HUD Badge */}
      <div className="absolute top-3 left-3 bg-[#0a0906]/85 px-3 py-1.5 rounded-lg border border-[rgba(232,160,32,0.35)] text-xs text-[#f5e8c8] tracking-widest uppercase flex items-center gap-2 backdrop-blur-md shadow-lg pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#e8a020] animate-pulse" />
        {positionData.name} · <span className="text-[#e8a020] font-semibold">{positionData.pelvicTiltDeg}° Tilt</span>
      </div>

      {/* Two-Tone Identity Legend Badge */}
      <div className="absolute bottom-3 left-3 bg-[#0a0906]/90 px-3.5 py-2 rounded-xl border border-[rgba(245,232,200,0.15)] flex items-center gap-4 text-xs tracking-wider backdrop-blur-md shadow-lg pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E07A1E] shadow-[0_0_8px_#E07A1E]" />
          <span className="text-[#FDE68A] font-medium">Initiator (Obsidian Amber)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FB7185] shadow-[0_0_8px_#FB7185]" />
          <span className="text-[#FBCFE8] font-medium">Receiver (Rose Velvet)</span>
        </div>
      </div>

      {/* Interactive 3D Orbit Tip Overlay */}
      <div className="absolute top-3 right-3 bg-[#0a0906]/85 px-3 py-1.5 rounded-lg border border-[rgba(232,160,32,0.3)] text-[11px] text-[#f5e8c8]/70 tracking-wider flex items-center gap-1.5 backdrop-blur-md pointer-events-none shadow-md">
        <span>🔄 Drag to 360° Rotate · Scroll to Zoom</span>
      </div>
    </div>
  )
}

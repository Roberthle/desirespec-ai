'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'
import { PositionItem } from '../lib/positionsData'

// ─── Procedural Tapered Anatomical Mesh Helpers ───────────────────────
function TaperedLimb({
  topRadius,
  bottomRadius,
  length,
  material,
  position,
  rotation
}: {
  topRadius: number
  bottomRadius: number
  length: number
  material: THREE.Material
  position?: [number, number, number]
  rotation?: [number, number, number]
}) {
  return (
    <mesh position={position} rotation={rotation} material={material}>
      <cylinderGeometry args={[topRadius, bottomRadius, length, 24]} />
    </mesh>
  )
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

  // Luxury Noir Materials
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#D97706'),
        emissive: new THREE.Color('#451A03'),
        emissiveIntensity: 0.25,
        roughness: 0.28,
        metalness: 0.15,
        clearcoat: 0.45,
        clearcoatRoughness: 0.18,
      }),
    []
  )

  const roseMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#F43F5E'),
        emissive: new THREE.Color('#4C0519'),
        emissiveIntensity: 0.3,
        roughness: 0.22,
        metalness: 0.2,
        clearcoat: 0.6,
        clearcoatRoughness: 0.12,
      }),
    []
  )

  // Classify active pose archetype based on category / variant
  const poseArchetype = useMemo(() => {
    const v = positionData.svgVariant
    const c = positionData.category

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
    // High-angle suspensions, piledrivers, anvil presses, submission bridges
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
            {/* Head & Neck */}
            <mesh position={[-0.85, 0.2, 0]} material={roseMaterial}>
              <sphereGeometry args={[0.22, 32, 32]} />
            </mesh>
            <TaperedLimb topRadius={0.1} bottomRadius={0.12} length={0.25} material={roseMaterial} position={[-0.65, 0.15, 0]} rotation={[0, 0, 1.4]} />

            {/* Torso: Ribcage taper & bust */}
            <TaperedLimb topRadius={0.24} bottomRadius={0.18} length={0.45} material={roseMaterial} position={[-0.35, 0.12, 0]} rotation={[0, 0, 1.55]} />
            <mesh position={[-0.38, 0.26, 0.12]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[-0.38, 0.26, -0.12]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>

            {/* Slender Waist & Arched Pelvis */}
            <TaperedLimb topRadius={0.17} bottomRadius={0.25} length={0.35} material={roseMaterial} position={[-0.05, 0.16, 0]} rotation={[0, 0, 1.5]} />
            <mesh position={[0.18, 0.22, 0]} material={roseMaterial}><sphereGeometry args={[0.28, 32, 32]} /></mesh>

            {/* Elevated Thighs Wrapping Around Initiator */}
            <TaperedLimb topRadius={0.18} bottomRadius={0.13} length={0.65} material={roseMaterial} position={[0.42, 0.65, 0.32]} rotation={[0.3, 0.1, -0.85]} />
            <TaperedLimb topRadius={0.18} bottomRadius={0.13} length={0.65} material={roseMaterial} position={[0.42, 0.65, -0.32]} rotation={[-0.3, -0.1, -0.85]} />
            {/* Slender Calves / Ankles */}
            <TaperedLimb topRadius={0.12} bottomRadius={0.08} length={0.6} material={roseMaterial} position={[0.72, 1.05, 0.42]} rotation={[0.15, 0, -0.2]} />
            <TaperedLimb topRadius={0.12} bottomRadius={0.08} length={0.6} material={roseMaterial} position={[0.72, 1.05, -0.42]} rotation={[-0.15, 0, -0.2]} />
          </group>

          {/* Partner A (Initiator - Gold) Kneeling Downward Plunge */}
          <group ref={partnerARef} position={[0.25, 0.85, 0.32]}>
            {/* Head */}
            <mesh position={[0.4, 0.95, 0]} material={goldMaterial}><sphereGeometry args={[0.25, 32, 32]} /></mesh>
            {/* Muscular Broad Torso */}
            <TaperedLimb topRadius={0.32} bottomRadius={0.22} length={0.7} material={goldMaterial} position={[0.25, 0.55, 0]} rotation={[0, 0, -0.45]} />
            {/* Deltoids & Arms */}
            <TaperedLimb topRadius={0.14} bottomRadius={0.1} length={0.65} material={goldMaterial} position={[-0.05, 0.45, 0.42]} rotation={[0.4, 0.2, -0.8]} />
            <TaperedLimb topRadius={0.14} bottomRadius={0.1} length={0.65} material={goldMaterial} position={[-0.05, 0.45, -0.42]} rotation={[-0.4, -0.2, -0.8]} />
            {/* Pelvic Mass & Thighs */}
            <mesh position={[0.12, 0.12, 0]} material={goldMaterial}><sphereGeometry args={[0.29, 32, 32]} /></mesh>
            <TaperedLimb topRadius={0.19} bottomRadius={0.14} length={0.7} material={goldMaterial} position={[0.35, -0.25, 0.45]} rotation={[0.3, 0.2, 0.8]} />
            <TaperedLimb topRadius={0.19} bottomRadius={0.14} length={0.7} material={goldMaterial} position={[0.35, -0.25, -0.45]} rotation={[-0.3, -0.2, 0.8]} />
          </group>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          POSE 2: PRONE_ARCH (Modified Prone Bone, Obsidian Clamp, Hammock)
         ───────────────────────────────────────────────────────────────── */}
      {poseArchetype === 'PRONE_ARCH' && (
        <>
          {/* Partner B (Receiver - Rose) Prone Face-Down with Arched Pelvis */}
          <group ref={partnerBRef} position={[0, 0.35, 0]} rotation={[0, 0, 0]}>
            {/* Head Low on Bed */}
            <mesh position={[-0.95, 0.15, 0]} material={roseMaterial}><sphereGeometry args={[0.21, 32, 32]} /></mesh>
            {/* Slender Arched Spine & Ribcage */}
            <TaperedLimb topRadius={0.22} bottomRadius={0.16} length={0.5} material={roseMaterial} position={[-0.55, 0.15, 0]} rotation={[0, 0, 1.4]} />
            {/* High Elevated Glutes */}
            <mesh position={[-0.05, 0.38, 0]} material={roseMaterial}><sphereGeometry args={[0.3, 32, 32]} /></mesh>
            {/* Tightly Pressed Legs Extending Back */}
            <TaperedLimb topRadius={0.17} bottomRadius={0.12} length={0.75} material={roseMaterial} position={[0.45, 0.25, 0.12]} rotation={[0, 0, 1.45]} />
            <TaperedLimb topRadius={0.17} bottomRadius={0.12} length={0.75} material={roseMaterial} position={[0.45, 0.25, -0.12]} rotation={[0, 0, 1.45]} />
            <TaperedLimb topRadius={0.11} bottomRadius={0.07} length={0.65} material={roseMaterial} position={[1.05, 0.15, 0.12]} rotation={[0, 0, 1.55]} />
            <TaperedLimb topRadius={0.11} bottomRadius={0.07} length={0.65} material={roseMaterial} position={[1.05, 0.15, -0.12]} rotation={[0, 0, 1.55]} />
          </group>

          {/* Partner A (Initiator - Gold) Mounted Dominant Over Pelvis */}
          <group ref={partnerARef} position={[-0.05, 0.7, 0.28]}>
            {/* Head */}
            <mesh position={[-0.15, 0.85, 0]} material={goldMaterial}><sphereGeometry args={[0.24, 32, 32]} /></mesh>
            {/* Muscular Torso */}
            <TaperedLimb topRadius={0.3} bottomRadius={0.2} length={0.65} material={goldMaterial} position={[-0.1, 0.45, 0]} rotation={[0, 0, -0.2]} />
            {/* Arms Gripping Partner B Lower Back */}
            <TaperedLimb topRadius={0.13} bottomRadius={0.09} length={0.6} material={goldMaterial} position={[-0.25, 0.18, 0.35]} rotation={[0.4, 0.1, -0.6]} />
            <TaperedLimb topRadius={0.13} bottomRadius={0.09} length={0.6} material={goldMaterial} position={[-0.25, 0.18, -0.35]} rotation={[-0.4, -0.1, -0.6]} />
            {/* Glutes & Straddling Knees */}
            <mesh position={[0.08, 0.05, 0]} material={goldMaterial}><sphereGeometry args={[0.28, 32, 32]} /></mesh>
            <TaperedLimb topRadius={0.18} bottomRadius={0.13} length={0.7} material={goldMaterial} position={[0.25, -0.28, 0.42]} rotation={[0.4, 0.2, 0.9]} />
            <TaperedLimb topRadius={0.18} bottomRadius={0.13} length={0.7} material={goldMaterial} position={[0.25, -0.28, -0.42]} rotation={[-0.4, -0.2, 0.9]} />
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
            <TaperedLimb topRadius={0.28} bottomRadius={0.2} length={0.9} material={goldMaterial} position={[-0.2, 0.15, 0]} rotation={[0, 0, 1.55]} />
            <mesh position={[0.35, 0.15, 0]} material={goldMaterial}><sphereGeometry args={[0.27, 32, 32]} /></mesh>
            <TaperedLimb topRadius={0.17} bottomRadius={0.12} length={0.7} material={goldMaterial} position={[0.85, 0.15, 0.25]} rotation={[0, 0, 1.55]} />
            <TaperedLimb topRadius={0.17} bottomRadius={0.12} length={0.7} material={goldMaterial} position={[0.85, 0.15, -0.25]} rotation={[0, 0, 1.55]} />
          </group>

          {/* Partner B (Top Straddling - Rose) Arched Lean-Back */}
          <group ref={partnerBRef} position={[0.12, 0.85, 0]}>
            {/* Head Leaning Back */}
            <mesh position={[0.45, 0.85, 0]} material={roseMaterial}><sphereGeometry args={[0.22, 32, 32]} /></mesh>
            {/* Arched Torso & Bust */}
            <TaperedLimb topRadius={0.23} bottomRadius={0.16} length={0.65} material={roseMaterial} position={[0.25, 0.45, 0]} rotation={[0, 0, -0.45]} />
            <mesh position={[0.2, 0.55, 0.12]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[0.2, 0.55, -0.12]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            {/* Supporting Arms Leaning on Partner Legs */}
            <TaperedLimb topRadius={0.11} bottomRadius={0.08} length={0.6} material={roseMaterial} position={[0.35, 0.15, 0.38]} rotation={[0.3, 0.1, 0.3]} />
            <TaperedLimb topRadius={0.11} bottomRadius={0.08} length={0.6} material={roseMaterial} position={[0.35, 0.15, -0.38]} rotation={[-0.3, -0.1, 0.3]} />
            {/* Pelvis & Straddling Thighs */}
            <mesh position={[0.02, 0.05, 0]} material={roseMaterial}><sphereGeometry args={[0.28, 32, 32]} /></mesh>
            <TaperedLimb topRadius={0.17} bottomRadius={0.12} length={0.6} material={roseMaterial} position={[-0.15, -0.15, 0.42]} rotation={[0.4, 0.2, 1.1]} />
            <TaperedLimb topRadius={0.17} bottomRadius={0.12} length={0.6} material={roseMaterial} position={[-0.15, -0.15, -0.42]} rotation={[-0.4, -0.2, 1.1]} />
          </group>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          POSE 4: STANDING_LIFT (Wall Pin, Counter Press, Standing Helix)
         ───────────────────────────────────────────────────────────────── */}
      {poseArchetype === 'STANDING_LIFT' && (
        <>
          {/* Vertical Wall Backing Mesh */}
          <mesh position={[-0.6, 1.1, 0]}>
            <boxGeometry args={[0.15, 2.4, 1.8]} />
            <meshStandardMaterial color="#120F09" roughness={0.9} />
          </mesh>

          {/* Partner B (Receiver - Rose) Pinned / Hoisted against Wall */}
          <group ref={partnerBRef} position={[-0.35, 1.1, 0]}>
            <mesh position={[-0.05, 0.75, 0]} material={roseMaterial}><sphereGeometry args={[0.22, 32, 32]} /></mesh>
            <TaperedLimb topRadius={0.23} bottomRadius={0.17} length={0.6} material={roseMaterial} position={[-0.02, 0.35, 0]} rotation={[0, 0, 0.1]} />
            <mesh position={[0.02, 0.45, 0.12]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[0.02, 0.45, -0.12]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[0.02, -0.05, 0]} material={roseMaterial}><sphereGeometry args={[0.27, 32, 32]} /></mesh>
            {/* Hoisted Wrapped Thighs */}
            <TaperedLimb topRadius={0.17} bottomRadius={0.12} length={0.65} material={roseMaterial} position={[0.28, 0.15, 0.38]} rotation={[0.4, 0.2, -0.6]} />
            <TaperedLimb topRadius={0.17} bottomRadius={0.12} length={0.65} material={roseMaterial} position={[0.28, 0.15, -0.38]} rotation={[-0.4, -0.2, -0.6]} />
          </group>

          {/* Partner A (Initiator - Gold) Standing Elevated Power Stance */}
          <group ref={partnerARef} position={[0.22, 0.95, 0.25]}>
            <mesh position={[0.18, 0.85, 0]} material={goldMaterial}><sphereGeometry args={[0.25, 32, 32]} /></mesh>
            <TaperedLimb topRadius={0.31} bottomRadius={0.21} length={0.7} material={goldMaterial} position={[0.12, 0.45, 0]} rotation={[0, 0, -0.25]} />
            {/* Lifting Arms Under Partner B Thighs */}
            <TaperedLimb topRadius={0.14} bottomRadius={0.1} length={0.65} material={goldMaterial} position={[-0.15, 0.2, 0.35]} rotation={[0.4, 0.2, -0.9]} />
            <TaperedLimb topRadius={0.14} bottomRadius={0.1} length={0.65} material={goldMaterial} position={[-0.15, 0.2, -0.35]} rotation={[-0.4, -0.2, -0.9]} />
            {/* Grounded Standing Legs */}
            <mesh position={[0.08, 0.05, 0]} material={goldMaterial}><sphereGeometry args={[0.29, 32, 32]} /></mesh>
            <TaperedLimb topRadius={0.18} bottomRadius={0.12} length={0.9} material={goldMaterial} position={[0.18, -0.48, 0.25]} rotation={[0.1, 0, 0.1]} />
            <TaperedLimb topRadius={0.18} bottomRadius={0.12} length={0.9} material={goldMaterial} position={[0.18, -0.48, -0.25]} rotation={[-0.1, 0, 0.1]} />
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
            <TaperedLimb topRadius={0.23} bottomRadius={0.17} length={0.55} material={roseMaterial} position={[-0.12, 0.38, 0]} rotation={[0, 0, 0.15]} />
            <mesh position={[-0.08, 0.46, 0.12]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[-0.08, 0.46, -0.12]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[0.02, 0.02, 0]} material={roseMaterial}><sphereGeometry args={[0.28, 32, 32]} /></mesh>
            {/* Interlaced Legs around Partner Hips */}
            <TaperedLimb topRadius={0.17} bottomRadius={0.12} length={0.65} material={roseMaterial} position={[0.28, 0.15, 0.35]} rotation={[0.4, 0.2, -0.7]} />
            <TaperedLimb topRadius={0.17} bottomRadius={0.12} length={0.65} material={roseMaterial} position={[0.28, 0.15, -0.35]} rotation={[-0.4, -0.2, -0.7]} />
          </group>

          {/* Partner A (Initiator - Gold) Embracing Upright */}
          <group ref={partnerARef} position={[0.2, 0.7, 0.2]}>
            <mesh position={[0.12, 0.78, 0]} material={goldMaterial}><sphereGeometry args={[0.25, 32, 32]} /></mesh>
            <TaperedLimb topRadius={0.3} bottomRadius={0.2} length={0.65} material={goldMaterial} position={[0.08, 0.42, 0]} rotation={[0, 0, -0.2]} />
            {/* Embracing Arms Wrapped Around Neck/Back */}
            <TaperedLimb topRadius={0.13} bottomRadius={0.09} length={0.6} material={goldMaterial} position={[-0.18, 0.35, 0.3]} rotation={[0.3, 0.1, -0.8]} />
            <TaperedLimb topRadius={0.13} bottomRadius={0.09} length={0.6} material={goldMaterial} position={[-0.18, 0.35, -0.3]} rotation={[-0.3, -0.1, -0.8]} />
            <mesh position={[0.05, 0.05, 0]} material={goldMaterial}><sphereGeometry args={[0.29, 32, 32]} /></mesh>
            <TaperedLimb topRadius={0.18} bottomRadius={0.13} length={0.6} material={goldMaterial} position={[0.2, -0.22, 0.38]} rotation={[0.3, 0.1, 0.9]} />
            <TaperedLimb topRadius={0.18} bottomRadius={0.13} length={0.6} material={goldMaterial} position={[0.2, -0.22, -0.38]} rotation={[-0.3, -0.1, 0.9]} />
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

        {/* ── Studio Lighting Rig ── */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 3]} intensity={1.9} color="#FEF08A" castShadow />
        <directionalLight position={[-4, 3, -3]} intensity={1.5} color="#F472B6" />
        <pointLight position={[0, 3, 0]} intensity={1.4} color="#F59E0B" distance={6} />
        <pointLight position={[0, -1, 0]} intensity={0.9} color="#BE185D" distance={4} />

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
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] shadow-[0_0_8px_#D97706]" />
          <span className="text-[#FDE68A] font-medium">Initiator (Obsidian Gold)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E] shadow-[0_0_8px_#F43F5E]" />
          <span className="text-[#FBCFE8] font-medium">Receiver (Rose Platinum)</span>
        </div>
      </div>

      {/* Interactive 3D Orbit Tip Overlay */}
      <div className="absolute top-3 right-3 bg-[#0a0906]/85 px-3 py-1.5 rounded-lg border border-[rgba(232,160,32,0.3)] text-[11px] text-[#f5e8c8]/70 tracking-wider flex items-center gap-1.5 backdrop-blur-md pointer-events-none shadow-md">
        <span>🔄 Drag to 360° Rotate · Scroll to Zoom</span>
      </div>
    </div>
  )
}

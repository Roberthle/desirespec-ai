'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'
import { PositionItem } from '../lib/positionsData'

// ─── Procedural 3D Volumetric Body Mesh Component ──────────────────────
function ProceduralAnatomyPair({
  variant,
  thrustVector,
  bpm
}: {
  variant: PositionItem['svgVariant']
  thrustVector: PositionItem['thrustVector']
  bpm: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const partnerARef = useRef<THREE.Group>(null)
  const partnerBRef = useRef<THREE.Group>(null)
  const hotspotRef = useRef<THREE.Mesh>(null)

  // Physical Materials: Muscular Amber/Gold (Partner A) vs Rose Obsidian (Partner B)
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#F59E0B'),
        emissive: new THREE.Color('#78350F'),
        emissiveIntensity: 0.25,
        roughness: 0.35,
        metalness: 0.15,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
      }),
    []
  )

  const roseMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#EC4899'),
        emissive: new THREE.Color('#831843'),
        emissiveIntensity: 0.3,
        roughness: 0.3,
        metalness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
      }),
    []
  )

  // Real-time kinematic thrust & pelvic friction animation loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const freq = (bpm / 60) * Math.PI * 2

    if (partnerARef.current && partnerBRef.current) {
      if (thrustVector === 'Deep Angled Plunge') {
        const plunge = Math.pow(Math.sin(t * freq), 3) * 0.25
        partnerARef.current.position.z = plunge
        partnerARef.current.position.y = -Math.abs(plunge) * 0.15
      } else if (thrustVector === 'Rotational Grind') {
        partnerARef.current.position.x = Math.sin(t * freq) * 0.12
        partnerARef.current.position.z = Math.cos(t * freq) * 0.12
        partnerBRef.current.rotation.z = Math.sin(t * freq * 0.5) * 0.08
      } else if (thrustVector === 'Shallow High-Speed Flutter') {
        partnerARef.current.position.z = Math.sin(t * freq * 2) * 0.08
      } else {
        partnerARef.current.position.z = Math.sin(t * freq) * 0.18
      }
    }

    if (hotspotRef.current) {
      const pulse = 1 + Math.sin(t * 8) * 0.25
      hotspotRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ── Partner B (Receiver / Rose-Dusk Body) ── */}
      <group ref={partnerBRef} position={[0, 0.6, -0.2]}>
        {/* Head */}
        <mesh position={[-0.8, 0.4, 0]} material={roseMaterial}>
          <sphereGeometry args={[0.26, 32, 32]} />
        </mesh>
        {/* Neck */}
        <mesh position={[-0.55, 0.35, 0]} rotation={[0, 0, 1.2]} material={roseMaterial}>
          <cylinderGeometry args={[0.12, 0.14, 0.3, 16]} />
        </mesh>
        {/* Torso & Bust */}
        <mesh position={[-0.2, 0.25, 0]} rotation={[0, 0, 0.1]} material={roseMaterial}>
          <capsuleGeometry args={[0.26, 0.65, 16, 32]} />
        </mesh>
        <mesh position={[-0.25, 0.45, 0.15]} material={roseMaterial}>
          <sphereGeometry args={[0.16, 16, 16]} />
        </mesh>
        <mesh position={[-0.25, 0.45, -0.15]} material={roseMaterial}>
          <sphereGeometry args={[0.16, 16, 16]} />
        </mesh>
        {/* Hips & Pelvis Volume */}
        <mesh position={[0.25, 0.18, 0]} material={roseMaterial}>
          <sphereGeometry args={[0.34, 32, 32]} />
        </mesh>
        {/* Thighs & Knees (Elevated / Interlocked) */}
        <mesh position={[0.55, 0.5, 0.28]} rotation={[0.4, 0.2, -0.6]} material={roseMaterial}>
          <capsuleGeometry args={[0.16, 0.7, 16, 16]} />
        </mesh>
        <mesh position={[0.55, 0.5, -0.28]} rotation={[-0.4, -0.2, -0.6]} material={roseMaterial}>
          <capsuleGeometry args={[0.16, 0.7, 16, 16]} />
        </mesh>
        {/* Lower Legs / Ankles */}
        <mesh position={[0.85, 0.8, 0.38]} rotation={[0.2, 0, -0.2]} material={roseMaterial}>
          <capsuleGeometry args={[0.12, 0.65, 16, 16]} />
        </mesh>
        <mesh position={[0.85, 0.8, -0.38]} rotation={[-0.2, 0, -0.2]} material={roseMaterial}>
          <capsuleGeometry args={[0.12, 0.65, 16, 16]} />
        </mesh>
      </group>

      {/* ── Partner A (Initiator / Amber Gold Body) ── */}
      <group ref={partnerARef} position={[0.3, 0.9, 0.35]}>
        {/* Head */}
        <mesh position={[0.4, 0.9, 0]} material={goldMaterial}>
          <sphereGeometry args={[0.28, 32, 32]} />
        </mesh>
        {/* Broad Shoulders & Muscular Chest */}
        <mesh position={[0.25, 0.55, 0]} rotation={[0, 0, -0.35]} material={goldMaterial}>
          <capsuleGeometry args={[0.32, 0.8, 16, 32]} />
        </mesh>
        {/* Arms Reaching / Gripping */}
        <mesh position={[-0.05, 0.45, 0.45]} rotation={[0.5, 0.2, -0.8]} material={goldMaterial}>
          <capsuleGeometry args={[0.14, 0.75, 16, 16]} />
        </mesh>
        <mesh position={[-0.05, 0.45, -0.45]} rotation={[-0.5, -0.2, -0.8]} material={goldMaterial}>
          <capsuleGeometry args={[0.14, 0.75, 16, 16]} />
        </mesh>
        {/* Pelvic Core & Glute Mass */}
        <mesh position={[0.1, 0.1, 0]} material={goldMaterial}>
          <sphereGeometry args={[0.33, 32, 32]} />
        </mesh>
        {/* Powerful Straddling Thighs */}
        <mesh position={[0.35, -0.25, 0.45]} rotation={[0.4, 0.3, 0.8]} material={goldMaterial}>
          <capsuleGeometry args={[0.18, 0.75, 16, 16]} />
        </mesh>
        <mesh position={[0.35, -0.25, -0.45]} rotation={[-0.4, -0.3, 0.8]} material={goldMaterial}>
          <capsuleGeometry args={[0.18, 0.75, 16, 16]} />
        </mesh>
      </group>

      {/* ── Internal Target Hotspot Glow Orb ── */}
      <mesh ref={hotspotRef} position={[0.22, 0.78, -0.05]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#F43F5E" transparent opacity={0.85} />
      </mesh>
      <pointLight position={[0.22, 0.78, -0.05]} color="#F43F5E" intensity={3} distance={1.8} />
    </group>
  )
}

// ─── Main Interactive WebGL Three.js Viewport ─────────────────────────
export default function ThreePositionViewport({
  variant,
  thrustVector,
  bpm,
  povPreset
}: {
  variant: PositionItem['svgVariant']
  thrustVector: PositionItem['thrustVector']
  bpm: number
  povPreset: 'orbit' | 'povA' | 'povB' | 'pelvicZoom'
}) {
  // Camera angles mapped to POV Presets
  const cameraConfig = useMemo(() => {
    switch (povPreset) {
      case 'povA':
        // Partner A First-Person POV (Looking Downward along Chest to Partner B)
        return { position: [0.65, 2.1, 0.7] as [number, number, number], fov: 62 }
      case 'povB':
        // Partner B First-Person POV (Looking Upward at Partner A)
        return { position: [-1.2, 0.85, 0] as [number, number, number], fov: 58 }
      case 'pelvicZoom':
        // Close-up on pelvic alignment & penetration angle
        return { position: [0.75, 1.05, 0.45] as [number, number, number], fov: 42 }
      case 'orbit':
      default:
        // Studio 360 Orbit Perspective
        return { position: [2.2, 1.8, 2.2] as [number, number, number], fov: 48 }
    }
  }, [povPreset])

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-[#070604] border border-[rgba(232,160,32,0.3)] shadow-[inset_0_0_90px_rgba(0,0,0,0.9),0_15px_45px_rgba(0,0,0,0.85)]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#070604']} />

        <PerspectiveCamera makeDefault position={cameraConfig.position} fov={cameraConfig.fov} />
        <OrbitControls
          enablePan={false}
          minDistance={1.0}
          maxDistance={4.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          autoRotate={povPreset === 'orbit'}
          autoRotateSpeed={1.0}
        />

        {/* ── Studio Lighting Rig ── */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 3]} intensity={1.8} color="#FEF08A" castShadow />
        <directionalLight position={[-4, 3, -3]} intensity={1.4} color="#F472B6" />
        <pointLight position={[0, 3, 0]} intensity={1.2} color="#F59E0B" distance={6} />
        <pointLight position={[0, -1, 0]} intensity={0.8} color="#BE185D" distance={4} />

        {/* ── 3D Anatomy Model Mesh ── */}
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <ProceduralAnatomyPair variant={variant} thrustVector={thrustVector} bpm={bpm} />
        </Float>

        {/* ── Floor Contact Shadow ── */}
        <ContactShadows
          position={[0, -0.2, 0]}
          opacity={0.7}
          scale={5}
          blur={2.4}
          far={3}
          color="#000000"
        />
      </Canvas>

      {/* Interactive 3D Orbit Tip Overlay */}
      <div className="absolute top-3 right-3 bg-[#0a0906]/85 px-3 py-1.5 rounded-lg border border-[rgba(232,160,32,0.3)] text-[11px] text-[#f5e8c8]/70 tracking-wider flex items-center gap-1.5 backdrop-blur-md pointer-events-none shadow-md">
        <span>🔄 Drag to 360° Rotate · Scroll to Zoom</span>
      </div>
    </div>
  )
}

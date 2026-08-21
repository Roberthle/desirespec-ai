'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'
import { PositionItem } from '../lib/positionsData'

// ─── Procedural Organic Spline Lathe Geometry Generators ──────────────
function createMannequinHeadGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.01, 0.28),
    new THREE.Vector2(0.12, 0.26),
    new THREE.Vector2(0.17, 0.18),
    new THREE.Vector2(0.165, 0.06),
    new THREE.Vector2(0.13, -0.08),
    new THREE.Vector2(0.07, -0.20),
    new THREE.Vector2(0.01, -0.22),
  ]
  const curve = new THREE.SplineCurve(points)
  const geom = new THREE.LatheGeometry(curve.getPoints(32), 48)
  geom.computeVertexNormals()
  return geom
}

function createOrganicTorsoGeometry(isPartnerA: boolean): THREE.BufferGeometry {
  const points: THREE.Vector2[] = []
  if (isPartnerA) {
    points.push(new THREE.Vector2(0.08, 0.45))
    points.push(new THREE.Vector2(0.18, 0.42))
    points.push(new THREE.Vector2(0.30, 0.32))
    points.push(new THREE.Vector2(0.32, 0.20))
    points.push(new THREE.Vector2(0.28, 0.05))
    points.push(new THREE.Vector2(0.22, -0.15))
    points.push(new THREE.Vector2(0.26, -0.32))
    points.push(new THREE.Vector2(0.28, -0.45))
    points.push(new THREE.Vector2(0.12, -0.52))
  } else {
    points.push(new THREE.Vector2(0.06, 0.42))
    points.push(new THREE.Vector2(0.14, 0.38))
    points.push(new THREE.Vector2(0.23, 0.28))
    points.push(new THREE.Vector2(0.26, 0.16))
    points.push(new THREE.Vector2(0.22, 0.02))
    points.push(new THREE.Vector2(0.16, -0.14))
    points.push(new THREE.Vector2(0.25, -0.28))
    points.push(new THREE.Vector2(0.30, -0.42))
    points.push(new THREE.Vector2(0.10, -0.50))
  }

  const curve = new THREE.SplineCurve(points)
  const geom = new THREE.LatheGeometry(curve.getPoints(36), 64)
  geom.computeVertexNormals()
  return geom
}

function createUpperArmGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.14, 0.24),
    new THREE.Vector2(0.135, 0.12),
    new THREE.Vector2(0.115, -0.04),
    new THREE.Vector2(0.09, -0.18),
  ]
  const curve = new THREE.SplineCurve(points)
  const geom = new THREE.LatheGeometry(curve.getPoints(24), 48)
  geom.computeVertexNormals()
  return geom
}

function createForearmGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.09, 0.22),
    new THREE.Vector2(0.11, 0.10),
    new THREE.Vector2(0.085, -0.08),
    new THREE.Vector2(0.065, -0.22),
  ]
  const curve = new THREE.SplineCurve(points)
  const geom = new THREE.LatheGeometry(curve.getPoints(24), 48)
  geom.computeVertexNormals()
  return geom
}

function createHandGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0.05, -0.04)
  shape.lineTo(0.06, -0.12)
  shape.lineTo(0.04, -0.18)
  shape.lineTo(0.01, -0.19)
  shape.lineTo(-0.03, -0.14)
  shape.lineTo(-0.04, -0.04)
  shape.closePath()

  const extrudeSettings = {
    steps: 2,
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 4
  }
  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  geom.center()
  geom.computeVertexNormals()
  return geom
}

function createMuscularThighGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.19, 0.28),
    new THREE.Vector2(0.22, 0.18),
    new THREE.Vector2(0.235, 0.05),
    new THREE.Vector2(0.21, -0.12),
    new THREE.Vector2(0.17, -0.22),
    new THREE.Vector2(0.135, -0.28),
  ]
  const curve = new THREE.SplineCurve(points)
  const geom = new THREE.LatheGeometry(curve.getPoints(28), 64)
  geom.computeVertexNormals()
  return geom
}

function createSculptedCalfGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0.135, 0.26),
    new THREE.Vector2(0.165, 0.14),
    new THREE.Vector2(0.145, 0.02),
    new THREE.Vector2(0.11, -0.12),
    new THREE.Vector2(0.08, -0.22),
    new THREE.Vector2(0.07, -0.26),
  ]
  const curve = new THREE.SplineCurve(points)
  const geom = new THREE.LatheGeometry(curve.getPoints(28), 64)
  geom.computeVertexNormals()
  return geom
}

function createFootGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0.06, -0.04)
  shape.lineTo(0.09, -0.12)
  shape.lineTo(0.08, -0.22)
  shape.lineTo(0.03, -0.24)
  shape.lineTo(-0.04, -0.16)
  shape.lineTo(-0.06, -0.05)
  shape.closePath()

  const extrudeSettings = {
    steps: 2,
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 4
  }
  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  geom.center()
  geom.computeVertexNormals()
  return geom
}

// ─── Hierarchical 2-Bone Arm Chain Component ──────────────────────────
function ArticulatedArmChain({
  upperArmGeom,
  forearmGeom,
  handGeom,
  material,
  shoulderPos,
  shoulderRot,
  elbowRot,
  wristRot
}: {
  upperArmGeom: THREE.BufferGeometry
  forearmGeom: THREE.BufferGeometry
  handGeom: THREE.BufferGeometry
  material: THREE.Material
  shoulderPos: [number, number, number]
  shoulderRot: [number, number, number]
  elbowRot: [number, number, number]
  wristRot: [number, number, number]
}) {
  return (
    <group position={shoulderPos} rotation={shoulderRot}>
      <mesh geometry={upperArmGeom} material={material} />
      <group position={[0, -0.24, 0]} rotation={elbowRot}>
        <mesh geometry={forearmGeom} position={[0, -0.22, 0]} material={material} />
        <group position={[0, -0.44, 0]} rotation={wristRot}>
          <mesh geometry={handGeom} material={material} scale={[0.75, 0.75, 0.75]} />
        </group>
      </group>
    </group>
  )
}

// ─── Hierarchical 2-Bone Leg Chain Component ──────────────────────────
function ArticulatedLegChain({
  thighGeom,
  calfGeom,
  footGeom,
  material,
  hipPos,
  hipRot,
  kneeRot,
  ankleRot
}: {
  thighGeom: THREE.BufferGeometry
  calfGeom: THREE.BufferGeometry
  footGeom: THREE.BufferGeometry
  material: THREE.Material
  hipPos: [number, number, number]
  hipRot: [number, number, number]
  kneeRot: [number, number, number]
  ankleRot: [number, number, number]
}) {
  return (
    <group position={hipPos} rotation={hipRot}>
      <mesh geometry={thighGeom} material={material} />
      <group position={[0, -0.28, 0]} rotation={kneeRot}>
        <mesh geometry={calfGeom} position={[0, -0.26, 0]} material={material} />
        <group position={[0, -0.52, 0]} rotation={ankleRot}>
          <mesh geometry={footGeom} material={material} scale={[0.85, 0.85, 0.85]} />
        </group>
      </group>
    </group>
  )
}

// ─── 3D Glowing Biomechanical Thrust & Angle Vector Arrow ─────────────
function GlowingThrustVector3D({
  vectorType,
  pelvicTiltDeg,
  bpm
}: {
  vectorType: PositionItem['thrustVector']
  pelvicTiltDeg: number
  bpm: number
}) {
  const arrowRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const freq = (bpm / 60) * Math.PI * 2

    if (arrowRef.current) {
      const pulse = 1 + Math.sin(t * freq) * 0.25
      arrowRef.current.scale.set(1, 1, pulse)
      arrowRef.current.position.z = Math.sin(t * freq) * 0.12
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 2
      const scale = 1 + Math.sin(t * 6) * 0.2
      ringRef.current.scale.set(scale, scale, scale)
    }
  })

  const tiltRad = (pelvicTiltDeg * Math.PI) / 180

  return (
    <group position={[0.08, 0.52, 0]} rotation={[-tiltRad * 0.4, 0, 0]}>
      {/* Dynamic 3D Thrust Arrow Shaft & Cone */}
      <group ref={arrowRef}>
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
          <meshBasicMaterial color="#E8A020" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.06, 0.15, 16]} />
          <meshBasicMaterial color="#F43F5E" />
        </mesh>
      </group>

      {/* Orbiting Friction Target Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.16, 0.19, 32]} />
        <meshBasicMaterial color="#E8A020" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>
    </group>
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

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#D97706'),
        emissive: new THREE.Color('#3A1202'),
        emissiveIntensity: 0.22,
        roughness: 0.18,
        metalness: 0.25,
        clearcoat: 0.85,
        clearcoatRoughness: 0.15,
        flatShading: false,
      }),
    []
  )

  const roseMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#F43F5E'),
        emissive: new THREE.Color('#4C0519'),
        emissiveIntensity: 0.25,
        roughness: 0.14,
        metalness: 0.30,
        clearcoat: 0.95,
        clearcoatRoughness: 0.10,
        flatShading: false,
      }),
    []
  )

  // Memoized Geometries
  const headGeom = useMemo(() => createMannequinHeadGeometry(), [])
  const partnerATorsoGeom = useMemo(() => createOrganicTorsoGeometry(true), [])
  const partnerBTorsoGeom = useMemo(() => createOrganicTorsoGeometry(false), [])
  const upperArmGeom = useMemo(() => createUpperArmGeometry(), [])
  const forearmGeom = useMemo(() => createForearmGeometry(), [])
  const handGeom = useMemo(() => createHandGeometry(), [])
  const thighGeom = useMemo(() => createMuscularThighGeometry(), [])
  const calfGeom = useMemo(() => createSculptedCalfGeometry(), [])
  const footGeom = useMemo(() => createFootGeometry(), [])

  // Classify active pose archetype
  const poseArchetype = useMemo(() => {
    const v = positionData.svgVariant

    if (v === 'sovereign-squat') {
      return 'SOVEREIGN_SQUAT'
    }
    if (v === 'arch-anchor' || v === 'obsidian-clamp' || v === 'velvet-hammock' || v === 'prone-guillotine') {
      return 'PRONE_ARCH'
    }
    if (v === 'overdrive-cowgirl' || v === 'amazon-straddle' || v === 'gspot-throne') {
      return 'STRADDLE_COWGIRL'
    }
    if (v === 'wall-pin' || v === 'counter-press' || v === 'standing-helix' || v === 'suspended-lotus' || v === 'desk-commander' || v === 'cross-axis') {
      return 'STANDING_LIFT'
    }
    if (v === 'lotus-lock' || v === 'lotus-commander' || v === 'velvet-trap' || v === 'scissors-interlock' || v === 'obsidian-lock' || v === 'tandem-horizon' || v === 'lazy-sunday' || v === 'twisted-mermaid') {
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
        if (poseArchetype === 'SOVEREIGN_SQUAT' || poseArchetype === 'STRADDLE_COWGIRL') {
          partnerBRef.current.position.y = 0.85 + Math.abs(plunge) * 0.25
        } else {
          partnerARef.current.position.z = plunge
          partnerARef.current.position.y = -Math.abs(plunge) * 0.12
        }
      } else if (vector === 'Rotational Grind') {
        partnerBRef.current.rotation.y = Math.sin(t * freq) * 0.12
        partnerBRef.current.rotation.z = Math.cos(t * freq) * 0.08
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

  const tiltRad = (positionData.pelvicTiltDeg * Math.PI) / 180

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      {/* ── 3D Glowing Biomechanical Thrust & Angle Vector Overlay ── */}
      <GlowingThrustVector3D
        vectorType={positionData.thrustVector}
        pelvicTiltDeg={positionData.pelvicTiltDeg}
        bpm={bpm}
      />

      {/* ── Pose 1: POV_LEGS_WRAPPED ── */}
      {poseArchetype === 'POV_LEGS_WRAPPED' && (
        <>
          <group ref={partnerBRef} position={[0, 0.45, -0.3]} rotation={[tiltRad * 0.3, 0, 0]}>
            <group position={[-0.85, 0.25, 0]} rotation={[0, 0, 0.2]}>
              <mesh geometry={headGeom} material={roseMaterial} />
            </group>
            <mesh position={[-0.22, 0.15, 0]} rotation={[0, 0, 1.55]} geometry={partnerBTorsoGeom} material={roseMaterial} />
            <mesh position={[-0.35, 0.28, 0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[-0.35, 0.28, -0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[-0.45, 0.28, 0.26]}
              shoulderRot={[0.6, 0.4, -1.2]}
              elbowRot={[-1.4, 0.2, 0]}
              wristRot={[0.4, 0.2, 0.5]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[-0.45, 0.28, -0.26]}
              shoulderRot={[-0.6, -0.4, -1.2]}
              elbowRot={[1.4, -0.2, 0]}
              wristRot={[-0.4, -0.2, 0.5]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.22, 0.25, 0.28]}
              hipRot={[-0.9, 0.4, -0.8]}
              kneeRot={[1.6, -0.3, 0.2]}
              ankleRot={[0.4, 0.2, 0.8]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.22, 0.25, -0.28]}
              hipRot={[0.9, -0.4, -0.8]}
              kneeRot={[-1.6, 0.3, 0.2]}
              ankleRot={[-0.4, -0.2, 0.8]}
            />
          </group>

          <group ref={partnerARef} position={[0.25, 0.85, 0.32]}>
            <group position={[0.4, 0.95, 0]} rotation={[0, 0, -0.35]}>
              <mesh geometry={headGeom} material={goldMaterial} />
            </group>
            <mesh position={[0.25, 0.55, 0]} rotation={[0, 0, -0.45]} geometry={partnerATorsoGeom} material={goldMaterial} />

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[0.18, 0.65, 0.34]}
              shoulderRot={[0.3, 0.2, -0.9]}
              elbowRot={[-0.9, 0.1, 0]}
              wristRot={[0.4, 0.2, 0.5]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[0.18, 0.65, -0.34]}
              shoulderRot={[-0.3, -0.2, -0.9]}
              elbowRot={[0.9, -0.1, 0]}
              wristRot={[-0.4, -0.2, 0.5]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.12, 0.12, 0.34]}
              hipRot={[0.3, 0.2, 0.9]}
              kneeRot={[-1.7, 0, 0]}
              ankleRot={[0.6, 0, 0]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.12, 0.12, -0.34]}
              hipRot={[-0.3, -0.2, 0.9]}
              kneeRot={[1.7, 0, 0]}
              ankleRot={[-0.6, 0, 0]}
            />
          </group>
        </>
      )}

      {/* ── Pose 2: SOVEREIGN_SQUAT ── */}
      {poseArchetype === 'SOVEREIGN_SQUAT' && (
        <>
          <group ref={partnerARef} position={[-0.2, 0.25, 0]}>
            <group position={[-0.75, 0.22, 0]} rotation={[0, 0, 0.15]}>
              <mesh geometry={headGeom} material={goldMaterial} />
            </group>
            <mesh position={[-0.1, 0.15, 0]} rotation={[0, 0, 1.55]} geometry={partnerATorsoGeom} material={goldMaterial} />

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[-0.32, 0.25, 0.30]}
              shoulderRot={[0.4, 0.1, -1.1]}
              elbowRot={[-0.8, 0, 0]}
              wristRot={[0.3, 0.1, 0.4]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[-0.32, 0.25, -0.30]}
              shoulderRot={[-0.4, -0.1, -1.1]}
              elbowRot={[0.8, 0, 0]}
              wristRot={[-0.3, -0.1, 0.4]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.35, 0.15, 0.22]}
              hipRot={[0, 0, 1.55]}
              kneeRot={[0, 0, 0.1]}
              ankleRot={[0, 0, -0.2]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.35, 0.15, -0.22]}
              hipRot={[0, 0, 1.55]}
              kneeRot={[0, 0, 0.1]}
              ankleRot={[0, 0, -0.2]}
            />
          </group>

          <group ref={partnerBRef} position={[0.08, 0.95, 0]}>
            <group position={[0.15, 0.95, 0]} rotation={[0, 0, -0.2]}>
              <mesh geometry={headGeom} material={roseMaterial} />
            </group>
            <mesh position={[0.12, 0.52, 0]} rotation={[0, 0, -0.2]} geometry={partnerBTorsoGeom} material={roseMaterial} />
            <mesh position={[0.08, 0.62, 0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[0.08, 0.62, -0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[0.05, 0.62, 0.26]}
              shoulderRot={[0.3, 0.1, 0.6]}
              elbowRot={[-0.7, 0, 0]}
              wristRot={[0.4, 0, 0]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[0.05, 0.62, -0.26]}
              shoulderRot={[-0.3, -0.1, 0.6]}
              elbowRot={[0.7, 0, 0]}
              wristRot={[-0.4, 0, 0]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.05, 0.08, 0.32]}
              hipRot={[0.7, 0.4, 1.2]}
              kneeRot={[-2.1, 0, 0]}
              ankleRot={[0.8, 0, 0]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.05, 0.08, -0.32]}
              hipRot={[-0.7, -0.4, 1.2]}
              kneeRot={[2.1, 0, 0]}
              ankleRot={[-0.8, 0, 0]}
            />
          </group>
        </>
      )}

      {/* ── Pose 3: PRONE_ARCH ── */}
      {poseArchetype === 'PRONE_ARCH' && (
        <>
          <group ref={partnerBRef} position={[0, 0.35, 0]}>
            <group position={[-0.95, 0.22, 0]} rotation={[0, 0, 0.1]}>
              <mesh geometry={headGeom} material={roseMaterial} />
            </group>
            <mesh position={[-0.35, 0.22, 0]} rotation={[0, 0, 1.4]} geometry={partnerBTorsoGeom} material={roseMaterial} />

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[-0.55, 0.25, 0.24]}
              shoulderRot={[0.3, 0, 1.2]}
              elbowRot={[-1.2, 0, 0]}
              wristRot={[0.2, 0, 0]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[-0.55, 0.25, -0.24]}
              shoulderRot={[-0.3, 0, 1.2]}
              elbowRot={[1.2, 0, 0]}
              wristRot={[-0.2, 0, 0]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.15, 0.22, 0.14]}
              hipRot={[0, 0, 1.5]}
              kneeRot={[0, 0, 0.1]}
              ankleRot={[0, 0, -0.3]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.15, 0.22, -0.14]}
              hipRot={[0, 0, 1.5]}
              kneeRot={[0, 0, 0.1]}
              ankleRot={[0, 0, -0.3]}
            />
          </group>

          <group ref={partnerARef} position={[-0.05, 0.7, 0.28]}>
            <group position={[-0.15, 0.85, 0]} rotation={[0, 0, -0.2]}>
              <mesh geometry={headGeom} material={goldMaterial} />
            </group>
            <mesh position={[-0.1, 0.45, 0]} rotation={[0, 0, -0.2]} geometry={partnerATorsoGeom} material={goldMaterial} />

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[-0.12, 0.55, 0.32]}
              shoulderRot={[0.4, 0.1, -0.6]}
              elbowRot={[-0.6, 0, 0]}
              wristRot={[0.2, 0.1, 0.3]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[-0.12, 0.55, -0.32]}
              shoulderRot={[-0.4, -0.1, -0.6]}
              elbowRot={[0.6, 0, 0]}
              wristRot={[-0.2, -0.1, 0.3]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.15, -0.12, 0.34]}
              hipRot={[0.4, 0.2, 0.9]}
              kneeRot={[-1.6, 0, 0]}
              ankleRot={[0.5, 0, 0]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.15, -0.12, -0.34]}
              hipRot={[-0.4, -0.2, 0.9]}
              kneeRot={[1.6, 0, 0]}
              ankleRot={[-0.5, 0, 0]}
            />
          </group>
        </>
      )}

      {/* ── Pose 4: STRADDLE_COWGIRL ── */}
      {poseArchetype === 'STRADDLE_COWGIRL' && (
        <>
          <group ref={partnerARef} position={[-0.3, 0.3, 0]}>
            <group position={[-0.75, 0.25, 0]} rotation={[0, 0, 0.2]}>
              <mesh geometry={headGeom} material={goldMaterial} />
            </group>
            <mesh position={[-0.1, 0.15, 0]} rotation={[0, 0, 1.55]} geometry={partnerATorsoGeom} material={goldMaterial} />

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[-0.28, 0.22, 0.28]}
              shoulderRot={[0.3, 0, -1.0]}
              elbowRot={[-0.7, 0, 0]}
              wristRot={[0.3, 0, 0.4]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[-0.28, 0.22, -0.28]}
              shoulderRot={[-0.3, 0, -1.0]}
              elbowRot={[0.7, 0, 0]}
              wristRot={[-0.3, 0, 0.4]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.35, 0.15, 0.22]}
              hipRot={[0, 0, 1.55]}
              kneeRot={[0, 0, 0.1]}
              ankleRot={[0, 0, -0.2]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.35, 0.15, -0.22]}
              hipRot={[0, 0, 1.55]}
              kneeRot={[0, 0, 0.1]}
              ankleRot={[0, 0, -0.2]}
            />
          </group>

          <group ref={partnerBRef} position={[0.12, 0.85, 0]}>
            <group position={[0.45, 0.88, 0]} rotation={[0, 0, -0.45]}>
              <mesh geometry={headGeom} material={roseMaterial} />
            </group>
            <mesh position={[0.22, 0.45, 0]} rotation={[0, 0, -0.45]} geometry={partnerBTorsoGeom} material={roseMaterial} />
            <mesh position={[0.2, 0.55, 0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[0.2, 0.55, -0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[0.28, 0.52, 0.26]}
              shoulderRot={[0.3, 0.1, 0.4]}
              elbowRot={[-0.5, 0, 0]}
              wristRot={[0.3, 0, 0]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[0.28, 0.52, -0.26]}
              shoulderRot={[-0.3, -0.1, 0.4]}
              elbowRot={[0.5, 0, 0]}
              wristRot={[-0.3, 0, 0]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.02, 0.05, 0.28]}
              hipRot={[0.6, 0.3, 1.1]}
              kneeRot={[-1.8, 0, 0]}
              ankleRot={[0.5, 0, 0]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.02, 0.05, -0.28]}
              hipRot={[-0.6, -0.3, 1.1]}
              kneeRot={[1.8, 0, 0]}
              ankleRot={[-0.5, 0, 0]}
            />
          </group>
        </>
      )}

      {/* ── Pose 5: STANDING_LIFT ── */}
      {poseArchetype === 'STANDING_LIFT' && (
        <>
          <mesh position={[-0.6, 1.1, 0]}>
            <boxGeometry args={[0.15, 2.4, 1.8]} />
            <meshStandardMaterial color="#120F09" roughness={0.9} />
          </mesh>

          <group ref={partnerBRef} position={[-0.35, 1.1, 0]}>
            <group position={[-0.05, 0.78, 0]} rotation={[0, 0, 0.1]}>
              <mesh geometry={headGeom} material={roseMaterial} />
            </group>
            <mesh position={[-0.02, 0.35, 0]} rotation={[0, 0, 0.1]} geometry={partnerBTorsoGeom} material={roseMaterial} />
            <mesh position={[0.02, 0.45, 0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[0.02, 0.45, -0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[0.02, 0.48, 0.24]}
              shoulderRot={[0.5, 0.2, -0.8]}
              elbowRot={[-1.2, 0, 0]}
              wristRot={[0.3, 0.2, 0.4]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[0.02, 0.48, -0.24]}
              shoulderRot={[-0.5, -0.2, -0.8]}
              elbowRot={[1.2, 0, 0]}
              wristRot={[-0.3, -0.2, 0.4]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.12, -0.05, 0.28]}
              hipRot={[-0.6, 0.3, -0.7]}
              kneeRot={[1.7, -0.2, 0]}
              ankleRot={[0.4, 0.2, 0.6]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.12, -0.05, -0.28]}
              hipRot={[0.6, -0.3, -0.7]}
              kneeRot={[-1.7, 0.2, 0]}
              ankleRot={[-0.4, -0.2, 0.6]}
            />
          </group>

          <group ref={partnerARef} position={[0.22, 0.95, 0.25]}>
            <group position={[0.18, 0.88, 0]} rotation={[0, 0, -0.2]}>
              <mesh geometry={headGeom} material={goldMaterial} />
            </group>
            <mesh position={[0.12, 0.45, 0]} rotation={[0, 0, -0.25]} geometry={partnerATorsoGeom} material={goldMaterial} />

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[0.15, 0.55, 0.32]}
              shoulderRot={[0.4, 0.2, -0.9]}
              elbowRot={[-1.0, 0, 0]}
              wristRot={[0.4, 0.2, 0.3]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[0.15, 0.55, -0.32]}
              shoulderRot={[-0.4, -0.2, -0.9]}
              elbowRot={[1.0, 0, 0]}
              wristRot={[-0.4, -0.2, 0.3]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.12, 0.05, 0.24]}
              hipRot={[0.1, 0, 0.1]}
              kneeRot={[-0.1, 0, 0]}
              ankleRot={[0.2, 0, 0]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.12, 0.05, -0.24]}
              hipRot={[-0.1, 0, 0.1]}
              kneeRot={[0.1, 0, 0]}
              ankleRot={[-0.2, 0, 0]}
            />
          </group>
        </>
      )}

      {/* ── Pose 6: SEATED_LOTUS ── */}
      {poseArchetype === 'SEATED_LOTUS' && (
        <>
          <group ref={partnerBRef} position={[-0.2, 0.65, 0]}>
            <group position={[-0.15, 0.78, 0]} rotation={[0, 0, 0.15]}>
              <mesh geometry={headGeom} material={roseMaterial} />
            </group>
            <mesh position={[-0.08, 0.38, 0]} rotation={[0, 0, 0.15]} geometry={partnerBTorsoGeom} material={roseMaterial} />
            <mesh position={[-0.06, 0.46, 0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>
            <mesh position={[-0.06, 0.46, -0.11]} material={roseMaterial}><sphereGeometry args={[0.13, 24, 24]} /></mesh>

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[-0.08, 0.52, 0.24]}
              shoulderRot={[0.4, 0.2, -0.8]}
              elbowRot={[-1.2, 0, 0]}
              wristRot={[0.3, 0.2, 0.4]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={roseMaterial}
              shoulderPos={[-0.08, 0.52, -0.24]}
              shoulderRot={[-0.4, -0.2, -0.8]}
              elbowRot={[1.2, 0, 0]}
              wristRot={[-0.3, -0.2, 0.4]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.12, 0.05, 0.28]}
              hipRot={[-0.5, 0.3, -0.6]}
              kneeRot={[1.6, -0.2, 0]}
              ankleRot={[0.3, 0.2, 0.5]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={roseMaterial}
              hipPos={[0.12, 0.05, -0.28]}
              hipRot={[0.5, -0.3, -0.6]}
              kneeRot={[-1.6, 0.2, 0]}
              ankleRot={[-0.3, -0.2, 0.5]}
            />
          </group>

          <group ref={partnerARef} position={[0.2, 0.7, 0.2]}>
            <group position={[0.12, 0.82, 0]} rotation={[0, 0, -0.2]}>
              <mesh geometry={headGeom} material={goldMaterial} />
            </group>
            <mesh position={[0.08, 0.42, 0]} rotation={[0, 0, -0.2]} geometry={partnerATorsoGeom} material={goldMaterial} />

            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[0.12, 0.55, 0.32]}
              shoulderRot={[0.3, 0.1, -0.8]}
              elbowRot={[-1.1, 0, 0]}
              wristRot={[0.2, 0.1, 0.3]}
            />
            <ArticulatedArmChain
              upperArmGeom={upperArmGeom}
              forearmGeom={forearmGeom}
              handGeom={handGeom}
              material={goldMaterial}
              shoulderPos={[0.12, 0.55, -0.32]}
              shoulderRot={[-0.3, -0.1, -0.8]}
              elbowRot={[1.1, 0, 0]}
              wristRot={[-0.2, -0.1, 0.3]}
            />

            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.15, -0.12, 0.32]}
              hipRot={[0.3, 0.1, 0.9]}
              kneeRot={[-1.6, 0, 0]}
              ankleRot={[0.4, 0, 0]}
            />
            <ArticulatedLegChain
              thighGeom={thighGeom}
              calfGeom={calfGeom}
              footGeom={footGeom}
              material={goldMaterial}
              hipPos={[0.15, -0.12, -0.32]}
              hipRot={[-0.3, -0.1, 0.9]}
              kneeRot={[1.6, 0, 0]}
              ankleRot={[-0.4, 0, 0]}
            />
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
  const cameraConfig = useMemo(() => {
    switch (povPreset) {
      case 'povA':
        return { position: [0.25, 1.85, 0.85] as [number, number, number], fov: 64 }
      case 'povB':
        return { position: [-1.15, 0.75, 0] as [number, number, number], fov: 58 }
      case 'pelvicZoom':
        return { position: [0.55, 0.85, 0.4] as [number, number, number], fov: 38 }
      case 'orbit':
      default:
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
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] shadow-[0_0_8px_#D97706]" />
          <span className="text-[#FDE68A] font-medium">Initiator (Obsidian Gold Mannequin)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E] shadow-[0_0_8px_#F43F5E]" />
          <span className="text-[#FBCFE8] font-medium">Receiver (Rose Platinum Mannequin)</span>
        </div>
      </div>

      {/* Interactive 3D Orbit Tip Overlay */}
      <div className="absolute top-3 right-3 bg-[#0a0906]/85 px-3 py-1.5 rounded-lg border border-[rgba(232,160,32,0.3)] text-[11px] text-[#f5e8c8]/70 tracking-wider flex items-center gap-1.5 backdrop-blur-md pointer-events-none shadow-md">
        <span>🔄 Drag to 360° Rotate · Scroll to Zoom</span>
      </div>
    </div>
  )
}

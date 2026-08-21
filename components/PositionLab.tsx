'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { POSITIONS_DATA, PositionItem } from '../lib/positionsData'

// ─── High-Definition Two-Tone 3D Anatomical Art Model ───────────────────
function Anatomical3DPositionModel({
  variant,
  viewPerspective,
  thrustVector,
  pelvicTiltDeg
}: {
  variant: PositionItem['svgVariant']
  viewPerspective: 'side' | 'contact'
  thrustVector: PositionItem['thrustVector']
  pelvicTiltDeg: number
}) {
  const rhythmClass =
    thrustVector === 'Deep Angled Plunge'
      ? 'rhythm-plunge'
      : thrustVector === 'Rotational Grind'
      ? 'rhythm-grind'
      : 'rhythm-flutter'

  return (
    <div className="relative w-full h-80 flex items-center justify-center overflow-hidden rounded-2xl bg-[#090805] border border-[rgba(232,160,32,0.2)] shadow-2xl">
      {/* Dynamic 3D Studio Lighting Atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.12)_0%,rgba(236,72,153,0.06)_45%,transparent_75%)]" />

      {/* Grid Measurement Lines / Biomechanical Blueprint Layer */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-[#f5e8c8]">
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Main SVG Vector Canvas */}
      <svg
        viewBox="0 0 420 280"
        className="w-full h-full p-2 relative z-10 select-none"
        fill="none"
      >
        <defs>
          {/* Partner A (Initiator) Gold/Amber Palette */}
          <linearGradient id="partnerAGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="partnerAGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </linearGradient>

          {/* Partner B (Receiver) Rose-Dusk/Obsidian Palette */}
          <linearGradient id="partnerBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#EC4899" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#831843" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="partnerBGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BE185D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4C0519" stopOpacity="0" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="hotspotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. ARCH & ANCHOR (Prone Bone) ────────────────────────── */}
        {variant === 'arch-anchor' && (
          <g className={rhythmClass}>
            {viewPerspective === 'side' ? (
              <>
                {/* Surface / Pillow Wedge Bed */}
                <path d="M 40 230 L 380 230" stroke="rgba(245,232,200,0.15)" strokeWidth="1.5" />
                <path d="M 140 230 L 220 200 L 220 230 Z" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />

                {/* Partner B (Receiver - Rose) - Prone with Elevated Pelvis */}
                <g filter="url(#softGlow)">
                  {/* Head & Torso resting low */}
                  <circle cx="65" cy="210" r="14" stroke="url(#partnerBGrad)" strokeWidth="2.5" fill="#180e14" />
                  <path d="M 75 215 C 105 218, 140 205, 175 185" stroke="url(#partnerBGrad)" strokeWidth="4" strokeLinecap="round" />
                  {/* Arched Spine & Glutes */}
                  <path d="M 175 185 C 195 160, 225 155, 245 180" stroke="url(#partnerBGrad)" strokeWidth="5" strokeLinecap="round" />
                  {/* Tightly pressed Thigh & Lower Leg */}
                  <path d="M 245 180 C 265 205, 305 220, 350 225" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                  {/* Arms tucked under chest */}
                  <path d="M 100 220 C 85 225, 70 228, 55 225" stroke="url(#partnerBGrad)" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Partner A (Initiator - Gold) - Mounted Dominant Over */}
                <g filter="url(#softGlow)">
                  {/* Head & Upright Torso */}
                  <circle cx="160" cy="95" r="15" stroke="url(#partnerAGrad)" strokeWidth="2.8" fill="#181409" />
                  <path d="M 165 110 C 180 135, 205 145, 230 155" stroke="url(#partnerAGrad)" strokeWidth="5" strokeLinecap="round" />
                  {/* Dominant Arm Pinned on Partner B Hip/Back */}
                  <path d="M 175 125 C 185 150, 195 170, 205 180" stroke="url(#partnerAGrad)" strokeWidth="3" strokeLinecap="round" />
                  {/* Penetration Vector & Pelvis Angle */}
                  <path d="M 230 155 C 245 160, 255 175, 250 195" stroke="url(#partnerAGrad)" strokeWidth="5.5" strokeLinecap="round" />
                  {/* Kneeling Thighs Straddling */}
                  <path d="M 250 195 C 240 215, 230 225, 220 228" stroke="url(#partnerAGrad)" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Hotspot & Directional Thrust Vector */}
                <g filter="url(#hotspotGlow)">
                  <path d="M 260 160 L 235 180" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
                  <polygon points="233,181 241,176 238,185" fill="#F59E0B" />
                  <circle cx="238" cy="178" r="8" fill="#EC4899" className="animate-ping opacity-75" />
                  <circle cx="238" cy="178" r="4" fill="#FFFFFF" />
                </g>
              </>
            ) : (
              /* Contact / Limb-Lock Overhead Angle */
              <>
                <circle cx="210" cy="140" r="100" stroke="rgba(245,158,11,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M 120 180 C 160 170, 260 170, 300 180" stroke="url(#partnerBGrad)" strokeWidth="6" strokeLinecap="round" />
                <path d="M 160 120 C 180 150, 240 150, 260 120" stroke="url(#partnerAGrad)" strokeWidth="5" strokeLinecap="round" />
                {/* Hand Gripping Lower Back */}
                <circle cx="210" cy="150" r="6" fill="#F59E0B" />
                <text x="210" y="210" textAnchor="middle" fill="#f5e8c8" fontSize="11" opacity="0.6">Dual Hip-Pin Contact Lock</text>
              </>
            )}
          </g>
        )}

        {/* ── 2. STANDING COUNTER PRESS ────────────────────────────── */}
        {variant === 'counter-press' && (
          <g className={rhythmClass}>
            {viewPerspective === 'side' ? (
              <>
                {/* Counter / Bar Stool Support */}
                <line x1="80" y1="160" x2="230" y2="160" stroke="rgba(245,232,200,0.25)" strokeWidth="3" />
                <line x1="140" y1="160" x2="140" y2="250" stroke="rgba(245,232,200,0.15)" strokeWidth="2" />

                {/* Partner B (Receiver - Rose) - Seated High on Counter */}
                <g filter="url(#softGlow)">
                  <circle cx="150" cy="65" r="14" stroke="url(#partnerBGrad)" strokeWidth="2.5" fill="#180e14" />
                  <path d="M 150 80 C 152 110, 150 135, 145 160" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                  {/* Legs Wrapped around Waist */}
                  <path d="M 145 160 C 165 150, 205 145, 235 125" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                  {/* Arms Hooked Behind Partner A Neck */}
                  <path d="M 140 100 C 165 95, 195 90, 210 95" stroke="url(#partnerBGrad)" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* Partner A (Initiator - Gold) - Standing Power Entry */}
                <g filter="url(#softGlow)">
                  <circle cx="225" cy="85" r="15" stroke="url(#partnerAGrad)" strokeWidth="2.8" fill="#181409" />
                  <path d="M 220 100 C 215 130, 210 155, 195 180" stroke="url(#partnerAGrad)" strokeWidth="5" strokeLinecap="round" />
                  {/* Support Arms Lifting Under Thighs */}
                  <path d="M 215 120 C 190 135, 165 155, 150 155" stroke="url(#partnerAGrad)" strokeWidth="3" strokeLinecap="round" />
                  {/* Standing Legs Grounded */}
                  <path d="M 195 180 C 205 210, 215 240, 220 250" stroke="url(#partnerAGrad)" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Hotspot & Angled Downward Plunge Vector */}
                <g filter="url(#hotspotGlow)">
                  <path d="M 205 150 L 175 165" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="175" cy="162" r="7" fill="#F59E0B" className="animate-ping opacity-80" />
                  <circle cx="175" cy="162" r="4" fill="#FFFFFF" />
                </g>
              </>
            ) : (
              <>
                <ellipse cx="210" cy="140" rx="60" ry="80" stroke="rgba(236,72,153,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 180 80 C 210 95, 240 95, 270 80" stroke="url(#partnerBGrad)" strokeWidth="4" />
                <circle cx="225" cy="90" r="10" fill="#F59E0B" opacity="0.8" />
                <text x="210" y="220" textAnchor="middle" fill="#f5e8c8" fontSize="11" opacity="0.6">Locked Interlocking Waist Contact</text>
              </>
            )}
          </g>
        )}

        {/* ── 3. VELVET TRAP (Inverted CAT) ────────────────────────── */}
        {variant === 'velvet-trap' && (
          <g className={rhythmClass}>
            {viewPerspective === 'side' ? (
              <>
                <line x1="50" y1="210" x2="370" y2="210" stroke="rgba(245,232,200,0.15)" strokeWidth="1.5" />

                {/* Partner B (Receiver - Rose) - Reclined with Legs Up */}
                <g filter="url(#softGlow)">
                  <circle cx="85" cy="190" r="14" stroke="url(#partnerBGrad)" strokeWidth="2.5" fill="#180e14" />
                  <path d="M 95 195 C 135 198, 175 190, 215 185" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                  {/* Pelvic base aligned upward 15 deg */}
                  <path d="M 215 185 C 235 160, 260 140, 290 120" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Partner A (Initiator - Gold) - Mounted Low Full-Body Press */}
                <g filter="url(#softGlow)">
                  <circle cx="115" cy="155" r="15" stroke="url(#partnerAGrad)" strokeWidth="2.8" fill="#181409" />
                  <path d="M 125 165 C 160 170, 195 175, 230 180" stroke="url(#partnerAGrad)" strokeWidth="5" strokeLinecap="round" />
                  {/* Glutes & Thighs hovering low with zero withdrawal */}
                  <path d="M 230 180 C 255 188, 285 198, 320 205" stroke="url(#partnerAGrad)" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Dual Clitoral & G-Spot Grinding Hotspot */}
                <g filter="url(#hotspotGlow)">
                  <ellipse cx="225" cy="182" rx="9" ry="5" fill="#EC4899" className="animate-pulse" />
                  <circle cx="225" cy="182" r="3.5" fill="#FFF" />
                  {/* Circular Orbit Rhythm Arrow */}
                  <circle cx="225" cy="182" r="16" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 3" />
                </g>
              </>
            ) : (
              <>
                <circle cx="210" cy="140" r="40" fill="rgba(236,72,153,0.1)" />
                <path d="M 170 140 C 210 120, 210 160, 250 140" stroke="url(#partnerAGrad)" strokeWidth="4" />
                <text x="210" y="210" textAnchor="middle" fill="#f5e8c8" fontSize="11" opacity="0.6">Constant Direct Base-to-Clitoris Grind</text>
              </>
            )}
          </g>
        )}

        {/* ── 4. HIGH-ANGLE SUSPENSION ─────────────────────────────── */}
        {variant === 'high-angle' && (
          <g className={rhythmClass}>
            {viewPerspective === 'side' ? (
              <>
                <line x1="40" y1="230" x2="380" y2="230" stroke="rgba(245,232,200,0.15)" strokeWidth="1.5" />

                {/* Partner B (Receiver - Rose) - Spine Flat, Legs Over Shoulders */}
                <g filter="url(#softGlow)">
                  <circle cx="80" cy="215" r="14" stroke="url(#partnerBGrad)" strokeWidth="2.5" fill="#180e14" />
                  <path d="M 90 220 C 130 222, 170 215, 205 190" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                  {/* High Vertical Inverted Legs at 60° */}
                  <path d="M 205 190 C 210 140, 230 80, 260 50" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Partner A (Initiator - Gold) - Kneeling Deep Vertical Entry */}
                <g filter="url(#softGlow)">
                  <circle cx="270" cy="70" r="15" stroke="url(#partnerAGrad)" strokeWidth="2.8" fill="#181409" />
                  <path d="M 265 85 C 255 125, 245 160, 235 195" stroke="url(#partnerAGrad)" strokeWidth="5.5" strokeLinecap="round" />
                  {/* Shoulders supporting ankles */}
                  <path d="M 255 75 C 258 60, 260 55, 265 50" stroke="url(#partnerAGrad)" strokeWidth="2.5" strokeDasharray="2 2" />
                  <path d="M 235 195 C 250 215, 270 225, 290 228" stroke="url(#partnerAGrad)" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Maximum Depth Hotspot */}
                <g filter="url(#hotspotGlow)">
                  <path d="M 250 170 L 215 195" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 3" />
                  <circle cx="218" cy="192" r="8" fill="#F59E0B" className="animate-ping opacity-80" />
                  <circle cx="218" cy="192" r="4" fill="#FFF" />
                </g>
              </>
            ) : (
              <>
                <path d="M 150 100 L 210 60 L 270 100" stroke="url(#partnerBGrad)" strokeWidth="4" />
                <circle cx="210" cy="140" r="15" fill="#F59E0B" opacity="0.8" />
                <text x="210" y="210" textAnchor="middle" fill="#f5e8c8" fontSize="11" opacity="0.6">Vertical Plunge Axis Alignment</text>
              </>
            )}
          </g>
        )}

        {/* ── 5. OVERDRIVE COWGIRL ─────────────────────────────────── */}
        {variant === 'overdrive-cowgirl' && (
          <g className={rhythmClass}>
            {viewPerspective === 'side' ? (
              <>
                <line x1="40" y1="230" x2="380" y2="230" stroke="rgba(245,232,200,0.15)" strokeWidth="1.5" />

                {/* Partner A (Base/Reclined - Gold) */}
                <g filter="url(#softGlow)">
                  <circle cx="70" cy="210" r="14" stroke="url(#partnerAGrad)" strokeWidth="2.5" fill="#181409" />
                  <path d="M 80 218 L 330 220" stroke="url(#partnerAGrad)" strokeWidth="4" strokeLinecap="round" />
                  {/* Knees bent up slightly */}
                  <path d="M 250 220 C 275 200, 300 200, 320 220" stroke="url(#partnerAGrad)" strokeWidth="3.5" />
                </g>

                {/* Partner B (Straddling Top - Rose) - Arched 45° Lean-Back */}
                <g filter="url(#softGlow)">
                  <circle cx="270" cy="65" r="14" stroke="url(#partnerBGrad)" strokeWidth="2.8" fill="#180e14" />
                  {/* Arched Torso Leaning Back */}
                  <path d="M 260 75 C 235 110, 205 145, 195 190" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                  {/* Arms supporting behind on partner thighs */}
                  <path d="M 250 100 C 265 140, 280 180, 290 215" stroke="url(#partnerBGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Straddling Thighs & Pelvis */}
                  <path d="M 195 190 C 185 205, 175 215, 160 225" stroke="url(#partnerBGrad)" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Hotspot: Anterior G-Spot Vector Angle */}
                <g filter="url(#hotspotGlow)">
                  <circle cx="200" cy="195" r="8" fill="#EC4899" className="animate-ping opacity-80" />
                  <circle cx="200" cy="195" r="4" fill="#FFFFFF" />
                  <circle cx="200" cy="195" r="18" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                </g>
              </>
            ) : (
              <>
                <ellipse cx="210" cy="140" rx="70" ry="50" stroke="rgba(245,158,11,0.2)" strokeWidth="1.5" />
                <circle cx="210" cy="140" r="12" fill="#EC4899" />
                <text x="210" y="220" textAnchor="middle" fill="#f5e8c8" fontSize="11" opacity="0.6">Female-Controlled 360° Pelvic Rotation</text>
              </>
            )}
          </g>
        )}

        {/* ── 6. OBSIDIAN LOCK (Side Spoons) ───────────────────────── */}
        {variant === 'obsidian-lock' && (
          <g className={rhythmClass}>
            {viewPerspective === 'side' ? (
              <>
                <line x1="40" y1="220" x2="380" y2="220" stroke="rgba(245,232,200,0.15)" strokeWidth="1.5" />

                {/* Partner B (Receiver Front - Rose) - Side-Lying with Leg Hook */}
                <g filter="url(#softGlow)">
                  <circle cx="100" cy="165" r="13" stroke="url(#partnerBGrad)" strokeWidth="2.5" fill="#180e14" />
                  <path d="M 110 175 C 150 170, 190 172, 230 175" stroke="url(#partnerBGrad)" strokeWidth="4" strokeLinecap="round" />
                  {/* Hooked Top Leg Elevated over Partner A */}
                  <path d="M 230 175 C 245 130, 280 115, 305 130" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Partner A (Initiator Behind - Gold) - Snug Body Contour */}
                <g filter="url(#softGlow)">
                  <circle cx="80" cy="150" r="14" stroke="url(#partnerAGrad)" strokeWidth="2.8" fill="#181409" />
                  <path d="M 90 160 C 130 155, 170 160, 210 168" stroke="url(#partnerAGrad)" strokeWidth="5" strokeLinecap="round" />
                  {/* Arm Reaching Around for Multi-Touch Stimulation */}
                  <path d="M 110 165 C 145 150, 180 150, 210 160" stroke="url(#partnerAGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 210 168 C 245 178, 280 190, 320 205" stroke="url(#partnerAGrad)" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Dual Contact Zone Pulse */}
                <g filter="url(#hotspotGlow)">
                  <circle cx="225" cy="172" r="7" fill="#F59E0B" className="animate-pulse" />
                  <circle cx="225" cy="172" r="3.5" fill="#FFF" />
                </g>
              </>
            ) : (
              <>
                <path d="M 140 140 C 180 120, 240 120, 280 140" stroke="url(#partnerBGrad)" strokeWidth="4" />
                <path d="M 130 155 C 170 135, 230 135, 270 155" stroke="url(#partnerAGrad)" strokeWidth="4" />
                <text x="210" y="210" textAnchor="middle" fill="#f5e8c8" fontSize="11" opacity="0.6">Multi-Point Free-Hand Sensory Overlay</text>
              </>
            )}
          </g>
        )}

        {/* ── 7. WALL PIN ─────────────────────────────────────────── */}
        {variant === 'wall-pin' && (
          <g className={rhythmClass}>
            {viewPerspective === 'side' ? (
              <>
                {/* Vertical Wall */}
                <line x1="90" y1="30" x2="90" y2="260" stroke="rgba(245,232,200,0.3)" strokeWidth="3.5" />

                {/* Partner B (Receiver - Rose) - Back Against Wall & Hoisted */}
                <g filter="url(#softGlow)">
                  <circle cx="115" cy="65" r="14" stroke="url(#partnerBGrad)" strokeWidth="2.5" fill="#180e14" />
                  <path d="M 110 80 C 112 115, 110 140, 120 170" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                  {/* Hoisted Legs Hooked High Around Hips */}
                  <path d="M 120 170 C 150 150, 185 140, 210 130" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Partner A (Initiator - Gold) - Elevated Standing Lift */}
                <g filter="url(#softGlow)">
                  <circle cx="195" cy="75" r="15" stroke="url(#partnerAGrad)" strokeWidth="2.8" fill="#181409" />
                  <path d="M 190 90 C 180 125, 170 160, 160 185" stroke="url(#partnerAGrad)" strokeWidth="5.5" strokeLinecap="round" />
                  {/* Arms Hooked Under Glutes for Lift */}
                  <path d="M 180 110 C 150 135, 130 160, 120 175" stroke="url(#partnerAGrad)" strokeWidth="3" strokeLinecap="round" />
                  {/* Grounded Legs for Full Power */}
                  <path d="M 160 185 C 170 215, 185 240, 195 255" stroke="url(#partnerAGrad)" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Direct High-Impact Thrust Hotspot */}
                <g filter="url(#hotspotGlow)">
                  <path d="M 170 175 L 130 170" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="2 2" />
                  <circle cx="135" cy="170" r="8" fill="#D97706" className="animate-ping opacity-80" />
                  <circle cx="135" cy="170" r="4" fill="#FFFFFF" />
                </g>
              </>
            ) : (
              <>
                <line x1="210" y1="40" x2="210" y2="240" stroke="rgba(245,232,200,0.2)" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="210" cy="130" r="15" fill="#BE185D" opacity="0.7" />
                <text x="210" y="210" textAnchor="middle" fill="#f5e8c8" fontSize="11" opacity="0.6">Total Bodyweight Leverage Axis</text>
              </>
            )}
          </g>
        )}

        {/* ── 8. SUBMISSION BRIDGE ─────────────────────────────────── */}
        {variant === 'submission-bridge' && (
          <g className={rhythmClass}>
            {viewPerspective === 'side' ? (
              <>
                <line x1="40" y1="230" x2="380" y2="230" stroke="rgba(245,232,200,0.15)" strokeWidth="1.5" />

                {/* Partner B (Receiver - Rose) - Elevated Pelvic Bridge & Pinned Wrists */}
                <g filter="url(#softGlow)">
                  {/* Pinned Wrists Overhead */}
                  <circle cx="60" cy="215" r="5" fill="#BE185D" />
                  <circle cx="95" cy="210" r="13" stroke="url(#partnerBGrad)" strokeWidth="2.5" fill="#180e14" />
                  {/* High Arched Pelvic Bridge at 50 deg */}
                  <path d="M 105 215 C 135 170, 185 130, 230 135" stroke="url(#partnerBGrad)" strokeWidth="5" strokeLinecap="round" />
                  {/* Feet Flat on Bed for Bridge Elevation */}
                  <path d="M 230 135 C 265 175, 290 215, 305 228" stroke="url(#partnerBGrad)" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Partner A (Initiator - Gold) - Standing/Kneeling Downward Angle */}
                <g filter="url(#softGlow)">
                  <circle cx="250" cy="55" r="15" stroke="url(#partnerAGrad)" strokeWidth="2.8" fill="#181409" />
                  <path d="M 245 70 C 235 105, 225 130, 220 145" stroke="url(#partnerAGrad)" strokeWidth="5.5" strokeLinecap="round" />
                  {/* Arm Pinned Overhead */}
                  <path d="M 235 85 C 160 140, 100 185, 60 215" stroke="url(#partnerAGrad)" strokeWidth="2" strokeDasharray="3 2" />
                </g>

                {/* Anterior Wall Direct Impact Vector */}
                <g filter="url(#hotspotGlow)">
                  <path d="M 225 125 L 210 145" stroke="#F59E0B" strokeWidth="2.5" />
                  <circle cx="215" cy="142" r="8" fill="#EC4899" className="animate-ping opacity-80" />
                  <circle cx="215" cy="142" r="4" fill="#FFFFFF" />
                </g>
              </>
            ) : (
              <>
                <polygon points="150,180 210,100 270,180" stroke="url(#partnerBGrad)" strokeWidth="3" fill="none" />
                <circle cx="210" cy="115" r="12" fill="#F59E0B" opacity="0.8" />
                <text x="210" y="210" textAnchor="middle" fill="#f5e8c8" fontSize="11" opacity="0.6">Maximum Pelvic Exposure & Anterior G-Spot Access</text>
              </>
            )}
          </g>
        )}
      </svg>

      {/* Tilt Angle HUD Indicator */}
      <div className="absolute top-3 left-3 bg-[#0a0906]/80 px-2.5 py-1 rounded-md border border-[rgba(232,160,32,0.3)] text-[10px] text-[#f5e8c8] tracking-widest uppercase flex items-center gap-1.5 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e8a020]" />
        Pelvic Tilt: <span className="text-[#e8a020] font-semibold">{pelvicTiltDeg}°</span>
      </div>

      {/* Two-Tone Identity Legend Badge */}
      <div className="absolute bottom-3 left-3 bg-[#0a0906]/85 px-3 py-1.5 rounded-lg border border-[rgba(245,232,200,0.1)] flex items-center gap-3 text-[10px] tracking-wider backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <span className="text-[#FDE68A]">Initiator (Gold)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EC4899]" />
          <span className="text-[#F472B6]">Receiver (Rose)</span>
        </div>
      </div>
    </div>
  )
}

// ─── Dynamic Cadence & Wave Vector Canvas ─────────────────────────────
function CadenceWaveVisualizer({
  thrustVector,
  bpm,
  hapticsActive
}: {
  thrustVector: PositionItem['thrustVector']
  bpm: number
  hapticsActive: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let phase = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width
      const h = canvas.height
      const midY = h / 2

      ctx.beginPath()
      ctx.strokeStyle = 'rgba(232, 160, 32, 0.85)'
      ctx.lineWidth = 2.5
      ctx.shadowColor = '#e8a020'
      ctx.shadowBlur = 10

      const freq = (bpm / 60) * 0.05
      phase += freq

      for (let x = 0; x < w; x++) {
        let y = midY
        const normX = x / w

        if (thrustVector === 'Deep Angled Plunge') {
          y += Math.pow(Math.sin(normX * 8 + phase), 3) * (h * 0.35)
        } else if (thrustVector === 'Rotational Grind') {
          y += (Math.sin(normX * 6 + phase) * 0.7 + Math.cos(normX * 12 + phase * 1.5) * 0.3) * (h * 0.3)
        } else if (thrustVector === 'Shallow High-Speed Flutter') {
          y += Math.sin(normX * 18 + phase * 2.5) * (h * 0.18)
        } else {
          y += Math.sin(normX * 6 + phase) * (h * 0.3)
        }

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [thrustVector, bpm])

  // Mobile vibration haptics loop
  useEffect(() => {
    if (!hapticsActive || typeof window === 'undefined' || !('vibrate' in navigator)) return
    const intervalMs = Math.max(200, (60 / bpm) * 1000)
    const timer = setInterval(() => {
      navigator.vibrate(thrustVector === 'Deep Angled Plunge' ? [40, 20, 60] : [25, 20])
    }, intervalMs)
    return () => clearInterval(timer)
  }, [hapticsActive, bpm, thrustVector])

  return (
    <div className="relative w-full h-24 bg-[#0a0906] rounded-xl overflow-hidden border border-[rgba(232,160,32,0.12)] p-2">
      <canvas ref={canvasRef} width={400} height={80} className="w-full h-full" />
      <div className="absolute top-2 left-3 text-[10px] tracking-widest text-[#e8a020] uppercase font-light">
        Thrust Vector: <span className="text-[#f5e8c8] font-normal">{thrustVector}</span>
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] tracking-wider text-[#f5e8c8]/40">
        Cadence: {bpm} BPM
      </div>
    </div>
  )
}

// ─── Main PositionLab Component ───────────────────────────────────────
export default function PositionLab() {
  const [selectedPosition, setSelectedPosition] = useState<PositionItem>(POSITIONS_DATA[0])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [viewPerspective, setViewPerspective] = useState<'side' | 'contact'>('side')
  const [cadenceBpm, setCadenceBpm] = useState<number>(55)
  const [hapticsActive, setHapticsActive] = useState<boolean>(false)
  const [escapeFlow, setEscapeFlow] = useState<PositionItem[] | null>(null)

  const categories = ['All', 'Deep Intensity & Power', 'Sensory Dominance', 'Acrobatic Friction', 'Intimate Meltdown']

  const filteredPositions = selectedCategory === 'All'
    ? POSITIONS_DATA
    : POSITIONS_DATA.filter(p => p.category === selectedCategory)

  // Generate 3-Stage Escaped Flow: Tease -> Peak -> Climax
  const generateFlow = () => {
    const tease = POSITIONS_DATA.find(p => p.category === 'Intimate Meltdown' || p.intensityLevel <= 3) || POSITIONS_DATA[5]
    const peak = POSITIONS_DATA.find(p => p.category === 'Deep Intensity & Power' || p.intensityLevel === 5) || POSITIONS_DATA[0]
    const climax = POSITIONS_DATA.find(p => p.category === 'Sensory Dominance' || p.clitoralFrictionRating >= 8) || POSITIONS_DATA[2]
    setEscapeFlow([tease, peak, climax])
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 relative overflow-hidden border-l-4 border-l-[#e8a020]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[#e8a020] text-xs uppercase tracking-[0.25em] font-light mb-1">
              Physiological Geometry & Anatomy Lab
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-[#f5e8c8]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Sensual Position Laboratory
            </h2>
            <p className="text-[#f5e8c8]/40 text-sm mt-1 max-w-xl">
              Articulated two-tone 3D anatomical models, interactive tilt geometry, and cadence physics.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={generateFlow}
            className="px-5 py-3 rounded-xl text-xs uppercase tracking-widest font-medium transition-all shadow-lg flex items-center gap-2 self-start md:self-auto"
            style={{
              background: 'linear-gradient(135deg, #e8a020 0%, #d4601a 100%)',
              color: '#0a0906',
              boxShadow: '0 4px 20px rgba(232,160,32,0.35)'
            }}
          >
            <span>⚡</span>
            Generate Tonight&apos;s 3-Stage Arc
          </motion.button>
        </div>
      </div>

      {/* 3-Stage Escaped Flow Banner */}
      <AnimatePresence>
        {escapeFlow && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel p-6 border border-[#e8a020]/40 bg-[#16120a]/90 relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h3 className="text-lg font-light text-[#f5e8c8]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Tonight&apos;s Curated 3-Stage Escalation Flow
                </h3>
              </div>
              <button
                onClick={() => setEscapeFlow(null)}
                className="text-xs text-[#f5e8c8]/40 hover:text-[#f5e8c8] transition-colors"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {escapeFlow.map((pos, idx) => (
                <div
                  key={pos.id}
                  onClick={() => setSelectedPosition(pos)}
                  className="p-4 rounded-xl border border-[rgba(232,160,32,0.2)] bg-[#0a0906]/60 cursor-pointer hover:border-[#e8a020] transition-all"
                >
                  <div className="text-[10px] tracking-widest uppercase text-[#e8a020] font-semibold mb-1">
                    Stage {idx + 1}: {idx === 0 ? 'Tease & Prime' : idx === 1 ? 'Peak Intensity' : 'Shared Climax'}
                  </div>
                  <h4 className="text-base text-[#f5e8c8] font-medium">{pos.name}</h4>
                  <p className="text-xs text-[#f5e8c8]/40 mt-1 line-clamp-2">{pos.tagline}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-4 py-2 rounded-full text-xs tracking-wider transition-all whitespace-nowrap"
            style={{
              background: selectedCategory === cat ? 'rgba(232,160,32,0.18)' : 'rgba(245,232,200,0.03)',
              color: selectedCategory === cat ? '#e8a020' : 'rgba(245,232,200,0.5)',
              border: selectedCategory === cat ? '1px solid rgba(232,160,32,0.4)' : '1px solid rgba(245,232,200,0.08)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Studio View: Positions Catalog + Active Anatomical Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Positions Catalog (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <p className="text-xs text-[#f5e8c8]/40 uppercase tracking-widest">
            Configuration Library ({filteredPositions.length})
          </p>

          <div className="flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredPositions.map((pos) => {
              const isSelected = selectedPosition.id === pos.id
              return (
                <motion.div
                  key={pos.id}
                  onClick={() => setSelectedPosition(pos)}
                  whileHover={{ x: 4 }}
                  className="p-4 rounded-xl cursor-pointer transition-all border text-left"
                  style={{
                    background: isSelected ? 'rgba(232,160,32,0.1)' : 'rgba(245,232,200,0.02)',
                    borderColor: isSelected ? 'rgba(232,160,32,0.5)' : 'rgba(245,232,200,0.08)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#e8a020] font-light tracking-wide">{pos.category}</span>
                    <span className="text-xs text-[#d4601a]">
                      {'🔥'.repeat(pos.intensityLevel)}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-light text-[#f5e8c8] mt-1"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {pos.name}
                  </h3>
                  <p className="text-xs text-[#f5e8c8]/40 mt-0.5 line-clamp-1">{pos.tagline}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Interactive 3D Model & Telemetry Inspector (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Perspective View Switcher */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-[#f5e8c8]/40 font-medium">
              3D Anatomical Articulation
            </span>
            <div className="flex items-center gap-1 bg-[#12100a] p-1 rounded-lg border border-[rgba(232,160,32,0.15)]">
              <button
                onClick={() => setViewPerspective('side')}
                className="px-3 py-1 text-xs rounded transition-all"
                style={{
                  background: viewPerspective === 'side' ? 'rgba(232,160,32,0.25)' : 'transparent',
                  color: viewPerspective === 'side' ? '#e8a020' : 'rgba(245,232,200,0.4)',
                }}
              >
                Side Profile View
              </button>
              <button
                onClick={() => setViewPerspective('contact')}
                className="px-3 py-1 text-xs rounded transition-all"
                style={{
                  background: viewPerspective === 'contact' ? 'rgba(232,160,32,0.25)' : 'transparent',
                  color: viewPerspective === 'contact' ? '#e8a020' : 'rgba(245,232,200,0.4)',
                }}
              >
                Limb-Lock View
              </button>
            </div>
          </div>

          {/* High-Definition Two-Tone 3D Model View */}
          <Anatomical3DPositionModel
            variant={selectedPosition.svgVariant}
            viewPerspective={viewPerspective}
            thrustVector={selectedPosition.thrustVector}
            pelvicTiltDeg={selectedPosition.pelvicTiltDeg}
          />

          {/* Metrics & Physics Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-panel p-3 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#f5e8c8]/30 block">Depth Rating</span>
              <span className="text-xl font-light text-[#e8a020]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {selectedPosition.depthRating} / 10
              </span>
            </div>
            <div className="glass-panel p-3 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#f5e8c8]/30 block">Clitoral Friction</span>
              <span className="text-xl font-light text-[#EC4899]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {selectedPosition.clitoralFrictionRating} / 10
              </span>
            </div>
            <div className="glass-panel p-3 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#f5e8c8]/30 block">Pelvic Tilt</span>
              <span className="text-xl font-light text-[#f5e8c8]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {selectedPosition.pelvicTiltDeg}°
              </span>
            </div>
          </div>

          {/* Cadence Telemetry & Wave Visualizer */}
          <div className="glass-panel p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#f5e8c8]/40">Cadence Simulation</span>
              <button
                onClick={() => setHapticsActive(!hapticsActive)}
                className="text-xs px-3 py-1 rounded-full transition-all flex items-center gap-1.5"
                style={{
                  background: hapticsActive ? 'rgba(232,160,32,0.2)' : 'rgba(245,232,200,0.05)',
                  border: hapticsActive ? '1px solid #e8a020' : '1px solid rgba(245,232,200,0.1)',
                  color: hapticsActive ? '#e8a020' : 'rgba(245,232,200,0.4)',
                }}
              >
                <span>📳</span>
                {hapticsActive ? 'Haptics Active' : 'Enable Mobile Haptics'}
              </button>
            </div>

            <CadenceWaveVisualizer
              thrustVector={selectedPosition.thrustVector}
              bpm={cadenceBpm}
              hapticsActive={hapticsActive}
            />

            <div className="flex items-center gap-4">
              <span className="text-xs text-[#f5e8c8]/30 shrink-0">Pace:</span>
              <input
                type="range"
                min="30"
                max="110"
                value={cadenceBpm}
                onChange={(e) => setCadenceBpm(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: 'linear-gradient(90deg, rgba(232,160,32,0.2), #e8a020)'
                }}
              />
              <span className="text-xs text-[#e8a020] shrink-0 font-medium">{cadenceBpm} BPM</span>
            </div>
          </div>

          {/* Erotic Mechanics & Dirty Talk Cue */}
          <div className="glass-panel p-5 flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#e8a020] mb-1 font-medium">
                Biomechanical Execution
              </p>
              <p className="text-sm text-[#f5e8c8]/70 leading-relaxed">
                {selectedPosition.eroticMechanics}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[rgba(232,160,32,0.2)] bg-[#120f09]">
              <p className="text-[10px] uppercase tracking-widest text-[#EC4899] mb-1">
                Dirty Talk / Vocal Cue
              </p>
              <p className="text-sm italic text-[#f5e8c8]/85" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                &ldquo;{selectedPosition.dirtyTalkCue}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { POSITIONS_DATA, PositionItem } from '../lib/positionsData'

// ─── High-Definition Volumetric 3D Anatomical Body Renderer ────────────
function Volumetric3DPositionCanvas({
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
    <div className="relative w-full h-[360px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#080705] border border-[rgba(232,160,32,0.25)] shadow-[inset_0_0_80px_rgba(0,0,0,0.9),0_10px_40px_rgba(0,0,0,0.8)]">
      {/* 3D Atmospheric Lighting Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.16)_0%,rgba(236,72,153,0.08)_40%,rgba(0,0,0,0.95)_80%)]" />

      {/* Blueprint Grid Floor */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-[#f5e8c8]">
        <defs>
          <pattern id="denseGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#denseGrid)" />
      </svg>

      {/* Main High-Definition Scalable Vector Model */}
      <svg
        viewBox="0 0 460 300"
        className="w-full h-full p-2 relative z-10 select-none"
      >
        <defs>
          {/* Partner A (Initiator) - Muscular Amber/Gold 3D Shading */}
          <linearGradient id="goldSkinGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          <linearGradient id="goldMuscleShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#92400E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#451A03" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="goldRimLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>

          {/* Partner B (Receiver) - Voluptuous Rose-Dusk/Obsidian 3D Shading */}
          <linearGradient id="roseSkinGrad" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="30%" stopColor="#F472B6" />
            <stop offset="65%" stopColor="#DB2777" />
            <stop offset="85%" stopColor="#831843" />
            <stop offset="100%" stopColor="#2A0614" />
          </linearGradient>

          <linearGradient id="roseMuscleShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BE185D" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#70072B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E040D" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="roseRimLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFF1F2" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#F472B6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9D174D" stopOpacity="0" />
          </linearGradient>

          {/* 3D Depth Filters */}
          <filter id="volumetricDrop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.8" />
          </filter>

          <filter id="hotspotPulseGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* ── 1. ARCH & ANCHOR (Volumetric Modified Prone Bone) ──────── */}
        {variant === 'arch-anchor' && (
          <g className={rhythmClass}>
            {/* Elevated Bed / Wedge Surface */}
            <path d="M 30 250 L 430 250" stroke="rgba(245,232,200,0.15)" strokeWidth="2" />
            <polygon points="120,250 240,210 240,250" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.25)" strokeWidth="1.5" />

            {/* Partner B (Receiver - Full-Flesh Rose Body) Prone Elevated */}
            <g filter="url(#volumetricDrop)">
              {/* Back Arm Rest */}
              <path d="M 65 240 C 50 235, 45 220, 60 215 C 80 210, 110 230, 120 245 Z" fill="url(#roseMuscleShadow)" opacity="0.6" />

              {/* Head & Neck resting on mattress */}
              <ellipse cx="60" cy="225" rx="14" ry="18" fill="url(#roseSkinGrad)" transform="rotate(-20 60 225)" />
              <path d="M 68 230 C 85 235, 110 235, 130 225 L 125 242 C 105 246, 80 244, 68 230 Z" fill="url(#roseSkinGrad)" />

              {/* Torso, Ribcage & Arched Back Contour */}
              <path d="M 125 228 C 145 210, 175 190, 205 185 C 230 180, 255 195, 260 215 C 255 240, 215 248, 175 246 C 145 245, 130 240, 125 228 Z" fill="url(#roseSkinGrad)" />

              {/* Voluptuous Glute Mass Elevated at 35° */}
              <ellipse cx="230" cy="195" rx="28" ry="24" fill="url(#roseSkinGrad)" transform="rotate(-15 230 195)" />
              <ellipse cx="232" cy="193" rx="24" ry="18" fill="url(#roseRimLight)" opacity="0.4" />

              {/* Full Thighs & Extended Pressed Legs */}
              <path d="M 245 195 C 275 205, 320 225, 380 245 C 385 249, 380 252, 365 252 C 310 250, 265 235, 235 215 Z" fill="url(#roseSkinGrad)" />
              <path d="M 255 205 C 290 220, 340 240, 395 248 C 390 252, 360 255, 310 248 Z" fill="url(#roseMuscleShadow)" opacity="0.5" />
            </g>

            {/* Partner A (Initiator - Volumetric Muscular Amber/Gold Body) */}
            <g filter="url(#volumetricDrop)">
              {/* Back Leg (Occluded) */}
              <path d="M 250 205 C 240 230, 230 245, 220 250 L 205 250 C 220 235, 235 215, 245 195 Z" fill="url(#goldMuscleShadow)" opacity="0.7" />

              {/* Head & Trapezius */}
              <ellipse cx="170" cy="95" rx="16" ry="20" fill="url(#goldSkinGrad)" transform="rotate(15 170 95)" />
              <path d="M 175 110 C 190 120, 210 130, 225 145 C 205 155, 185 140, 165 125 Z" fill="url(#goldSkinGrad)" />

              {/* Muscular Torso, Broad Shoulders & Core */}
              <path d="M 160 115 C 190 120, 225 135, 245 160 C 255 175, 250 200, 240 210 C 220 215, 195 190, 180 160 C 165 135, 155 125, 160 115 Z" fill="url(#goldSkinGrad)" />

              {/* Arm Firmly Gripping Partner B Hip/Back */}
              <path d="M 180 135 C 195 165, 210 185, 220 195 C 215 202, 205 198, 195 180 C 185 160, 170 145, 175 135 Z" fill="url(#goldSkinGrad)" />
              <ellipse cx="220" cy="195" rx="7" ry="5" fill="#FDE68A" />

              {/* Powerful Thighs Straddling Tight Base */}
              <path d="M 245 165 C 265 175, 275 200, 270 225 C 265 240, 250 250, 240 250 C 242 235, 255 215, 245 195 Z" fill="url(#goldSkinGrad)" />
              <path d="M 195 130 C 215 145, 235 165, 240 180" stroke="url(#goldRimLight)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>

            {/* Glowing Thrust Vector & Internal Anterior Target Hotspot */}
            <g filter="url(#hotspotPulseGlow)">
              <line x1="270" y1="165" x2="232" y2="196" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="4 3" strokeLinecap="round" />
              <polygon points="230,198 240,192 236,203" fill="#F59E0B" />
              <circle cx="230" cy="198" r="9" fill="#EC4899" className="animate-ping opacity-85" />
              <circle cx="230" cy="198" r="4.5" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {/* ── 2. STANDING COUNTER PRESS (Volumetric Standing Leverage) ── */}
        {variant === 'counter-press' && (
          <g className={rhythmClass}>
            {/* Counter Structure */}
            <rect x="70" y="165" width="160" height="15" fill="#18140C" stroke="rgba(245,232,200,0.3)" strokeWidth="1.5" />
            <rect x="140" y="180" width="20" height="90" fill="#120F09" stroke="rgba(245,232,200,0.15)" strokeWidth="1" />

            {/* Partner B (Receiver - Full Rose Body) Seated on Counter */}
            <g filter="url(#volumetricDrop)">
              {/* Head tilted back */}
              <ellipse cx="145" cy="70" rx="14" ry="17" fill="url(#roseSkinGrad)" transform="rotate(-15 145 70)" />

              {/* Upright Arched Torso & Full Bust */}
              <path d="M 142 85 C 130 115, 130 145, 138 170 C 158 172, 175 160, 168 135 C 165 110, 158 90, 142 85 Z" fill="url(#roseSkinGrad)" />
              {/* Voluptuous Bust Contour */}
              <circle cx="160" cy="115" r="10" fill="url(#roseSkinGrad)" opacity="0.9" />

              {/* Legs Wrapped High Around Partner A Waist */}
              <path d="M 145 165 C 175 155, 215 145, 255 125 C 265 130, 255 145, 220 160 C 185 172, 155 175, 145 165 Z" fill="url(#roseSkinGrad)" />

              {/* Arms Embracing Neck */}
              <path d="M 148 100 C 175 95, 205 90, 225 100 C 220 108, 195 108, 155 112 Z" fill="url(#roseSkinGrad)" />
            </g>

            {/* Partner A (Initiator - Muscular Gold Standing Body) */}
            <g filter="url(#volumetricDrop)">
              {/* Head & Neck leaning in close */}
              <ellipse cx="230" cy="90" rx="16" ry="19" fill="url(#goldSkinGrad)" transform="rotate(20 230 90)" />

              {/* Broad Muscular Torso & Glutes */}
              <path d="M 225 105 C 215 135, 210 165, 200 195 C 225 195, 245 170, 250 140 C 255 115, 245 105, 225 105 Z" fill="url(#goldSkinGrad)" />

              {/* Strong Arms Lifting Under Thighs */}
              <path d="M 230 125 C 205 140, 175 160, 155 162 C 158 172, 185 165, 215 150 Z" fill="url(#goldSkinGrad)" />

              {/* Solid Grounded Legs */}
              <path d="M 200 195 C 210 225, 225 255, 235 270 C 248 268, 240 235, 228 200 Z" fill="url(#goldSkinGrad)" />
              <path d="M 220 120 C 210 150, 205 180, 200 200" stroke="url(#goldRimLight)" strokeWidth="2.5" fill="none" />
            </g>

            {/* Hotspot & Downward Vector */}
            <g filter="url(#hotspotPulseGlow)">
              <line x1="210" y1="155" x2="175" y2="168" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="3 3" />
              <circle cx="178" cy="166" r="9" fill="#EC4899" className="animate-ping opacity-85" />
              <circle cx="178" cy="166" r="4.5" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {/* ── 3. VELVET TRAP (Volumetric Inverted CAT) ──────────────── */}
        {variant === 'velvet-trap' && (
          <g className={rhythmClass}>
            <line x1="40" y1="230" x2="420" y2="230" stroke="rgba(245,232,200,0.15)" strokeWidth="2" />

            {/* Partner B (Receiver - Rose Reclined Full Body) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="80" cy="210" rx="14" ry="17" fill="url(#roseSkinGrad)" transform="rotate(-30 80 210)" />
              {/* Reclined Torso */}
              <path d="M 90 215 C 135 220, 180 215, 220 205 C 245 190, 275 165, 305 140 C 315 145, 285 180, 255 208 C 220 225, 140 230, 90 215 Z" fill="url(#roseSkinGrad)" />
              {/* Elevated Hips & Legs Wrapped */}
              <ellipse cx="235" cy="205" rx="22" ry="16" fill="url(#roseSkinGrad)" />
            </g>

            {/* Partner A (Initiator - Gold Mounted Full-Flesh Press) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="120" cy="165" rx="16" ry="19" fill="url(#goldSkinGrad)" transform="rotate(10 120 165)" />
              {/* Full Torso hovering locked in contact with zero gap */}
              <path d="M 130 175 C 170 180, 210 188, 250 195 C 275 205, 310 215, 350 225 C 345 232, 295 225, 255 212 C 205 200, 155 190, 130 175 Z" fill="url(#goldSkinGrad)" />
              <ellipse cx="250" cy="195" rx="24" ry="18" fill="url(#goldSkinGrad)" />
              <path d="M 140 180 C 180 188, 220 195, 260 202" stroke="url(#goldRimLight)" strokeWidth="2.5" fill="none" />
            </g>

            {/* Clitoral & G-Spot Double Grinding Hotspot */}
            <g filter="url(#hotspotPulseGlow)">
              <ellipse cx="240" cy="200" rx="12" ry="7" fill="#EC4899" className="animate-pulse" />
              <circle cx="240" cy="200" r="4.5" fill="#FFFFFF" />
              {/* Orbiting Friction Indicator */}
              <circle cx="240" cy="200" r="20" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 3" />
            </g>
          </g>
        )}

        {/* ── 4. HIGH-ANGLE SUSPENSION (Volumetric Vertical Inversion) ─ */}
        {variant === 'high-angle' && (
          <g className={rhythmClass}>
            <line x1="30" y1="250" x2="430" y2="250" stroke="rgba(245,232,200,0.15)" strokeWidth="2" />

            {/* Partner B (Receiver - Rose Body Inverted 60°) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="75" cy="235" rx="14" ry="17" fill="url(#roseSkinGrad)" />
              {/* Back Flat on Mattress */}
              <path d="M 85 240 C 130 242, 175 235, 215 210 C 235 195, 245 170, 250 140 L 265 145 C 255 185, 240 215, 215 240 Z" fill="url(#roseSkinGrad)" />
              {/* Full Volumetric Legs Elevated Over Shoulders at 60 deg */}
              <path d="M 220 205 C 230 160, 250 100, 280 60 C 292 65, 270 120, 245 190 Z" fill="url(#roseSkinGrad)" />
              <ellipse cx="280" cy="60" rx="10" ry="14" fill="url(#roseSkinGrad)" />
            </g>

            {/* Partner A (Initiator - Gold Kneeling Deep Plunge) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="300" cy="80" rx="16" ry="19" fill="url(#goldSkinGrad)" transform="rotate(-15 300 80)" />
              {/* Broad Vertical Torso */}
              <path d="M 290 95 C 275 135, 260 175, 250 215 C 270 218, 295 195, 310 160 C 320 125, 310 100, 290 95 Z" fill="url(#goldSkinGrad)" />
              {/* Kneeling Base Legs */}
              <path d="M 250 215 C 270 235, 295 248, 325 250 C 330 245, 315 225, 285 205 Z" fill="url(#goldSkinGrad)" />
            </g>

            {/* Deep Vertical Plunge Hotspot */}
            <g filter="url(#hotspotPulseGlow)">
              <line x1="270" y1="180" x2="230" y2="215" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="3 3" />
              <circle cx="232" cy="212" r="10" fill="#EC4899" className="animate-ping opacity-90" />
              <circle cx="232" cy="212" r="5" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {/* ── 5. OVERDRIVE COWGIRL (Volumetric 45° Straddle) ────────── */}
        {variant === 'overdrive-cowgirl' && (
          <g className={rhythmClass}>
            <line x1="30" y1="250" x2="430" y2="250" stroke="rgba(245,232,200,0.15)" strokeWidth="2" />

            {/* Partner A (Base/Reclined Gold Body) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="70" cy="230" rx="15" ry="18" fill="url(#goldSkinGrad)" transform="rotate(-25 70 230)" />
              <path d="M 80 235 L 350 240 C 350 248, 300 252, 80 250 Z" fill="url(#goldSkinGrad)" />
              {/* Bent Knees */}
              <ellipse cx="280" cy="230" rx="20" ry="14" fill="url(#goldMuscleShadow)" opacity="0.6" />
            </g>

            {/* Partner B (Straddling Top Rose Body - Arched 45° Lean-Back) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="295" cy="75" rx="14" ry="17" fill="url(#roseSkinGrad)" transform="rotate(25 295 75)" />
              {/* Arched Torso & Full Bust */}
              <path d="M 285 85 C 255 125, 220 165, 205 210 C 225 215, 255 190, 280 145 C 295 115, 305 90, 285 85 Z" fill="url(#roseSkinGrad)" />
              <circle cx="270" cy="115" r="11" fill="url(#roseSkinGrad)" />

              {/* Arms supporting behind on partner thighs */}
              <path d="M 270 120 C 285 160, 300 200, 310 235 C 318 234, 310 195, 290 150 Z" fill="url(#roseSkinGrad)" />

              {/* Straddling Thighs & Rounded Glutes */}
              <ellipse cx="210" cy="210" rx="24" ry="18" fill="url(#roseSkinGrad)" transform="rotate(-10 210 210)" />
              <path d="M 285 95 C 260 135, 230 175, 210 210" stroke="url(#roseRimLight)" strokeWidth="2.5" fill="none" />
            </g>

            {/* Anterior G-Spot Vector Angle Hotspot */}
            <g filter="url(#hotspotPulseGlow)">
              <circle cx="215" cy="215" r="9" fill="#EC4899" className="animate-ping opacity-90" />
              <circle cx="215" cy="215" r="4.5" fill="#FFFFFF" />
              <circle cx="215" cy="215" r="22" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 3" />
            </g>
          </g>
        )}

        {/* ── 6. OBSIDIAN LOCK (Volumetric Side-Lying Spoons) ───────── */}
        {variant === 'obsidian-lock' && (
          <g className={rhythmClass}>
            <line x1="30" y1="240" x2="430" y2="240" stroke="rgba(245,232,200,0.15)" strokeWidth="2" />

            {/* Partner B (Receiver Front Rose Body) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="110" cy="180" rx="14" ry="17" fill="url(#roseSkinGrad)" transform="rotate(-15 110 180)" />
              {/* Torso & Hip Curve */}
              <path d="M 120 190 C 165 185, 210 188, 255 190 C 275 145, 315 125, 345 145 C 330 170, 290 195, 260 215 C 215 220, 165 215, 120 190 Z" fill="url(#roseSkinGrad)" />
              {/* Full Glutes */}
              <ellipse cx="250" cy="190" rx="24" ry="18" fill="url(#roseSkinGrad)" />
            </g>

            {/* Partner A (Initiator Behind Gold Body - Contoured to Back) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="85" cy="165" rx="15" ry="18" fill="url(#goldSkinGrad)" transform="rotate(-10 85 165)" />
              {/* Muscular Back & Torso */}
              <path d="M 95 175 C 140 170, 185 175, 230 182 C 265 192, 305 208, 350 225 C 340 235, 290 215, 245 198 C 195 190, 145 185, 95 175 Z" fill="url(#goldSkinGrad)" />
              {/* Reaching Arm for Multi-Zone Caress */}
              <path d="M 115 180 C 155 165, 195 165, 230 175 C 225 182, 190 175, 135 190 Z" fill="url(#goldSkinGrad)" />
              <path d="M 100 175 C 145 170, 190 175, 235 185" stroke="url(#goldRimLight)" strokeWidth="2.5" fill="none" />
            </g>

            {/* Dual Multi-Touch Hotspot */}
            <g filter="url(#hotspotPulseGlow)">
              <circle cx="245" cy="188" r="8" fill="#F59E0B" className="animate-pulse" />
              <circle cx="245" cy="188" r="4" fill="#FFF" />
            </g>
          </g>
        )}

        {/* ── 7. WALL PIN (Volumetric Elevated Standing Lift) ───────── */}
        {variant === 'wall-pin' && (
          <g className={rhythmClass}>
            {/* Vertical Textured Wall */}
            <rect x="80" y="20" width="18" height="260" fill="#18140E" stroke="rgba(245,232,200,0.3)" strokeWidth="2" />

            {/* Partner B (Receiver - Rose Body Pinned & Hoisted) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="125" cy="70" rx="14" ry="17" fill="url(#roseSkinGrad)" transform="rotate(-10 125 70)" />
              {/* Back Flat to Wall */}
              <path d="M 115 85 C 118 125, 115 155, 125 190 C 155 170, 195 155, 225 145 C 215 165, 175 185, 135 205 C 115 205, 110 160, 115 85 Z" fill="url(#roseSkinGrad)" />
              <circle cx="140" cy="115" r="10" fill="url(#roseSkinGrad)" />
              <ellipse cx="130" cy="190" rx="20" ry="16" fill="url(#roseSkinGrad)" />
            </g>

            {/* Partner A (Initiator - Powerful Muscular Gold Standing Body) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="215" cy="80" rx="16" ry="19" fill="url(#goldSkinGrad)" transform="rotate(25 215 80)" />
              {/* Muscular Torso & Glutes */}
              <path d="M 210 95 C 200 135, 190 175, 175 205 C 200 205, 225 175, 235 140 C 240 110, 230 95, 210 95 Z" fill="url(#goldSkinGrad)" />
              {/* Heavy Lifting Arms Under Partner B Thighs */}
              <path d="M 200 120 C 165 145, 145 175, 130 195 C 135 202, 160 185, 190 155 Z" fill="url(#goldSkinGrad)" />
              {/* Planted Power Legs */}
              <path d="M 175 205 C 185 235, 205 265, 215 275 C 228 272, 215 240, 200 210 Z" fill="url(#goldSkinGrad)" />
            </g>

            {/* Maximum Power Hotspot */}
            <g filter="url(#hotspotPulseGlow)">
              <line x1="185" y1="195" x2="140" y2="190" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="3 3" />
              <circle cx="145" cy="190" r="10" fill="#D97706" className="animate-ping opacity-90" />
              <circle cx="145" cy="190" r="5" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {/* ── 8. SUBMISSION BRIDGE (Volumetric High Pelvic Arch) ─────── */}
        {variant === 'submission-bridge' && (
          <g className={rhythmClass}>
            <line x1="30" y1="250" x2="430" y2="250" stroke="rgba(245,232,200,0.15)" strokeWidth="2" />

            {/* Partner B (Receiver - Rose Elevated Bridge with Pinned Wrists) */}
            <g filter="url(#volumetricDrop)">
              {/* Pinned Wrists Over Head */}
              <circle cx="65" cy="235" r="7" fill="#BE185D" />
              <ellipse cx="105" cy="230" rx="14" ry="17" fill="url(#roseSkinGrad)" transform="rotate(-25 105 230)" />

              {/* High 50° Arched Pelvic Bridge & Rounded Glutes */}
              <path d="M 115 235 C 145 185, 200 140, 250 145 C 285 190, 315 235, 330 250 C 315 252, 280 215, 245 170 C 205 165, 155 210, 115 235 Z" fill="url(#roseSkinGrad)" />
              <ellipse cx="250" cy="148" rx="26" ry="20" fill="url(#roseSkinGrad)" transform="rotate(-15 250 148)" />
              <circle cx="180" cy="170" r="10" fill="url(#roseSkinGrad)" />
            </g>

            {/* Partner A (Initiator - Gold Standing Downward Leverage) */}
            <g filter="url(#volumetricDrop)">
              <ellipse cx="275" cy="65" rx="16" ry="19" fill="url(#goldSkinGrad)" transform="rotate(15 275 65)" />
              {/* Torso & Core plunging downward into exposed pelvic arch */}
              <path d="M 270 80 C 260 120, 248 150, 240 165 C 265 170, 290 145, 305 110 C 310 85, 295 75, 270 80 Z" fill="url(#goldSkinGrad)" />
              {/* Dominant Hand Pinning Wrists Overhead */}
              <path d="M 260 95 C 180 150, 110 200, 65 235 C 72 240, 130 190, 205 145 Z" fill="url(#goldSkinGrad)" opacity="0.85" />
            </g>

            {/* Direct Anterior Wall Hotspot */}
            <g filter="url(#hotspotPulseGlow)">
              <line x1="250" y1="135" x2="230" y2="160" stroke="#F59E0B" strokeWidth="3.5" />
              <circle cx="235" cy="155" r="9" fill="#EC4899" className="animate-ping opacity-90" />
              <circle cx="235" cy="155" r="4.5" fill="#FFFFFF" />
            </g>
          </g>
        )}
      </svg>

      {/* Tilt Angle HUD Indicator */}
      <div className="absolute top-3 left-3 bg-[#0a0906]/85 px-3 py-1.5 rounded-lg border border-[rgba(232,160,32,0.35)] text-xs text-[#f5e8c8] tracking-widest uppercase flex items-center gap-2 backdrop-blur-md shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#e8a020] animate-pulse" />
        Pelvic Tilt: <span className="text-[#e8a020] font-semibold">{pelvicTiltDeg}°</span>
      </div>

      {/* Two-Tone Identity Legend Badge */}
      <div className="absolute bottom-3 left-3 bg-[#0a0906]/90 px-3.5 py-2 rounded-xl border border-[rgba(245,232,200,0.15)] flex items-center gap-4 text-xs tracking-wider backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
          <span className="text-[#FDE68A] font-medium">Initiator (Gold)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899] shadow-[0_0_8px_#EC4899]" />
          <span className="text-[#F472B6] font-medium">Receiver (Rose)</span>
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
              Volumetric 3D Physiology & Anatomy Lab
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-[#f5e8c8]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Sensual Position Laboratory
            </h2>
            <p className="text-[#f5e8c8]/40 text-sm mt-1 max-w-xl">
              Articulated two-tone volumetric human bodies, muscular contours, pelvic angles, and cadence telemetry.
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
              3D Volumetric Articulation
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

          {/* High-Definition Volumetric 3D Model View */}
          <Volumetric3DPositionCanvas
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

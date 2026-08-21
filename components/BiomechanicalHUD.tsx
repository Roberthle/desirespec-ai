'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PositionItem } from '../lib/positionsData'

export default function BiomechanicalHUD({
  positionData,
  bpm
}: {
  positionData: PositionItem
  bpm: number
}) {
  const [strokePhase, setStrokePhase] = useState<number>(0) // 0 to 1 progress

  // Synchronized stroke depth oscillator loop
  useEffect(() => {
    let animId: number
    let startTime = performance.now()
    const periodMs = (60 / bpm) * 1000

    const update = (now: number) => {
      const elapsed = now - startTime
      const progress = (Math.sin((elapsed / periodMs) * Math.PI * 2) + 1) / 2
      setStrokePhase(progress)
      animId = requestAnimationFrame(update)
    }

    animId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animId)
  }, [bpm])

  // Internal Anatomical Target Zone
  const targetZone =
    positionData.depthRating >= 9
      ? 'Deep Cervical Fornix (A-Spot)'
      : positionData.clitoralFrictionRating >= 8
      ? 'External Clitoral Crus & Anterior Wall'
      : 'Mid-Vaginal G-Spot & Blended Zone'

  const strokePhaseLabel =
    strokePhase < 0.35
      ? 'Shallow Clitoral Engagement'
      : strokePhase < 0.75
      ? 'Mid-Shaft Friction Phase'
      : 'Full Depth Pelvic Lock'

  return (
    <div className="glass-panel p-5 border border-[rgba(232,160,32,0.25)] flex flex-col gap-4 bg-[#0a0906]/90">
      {/* Title & Telemetry Header */}
      <div className="flex items-center justify-between border-b border-[rgba(232,160,32,0.15)] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8A020] animate-pulse shadow-[0_0_8px_#E8A020]" />
          <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#F5E8C8]">
            Biomechanical Kinematics & Depth Telemetry
          </h4>
        </div>
        <span className="text-[11px] text-[#E8A020] font-mono">
          {bpm} BPM · {((60 / bpm)).toFixed(2)}s/cycle
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* 1. Real-Time Dynamic Stroke Depth Gauge */}
        <div className="flex flex-col gap-2 bg-[#120F0A] p-3.5 rounded-xl border border-[rgba(245,232,200,0.08)]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#F5E8C8]/50 uppercase tracking-widest text-[10px]">
              Stroke Depth Phase
            </span>
            <span className="text-[#E8A020] font-mono text-[11px]">
              {(strokePhase * positionData.depthRating * 10).toFixed(0)}%
            </span>
          </div>

          {/* Animated Depth Bar */}
          <div className="w-full h-2.5 bg-[#1C1810] rounded-full overflow-hidden relative border border-[rgba(232,160,32,0.2)]">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${strokePhase * 100}%`,
                background: 'linear-gradient(90deg, #F59E0B 0%, #EC4899 70%, #F43F5E 100%)',
                boxShadow: '0 0 10px rgba(244,63,94,0.6)'
              }}
            />
          </div>

          <span className="text-[11px] text-[#F5E8C8]/80 font-medium mt-0.5 truncate">
            {strokePhaseLabel}
          </span>
        </div>

        {/* 2. Precision Pelvic Angle & Target Dial */}
        <div className="flex items-center gap-3 bg-[#120F0A] p-3.5 rounded-xl border border-[rgba(245,232,200,0.08)]">
          {/* Circular Angle Dial */}
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(245,232,200,0.1)"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E8A020"
                strokeWidth="3.5"
                strokeDasharray={`${(positionData.pelvicTiltDeg / 90) * 100}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[11px] font-mono text-[#F5E8C8] font-semibold">
              {positionData.pelvicTiltDeg}°
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[#F5E8C8]/50 uppercase tracking-widest text-[10px]">
              Pelvic Tilt Vector
            </span>
            <span className="text-xs text-[#F5E8C8] font-medium mt-0.5">
              {targetZone}
            </span>
          </div>
        </div>

        {/* 3. Motion Kinematics & Muscle Exertion */}
        <div className="flex flex-col gap-1.5 bg-[#120F0A] p-3.5 rounded-xl border border-[rgba(245,232,200,0.08)]">
          <div className="flex items-center justify-between text-[10px] text-[#F5E8C8]/50 uppercase tracking-widest">
            <span>Trajectory</span>
            <span className="text-[#EC4899] font-medium">{positionData.thrustVector}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#F5E8C8]/50 uppercase tracking-widest">
            <span>Friction Index</span>
            <span className="text-[#FDE68A] font-medium">{positionData.clitoralFrictionRating}/10 Focus</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#F5E8C8]/50 uppercase tracking-widest">
            <span>Intensity Level</span>
            <span className="text-[#F43F5E]">{'🔥'.repeat(positionData.intensityLevel)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

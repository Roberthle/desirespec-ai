'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface AlignmentQuizModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectRecommendedPosition: (positionId: string) => void
}

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is your primary goal for intimacy tonight?',
    options: [
      { label: 'Deep emotional connection & eye contact', vector: 'slow-burn', position: 'lotus-lock' },
      { label: 'Maximum female pleasure & clitoral alignment', vector: 'her-control', position: 'sovereign-squat' },
      { label: 'Deep intense power & sensation', vector: 'deep-power', position: 'arch-anchor' },
      { label: 'Zero-pressure, gentle somatic relaxation', vector: 'healing', position: 'lazy-sunday' },
    ],
  },
  {
    id: 2,
    question: 'What pacing cadence feels best for your nervous system?',
    options: [
      { label: 'Slow tantric wave (30–45 BPM)', bpm: 38 },
      { label: 'Steady rhythmic groove (55–75 BPM)', bpm: 65 },
      { label: 'Dynamic accelerating peaks (80–100 BPM)', bpm: 88 },
      { label: 'Micro-grinds with motionless pauses', bpm: 28 },
    ],
  },
  {
    id: 3,
    question: 'Are there any physical comfort factors to consider?',
    options: [
      { label: 'None — ready for any angle', filter: 'all' },
      { label: 'Lower back, knee, or joint sensitivity', filter: 'back-pain', position: 'lazy-sunday' },
      { label: 'Significant height difference between partners', filter: 'height-diff', position: 'desk-commander' },
      { label: 'Need zero pinned weight & full partner control', filter: 'trauma-safe', position: 'sovereign-squat' },
    ],
  },
]

export default function AlignmentQuizModal({
  isOpen,
  onClose,
  onSelectRecommendedPosition,
}: AlignmentQuizModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const handleSelectOption = (option: any) => {
    const nextAnswers = [...answers, option]
    setAnswers(nextAnswers)

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers([])
    setIsCompleted(false)
  }

  if (!isOpen) return null

  // Calculate recommendation
  const primaryChoice = answers[0] || {}
  const speedChoice = answers[1] || {}
  const comfortChoice = answers[2] || {}

  const recommendedPositionId = comfortChoice.position || primaryChoice.position || 'sovereign-squat'

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-lg p-6 md:p-8 rounded-3xl bg-[#0E0C09] border border-[rgba(232,160,32,0.4)] shadow-[0_0_90px_rgba(232,160,32,0.15)] relative overflow-hidden text-[#F5E8C8]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#F5E8C8]/50 hover:text-[#E8A020] text-xl transition-colors"
          >
            ✕
          </button>

          {!isCompleted ? (
            <div className="flex flex-col gap-6">
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs text-[#E8A020] uppercase tracking-widest font-mono">
                <span>Couple Alignment Blueprint</span>
                <span>
                  Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
              </div>
              <div className="w-full h-1 bg-[#1A140B] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E8A020] to-[#F43F5E] transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question */}
              <h3 className="text-xl md:text-2xl font-serif text-[#FDE68A] leading-snug">
                {QUIZ_QUESTIONS[currentStep].question}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {QUIZ_QUESTIONS[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full p-4 text-left rounded-xl bg-[#141009] border border-[rgba(245,232,200,0.15)] hover:border-[#E8A020] hover:bg-[#1C160C] transition-all text-sm text-[#F5E8C8]/90 font-light flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <span className="text-[#E8A020] opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Blueprint Card */
            <div className="flex flex-col gap-6 text-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs uppercase tracking-[0.25em] text-[#E8A020] font-mono">
                  Your Couple Intimacy Blueprint
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-[#FDE68A] mt-1">
                  Optimal Kinematic Match Generated
                </h3>
              </div>

              <div className="p-6 rounded-2xl bg-[#141009] border border-[rgba(232,160,32,0.3)] flex flex-col gap-3 text-left">
                <div className="flex items-center justify-between text-xs text-[#E8A020] font-mono">
                  <span>Recommended Starting Cadence</span>
                  <span className="font-bold text-[#FDE68A]">
                    {speedChoice.bpm || 45} BPM
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#F43F5E] font-mono">
                  <span>Primary Alignment Vector</span>
                  <span className="font-bold text-[#FBCFE8] uppercase">
                    {primaryChoice.vector || 'Somatic Connection'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    onSelectRecommendedPosition(recommendedPositionId)
                    onClose()
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#E8A020] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#F59E0B] transition-colors shadow-lg"
                >
                  Open Recommended Pose in 3D Studio →
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 text-xs text-[#F5E8C8]/50 hover:text-[#F5E8C8] transition-colors"
                >
                  Retake Alignment Blueprint
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

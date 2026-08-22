'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'qrcode'

interface CoupleSyncModalProps {
  isOpen: boolean
  onClose: () => void
  currentPositionId: string
  currentBpm: number
  onSyncReceived?: (positionId: string, bpm: number) => void
}

export default function CoupleSyncModal({
  isOpen,
  onClose,
  currentPositionId,
  currentBpm,
}: CoupleSyncModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [roomCode, setRoomCode] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      // Generate a random 6-character room code
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      setRoomCode(code)

      const syncUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/?position=${currentPositionId}&bpm=${currentBpm}&room=${code}#positions`
        : `https://desirespec-ai.onrender.com/?position=${currentPositionId}&bpm=${currentBpm}&room=${code}#positions`

      QRCode.toDataURL(syncUrl, {
        width: 260,
        margin: 2,
        color: {
          dark: '#E8A020',
          light: '#0A0906',
        },
      }).then(setQrDataUrl)
    }
  }, [isOpen, currentPositionId, currentBpm])

  const copySyncLink = () => {
    const syncUrl = `${window.location.origin}/?position=${currentPositionId}&bpm=${currentBpm}&room=${roomCode}#positions`
    navigator.clipboard.writeText(syncUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-md p-6 md:p-8 rounded-3xl bg-[#0E0C09] border border-[rgba(232,160,32,0.4)] shadow-[0_0_80px_rgba(232,160,32,0.15)] relative overflow-hidden text-[#F5E8C8]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#F5E8C8]/50 hover:text-[#E8A020] text-xl transition-colors"
          >
            ✕
          </button>

          <div className="text-center flex flex-col items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8A020] animate-ping mb-1" />
            <h3 className="text-2xl font-serif text-[#FDE68A]">
              Sync 3D Studio with Partner
            </h3>
            <p className="text-xs text-[#F5E8C8]/70 max-w-xs leading-relaxed">
              Scan this QR code with your partner&apos;s phone to open the exact 3D angle and BPM cadence simultaneously.
            </p>
          </div>

          {/* QR Code Canvas */}
          <div className="my-6 flex flex-col items-center justify-center">
            <div className="p-3 rounded-2xl bg-[#0A0906] border border-[rgba(232,160,32,0.3)] shadow-inner">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Couple Sync QR Code"
                  className="w-48 h-48 rounded-xl"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-xs text-[#E8A020] animate-pulse">
                  Generating Room...
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#E8A020]">
              <span>Room Code:</span>
              <span className="px-2.5 py-0.5 rounded bg-[#1A140B] border border-[rgba(232,160,32,0.3)] font-bold tracking-widest text-[#FDE68A]">
                {roomCode}
              </span>
            </div>
          </div>

          {/* 1-Click Copy Link Button */}
          <button
            onClick={copySyncLink}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E8A020] to-[#F59E0B] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <span>✓</span> Link Copied to Clipboard!
              </>
            ) : (
              <>
                <span>🔗</span> Copy Private Invite Link
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-[#F5E8C8]/40 mt-4 tracking-wider">
            🔒 100% Private · Zero sign-up required · Peer-to-peer session
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

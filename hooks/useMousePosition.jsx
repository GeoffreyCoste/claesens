'use client'

import { useEffect, useState, useRef } from 'react'
import { useMotionValue } from 'framer-motion'

export function useMousePosition(initialOffsetX = 0, initialOffsetY = 0) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const offsetXRef = useRef(initialOffsetX)
  const offsetYRef = useRef(initialOffsetY)

  // 👇 version « classique » sans motion, utile pour CursorMask
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMouse = (e) => {
      const newX = e.clientX - offsetXRef.current
      const newY = e.clientY - offsetYRef.current

      // mise à jour MotionValues (utile pour CursorNew)
      x.set(newX)
      y.set(newY)

      // mise à jour state "simple" (utile pour CursorMask)
      setMousePos({ x: newX, y: newY })
    }

    window.addEventListener('mousemove', updateMouse)
    return () => window.removeEventListener('mousemove', updateMouse)
  }, [x, y])

  const setOffset = (ox, oy) => {
    offsetXRef.current = ox
    offsetYRef.current = oy
  }

  return {
    // for CursorCustom
    x,
    y,
    setOffset,
    // for CursorMask
    mousePos
  }
}
"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { motion, useAnimation, type Variant } from "framer-motion"

type ScrollRevealProps = {
  children: ReactNode
  variants?: {
    hidden: Variant
    visible: Variant
  }
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  variants,
  className = "",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const defaultVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration, delay } },
  }

  const finalVariants = variants || defaultVariants

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          controls.start("visible")
          if (once) {
            setIsVisible(true)
          }
        } else if (!entry.isIntersecting && !once && isVisible) {
          controls.start("hidden")
          setIsVisible(false)
        }
      },
      { threshold },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [controls, isVisible, once, threshold])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={finalVariants} className={className}>
      {children}
    </motion.div>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function useScrollReveal<T extends HTMLElement>(options?: {
  delay?: number
  duration?: number
  y?: number
  opacity?: number
}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.fromTo(
      element,
      {
        y: options?.y ?? 60,
        opacity: options?.opacity ?? 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: options?.duration ?? 1,
        delay: options?.delay ?? 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [options?.delay, options?.duration, options?.y, options?.opacity])

  return ref
}

export function useStaggerReveal<T extends HTMLElement>(options?: {
  stagger?: number
  duration?: number
  y?: number
}) {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const children = container.children

    gsap.fromTo(
      children,
      {
        y: options?.y ?? 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: options?.duration ?? 0.8,
        stagger: options?.stagger ?? 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [options?.stagger, options?.duration, options?.y])

  return containerRef
}

export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.to(element, {
      y: () => -window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [speed])

  return ref
}

export function useHorizontalScroll<T extends HTMLElement>() {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scrollWidth = container.scrollWidth - container.clientWidth

    gsap.to(container, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [])

  return containerRef
}

export function useScaleOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.fromTo(
      element,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [])

  return ref
}

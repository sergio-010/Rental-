'use client'
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
interface RevealProps {
    children: React.ReactNode
    className?: string
    position: "rigth" | "bottom"
    delay?: number
}
export const fadeIn = (position: string, delay?: number) => {
    return {
        visible: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                delay: delay ? delay : 0.5,
                duration: 1.5,
                ease: [0.6, 0.01, -0.05, 0.9],
            },
        },
        hidden: {
            y: position === "bottom" ? 100 : -100,
            x: position === "rigth" ? 100 : -100,
            opacity: 0,
            transition: {
                type: "spring",
                delay: delay ? delay : 0.5,
                duration: 1.5,
                ease: [0.6, 0.01, -0.05, 0.9],

            }
        },
    }
}
export default function Reveal({ children, className, position, delay }: RevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false })
    const animation = useAnimation()
    const slideControl = useAnimation()

    useEffect(() => {

        if (isInView) {
            animation.start("visible")
            slideControl.start("visible")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView])

    return (
        <div ref={ref}>

            <motion.div className={className} variants={fadeIn(position, delay)}
                initial="hidden" animate={animation} transition={{ duration: 0.5 }}>
                {children}

            </motion.div>


        </div>
    )
}

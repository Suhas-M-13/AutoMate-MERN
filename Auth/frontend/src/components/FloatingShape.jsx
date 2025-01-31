import React from 'react'
import { motion } from 'framer-motion'

const FloatingShape = (props) => {
  return (
    <motion.div
      className={`absolute rounded-full ${props.color} ${props.size} opacity-20 blur-xl`}
      style={{ top: props.top, left: props.left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360]
      }}

      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay: props.delay,
      }}

      arial-hidden="true"
    >

    </motion.div>
  )
}

export default FloatingShape

import React from 'react'
import Confetti from 'react-confetti'

export default function ReactConfetti() {
  return (
    <Confetti 
      width={window.innerWidth}
      height={window.innerHeight}
    />
  )
}
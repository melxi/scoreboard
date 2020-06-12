import React, { useRef, useEffect } from 'react'

const ProgressRing = ({score}) => {
    const circleRef = useRef(null)

    useEffect(() => {
        const radius = circleRef.current.r.baseVal.value
        const circumference = 2 * radius * Math.PI
        const offset = circumference - score / 100 * circumference
        const circleStyle = {
            strokeDasharray: circumference,
            strokeDashoffset: offset
        }
        Object.assign(circleRef.current.style, circleStyle)
    }, [])

    return (
        <td className="value value-score">
            <span>{score}</span>
            <svg>
                <circle cx="30" cy="30" r="22"></circle>
                <circle ref={circleRef} cx="30" cy="30" r="22"></circle>
            </svg>
        </td>
    )
}

export default ProgressRing

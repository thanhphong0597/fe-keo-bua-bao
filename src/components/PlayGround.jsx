import React, { useEffect } from 'react'
import Button from './Button'

export default function PlayGround() {
    const action = [`keo`, `bua`, `bao`]
    useEffect(() => {

    }, [])

    return (

        <div>
            {action.map(a => (
                <button>{a}</button>
            ))}
        </div>
    )
}

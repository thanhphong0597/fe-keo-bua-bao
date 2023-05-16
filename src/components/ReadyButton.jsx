

import socket from '../_storage/socketService'
import React, { useEffect, useState } from 'react'
import '../App.scss'
export default function ReadyButton() {
    const [name, setName] = useState(`ready`)


    const handleClick = async (e) => {
        e.preventDefault()
        setName(prev => {
            if (prev === `ready`) {
                socket.emit(`user:ready`, 3)
                return `Not Ready`
            }
            else {
                socket.emit(`user:ready`, 4)
                return `ready`
            }
        })
    }
    return (
        <button onClick={handleClick} className={`button ${name === `ready` ? 'light' : ''}`}>
            {name}
        </button>
    )
}

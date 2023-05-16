

import socket from '../_storage/socketService'
import React, { useEffect, useState } from 'react'
import '../App.scss'
export default function Button({ name = 'start' }) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (ready) {
            if (name === 'ready')
                socket.emit('user:ready')
            if (name === 'start')
                socket.emit('user:start')
        }
    }, [ready, name])

    // useEffect(() => {
    //     socket.on(`server:msg`, data => {
    //         // console.log(data)
    //     })
    // }, [])

    const handleClick = async (e) => {
        e.preventDefault()
        setReady(prev => !prev)
    }
    return (
        // < button onClick={handleClick} className='light' > {name} </button >
        <button onClick={handleClick} className={`button ${ready ? 'light' : ''}`}>
            {name}
        </button>
    )
}

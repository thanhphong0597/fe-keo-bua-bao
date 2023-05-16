

import socket from '../_storage/socketService'
import React, { useEffect, useState } from 'react'
import '../App.scss'
export default function StartButton() {
    const [name, setName] = useState(`Not All Ready`)
    useEffect(() => {
        socket.on(`server:play`, data => {
            console.log(data)
            if (data === 3) {
                setName(`Start`)
            } else {
                setName(`Not All Ready`)
            }
        })
    }, [])

    const handleClick = async (e) => {
        e.preventDefault()
        if (name === `Start`)
            socket.emit(`user:start`)
        else {
            alert('Not All Ready!!!')
        }
    }

    return (
        <button onClick={handleClick} className={`button ${name !== `Not All Ready` ? 'light' : ''}`}>
            {name}
        </button>
    )
}

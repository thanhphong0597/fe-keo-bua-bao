
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { match2Actions } from '../_storage/slices/match2.slice'
import { matchIdSelector, matchSelector } from '../_storage/selectors/selectorAll'
import socket from '../_storage/socketService'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../_storage/slices/auth.slice'

export default function Match({ user_id }) {
    const matchId = useSelector(matchIdSelector)
    const [num, setNum] = useState(user_id)
    const [numRoom, setNumRoom] = useState(0)
    //a = 0: create - a = 1: join
    const [a, setA] = useState(0);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allMatch = useSelector(x => x.match.matchAll)
    const [choose, setChoose] = useState('')
    useEffect(() => {
        if (matchId) {
            socket.emit('test:join', matchId, a)
            navigate(`/room/${matchId}`)
        }
    }, [matchId])

    useEffect(() => {
        socket.on(`server:msg`, data => {
            console.log(data)
            if (data === 1) {
                dispatch(match2Actions.allMatch())
            }
        })
    }, [])



    const handleCreate = async (e) => {
        e.preventDefault()
        setA(0)
        dispatch(match2Actions.createMatch())
        dispatch(authActions.roleChange(`master`))
        dispatch(authActions.statusChange(`waitting`))
    }

    const handleFind = (e) => {
        e.preventDefault()
        setA(1)
        dispatch(match2Actions.joinMatch(numRoom))
        dispatch(authActions.roleChange(`client`))
        dispatch(authActions.statusChange(`playing`))
    }

    const handleChangeChoose = (e) => {
        setChoose(e.target.value)

    }
    useEffect(() => {
        if (choose !== '') {
            const roomId = Number(choose)
            console.log(`a`)
            console.log(choose, a)
            socket.emit('test:join', roomId, a)
            navigate(`/room/${choose}`) 
        }
    }, [choose])

    return (
        <>
            <div>Home</div>
            <input type="text" value={num} onChange={(e) => setNum(e.target.value)} />
            <select name="" value={choose} onChange={handleChangeChoose}>
                {allMatch.map(m => (
                    <option value={m.id} key={m.id}>{m.id}</option>
                ))}
            </select>
            <input type="text" value={numRoom} onChange={(e) => setNumRoom(e.target.value)} />
            <button onClick={handleCreate}>Tao Phong</button>
            <button onClick={handleFind}>Tim Phong</button>
        </>

    )

}

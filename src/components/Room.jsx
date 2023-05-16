
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { match2Actions } from '../_storage/slices/match2.slice'
import socket from '../_storage/socketService'
import { useNavigate, useParams } from 'react-router-dom'
import StartButton from './StartButton'
import ReadyButton from './ReadyButton'
import { authActions } from '../_storage/slices/auth.slice'
import GamePlay from './GamePlay'

export default function Room() {
    const { id } = useParams();
    // const match = useSelector(x => x.match.match)
    const status = useSelector(x => x.match.status)
    const role = useSelector(x => x.auth.role)
    const user = useSelector(x => x.auth.user.data)
    // console.log(user)
    const user1 = useSelector(x => x.match.user1)
    const user2 = useSelector(x => x.match.user2)
    const playing = useSelector(x => x.match.playing)
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on(`server:msg`, data => {
            console.log(data)
            if (data === 2) {
                dispatch(match2Actions.findMatch(id))
                dispatch(authActions.statusChange('playing'))
                // dispatch(match2Actions.allMatch())
            }
            if (data === 3) {
                dispatch(match2Actions.statusChange())
            }
        })

    }, [dispatch, id])

    if (!playing)
        return (
            <>
                <div>Room {id}</div>
                <div>{status}</div>
                {user1.id != null ? (<div>Truong Phong: {user1.name}</div>) : ''}
                {user2.id != null ? (<div>Khach: {user2.name}</div>) : ''}

                {role === 'master' ? <StartButton /> : <ReadyButton />}


            </>

        )

    else
        return (
            <>
                {user1.id == user.id ? (
                    <div>
                        <div>hello {user.user_name}, you're playing against {user2.name}</div>
                        <GamePlay user_name={user.user_name} role={role} />
                    </div>

                ) :
                    (
                        <div>
                            <div>hello {user.user_name}, you're playing against {user1.name}</div>
                            < GamePlay user_name={user.user_name} role={role} />
                        </div>

                    )

                }

            </>
        )

}

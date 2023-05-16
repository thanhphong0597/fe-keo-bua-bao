import React, { useEffect, useReducer, useRef, useState } from 'react'
import socket from '../_storage/socketService'
import { useDispatch, useSelector } from 'react-redux'
import { roundActions } from '../_storage/slices/round.slice'

export default function GamePlay({ user_name, role }) {
    const array = ['keo', 'bua', 'bao']
    const [bet, setBet] = useState('keo')
    const dispatch = useDispatch()
    const round = useSelector(x => x.round.current_round)
    const matchId = useSelector(x => x.match.matchId)
    const user1 = useSelector(x => x.match.user1.id)
    const user2 = useSelector(x => x.match.user2.id)
    const match = useSelector(x => x.match)
    const result = useSelector(x => x.round.result)
    const ended = useSelector(x => x.round.ended)
    const stop = useSelector(x => x.round.stop)
    const data = useSelector(x => x.round.rounds)
    const [winner, setWinner] = useState(null)
    const [rounds, setRounds] = useState(null)
    const finalResult = useSelector(x => x.round.finalWinner)

    useEffect(() => {
        if (stop) {
            if (finalResult === 1) {
                setWinner(match.user1)
            } else if (finalResult === 2) {
                setWinner(match.user2)
            }
            setRounds(data)
            // dispatch(roundActions.updateRound({matchId,rounds}))
        }
    }, [stop])

    useEffect(() => {
        if (rounds != null) {
            dispatch(roundActions.updateRound({ matchId, rounds }))

        }
    }, [rounds])

    useEffect(() => {
        socket.on(`master:client`, (result, round) => {
            console.log(result)
            console.log(round)
            dispatch(roundActions.updateRoundId(++round))

        })

        socket.on(`user:bet`, bet => {
            dispatch(roundActions.updateAnswer({ user: 2, bet: bet }))
        })
        return () => {
            socket.off(`master:client`)
            socket.off('user:bet');
        }
    }, [])

    useEffect(() => {
        if (ended) {
            dispatch(roundActions.saveRound({ user1, user2 }))
            dispatch(roundActions.resetRound())
            console.log(result, round)
            socket.emit(`master:client`, result, round)
        }

    }, [ended])


    const handleBet = (e) => {
        e.preventDefault()
        if (role === 'client') {
            socket.emit(`user:bet`, role, bet)
        }
        else {
            dispatch(roundActions.updateAnswer({ user: 1, bet: bet }))
        }
    }

    // useEffect(() => {
    //     console.log(`final: ` + finalResult)
    //     console.log(`winner` + winner)
    // }, [finalResult])
    return (
        <>
            <div>Round {round}</div>
            {finalResult !== -1 ? winner === null ? (<div>Hoa</div>) : (<div>Winner: {winner.name}</div>) : ''}
            {
                array.map(item => (
                    <button key={item} onClick={(e) => setBet(item)}> {item} </button>
                ))
            }
            <button onClick={handleBet}>bet</button>
        </>
    )
}

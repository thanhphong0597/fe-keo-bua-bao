import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../_helpers/fetch-wrapper"




const name = 'round'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()

const slice = createSlice({ name, initialState, reducers, extraReducers })

export const roundActions = { ...slice.actions, ...extraActions }
export const roundReducer = slice.reducer

function createInitialState() {
    return {
        rounds: [],
        ended: false,
        current_round: 1,
        user1_pick: '',
        user2_pick: '',
        result: '',
        winner: null,
        u1_score: 0,
        u2_score: 0,
        stop: false,
        finalWinner: -1,
        finalStop: false
    }
}

function createReducers() {
    return {
        resetRound,
        updateAnswer,
        saveRound,
        updateRoundId
    }
    function updateAnswer(state, action) {
        if (action.payload.user === 1) {
            state.user1_pick = action.payload.bet
        } else {
            state.user2_pick = action.payload.bet
        }

        if (state.user1_pick !== '' && state.user2_pick !== '') {
            let a = 0
            const u1 = state.user1_pick
            const u2 = state.user2_pick
            if (u1 === u2) { a = 0 }
            else if (
                (u1 === 'keo' && u2 === 'bao') ||
                (u1 === 'bua' && u2 === 'keo') ||
                (u1 === 'bao' && u2 === 'bua')) {
                a = 1
            } else {
                a = 2
            }

            state.result = `${state.user1_pick} - ${state.user2_pick}`
            state.winner = a === 0 ? 0 : a === 1 ? 1 : 2
            if (a === 1) {
                state.u1_score += 1
            } else if (a === 2) {
                state.u2_score += 1
            }
            state.ended = true

        }
    }
    function saveRound(state, action) {
        // console.log(user1)
        state.rounds = [...state.rounds,
        {
            roundId: state.current_round,
            user1_answer: state.user1_pick,
            user2_answer: state.user2_pick,
            winner: state.winner === 1 ? action.payload.user1 : state.winner === 2 ? action.payload.user2 : null
        }
        ]
        if (state.current_round === 5 || state.u1_score === 3 || state.u2_score === 3) {
            state.stop = true
            if (state.u1_score > state.u2_score) {
                state.finalWinner = 1;
            } else if (state.u1_score < state.u2_score) {
                state.finalWinner = 2;
            } else {
                state.finalWinner = 0;
            }
        }
        else {

            state.current_round += 1
        }
    }
    function resetRound(state) {
        state.user1_pick = ''
        state.user2_pick = ''
        state.result = ''
        state.winner = 0
        state.ended = false

    }
    function updateRoundId(state, action) {
        state.current_round = action.payload

    }
}


function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/rounds`

    return {
        updateRound: updateRound(),
    }


    function updateRound() {
        return createAsyncThunk(
            `${name}/updateRound`,
            async ({ matchId, rounds }) => {
                console.log(rounds)
                fetchWrapper.post(`${baseUrl}/updateRound/${matchId}`, { rounds })
            }
        )
    }


}




function createExtraReducers() {
    return {
        ...updateRound(),

    }
    function updateRound() {
        var { pending, fulfilled, rejected } = extraActions.updateRound;
        return {
            [pending]: (state) => {

            },
            [fulfilled]: (state, action) => {

            },
            [rejected]: (state, action) => {
                console.log(action.error)
            }
        }

    }

}
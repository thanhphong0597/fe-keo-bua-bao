import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchWrapper } from "../../_helpers/fetch-wrapper"




const name = 'match2'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()

const slice = createSlice({ name, initialState, reducers, extraReducers })

export const match2Actions = { ...slice.actions, ...extraActions }
export const match2Reducer = slice.reducer

function createInitialState() {
    return {
        matchId: null,
        user1: { id: null, name: '' },
        user2: { id: null, name: '' },
        status: null,
        matchAll: [],
        playing: false
    }
}

function createReducers() {
    return {
        statusChange
    }
    function statusChange(state) {
        state.playing = true
    }
}


function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/matches`

    return {
        createMatch: createMatch(),
        joinMatch: joinMatch(),
        findMatch: findMatch(),
        allMatch: allMatch()
    }

    function createMatch() {
        return createAsyncThunk(
            `${name}/create`,
            async () => fetchWrapper.get(`${baseUrl}/create`)
        )
    }
    function joinMatch() {
        return createAsyncThunk(
            `${name}/join`,
            async (id) => fetchWrapper.get(`${baseUrl}/join/${id}`)
        )
    }
    function findMatch() {
        return createAsyncThunk(
            `${name}/find`,
            async (id) => fetchWrapper.get(`${baseUrl}/find/${id}`)
        )
    }
    function allMatch() {
        return createAsyncThunk(
            `${name}/all`,
            async () => fetchWrapper.get(`${baseUrl}/allMatch`)
        )
    }
}


function createExtraReducers() {
    return {
        ...createMatch(),
        ...joinMatch(),
        ...findMatch(),
        ...allMatch()
    }
    function createMatch() {
        var { pending, fulfilled, rejected } = extraActions.createMatch;
        return {
            [pending]: (state) => {

            },
            [fulfilled]: (state, action) => {
                state.matchId = action.payload.data.id
                state.user1.id = action.payload.data.user_id_1
                state.user1.name = action.payload.data.user_1
                state.status = action.payload.data.status
            },
            [rejected]: (state, action) => {
                console.log(action.error)
            }
        }

    }
    function joinMatch() {
        var { pending, fulfilled, rejected } = extraActions.joinMatch;
        return {
            [pending]: (state) => {

            },
            [fulfilled]: (state, action) => {
                state.matchId = action.payload.data.id
                state.user1.id = action.payload.data.user_id_1
                state.user1.name = action.payload.data.user_1
                state.user2.id = action.payload.data.user_id_2
                state.user2.name = action.payload.data.user_2
                state.status = action.payload.data.status
            },
            [rejected]: (state, action) => {
                console.log(action.error)
            }
        }

    }
    function findMatch() {
        var { pending, fulfilled, rejected } = extraActions.findMatch;
        return {
            [pending]: (state) => {

            },
            [fulfilled]: (state, action) => {
                state.matchId = action.payload.data.id
                state.user1.id = action.payload.data.user_id_1
                state.user1.name = action.payload.data.user_1
                state.user2.id = action.payload.data.user_id_2
                state.user2.name = action.payload.data.user_2
                state.status = action.payload.data.status
            },
            [rejected]: (state, action) => {
                console.log(action.error)
            }
        }

    }
    function allMatch() {
        var { pending, fulfilled, rejected } = extraActions.allMatch;
        return {
            [pending]: (state) => {

            },
            [fulfilled]: (state, action) => {
                state.matchAll = action.payload.data

            },
            [rejected]: (state, action) => {
                console.log(action.error)
            }
        }

    }
}